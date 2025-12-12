import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
interface GalleryItem {
  _id: string;
  image: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <Layout>
    <div className="py-20 gallery">
      <h2 className="text-center text-3xl font-bold mb-6">Our Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {images.map((img) => (
          <div key={img._id} className="overflow-hidden rounded shadow-2xl">
            <img
              src={`http://localhost:5000/uploads/${img.image}`}
              alt="Gallery"
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default Gallery;
