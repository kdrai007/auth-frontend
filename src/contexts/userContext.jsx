/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [User,setUser]=()
  const name = {
    name: 'kdrai',
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
        setLoggedIn(true);
      } else {
        console.log(data);
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
        console.log('success', data);
        setLoggedIn(true);
      } else {
        console.log('error', data);
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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // eslint-disable-next-line react/prop-types
    <UserContext.Provider
      value={{
        name,
        loggedIn,
        setLoggedIn,
        LogInUser,
        SignUpUser,
        ForgotPasswordUser,
        ResetPasswordUser,
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
