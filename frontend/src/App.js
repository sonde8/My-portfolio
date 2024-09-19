import './App.css';
import Header from './components/Header'
import instance from './axios';
import { useEffect, useState } from 'react';
import Login from './pages/Login'
import Join from './pages/Join'
import Content from './pages/Content'
import { Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer';

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
    sessionStorage.removeItem('info')
    setUser("")
    alert('다음에 또 방문해주세요')
  }

  return (
    <div className="App flex-container">
      <Header logout={logout} user={user} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;