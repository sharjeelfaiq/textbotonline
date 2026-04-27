import { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div aria-hidden={!showTopBtn}>
      {showTopBtn && (
        <button
          type="button"
          onClick={goToTop}
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg transition hover:bg-sky-700 focus-visible:ring-2 focus-visible:ring-sky-400 dark:bg-sky-500 dark:hover:bg-sky-400"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <FaAngleUp className="text-lg" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
export default ScrollToTop;
