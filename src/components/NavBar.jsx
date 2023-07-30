import { useUserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const NavBar = () => {
  const { loggedIn, setLoggedIn, setUser, User, showAlert } = useUserContext(); //importing functions from my userContext
  const navigate = useNavigate();

  //handling logout function where we simply remove token from localstorage
  function handleLogout() {
    showAlert('success', 'Logged Out successfully!');
    localStorage.removeItem('token');
    setUser({});
    setLoggedIn(false);
  }

  return (
    <nav className="w-full bg-slate-600 px-10 py-4 flex justify-between items-center">
      <h1
        className="font-bold text-[1.5rem]   cursor-pointer font-cursive"
        onClick={() => navigate('/')}
      >
        Auth
      </h1>
      <div className="flex items-center gap-4">
        <h3 className="text-white capitalize">{User && User.name}</h3>
        {loggedIn && (
          <button
            className="bg-white text-black font-cursive px-3 py-2 rounded-md"
            onClick={handleLogout}
          >
            logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
