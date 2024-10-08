import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../axios'
import { Link } from 'react-router-dom'

const Login = ({ setUser }) => {

  const [id, setId] = useState()
  const [pw, setPw] = useState()
  const [userName, setUserName] = useState()
  const nav = useNavigate()

  // 로그인
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
  
  // 회원가입
  const sendData = async (e) => {
    e.preventDefault()
    console.log('Data', id, pw, userName)

    // try/catch : 예외처리, 에러가 발생할 가능성이 있는 부분을 try-catch
    try {
      const res = await instance.post('/getData', { id : id, pw : pw, userName : userName })
      console.log('res', res.data.result)
      if (res.data.result === 'success') {
        window.alert('회원가입 성공')
      } else {
        window.alert('회원가입 실패')
      }
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='input-group'>
          <label htmlFor='username'>USER NAME</label>
          <input 
            type='text' 
            id='username'
            value={id}
            onChange={e => setId(e.target.value)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>PASSWORD</label>
          <input 
            type='password' 
            id='password'
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='login-button'>LOGIN</button>
      </form>
      <div className='form-footer'>
        <Link to="/join" className='join-link'>회원가입</Link>
      </div>
    </div>
  )
}

export default Login