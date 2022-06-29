const {Router} = require('express')
const router = Router()
const Worker = require('../model/worker')

router.get('/',async (req,res)=>{
    let workers = await Worker.find().lean()
    workers = workers.map(worker =>{
        let date = new Date(worker.bdate)
        worker.bdate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        return worker   
    })
    res.render('workers/index',{
        isWorkers: true,
        workers
    })
})

router.get('/add', (req,res)=>{
    res.render('workers/add',{
        isWorkers: true
    })
})

router.get('/delete/:id', async(req,res)=>{
    let _id = req.params.id
    await Worker.findByIdAndRemove({_id})
    res.redirect('/workers')
})

router.post('/',async(req,res)=>{
    let {name,age,skills,bplace,bdate} = req.body
    let newWorkers = await new Worker({name,age,skills,bplace,bdate})
    await newWorkers.save()
    res.redirect('/workers')
})

module.exports = router
