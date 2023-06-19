import { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/userContext';
import { useLocation } from 'react-router';
import queryString from 'query-string';

export const ResetPass = () => {
  const baseUrl = 'http://localhost:5555/api';
  const [invalid, setInvalid] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [inputVal, setInputVal] = useState({
    password: '',
    cPassword: '',
  });
  const location = useLocation();
  const verifyToken = async () => {
    const { token, id } = queryString.parse(location.search);
    try {
      const res = await fetch(
        `${baseUrl}/verify-token?token=${token}&id=${id}`
      );
      const data = await res.json();
      if (!data.success) {
        setErrMsg(data.error);
      }
      setInvalid(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value,
    });
  }

  function handleClick(e) {
    e.preventDefault();
    const { password, cPassword } = inputVal;
    if (password != cPassword) {
      console.log("password doesn' match!");
      return;
    }
  }
  if (invalid) {
    return (
      <div className="max-w-screen-sm mx-auto">
        <h1>loading progress....</h1>
      </div>
    );
  }
  if (errMsg) {
    return (
      <div className="max-w-screen-sm mx-auto">
        <h1>{errMsg}</h1>
      </div>
    );
  }
  return (
    <form className="flex flex-col bg-slate-500 gap-5 mt-10 px-8 py-10 rounded-lg">
      <input
        name="password"
        type="password"
        className="w-full px-4 py-2 bg-transparent outline-none border-b-[1px]"
        placeholder="password"
        value={inputVal.password}
        onChange={handleChange}
      />
      <input
        name="cPassword"
        type="password"
        className="w-full px-4 py-2 bg-transparent outline-none border-b-[1px]"
        placeholder="confirm password"
        value={inputVal.cPassword}
        onChange={handleChange}
      />
      <button
        className="w-full bg-slate-800 rounded-md py-2 mt-2 hover:bg-slate-600 transition duration-300 ease-in-out"
        onClick={handleClick}
      >
        Change Password
      </button>
    </form>
  );
};

export const ForGotPassword = () => {
  const [inputVal, setInputVal] = useState('');
  const { ForgotPasswordUser } = useUserContext();
  async function handleClick() {
    await ForgotPasswordUser(inputVal);
  }
  return (
    <div className="flex flex-col bg-slate-500 gap-5 mt-10 px-8 py-10 rounded-lg">
      <h2 className="text-center capitalize text-lg">forgot password</h2>
      <input
        name="email"
        type="email"
        className="w-full px-4 py-2 bg-transparent outline-none border-b-[1px]"
        placeholder="email"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button
        className="w-full bg-slate-800 rounded-md py-2 mt-2 hover:bg-slate-600 transition duration-300 ease-in-out"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};
