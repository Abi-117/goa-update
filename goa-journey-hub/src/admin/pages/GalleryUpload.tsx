import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
interface GalleryItem {
  _id: string;
  image: string;
}

const GalleryUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const fetchGallery = () => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => setGallery(data));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return;

    const form = new FormData();
    form.append("image", image);

    await fetch("http://localhost:5000/api/gallery/add", {
      method: "POST",
      body: form,
    });

    setImage(null);
    fetchGallery();
  };

  const deleteImage = async (id: string) => {
    await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "DELETE",
    });
    fetchGallery();
  };

  return (
    <AdminLayout>
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Upload Gallery Image</h2>

      <form onSubmit={uploadImage} className="mb-6">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-3">Gallery Images</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((img) => (
          <div key={img._id} className="relative border rounded p-2">
            <img
              src={`http://localhost:5000/uploads/${img.image}`}
              alt=""
              className="w-full h-40 object-cover rounded"
            />

            <button
              onClick={() => deleteImage(img._id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
};

export default GalleryUpload;
