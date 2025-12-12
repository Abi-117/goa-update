import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const API = "http://localhost:5000";

const AboutEdit = () => {
  const [form, setForm] = useState({
    heroTitle: "",
    companyTitle: "",
    companyDesc1: "",
    companyDesc2: "",
    companyDesc3: "",
    disclaimer1: "",
    disclaimer2: "",
    services: "",
  });

  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [companyPreview, setCompanyPreview] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${API}/api/about`).then((res) => {
      const d = res.data;
      if (!d) return;

      setForm({
        heroTitle: d.heroTitle || "",
        companyTitle: d.companyTitle || "",
        companyDesc1: d.companyDesc1 || "",
        companyDesc2: d.companyDesc2 || "",
        companyDesc3: d.companyDesc3 || "",
        disclaimer1: d.disclaimer1 || "",
        disclaimer2: d.disclaimer2 || "",
        services: d.services?.join("\n") || "",
      });

      if (d.heroImage) setHeroPreview(`${API}${d.heroImage}`);
      if (d.companyImage) setCompanyPreview(`${API}${d.companyImage}`);
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "services") {
        fd.append("services", JSON.stringify(value.split("\n")));
      } else {
        fd.append(key, value as string);
      }
    });

    if (e.target.heroImage.files[0])
      fd.append("heroImage", e.target.heroImage.files[0]);

    if (e.target.companyImage.files[0])
      fd.append("companyImage", e.target.companyImage.files[0]);

    await axios.put(`${API}/api/about/update`, fd);

    alert("About page updated successfully!");
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Edit About Page</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

        {/* HERO SECTION */}
        <input
          className="w-full p-3 border rounded"
          value={form.heroTitle}
          onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          placeholder="Hero Title"
        />

        {heroPreview && <img src={heroPreview} className="w-64 mb-4 rounded" />}
        <input type="file" name="heroImage" />

        <hr />

        {/* COMPANY INFO */}
        <input
          className="w-full p-3 border rounded"
          value={form.companyTitle}
          onChange={(e) => setForm({ ...form, companyTitle: e.target.value })}
          placeholder="Company Title"
        />

        <textarea
          className="w-full p-3 border rounded h-24"
          value={form.companyDesc1}
          onChange={(e) => setForm({ ...form, companyDesc1: e.target.value })}
          placeholder="Description 1"
        />

        <textarea
          className="w-full p-3 border rounded h-24"
          value={form.companyDesc2}
          onChange={(e) => setForm({ ...form, companyDesc2: e.target.value })}
          placeholder="Description 2"
        />

        <textarea
          className="w-full p-3 border rounded h-24"
          value={form.companyDesc3}
          onChange={(e) => setForm({ ...form, companyDesc3: e.target.value })}
          placeholder="Description 3"
        />

        {companyPreview && <img src={companyPreview} className="w-64 mb-4 rounded" />}
        <input type="file" name="companyImage" />

        <hr />

        {/* DISCLAIMERS */}
        <textarea
          className="w-full p-3 border rounded h-20"
          value={form.disclaimer1}
          onChange={(e) => setForm({ ...form, disclaimer1: e.target.value })}
          placeholder="Disclaimer 1"
        />

        <textarea
          className="w-full p-3 border rounded h-20"
          value={form.disclaimer2}
          onChange={(e) => setForm({ ...form, disclaimer2: e.target.value })}
          placeholder="Disclaimer 2"
        />

        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Update
        </button>
      </form>
    </AdminLayout>
  );
};

export default AboutEdit;
