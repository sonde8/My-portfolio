import React, { useState } from 'react'
import instance from '../axios'
import { useNavigate } from 'react-router-dom'


const Join = () => {

  const [userName, setUserName] = useState()
  const [id, setId] = useState()
  const [pw, setPw] = useState()
  const nav = useNavigate()

  const sendData = async (e) => {
    e.preventDefault()
    console.log('Data', id, pw, userName)

    // try/catch : 예외처리, 에러가 발생할 가능성이 있는 부분을 try-catch
    try {
      const res = await instance.post('/getData', { id: id, pw: pw, userName: userName })
      console.log('res', res.data.result)

      if (res.data.result === 'success') {
        window.alert('회원가입 성공')
        
        /* Header는 Routes에 포함되어있지 않기 때문에
            Routes를 이용한 nav를 사용할 때 header는 렌더링이 되지않음
            => window.location.href <- 전체 새로고침
        */
        nav('/')
      } else {
        window.alert('회원가입 실패')
      }
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className='join-container'>
      <h2>회원가입</h2>
      <form onSubmit={sendData} className='join-form'>
        <div className='input-group'>
          <label htmlFor='id'>ID</label>
          <input
            type='text'
            id='id'
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
        <div className='input-group'>
          <label htmlFor='username'>USER NAME</label>
          <input
            type='text'
            id='username'
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='join-button'>회원가입</button>
      </form>
    </div>
  )
}

export default Join



