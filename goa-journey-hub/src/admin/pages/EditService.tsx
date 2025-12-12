import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const EditService = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [data, setData] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/services/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  const submit = async (e: any) => {
    e.preventDefault();

    let form = new FormData();
    form.append("title", data.title);
    form.append("timing", data.timing);
    form.append("items", JSON.stringify(data.items));
    if (image) form.append("image", image);

    await axios.put(`http://localhost:5000/api/services/${id}`, form);
    nav("/admin/services");
  };

  if (!data) return <>Loading...</>;

  return (
    <AdminLayout>
    <form
  onSubmit={submit}
  className="space-y-5 max-w-lg bg-white p-6 rounded-xl shadow-md border border-gray-200"
>
  <input
    type="text"
    value={data.title}
    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none shadow-sm"
    onChange={(e) => setData({ ...data, title: e.target.value })}
  />

  <input
    type="text"
    value={data.timing}
    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none shadow-sm"
    onChange={(e) => setData({ ...data, timing: e.target.value })}
  />

  <textarea
    value={data.items.join(",")}
    className="w-full px-4 py-2 border rounded-lg h-28 focus:ring-2 focus:ring-cyan-600 focus:outline-none shadow-sm resize-none"
    onChange={(e) =>
      setData({ ...data, items: e.target.value.split(",") })
    }
  />

  <div>
    <label className="block mb-1 text-gray-600 text-sm">Change Image (optional)</label>
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
    Update Service
  </button>
</form>

    </AdminLayout>
  );
};

export default EditService;
