const express = require('express');
const router = express.Router();

const indexController = require("../controllers/index")
const userController = require("../controllers/admin/users")

router.use((req, res, next) => {
  // if(!req.session.userId){
  //   res.redirect("/admin/dashboard")
  // }else{
    next()
  // }
})

router.get('/', (req, res, next) => {
  res.render("index", {title: "Index"})
})

router.get('/login', function(req, res, next) {
    if(req.session.userId){
        res.redirect('/admin/dashboard')
    }else{
        res.render('login', { title: 'Login' });
    }
});

router.post('/login', userController.login)
router.get('/logout', userController.logout)

module.exports = router;
