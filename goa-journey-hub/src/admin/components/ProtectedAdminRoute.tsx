// frontend/src/admin/components/ProtectedAdminRoute.tsx
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedAdminRoute = ({ children }: Props) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  if (!token) return <Navigate to="/admin/login" replace />;
  return children; // DO NOT wrap AdminLayout here
};

export default ProtectedAdminRoute;
