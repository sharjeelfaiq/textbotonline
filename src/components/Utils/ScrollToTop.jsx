"use client";

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
      <button
        type="button"
        onClick={goToTop}
        className={[
          "fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg",
          "transition-all duration-normal ease-out motion-reduce:transition-none",
          "hover:bg-sky-700 hover:-translate-y-px active:translate-y-0",
          "focus-visible:ring-2 focus-visible:ring-sky-400",
          "dark:bg-sky-500 dark:hover:bg-sky-400",
          showTopBtn
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-2",
        ].join(" ")}
        aria-label="Scroll to top"
        title="Scroll to top"
        tabIndex={showTopBtn ? 0 : -1}
      >
        <FaAngleUp className="text-lg" aria-hidden="true" />
      </button>
    </div>
  );
};
export default ScrollToTop;
