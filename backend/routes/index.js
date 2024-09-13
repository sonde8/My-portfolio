const express = require('express')
const router = express.Router()
const path = require('path')
const conn = require('../config/database')

router.get('/', (req, res) => {
  console.log('main');
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'))
})

// 회원가입 라우터
router.post('/getData', (req, res) => {
  console.log('getData Router', req.body)
  let { id, pw, userName } = req.body

  let sql = 'INSERT INTO LINK_MEMBER VALUES (?, ?, ?)'
  conn.query(sql, [id, pw, userName], (err, rows) => {
    console.log('rows', rows)
    if (rows) {
      // 회원가입 성공
      res.json({ result: 'success' })
    } else {
      // 회원가입 실패
      res.json({ result: 'failed' })
    }

  })
})

// 로그인 라우터
router.post('getLoginData', (req, res) => {
  console.log('getLoginData', req.body)
  let { id, pw } = req.body

  let sql = 'SELECT ID FROM LINK_MEMBER WHERE ID=? PW=?'
  conn.query(sql, [id, pw], (err, rows) => {
    console.log('rows', rows)
    if (rows.length > 0){
      req.session.userId = id
      console.log('req.session', req.session.userId)

      // 로그인 성공
      res.json({ result : 'success', id : id })
    } else {
      // 로그인 실패
      res.json({ result : 'failed' })
    }
  })
})

// 로그아웃 라우터
router.get('/logoutData', (req, res) => {
  console.log('logoutData Router')
  req.session.destroy(() => {
    console.log(req.session)
    res.json({ id : req.session })
  })
})




module.exports = router;