import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { Trash2, Edit, PlusCircle, X } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

type PackageType = {
  _id: string;
  title: string;
  items: string[];
  image: string;
  bottomText: string;
  priceText?: string;
};

const initialForm = {
  id: "",
  title: "",
  itemsText: "", // items as newline-separated string in form
  priceText: "",
  bottomText: "",
  imageFile: null as File | null,
  preview: "",
};

export default function PackagesAdmin() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(false);

  const BACKEND = "http://localhost:5000/api"; // change if different

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND}/packages/all`);
      console.log(res);
      setPackages(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch packages", err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setForm(initialForm);
    setEditing(false);
    setShowForm(true);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setForm((s) => ({ ...s, imageFile: f, preview: URL.createObjectURL(f) }));
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const fd = new FormData();
      // fd.append("title", form.title);
      // fd.append(
      //   "items",
      //   JSON.stringify(
      //     form.itemsText
      //       .split("\n")
      //       .map((i) => i.trim())
      //       .filter(Boolean)
      //   )
      // );
      // fd.append("priceText", form.priceText || "");
      // if (form.imageFile) fd.append("image", form.imageFile);
      // console.log(fd);

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append(
        "items",
        JSON.stringify(
          form.itemsText
            .split("\n")
            .map((i) => i.trim())
            .filter(Boolean)
        )
      );
      fd.append("priceText", form.priceText || "");
      fd.append("bottomText", form.bottomText || "");

      if (form.imageFile) fd.append("image", form.imageFile);

      // Debug
      for (let p of fd.entries()) console.log(p);

      const res = await axios.post(`${BACKEND}/packages/add`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchPackages();
      setShowForm(false);
      setForm(initialForm);
    } catch (err) {
      console.error("Create failed", err);
      alert("Failed to create package");
    }
  };

  const startEdit = (pkg: PackageType) => {
    setForm({
      id: pkg._id,
      title: pkg.title,
      itemsText: pkg.items.join("\n"),
      priceText: pkg.priceText || "",
      bottomText: pkg.bottomText || "",
      imageFile: null,

      preview: pkg.image ? `http://localhost:5000${pkg.image}` : "",
    });
    setEditing(true);
    setShowForm(true);
  };


  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id) return;
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append(
        "items",
        JSON.stringify(
          form.itemsText
            .split("\n")
            .map((i) => i.trim())
            .filter(Boolean)
        )
      );
      fd.append("priceText", form.priceText || "");
      fd.append("bottomText", form.bottomText || "");

      // Only append image if it's selected
      if (form.imageFile) {
        fd.append("image", form.imageFile);
      }

      const res = await axios.put(`${BACKEND}/packages/update/${form.id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchPackages();
      setShowForm(false);
      setForm(initialForm);
      setEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update package");
    }
  };

  const removePackage = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    try {
      await axios.delete(`${BACKEND}/packages/delete/${id}`);
      fetchPackages();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Packages Admin</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-md"
            >
              <PlusCircle className="w-5 h-5" /> Add Package
            </button>
          </div>
        </div>

        {/* Form Drawer / Panel */}
        {showForm && (
          <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">
                {editing ? "Edit Package" : "Add Package"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm(initialForm);
                  setEditing(false);
                }}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            <form
              onSubmit={editing ? submitEdit : submitCreate}
              className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Price Text (optional)
                </label>
                <input
                  name="priceText"
                  value={form.priceText}
                  onChange={onChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Items (one per line)
                </label>
                <textarea
                  name="itemsText"
                  value={form.itemsText}
                  onChange={onChange}
                  className="w-full border px-3 py-2 rounded h-28"
                  placeholder="2 Night Stay AC Room&#10;2 Days Breakfast&#10;Pick up & Drop"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Bottom Text
                </label>
                <textarea
                  name="bottomText"
                  value={form.bottomText}
                  onChange={onChange}
                  className="w-full border px-3 py-2 rounded h-20"
                  placeholder="Enter bottom notes here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input type="file" accept="image/*" onChange={onFileChange} />
                {form.preview && (
                  <img
                    src={form.preview}
                    alt="preview"
                    className="mt-3 w-40 h-28 object-cover rounded"
                  />
                )}
              </div>

              <div className="flex items-end gap-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editing ? "Update Package" : "Create Package"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setForm(initialForm);
                    setEditing(false);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Packages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <div>Loading...</div>}
          {!loading && packages.length === 0 && (
            <div className="text-gray-500">No packages yet.</div>
          )}
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <div className="h-44 w-full bg-gray-100">
                {pkg.image ? (
                  // if image path starts with /uploads, use full URL
                  <img
                    src={
                      pkg.image?.startsWith("/uploads/")
                        ? `http://localhost:5000${pkg.image}`
                        : pkg.image
                    }
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{pkg.title}</h3>
                    {pkg.priceText && (
                      <p className="text-sm text-gray-600">{pkg.priceText}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(pkg)}
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removePackage(pkg._id)}
                      className="p-2 rounded hover:bg-gray-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <ul className="text-sm text-gray-700 mt-3 mb-4 space-y-1 flex-1 overflow-auto">
                  {pkg.items.map((it, i) => (
                    <li key={i}>• {it}</li>
                  ))}
                </ul>
                <div>{pkg.bottomText}</div>
                <div className="mt-auto text-right">
                  <small className="text-xs text-gray-400">
                    ID: {pkg._id.slice(-6)}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
