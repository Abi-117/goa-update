import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Home";
import About from "./pages/About";
import Packages from "./pages/Packages";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Policies from "./pages/Policies.tsx";

// Admin pages
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import HomeEdit from "./admin/pages/HomeEdit";
import FooterEdit from "./admin/pages/FooterEdit";
import NavbarEdit from "./admin/pages/NavbarEdit";
import AboutEdit from "./admin/pages/AboutEdit";
import PackagesEdit from "./admin/pages/PackagesAdmin";
import GalleryService from "./admin/pages/GalleryUpload";
import ContactList from "./admin/pages/ContactList";
import ServicesList from "./admin/pages/ServicesList";
import AddService from "./admin/pages/AddService";
import EditService from "./admin/pages/EditService";
import ProtectedAdminRoute from "./admin/components/ProtectedAdminRoute";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

        <Routes>

          {/* USER WEBSITE PAGES */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policies/>}></Route>

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<Login />} />

          {/* ADMIN PROTECTED ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Dashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/home"
            element={
              <ProtectedAdminRoute>
                <HomeEdit />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/about"
            element={
              <ProtectedAdminRoute>
                <AboutEdit />
              </ProtectedAdminRoute>
            }
          />
          
        {/* ADMIN SERVICES CRUD */}
<Route
  path="/admin/services"
  element={
    <ProtectedAdminRoute>
      <ServicesList />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/services/add"
  element={
    <ProtectedAdminRoute>
      <AddService />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/services/edit/:id"
  element={
    <ProtectedAdminRoute>
      <EditService />
    </ProtectedAdminRoute>
  }
/>


          <Route
            path="/admin/packages"
            element={
              <ProtectedAdminRoute>
                <PackagesEdit />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/gallery"
            element={
              <ProtectedAdminRoute>
                <GalleryService />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/contact"
            element={
              <ProtectedAdminRoute>
                <ContactList />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/footer"
            element={
              <ProtectedAdminRoute>
                <FooterEdit />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/navbar"
            element={
              <ProtectedAdminRoute>
                <NavbarEdit />
              </ProtectedAdminRoute>
            }
          />
    
          {/* 404 PAGE */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
