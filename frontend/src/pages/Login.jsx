import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../axios'

const Login = ({ setUser }) => {

  const [id, setId] = useState()
  const [pw, setPw] = useState()
  const [userName, setUserName] = useState()
  const nav = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await instance.post('/getLoginData', { id: id, pw: pw, userName: userName })
    if (res.data.result === 'success') {
      setUser(res.data.userName)

      // 브라우저 세션에 객체로 저장
      let obj = {
        'auth': 'user_Name',
        user_Name: res.data.userName
      }

      sessionStorage.setItem('info', JSON.stringify(obj))

      alert('환영합니다')
      nav('/')
    } else {
      alert('다시 입력해주세요')
    }
  }

  return (
    <div>
      <h3>로그인</h3>
      <form onSubmit={handleLogin}>
        ID : <input type='text' onChange={e => setId(e.target.value)}></input>
        <br />
        PW : <input type='password' onChange={e => setPw(e.target.value)}></input>
        <input type='submit' value='로그인'></input>
      </form>
    </div>
  )
}

export default Login