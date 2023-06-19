import Login from './components/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import { ResetPass, ForGotPassword } from './components/ResetPass';
import { useUserContext } from './contexts/userContext';
import Secret from './components/Secret';
import { useEffect, useState } from 'react';

function App() {
  const { loggedIn, setLoggedIn } = useUserContext();
  const [busy, setBusy] = useState(true);
  useEffect(() => {
    async function checkUser() {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined') {
        setBusy(false);
        return;
      }
      const myToken = JSON.parse(token);
      const res = await fetch('http://localhost:5555/welcome', {
        headers: {
          'access-token': myToken,
        },
      });
      const data = await res.json();
      setBusy(false);
      if (data.success) {
        setLoggedIn(true);
      }
    }
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
  return (
    <Router>
      <main className="w-full h-screen bg-slate-900 text-white">
        <NavBar />
        <div className="w-full flex justify-center items-center mt-10">
          <Routes>
            <Route
              path="/"
              element={
                busy ? <h1>Loading...</h1> : loggedIn ? <Secret /> : <Login />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Signup />} />
            <Route path="/forgot-password" element={<ForGotPassword />} />
            <Route path="/reset-password" element={<ResetPass />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
