import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';
import ReCAPTCHA from 'react-google-recaptcha';

// eslint-disable-next-line react/prop-types
const Login = () => {
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const { LogInUser, loggedIn } = useUserContext();
  const [inputVal, setInputVal] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    if (loggedIn) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleChange(e) {
    const { name, value } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value,
    });
  }
  function onChange(value) {
    setRecaptchaValue(value);
  }
  async function handleLogin() {
    await LogInUser(inputVal.email, inputVal.password, recaptchaValue);
    setInputVal({
      email: '',
      password: '',
    });
    setRecaptchaValue('');
    navigate('/');
  }
  return (
    <div className="flex flex-col bg-slate-500 gap-5 px-8 py-10 rounded-lg mt-10">
      <h2 className="text-center capitalize text-lg">LogIn to Auth</h2>
      <input
        name="email"
        type="email"
        className="w-full px-4 py-2 bg-transparent outline-none border-b-[1px]"
        placeholder="email"
        value={inputVal.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        className="w-full px-4 py-2 bg-transparent outline-none border-b-[1px]"
        placeholder="*****"
        value={inputVal.password}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleLogin();
        }}
      />
      <Link
        to="/forgot-password"
        className="text-right underline text-blue-400"
      >
        forgot password
      </Link>
      <ReCAPTCHA
        sitekey="6Lef8L0mAAAAAOdYqvjPDZooG64U3su459kNWglz"
        onChange={onChange}
      />
      <button
        className="w-full bg-slate-800 rounded-md py-2 mt-2 hover:bg-slate-600 transition duration-300 ease-in-out"
        onClick={handleLogin}
      >
        Submit
      </button>
      <p className="text-sm mt-2">
        Don&apos;t have an account?
        <Link className="text-blue-200 underline text-lg" to={'/create'}>
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
