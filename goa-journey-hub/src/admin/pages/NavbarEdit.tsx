
import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

interface Link {
  name: string;
  path: string;
}

interface NavbarData {
  logo: string;
  links: Link[];
}

const NavbarEdit = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [newLink, setNewLink] = useState<Link>({ name: "", path: "" });

  // Fetch navbar data
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const res = await axios.get<NavbarData>(
          "http://localhost:5000/api/navbar"
        );
        setLinks(res.data.links || []);
        if (res.data.logo)
          setLogoPreview(`http://localhost:5000/uploads/${res.data.logo}`);
      } catch (err) {
        console.error("Error fetching navbar:", err);
      }
    };
    fetchNavbar();
  }, []);

  // Add new link to state
  const handleAddLink = () => {
    if (!newLink.name || !newLink.path) return;
    setLinks([...links, { ...newLink }]);
    setNewLink({ name: "", path: "" });
  };

  // Save links to backend
  const handleSave = async () => {
    try {
      await axios.put("http://localhost:5000/api/navbar", { links });
      alert("Navbar updated successfully!");
    } catch (err) {
      console.error("Error updating navbar:", err);
    }
  };

  // Upload logo
  const uploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const fd = new FormData();
    fd.append("logo", e.target.files[0]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/navbar/logo",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLogoPreview(`http://localhost:5000/uploads/${res.data.logo}`);
    } catch (err) {
      console.error("Error uploading logo:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Navbar</h1>

        {/* Logo Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Logo</h2>
          {logoPreview && (
            <img src={logoPreview} alt="Logo" className="w-32 mb-2" />
          )}
          <input
            type="file"
            onChange={uploadLogo}
            className="border p-2 rounded"
          />
        </div>

        {/* Links Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Navigation Links</h2>
          <div className="space-y-3">
            {links.map((link, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  className="p-2 border rounded w-1/2"
                  placeholder="Name (e.g., HOME)"
                  value={link.name}
                  onChange={(e) => {
                    const updated = [...links];
                    updated[index].name = e.target.value;
                    setLinks(updated);
                  }}
                />
                <input
                  type="text"
                  className="p-2 border rounded w-1/2"
                  placeholder="Path (e.g., /about)"
                  value={link.path}
                  onChange={(e) => {
                    const updated = [...links];
                    updated[index].path = e.target.value;
                    setLinks(updated);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Add new link */}
          <div className="flex gap-4 mt-4 items-center">
            <input
              type="text"
              className="p-2 border rounded w-1/3"
              placeholder="New link name"
              value={newLink.name}
              onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
            />
            <input
              type="text"
              className="p-2 border rounded w-1/3"
              placeholder="New link path"
              value={newLink.path}
              onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
            />
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded"
              onClick={handleAddLink}
            >
              + Add Link
            </button>
          </div>
        </div>

        <button
          className="px-6 py-2 bg-blue-600 text-white rounded"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </AdminLayout>
  );
};

export default NavbarEdit;
