
import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

interface FooterLinks {
  home: string;
  about: string;
  packages: string;
  services: string;
  contact: string;
}

interface FooterData {
  logo: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
  links: FooterLinks;
}

const FooterEdit = () => {
  const [form, setForm] = useState<FooterData>({
    logo: "",
    address: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    youtube: "",
    links: {
      home: "/",
      about: "/about",
      packages: "/packages",
      services: "/services",
      contact: "/contact",
    },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:5000"; // change if different

  // Fetch existing footer data
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/footer`)
      .then((res) => {
        if (res.data) {
          setForm(res.data);
          if (res.data.logo)
            setLogoPreview(`${API_BASE}/uploads/${res.data.logo}`);
        }
      })
      .catch((err) => console.error("Error loading footer:", err));
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("address", form.address);
    fd.append("phone", form.phone);
    fd.append("email", form.email);
    fd.append("facebook", form.facebook);
    fd.append("instagram", form.instagram);
    fd.append("youtube", form.youtube);
    fd.append("links", JSON.stringify(form.links));

    const fileInput = (e.target as any).logo;
    if (fileInput.files[0]) {
      fd.append("logo", fileInput.files[0]);
    }

    try {
      await axios.put(`${API_BASE}/api/footer/update`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Footer updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update footer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Footer</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        {/* Logo */}
        <div>
          <h2 className="font-semibold text-lg">Footer Logo</h2>
          {logoPreview && (
            <img
              src={logoPreview}
              className="w-40 h-auto rounded shadow mb-3"
              alt="Footer Logo"
            />
          )}
          <input
            type="file"
            name="logo"
            onChange={(e) => {
              setLogoPreview(URL.createObjectURL((e.target as any).files[0]));
            }}
          />
        </div>

        {/* Address */}
        <div>
          <h2 className="font-semibold text-lg">Address</h2>
          <textarea
            className="w-full p-3 rounded border h-24"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Full Address"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="p-3 rounded border"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
          />
          <input
            className="p-3 rounded border"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="p-3 rounded border"
            value={form.facebook}
            onChange={(e) => setForm({ ...form, facebook: e.target.value })}
            placeholder="Facebook URL"
          />
          <input
            className="p-3 rounded border"
            value={form.instagram}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
            placeholder="Instagram URL"
          />
          <input
            className="p-3 rounded border"
            value={form.youtube}
            onChange={(e) => setForm({ ...form, youtube: e.target.value })}
            placeholder="YouTube URL"
          />
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg">Quick Links</h2>
          {Object.entries(form.links).map(([key, value]) => (
            <input
              key={key}
              className="w-full p-3 rounded border mb-2"
              value={value}
              onChange={(e) =>
                setForm({
                  ...form,
                  links: { ...form.links, [key]: e.target.value },
                })
              }
              placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} Link`}
            />
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Footer"}
        </button>
      </form>
    </AdminLayout>
  );
};

export default FooterEdit;
