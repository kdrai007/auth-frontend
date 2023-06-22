/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [User, setUser] = useState({});
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      message,
      type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const LogInUser = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5555/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', JSON.stringify(data.token));
        showAlert('success', 'Logged In successfully!');
        setLoggedIn(true);
      } else {
        showAlert('danger', data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const SignUpUser = async (name, email, password) => {
    try {
      const res = await fetch('http://localhost:5555/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', JSON.stringify(data.token));
        showAlert('success', 'signed up successfully');
        setLoggedIn(true);
      } else {
        console.log('error', data);
        showAlert('danger', data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const ForgotPasswordUser = async (email) => {
    try {
      const res = await fetch('http://localhost:5555/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        showAlert('success', data.msg);
      }
      if (!data.success) {
        showAlert('danger', data.error);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const ResetPasswordUser = async (email) => {
    try {
      const res = await fetch('http://localhost:5555/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        showAlert('success', data.msg);
      }
      if (!data.success) {
        showAlert('danger', data.error);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const VerifyEmail = async (otp) => {
    console.log(otp);
    console.log(User._id);
    try {
      const res = await fetch('http://localhost:5555/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: User._id, otp }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // eslint-disable-next-line react/prop-types
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        LogInUser,
        SignUpUser,
        ForgotPasswordUser,
        ResetPasswordUser,
        VerifyEmail,
        User,
        setUser,
        alert,
        showAlert,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  return useContext(UserContext);
};
