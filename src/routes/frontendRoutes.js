const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const router = express.Router()

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('productos')
    return
  }
  res.render('login')
})

router.get('/chat', (req, res) => {
  const data = {
    email: req.user.email,
    isAuthenticated: !!req.isAuthenticated(),
  }
  res.render('chat', data)
})

router.get('/chat-admin', (req, res) => {
  res.render('chat-admin')
})

router.get('/login-error', (req, res) => {
  res.render('login-error')
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  req.logout()
  res.render('logout')
})

router.get('/signup', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('productos')
    return
  }

  res.render('signup')
})
router.get('/productos',(req,res)=>{
  res.render('productos')
})

module.exports = router
