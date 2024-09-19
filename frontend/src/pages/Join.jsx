import React, { useState } from 'react'
import instance from '../axios'

const Join = () => {

  const [userName, setUserName] = useState()
  const [id, setId] = useState()
  const [pw, setPw] = useState()

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
    <div>
      <h3>회원가입</h3>
      <form onSubmit={sendData}>
        ID : <input type='text' onChange={e => setId(e.target.value)}></input>
        PW : <input type='password' onChange={e => setPw(e.target.value)}></input><br/>
        USER_NAME : <input type='text' onChange={e => setUserName(e.target.value)}></input><br/>
        <input type='submit'></input>
      </form>
    </div>
  )
}

export default Join



