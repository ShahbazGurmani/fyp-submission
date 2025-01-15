import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top on route change
  }, [pathname]);

  return null; // This component does not render anything
};

export default ScrollTop;
