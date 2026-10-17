import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminProtectedRoute = () => {
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(true);

  // useEffect(() => {
  //   async function checkAdmin() {
  //     try {
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_SERVER_URI}/admin/me`,
  //         { withCredentials: true }
  //       );
        
  //       if (res.data.success) {
  //         setAuthorized(true);
          
  //       }
  //     } catch(err) {
  //       setAuthorized(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   checkAdmin();
  // }, [authorized]);

  if (loading) return null; // or loader

  return authorized ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
