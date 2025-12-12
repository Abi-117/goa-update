import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const AddService = () => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [timing, setTiming] = useState("");
  const [items, setItems] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const submit = async (e: any) => {
    e.preventDefault();

    let form = new FormData();
    form.append("title", title);
    form.append("timing", timing);
    form.append("items", JSON.stringify(items.split(",")));
    if (image) form.append("image", image);

    await axios.post("http://localhost:5000/api/services", form);
    nav("/admin/services");
  };

  return (
    <AdminLayout>
    <form
  onSubmit={submit}
  className="space-y-5 max-w-lg bg-white p-6 rounded-xl shadow-md border border-gray-200"
>
  <input
    type="text"
    placeholder="Title"
    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none shadow-sm"
    onChange={(e) => setTitle(e.target.value)}
  />

  <input
    type="text"
    placeholder="Timing"
    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none shadow-sm"
    onChange={(e) => setTiming(e.target.value)}
  />

  <textarea
    placeholder="Items (comma separated)"
    className="w-full px-4 py-2 border rounded-lg h-28 focus:ring-2 focus:ring-cyan-600 focus:outline-none shadow-sm resize-none"
    onChange={(e) => setItems(e.target.value)}
  />

  <div>
    <label className="block mb-1 text-gray-600 text-sm">Upload Image</label>
    <input
      type="file"
      className="w-full text-sm text-gray-700"
      onChange={(e) => setImage(e.target.files?.[0] || null)}
    />
  </div>

  <button
    type="submit"
    className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 rounded-lg font-medium shadow transition"
  >
    Add Service
  </button>
</form>

    </AdminLayout>
  );
};

export default AddService;
