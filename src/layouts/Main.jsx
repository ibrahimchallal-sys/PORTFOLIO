import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/navbar/NavBar";
import Footer from "../components/ui/footer/Footer";
import ScrollToTop from "../components/ui/scrollToTop/ScrollToTop";

const Main = () => {
  return (
    <div data-theme={"light"} className="relative">
      <NavBar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Main;