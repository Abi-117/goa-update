import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <header className="w-full bg-white shadow p-4 flex justify-end">
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
