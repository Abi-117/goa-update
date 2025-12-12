import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const API = "http://localhost:5000";

const HomeEdit = () => {
  // ------------------------------------
  // HOMEPAGE FORM
  // ------------------------------------
  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    offers: "",
    ctaTitle: "",
    ctaSubtitle: "",
  });

  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [ctaPreview, setCtaPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ------------------------------------
  // PACKAGE STATES
  // ------------------------------------
  const [pkgTitle, setPkgTitle] = useState("");
  const [pkgDuration, setPkgDuration] = useState("");
  const [pkgPriceText, setPkgPriceText] = useState("");
  const [pkgImage, setPkgImage] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);

  // ------------------------------------
  // GET HOMEPAGE + PACKAGES
  // ------------------------------------
  useEffect(() => {
    loadHomepage();
    loadPackages();
  }, []);

  const loadHomepage = async () => {
    const res = await axios.get(`${API}/api/homepage`);
    const d = res.data;

    setForm({
      heroTitle: d?.heroTitle || "",
      heroSubtitle: d?.heroSubtitle || "",
      offers: d?.offers?.join("\n") || "",
      ctaTitle: d?.ctaTitle || "",
      ctaSubtitle: d?.ctaSubtitle || "",
    });

    if (d?.heroImage) setHeroPreview(`${API}${d.heroImage}`);
    if (d?.ctaImage) setCtaPreview(`${API}${d.ctaImage}`);
  };

  const loadPackages = async () => {
  const res = await axios.get(`${API}/api/homepackage`);
  setPackages(res.data);
};


  // ------------------------------------
  // UPDATE HOMEPAGE
  // ------------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("heroTitle", form.heroTitle);
    fd.append("heroSubtitle", form.heroSubtitle);
    fd.append("offers", JSON.stringify(form.offers.split("\n")));
    fd.append("ctaTitle", form.ctaTitle);
    fd.append("ctaSubtitle", form.ctaSubtitle);

    if (e.target.heroImage.files[0]) {
      fd.append("heroImage", e.target.heroImage.files[0]);
    }
    if (e.target.ctaImage.files[0]) {
      fd.append("ctaImage", e.target.ctaImage.files[0]);
    }

    await axios.put(`${API}/api/homepage/update`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setLoading(false);
    alert("Homepage Updated!");
    loadHomepage();
  };

  // ------------------------------------
  // ADD PACKAGE
  // ------------------------------------
  const addHomepackage = async (e: any) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", pkgTitle);
    fd.append("duration", pkgDuration);
    fd.append("priceText", pkgPriceText);
    fd.append("image", pkgImage);

    await axios.post(`${API}/api/homepackage/add`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setPkgTitle("");
    setPkgDuration("");
    setPkgPriceText("");
    setPkgImage(null);

    loadPackages();
    alert("Package Added!");
  };

  const deleteHomepackage = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    await axios.delete(`${API}/api/homepackage/${id}`);
    loadPackages();
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-14">
        {/* HOMEPAGE EDIT */}
        <div>
          <h1 className="text-3xl font-bold mb-6">Edit Homepage</h1>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
            <input
              className="w-full p-3 rounded border"
              value={form.heroTitle}
              onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
              placeholder="Hero Title"
            />

            <input
              className="w-full p-3 rounded border"
              value={form.heroSubtitle}
              onChange={(e) =>
                setForm({ ...form, heroSubtitle: e.target.value })
              }
              placeholder="Hero Subtitle"
            />

            <textarea
              className="w-full p-3 rounded border h-32"
              value={form.offers}
              onChange={(e) => setForm({ ...form, offers: e.target.value })}
              placeholder="One offer per line"
            />

            <h2 className="font-semibold text-lg">Hero Image</h2>
            {heroPreview && (
              <img src={heroPreview} className="w-64 rounded mb-3" />
            )}
            <input type="file" name="heroImage" />

            <input
              className="w-full p-3 rounded border"
              value={form.ctaTitle}
              onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })}
              placeholder="CTA Title"
            />

            <input
              className="w-full p-3 rounded border"
              value={form.ctaSubtitle}
              onChange={(e) =>
                setForm({ ...form, ctaSubtitle: e.target.value })
              }
              placeholder="CTA Subtitle"
            />

            <h2 className="font-semibold text-lg">CTA Image</h2>
            {ctaPreview && (
              <img src={ctaPreview} className="w-64 rounded mb-3" />
            )}
            <input type="file" name="ctaImage" />

            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HomeEdit;
