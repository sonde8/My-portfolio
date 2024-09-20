const express = require('express')
const app = express()
const indexRouter = require('./routes')
const path = require('path')


// 리액트 프로젝트 경로 설정
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))
app.use(express.json())

// CORS 오류 해결 반드시 router 위에 작성
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', indexRouter)



// 메인페이지 경로 설정


// 포트 설정
app.set('port', process.env.Port || 3001)
app.listen(app.get('port'), ()=>{
    console.log(`Server is Running on ${app.get('port')}`);
})