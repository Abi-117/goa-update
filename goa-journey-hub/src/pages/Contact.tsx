import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import contactHero from "@/assets/contact-hero.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Phone must be 10 digits").max(15),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: any = {};
        error.errors.forEach(err => {
          if (err.path[0]) fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* HERO */}
      <section
        className="relative py-24 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${contactHero})` }}
      >
        <div className="absolute inset-0 bg-background/70" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <p className="text-primary font-semibold uppercase tracking-widest mb-4 text-sm md:text-base">
            Get Started Today!
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl title-italic font-bold text-foreground mb-8">
            Join Us and Discover More!
          </h1>
          <a href="#contact-form" className="btn-hero text-sm md:text-base px-6 py-3">
            Book Now
          </a>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact-form" className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">

            {/* CONTACT INFO */}
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground uppercase tracking-wider mb-6 md:mb-8">
                Contact Us
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-primary text-lg md:text-xl font-semibold uppercase tracking-wider mb-1 md:mb-2">
                      Address
                    </h4>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                      Goa Yatra <br />
                      RNR complex, office no.69, <br />
                      Arpora junction, Arpora Baga <br />
                      Goa - 403518.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-primary text-lg md:text-xl font-semibold uppercase mb-1 md:mb-2">
                      Phone
                    </h4>
                    <p className="text-muted-foreground text-base md:text-lg">
                      +91 7083471939
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-primary text-lg md:text-xl font-semibold uppercase mb-1 md:mb-2">
                      Email
                    </h4>
                    <p className="text-muted-foreground text-base md:text-lg">
                      goayatraholiday@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* MAP */}
              <div className="mt-8 aspect-video bg-card rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3843.548989575559!2d73.7620734751252!3d15.562290185046162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTXCsDMzJzQ0LjIiTiA3M8KwNDUnNTIuNyJF!5e0!3m2!1sen!2sin!4v1764830587031!5m2!1sen!2sin"
                  width="800"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </div>
            </div>

            {/* FORM */}
            <div className="bg-card p-6 md:p-8 rounded-xl border border-border">
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label className="block text-base md:text-lg mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${
                      errors.name ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-base md:text-lg mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${
                      errors.email ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-base md:text-lg mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${
                      errors.phone ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-base md:text-lg mb-2">Message *</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background border resize-none ${
                      errors.message ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Tell us about your travel plans..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-hero w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
