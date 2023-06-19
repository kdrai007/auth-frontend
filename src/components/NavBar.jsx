import { useUserContext } from '../contexts/userContext';

const NavBar = () => {
  const { loggedIn, setLoggedIn } = useUserContext();

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <nav className="w-full bg-slate-600 px-10 py-4 flex justify-between items-center">
      <h1 className="font-bold text-[1.5rem]   cursor-pointer font-cursive">
        Auth
      </h1>
      <div className="flex gap-4">
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
