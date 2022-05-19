import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./ScrollToTop.scss";
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function handleClick() {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }
  return (
    <div className="scroll-to-top-btn" onClick={(handleClick)}>
      <FontAwesomeIcon icon={faChevronUp} />
    </div>
  );
}
