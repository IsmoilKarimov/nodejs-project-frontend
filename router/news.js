const {Router} = require('express')
const router = Router()
const upload = require('../middleware/file')
const News = require('../model/news')

router.get('/news',async(req,res)=>{
    let news = await News.find().lean()
    news = news.map(n =>{
        if(n.date){
            let dd = new Date(n.date)
            n.date = dd.getDay()+'/'+dd.getMonth()+'/'+dd.getFullYear()
        }
        return n
    })
    res.render('news/index',{
        isNews:true,
        news
    })
})

router.get('/news/create',(req,res)=>{
    res.render('news/create',{
        isNews:true
    })
})

router.get('/news/:id',async(req,res)=>{
    let _id = req.params.id
    let news = await News.findOne({_id}).lean()
    res.render('news/show',{
        isNews:true,
        news
    })
})

router.post('/news/add',upload.single('photo'),async(req,res)=>{
    let {title,category,text} = req.body
    let date = Date.now()
    let photo = ''
    if(req.file){
        photo = req.file.path
    }
    let newItem = await new News({title,category,text,photo,date})
    await newItem.save()
    res.redirect('/news')
})

module.exports = router