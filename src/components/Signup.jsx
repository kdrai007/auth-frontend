import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { SignUpUser, loggedIn } = useUserContext();
  const [inputVal, setInputVal] = useState({
    name: '',
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value,
    });
  }
  async function handleSignup() {
    await SignUpUser(inputVal.name, inputVal.email, inputVal.password);
    navigate('/');
  }
  if (loggedIn) {
    return navigate('/');
  }
  return (
    <div className="flex flex-col bg-slate-500 gap-5 mt-10 px-8 py-10 rounded-lg">
      <h2 className="text-center capitalize text-lg">Sign Up to Auth</h2>

      <input
        name="name"
        type="text"
        className="w-full px-4 py-2 bg-transparent outline-none border-b-[1px]"
        placeholder="name"
        value={inputVal.name}
        onChange={handleChange}
      />
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
      />
      <button
        className="w-full bg-slate-800 rounded-md py-2 mt-2 hover:bg-slate-600 transition duration-300 ease-in-out"
        onClick={handleSignup}
      >
        Submit
      </button>
      <p className="text-sm mt-2">
        Already have an account?
        <Link className="text-blue-200 underline text-lg" to={'/login'}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
