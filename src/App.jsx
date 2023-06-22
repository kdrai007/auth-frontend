import Login from './components/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import { ResetPass, ForGotPassword } from './components/ResetPass';
import { useUserContext } from './contexts/userContext';
import Secret from './components/Secret';
import { useEffect, useState } from 'react';
import EmailVerify from './components/EmailVerify';
import AlertNotification from './components/AlertNotification';

function App() {
  const { loggedIn, setLoggedIn, setUser, alert, showAlert, User } =
    useUserContext();
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
        setUser(data.user);
        setLoggedIn(true);
      }
    }
    checkUser();
    console.log(User.verified);
    if (User.verified === false) {
      showAlert(
        'error',
        <span>
          you are not verified please{' '}
          <Link to="/email-verify" className="font-bold">
            Click here{' '}
          </Link>
          to verify your email
        </span>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
  return (
    <Router>
      <main className="w-full min-h-screen bg-slate-900 text-white relative">
        <NavBar />
        <AlertNotification alert={alert} />
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
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/forgot-password" element={<ForGotPassword />} />
            <Route path="/reset-password" element={<ResetPass />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
