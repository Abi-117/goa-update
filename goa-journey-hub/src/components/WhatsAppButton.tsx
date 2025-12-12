import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "7083471939";
  const message = encodeURIComponent("Hello! I'm interested in your travel packages.");
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-foreground fill-foreground" />
    </a>
  );
};

export default WhatsAppButton;
