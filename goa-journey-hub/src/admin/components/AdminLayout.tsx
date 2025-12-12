import { Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    nav("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/home">Home Page</Link>
          <Link to="/admin/about">About Page</Link>
          <Link to="/admin/services">Services</Link>
          <Link to="/admin/packages">Packages</Link>
          <Link to="/admin/gallery">Gallery</Link>
          <Link to="/admin/contact">Contact Page</Link>
          <Link to="/admin/footer">Footer</Link>
          <Link to="/admin/navbar">Navbar</Link>
        </nav>

        <button
          className="mt-auto bg-red-500 text-white p-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
