import { useUserInfoQuery } from "../../features/account/accountApi";
import { Navigate, Outlet, useLocation } from "react-router";

export default function RequireAuth() {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const adminRoutes = ["/inventory", "/admin-dashboard"];

  if (adminRoutes.includes(location.pathname) && !user.role.includes("Admin")) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
