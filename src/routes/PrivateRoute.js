import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ role }) => {
  const { user } = useAuth();
  // Cek apakah pengguna sudah login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Jika membutuhkan role tertentu, validasi role
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
