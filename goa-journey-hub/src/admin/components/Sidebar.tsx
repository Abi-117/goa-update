import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-4">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/home">Home</Link>
        <Link to="/admin/about">About</Link>
        <Link to="/admin/services">Services</Link>
        <Link to="/admin/packages">Packages</Link>
        <Link to="/admin/contact">Contact</Link>

        <Link to="/admin/footer">Footer</Link>
      </nav>  
    </aside>
  );
};

export default Sidebar;
