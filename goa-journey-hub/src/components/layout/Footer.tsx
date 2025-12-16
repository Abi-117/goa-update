import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Logo from "@/assets/zen - logo.png";

interface FooterLinks {
  home: string;
  about: string;
  packages: string;
  services: string;
  contact: string;
}

interface FooterData {
  logo: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
  links: FooterLinks;
}

const DEFAULT_LINKS: FooterLinks = {
  home: "/",
  about: "/about",
  packages: "/packages",
  services: "/services",
  contact: "/contact",
};

const DEFAULT_FOOTER: FooterData = {
  logo: "",
  address: "",
  phone: "",
  email: "",
  facebook: "",
  instagram: "",
  youtube: "",
  links: DEFAULT_LINKS,
};

const Footer = () => {
  const [data, setData] = useState<FooterData>(DEFAULT_FOOTER);

  const API_BASE = import.meta.env.VITE_API || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_BASE}/api/footer`)
      .then((res) => res.json())
      .then((res) => {
        setData({
          ...DEFAULT_FOOTER,
          ...res,
          links: res?.links || DEFAULT_LINKS,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch footer:", err);
        setData(DEFAULT_FOOTER);
      });
  }, [API_BASE]);

  return (
    <footer className="border-primary py-8 text-white">
      <div className="bg-gray-800 py-8 mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Contact */}
        <div className="space-y-6">
          <img
            src={data.logo ? `${API_BASE}/uploads/${data.logo}` : "/logo1.png"}
            alt="Footer Logo"
            className="w-32 h-auto"
          />
          <div className="space-y-2 text-lg">
            <p dangerouslySetInnerHTML={{ __html: data.address }} />
            <p>Phone: {data.phone}</p>
            <p>Email: {data.email}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-semibold text-xl text-primary">Quick Links</h4>
          <ul className="space-y-2 text-lg">
            <li><Link to={data.links.home}>Home</Link></li>
            <li><Link to={data.links.about}>About</Link></li>
            <li><Link to={data.links.packages}>Packages</Link></li>
            <li><Link to={data.links.services}>Services</Link></li>
            <li><Link to={data.links.contact}>Contact</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="space-y-4">
          <h4 className="font-semibold text-xl text-primary">Policies</h4>
          <ul className="space-y-2 text-lg">
            <li><Link to="/policy">Privacy Policy</Link></li>
            <li><Link to="/policy">Cancellation Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-4 mx-8 md:text-right">
          <h4 className="font-semibold text-xl text-primary">Follow Us</h4>

          <div className="flex flex-col md:items-end space-y-2">
            {data.facebook && (
              <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Facebook className="w-5 h-5 text-[#1877F2]" /> Facebook
              </a>
            )}
            {data.instagram && (
              <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-[#E4405F]" /> Instagram
              </a>
            )}
            {data.youtube && (
              <a href={data.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-[#FF0000]" /> YouTube
              </a>
            )}
          </div>

          <div className="pt-6 flex md:justify-end items-center gap-2 text-gray-400 text-lg">
            <span>Developed by</span>
            <img
              src={Logo}
              alt="Zenelait"
              className="w-28 opacity-80 rounded-xl bg-white"
            />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-4 pt-4 bg-white text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Goa Yatra Holiday. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
