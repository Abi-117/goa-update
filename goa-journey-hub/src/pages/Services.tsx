import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground text-center uppercase tracking-wider mb-12">
            Services
          </h2>

          {/* Swiper Slider */}
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {services.map((service: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="bg-card rounded-xl overflow-hidden shadow-elegant border border-border h-full">
                  <div className="relative h-56">
                    <img
                      src={
                        service.image
                          ? `http://localhost:5000/uploads/${service.image}`
                          : "/placeholder.jpg"
                      }
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-3">
                      {service.title}
                    </h3>

                    {service.timing && (
                      <p className="text-muted-foreground mb-4">
                        Timing: {service.timing}
                      </p>
                    )}

                    <ul className="space-y-2 text-sm text-foreground/90">
                      {service.items?.map((item: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary">•</span> {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className="btn-hero mt-5 inline-flex items-center gap-2"
                    >
                      Book Now <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
