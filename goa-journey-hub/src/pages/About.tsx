import { Link } from "react-router-dom";
import { ArrowRight, Shield, AlertTriangle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import resort1 from "@/assets/resort-1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

// -------------------------------
// TYPE DEFINITIONS
// -------------------------------
interface AboutData {
  heroTitle: string;
  heroImage: string;

  companyTitle: string;
  companyDesc1: string;
  companyDesc2: string;
  companyDesc3: string;
  companyImage: string;

  disclaimer1: string;
  disclaimer2: string;

  services: string[];
}

// -------------------------------
// COMPONENT
// -------------------------------
const About = () => {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`${API}/api/about`);
        setAbout(res.data);
      } catch (err) {
        console.log("About Fetch Error:", err);
      }
    };

    fetchAbout();
  }, []);

  return (
    <Layout>
      {/* ------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------- */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(${about?.heroImage ? API + about.heroImage : resort1})`,
        }}
      >
        <div className="absolute inset-0 bg-background/70" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl title-italic text-primary mb-6">
            {about?.heroTitle || "About Booking with GoaYatra"}
          </h1>
        </div>
      </section>

      {/* ------------------------------- */}
      {/* COMPANY INFO */}
      {/* ------------------------------- */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <h2 className="text-4xl md:text-3xl font-bold uppercase mb-6">
                {about?.companyTitle || "Crafting Extraordinary Journeys"}
              </h2>

              <p className="text-muted-foreground text-xl mb-6 leading-relaxed">
                {about?.companyDesc1}
              </p>

              <p className="text-muted-foreground text-xl mb-6 leading-relaxed">
                {about?.companyDesc2}
              </p>

              <p className="text-muted-foreground text-xl mb-8 leading-relaxed">
                {about?.companyDesc3}
              </p>

              <Link to="/packages" className="btn-hero inline-flex">
                View Packages <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <img
                src={about?.companyImage ? API + about.companyImage : resort1}
                alt="Company"
                className="rounded-lg shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ------------------------------- */}
      {/* SERVICES */}
      {/* -------------------------------
{about?.services && (
  <section className="py-20 bg-gray-100 text-center">
    <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center">
      
      
      <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>

    
      <ul className="space-y-4 text-lg text-muted-foreground text-left max-w-2xl">
        {about.services.map((service, index) => (
          <li key={index}><span className="text-primary"> • </span>{service}</li>
        ))}
      </ul>

     
      <Link to="/services" className="btn-outline-hero inline-flex mt-10">
        View All Services
      </Link>

    </div>
  </section>
)}-----*/}


      {/* ------------------------------- */}
      {/* DISCLAIMERS */}
      {/* ------------------------------- */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* NATURAL DISASTER */}
            <div className="bg-background p-8 rounded-xl border border-border bg-slate-100">

              <h3 className="text-3xl font-display font-semibold mb-4">
                🌟 Vision
              </h3>

              <p className="leading-relaxed text-lg">
                {about?.disclaimer1}
              </p>
            </div>

            {/* MANMADE DISASTER */}
            <div className="bg-background p-8 rounded-xl border border-border bg-slate-100">

              <h3 className="text-3xl font-display font-semibold mb-4">
                🎯 Mission
              </h3>

              <p className=" leading-relaxed text-lg">
                {about?.disclaimer2}
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </Layout>
  );
};

export default About;
