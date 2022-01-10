const sessionsetup = require('./sessionsetup')
const multer = require('multer');
var path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/uploads/resources')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({dest: 'assets/uploads/resources', storage: storage});
const select = require('./db/select.js')
const insert = require('./db/insert.js')
const update = require('./db/update.js')
const validator = require('./validator/index.js')
const router = sessionsetup.router
router.get('/', async (req, res) => {
  const query = new select
  try {
    let filter = '';
    if(!req.session.login){
      filter=' where is_active = 1'
    }
    var results = await query.get("select * from resources"+filter+" order by id desc")
    res.json(results)
  } catch (ex) {
    res.json({ error: true, data: ex })
  }
})
router.post('/store',upload.single('media'), async (req, res) => {
  if(req.session.login===true){
    const validate = new validator(req.body)
    validate.addrules('title','required')
    validate.addrules('short_description','required')
    validate.addrules('description','required')
    const validation_result = validate.validate()
    if(!validate.isValid()){
      res.status(400).json(validation_result);
    }else{
      if (!req.file) {
        res.json({media:["Media is required"]})
        return
      }
      req.body.image = 'uploads/resources/'+req.file.filename;
      const insert_record = new insert("resources", req.body)
      var inserted_id = await insert_record.add()
      const query = new select
      try{
        var resource = await query.first("select * from resources where `id` = ?", [inserted_id])
        res.json(resource)
      }catch(ex){
        res.json({error:true,data:ex})
      }
    }
  }else{
    res.json({error:true,data:"You are not authorized"})
  }
})

router.post('/edit/:id',upload.single('media'), async (req, res) => {
  if(req.session.login===true){
    const validate = new validator(req.body)
    validate.addrules('title','required')
    validate.addrules('short_description','required')
    validate.addrules('description','required')
    const validation_result = validate.validate()
    if(!validate.isValid()){
      res.status(400).json(validation_result);
    }else{
      if(req.file){
        req.body.image = 'uploads/resources/'+req.file.filename;
      }
      const update_record = new update("resources", req.body, {id: req.params.id})
      await update_record.edit()
      const query = new select
      try{
        var resource = await query.first("select * from resources where `id` = ?", [req.params.id])
        res.json(resource)
      }catch(ex){
        res.json({error:true,data:ex})
      }
    }
  }else{
    res.json({error:true,data:"You are not authorized"})
  }
})
router.delete('/delete/:id', async (req, res) => {
  if(req.session.login===true){
    const query = new select
    try{
      query.get("DELETE from resources where id = "+req.params.id)
      res.json({data: "Deleted"}).status(200)
    }catch(ex){
      res.json({error:true,data:ex})
    }
  }else{
    res.json({error:true,data:"You are not authorized"})
  }
})

module.exports = router