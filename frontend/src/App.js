import './App.css';
import Header from './components/Header'
import instance from './axios';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Join from './pages/Join'

function App() {

  const [user, setUser] = useState()

  const [sInfo, setSInfo] = useState()



  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem('info')))
    setSInfo(JSON.parse(sessionStorage.getItem('info')))
  }, [user])

  const logout = async () => {
    console.log('로그아웃 함수')
    const res = await instance.get('/logoutData')
    console.log('res', res.data)

    // sessionStorage 지우기
    sessionStorage.removeItem('info')

    setUser("")
    alert('다음에 또 방문해주세요')
  }

  return (
    <div className="App">
      <Header />
      <Login/>
      <Join/>
    </div>
  );
}

export default App;
