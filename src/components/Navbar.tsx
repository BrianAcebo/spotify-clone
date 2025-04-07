import Logo from "./ui/Logo";
import { GoHome, GoDownload, GoBell } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import Tooltip from "./ui/Tooltip";
import Searchbar from "./Searchbar";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  // Set CSS variable of navbar's height
  useEffect(() => {
    const waitForFooter = () => {
      const el = navbarRef.current;
      if (!el) {
        requestAnimationFrame(waitForFooter);
        return;
      }

      const updateHeight = () => {
        const height = el.offsetHeight;
        document.documentElement.style.setProperty("--navbar-height", `${height}px`);
      };

      updateHeight();

      const observer = new ResizeObserver(updateHeight);
      observer.observe(el);

      window.addEventListener("load", updateHeight);

      return () => {
        observer.disconnect();
        window.removeEventListener("load", updateHeight);
      };
    };

    waitForFooter();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header ref={navbarRef} role="banner" className="shrink-0 py-2">
      <div className="relative z-50 flex w-full items-center justify-between gap-2">
        <a href="https://spotify.com" target="_blank" className="py-2 sm:px-5">
          <Logo className="size-8" />
        </a>

        <div className="right-0 left-0 mx-auto flex w-4/5 max-w-lg items-stretch gap-2 sm:w-3/5 lg:absolute">
          <Tooltip position="bottom" text="Home" className="hidden sm:flex">
            <button
              title="home"
              className="bg-brand-black-500 group flex min-w-12 cursor-pointer items-center justify-center rounded-full p-2"
              aria-label="Go to home"
            >
              <GoHome className="size-7 text-gray-400 transition-colors group-hover:text-white"></GoHome>
            </button>
          </Tooltip>

          <Searchbar />
        </div>

        <div className="bg-brand-black-500 absolute right-2 -bottom-full hidden w-fit flex-col-reverse items-center justify-end gap-0 rounded-md p-1.5 py-3 shadow sm:static sm:flex sm:w-1/4 sm:min-w-60 sm:flex-row sm:gap-10 sm:bg-transparent sm:p-0 sm:shadow-none">
          <button className="group hidden cursor-pointer items-center gap-2 transition-all hover:scale-105 sm:flex">
            <GoDownload className="size-4 text-gray-400 transition-colors group-hover:text-white" />
            <p className="font-outfit text-sm font-semibold text-gray-400 transition-colors group-hover:text-white">
              Install App
            </p>
          </button>

          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Tooltip position="bottom" text="What's New" className="group h-full">
              <button
                title="What's new"
                className="flex h-full cursor-pointer"
                aria-label="Turn on notifications"
              >
                <GoBell className="size-5 text-gray-300 transition-all group-hover:scale-105 group-hover:text-white lg:size-4.5"></GoBell>
              </button>
            </Tooltip>

            <Tooltip position="bottomRight" text="Checkout my portfolio" className="group h-full">
              <a
                title="Checkout my portfolio"
                className="sm:bg-brand-black-500 bg-brand-black-500 flex h-full cursor-pointer rounded-full p-2 transition-all group-hover:scale-105"
                aria-label="Checkout my portfolio"
                href="https://brianacebo.com"
                target="_blank"
              >
                <div className="bg-brand-orange shadow-brand-black-700 flex size-6 items-center justify-center rounded-full p-2 shadow sm:size-8">
                  <p className="text-brand-black-700 text-xs font-semibold sm:text-sm">B</p>
                </div>
              </a>
            </Tooltip>
          </div>
        </div>

        <button onClick={toggleMenu} className="block cursor-pointer sm:hidden">
          <IoSettingsOutline className="size-5 text-gray-400" />
        </button>

        {/* Mobile settings dropdown */}
        <div
          className={`${isOpen ? "flex" : "hidden"} bg-brand-black-500 absolute right-2 -bottom-[calc(100%+20px)] w-fit flex-col-reverse items-center justify-end gap-0 rounded-md p-1.5 py-3 shadow transition-all`}
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <GoBell className="size-5 cursor-pointer text-gray-300 transition-all hover:scale-105 hover:text-white"></GoBell>

            <a
              title="Checkout my portfolio"
              className="sm:bg-brand-black-500 bg-brand-black-500 flex h-full cursor-pointer rounded-full p-2 transition-all hover:scale-105"
              aria-label="Checkout my portfolio"
              href="https://brianacebo.com"
              target="_blank"
            >
              <div className="bg-brand-orange flex size-6 items-center justify-center rounded-full p-2 sm:size-8">
                <p className="text-brand-black-700 text-xs font-semibold sm:text-sm">B</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
