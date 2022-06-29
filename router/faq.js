const {Router} = require('express')
const router = Router()
const Faq = require('../model/faq')

router.get('/', async(req,res)=> {
    let faqs = await Faq
    .find()
    .sort({_id:-1})
    .lean()
    faqs = faqs.map(faq => {
        faq.createdAt = faq.createdAt.toLocaleString()
        return faq  
    }) 
    res.render('faq/index',{
        isFaq: true,
        faqs
    })
})

router.post('/',async (req,res)=>{
    let {name,question} = req.body
    let faq = {
        name, question,
        createdAt:Date.now(),
        status: 0
    }
    let newFaq =await new Faq(faq)
    await newFaq.save()
    res.redirect('/faq')
})

router.get('/delete/:id',async(req,res)=> {
    let _id = req.params.id
    await Faq.findByIdAndRemove({_id})
    res.redirect('/faq')                
})

// biror bir id dagi ma'lumotlarni olib frontga beradi
router.get('/get/:id',async(req,res)=>{
    let _id = req.params.id
    let faq = await Faq.findOne({_id}).lean()
    res.send(faq)
})

// biror bir id dagi ma'lumotlarni bazaga yozadi
router.post('/save',async(req,res)=>{
    let {name,question,answer,status, _id} = req.body
    await Faq.findByIdAndUpdate(_id,{name,question,answer,status})
    res.redirect('/faq')    
})

module.exports = router 
   