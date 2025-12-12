import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";

const Packages = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1); // mobile
      else if (window.innerWidth < 1024) setItemsPerPage(2); // tablet
      else setItemsPerPage(3); // desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load packages
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages/all");
        setPackages(res.data.data);
      } catch (err) {
        console.error("Packages failed to load", err);
      }
    };
    loadData();
  }, []);

  const next = () => {
    if (index < packages.length - itemsPerPage) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <Layout>
      <section className="bg-background">
        <div className="w-full max-w-7xl mx-auto py-10 relative">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground text-center uppercase tracking-wider mb-12">
            Packages
          </h2>

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            disabled={index === 0}
            className={`absolute top-1/2 -left-5 md:-left-12 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-10 hover:bg-gray-100 transition 
              ${index === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            <ChevronLeft className="text-gray-700" />
          </button>

          {/* SLIDER */}
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex gap-5 transition-transform duration-500"
              style={{
                transform: `translateX(-${(index * 100) / itemsPerPage}%)`,
              }}
            >
              {packages.map((pkg, i) => (
                <div key={i} className="min-w-full sm:min-w-[50%] lg:min-w-[33.33%]">
                  <div className="bg-white border shadow-md rounded-xl overflow-hidden h-[600px] flex flex-col">
                    {/* IMAGE */}
                    <img
                      src={
                        pkg.image?.startsWith("/uploads/")
                          ? `http://localhost:5000${pkg.image}`
                          : pkg.image
                      }
                      className="h-60 w-full object-cover"
                    />

                    {/* CONTENT */}
                    <div className="p-4 flex-1 overflow-auto">
                      {/* Title */}
                      <h2 className="text-2xl font-bold mb-2 text-[#1a3d5c]">
                        {pkg.title}
                      </h2>

                      {/* Items */}
                      <ul className="text-base text-gray-700 space-y-1 mb-3 leading-relaxed">
                        {pkg.items.map((item: string, idx: number) => (
                          <li key={idx}>
                            <span className="text-primary">•</span> {item}
                          </li>
                        ))}
                      </ul>

                      {/* Price */}
                      {pkg.priceText && (
                        <p className="text-lg text-gray-600 mb-3">
                          <strong>Price: </strong>
                          {pkg.priceText}
                        </p>
                      )}

                      {/* Bottom Text */}
                      {pkg.bottomText && (
                        <div className="border-t pt-3 mt-3 text-gray-500 text-xs space-y-1">
                          {pkg.bottomText.split("\n").map((note, idx) => (
                            <p className="text-sm text-justify" key={idx}>
                              <span className="text-primary">•</span> {note}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Button */}
                      <Link
                        to="/contact"
                        className="btn-hero mt-5 inline-flex items-center gap-2"
                      >
                        Book Now <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            disabled={index >= packages.length - itemsPerPage}
            className={`absolute top-1/2 -right-5 md:-right-12 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-10 hover:bg-gray-100 transition 
              ${index >= packages.length - itemsPerPage ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            <ChevronRight className="text-gray-700" />
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Packages;
