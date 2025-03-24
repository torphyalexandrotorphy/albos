import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine base route based on current path
  const getBaseRoute = () => {
    if (location.pathname.startsWith("/bank")) {
      return "/bank";
    } else if (location.pathname.startsWith("/admin")) {
      return "/admin";
    }
    return "/";
  };

  useEffect(() => {
    // Show button when user scrolls down
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Navigate to the base route (dashboard)
    navigate(getBaseRoute());

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg transition-opacity duration-300 hover:bg-primary/90 md:bottom-6 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}
