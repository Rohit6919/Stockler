// Layout.jsx
import { useLocation } from 'react-router-dom';  // Import useLocation hook
import Header from "./src/components/Header";   // Adjust your import paths accordingly
import Footer from "./src/components/Footer";
import { Outlet } from 'react-router-dom';

function Layout() {
  const location = useLocation();  // Get the current route

  const isDashboardRoute = location.pathname === '/dashboard';

  return (
    <>
      {!isDashboardRoute && <Header />}
      <Outlet />
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default Layout;
