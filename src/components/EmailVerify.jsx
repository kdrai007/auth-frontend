import { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  //importing functions from userContext
  const { showAlert, User, VerifyEmail } = useUserContext();
  const navigate = useNavigate();
  //using hook useState for handling input numbers in this component
  const [Otp, setOtp] = useState();
  //use useEffect hook for checking if there is any old token in database if not then creating a new one
  useEffect(() => {
    if (Object.keys(User).length === 0) return console.log('no User');
    showAlert('success', 'check your email to get your otp');
    async function checkVerficationToken() {
      const res = await fetch(
        `http://localhost:5555/api/check-verificationtoken?id=${User._id}`,
        {
          method: 'get',
        }
      );
      const data = await res.json();
      console.log(data);
    }
    checkVerficationToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //here we simply handling form sbmit checking opt is right or not
  async function handleSubmit() {
    const data = await VerifyEmail(Otp);
    if (data.success) {
      navigate('/');
      showAlert('success', data.msg);
    } else {
      showAlert('error', data.error);
    }
  }
  //if user is already verified this comoponet just simply gonna let know user is already verified;
  if (User.verified) {
    return <h1 className="text-center">User is already verified</h1>;
  }
  return (
    <div className="flex flex-col bg-slate-500 gap-5 mt-10 px-8 py-10 rounded-lg">
      <h2 className="text-center capitalize text-lg">Email Verification</h2>
      <input
        name="otp"
        type="number"
        className="w-full px-4 py-2 bg-transparent outline-none border-b-[1px]"
        placeholder="otp"
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="w-full bg-slate-800 rounded-md py-2 mt-2 hover:bg-slate-600 transition duration-300 ease-in-out"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default EmailVerify;
