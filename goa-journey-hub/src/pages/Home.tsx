import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

import resort1 from "@/assets/resort-1.jpg";

const Index = () => {
  const [data, setData] = useState<any>(null);
  const [homepackage, setPackages] = useState<any[]>([]);

  // Fetch Homepage Data
  useEffect(() => {
    axios.get("http://localhost:5000/api/homepage").then((res) => {
      setData(res.data);
    });
  }, []);

  // Fetch Packages (Dynamic)
useEffect(() => {
  axios.get("http://localhost:5000/api/homepackage").then((res) => {
    setPackages(res.data);
  });
}, []);


  if (!data) return <div className="text-center p-20">Loading...</div>;

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/${data.heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-background/60" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl title-italic text-primary leading-tight mb-6">
            {data.heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-foreground/90 mb-10 max-w-3xl mx-auto italic">
            {data.heroSubtitle}
          </p>

          <Link to="/packages" className="btn-hero">
            Start Your Adventure
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* WHAT WE OFFER SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${resort1})` }}
      >
        <div className="absolute inset-0 bg-background/85" />

        <div className="container mx-auto px-4 lg:px-14 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wider mb-8">
                What We Offer
              </h2>

              <ul className="space-y-4 text-foreground/90 uppercase text-lg tracking-wide">
                {data.offers?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary text-lg">•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="/about" className="btn-outline-hero mt-8 inline-flex">
                About Us
              </Link>
            </div>

            <div className="hidden lg:block">
              <img
                src={resort1}
                alt="Luxury Resort"
                className="rounded-lg shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PACKAGES (Dynamic) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-base text-orange-500 md:text-5xl font-display font-bold text-foreground text-center mb-12 uppercase tracking-wider">
           Explore More With GoaYatra Holidays 
          </h2>
          <p className="text-2xl text-center">Whether you love beaches, mountains, or city escapes, we’ve got something for everyone. Let us help you create unforgettable memories with curated packages, smooth travel planning,
             and experiences designed to make every trip truly special.</p>
        </div>
       <div className="text-center mt-12">
  <Link to="/packages" className="btn-outline-hero inline-flex">
    Explore
  </Link>
</div>
      </section>

      {/* CTA SECTION */}
      <section
        className="relative bg-slate-400 py-12 my-5 bg-cover bg-center"
        style={{
          backgroundImage: `url(http://localhost:5000/uploads/${data.ctaImage})`,
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <p className="text-primary font-semibold uppercase tracking-widest mb-4">
            {data.ctaSubtitle}
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl title-italic text-foreground mb-8">
            {data.ctaTitle}
          </h2>

          <Link to="/contact" className="btn-hero">
            Book Now
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
