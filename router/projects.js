const {Router} = require('express')
const router = Router()
const Project = require("../model/project")
const Worker = require('../model/worker')

router.get('/',async(req,res)=>{
    let projects = await Project
    .find()
    .populate('person')
    .sort({_id:-1})
    .lean()
    projects = projects.map(project =>{{
        if(project.deadline)
            project.deadline = project.deadline.toLocaleString()
        return project
    }})
    res.render('projects/index',{    
        isProjects:true,
        projects
    })
})

router.post('/',async(req,res)=>{
    let {name,person,projecttype,deadline} = req.body
    deadline = deadline || Date.now() + 1000 * 86400 * 7
    let project = await new Project({name,person,projecttype,deadline})
    await project.save()
    res.redirect('/projects')
})

router.get('/delete/:id',async(req,res)=>{
    let _id = req.params.id
    await Project.findByIdAndRemove({_id})
    res.redirect('/projects')
})

router.get('/edit/:id',async(req,res)=>{
    let workers = await Worker.find().lean()
    let _id = req.params.id
    res.render('projects/edit',{
        _id,
        workers,
        isProjects: true
    })
})

router.get('/get/:id',async(req,res)=>{
    let _id = req.params.id
    let project = await Project.findOne({_id})
    res.send(project)
})



router.get('/create', async(req,res)=>{
    let workers = await Worker.find().lean()
    res.render('projects/create',{
        isProjects: true,
        workers 
    })
})

module.exports = router