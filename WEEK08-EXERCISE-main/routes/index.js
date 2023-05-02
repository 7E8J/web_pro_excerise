const express = require('express')
const router = express.Router()

var article = require('../article-db')

router.get('/', function(req, res, next) {
  let data = { article : article }
  if(req.query.search){
    data = { article : article.filter(article => {
      return article.title.toLowerCase().includes(req.query.search.toLowerCase())
    })}
  }
  res.render('index', data)

})

router.get('/blog/:id', function(req, res, next) {
  if(article.find(article => article.id === req.params.id)){
    let data = { article : article.find(article => article.id === req.params.id) }
    res.render('detail', data)
  } else {
    res.send('Error "ไม่พบบทความ"')
  }
})
 
module.exports = router