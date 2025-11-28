// Import hooks and components for authentication handling
import { useUserInfoQuery } from "../../features/account/accountApi"; // Hook to fetch current user info
import { Navigate, Outlet, useLocation } from "react-router"; // React Router components

// RequireAuth component ensures that only authenticated users can access certain routes
export default function RequireAuth() {
  // Fetch user data and loading state
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation(); // Get current route location

  // Display a loading message while fetching user info
  if (isLoading) return <div>Loading...</div>;

  // If no user is logged in, redirect to login page and preserve attempted URL in state
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Define routes that require Admin role
  const adminRoutes = ["/inventory", "/admin-dashboard"];

  // If user tries to access an admin route but is not an Admin, redirect to homepage
  if (adminRoutes.includes(location.pathname) && !user.role.includes("Admin")) {
    return <Navigate to='/' replace />;
  }

  // If user is authenticated (and authorized for admin routes if applicable), render child routes
  return <Outlet />;
}
