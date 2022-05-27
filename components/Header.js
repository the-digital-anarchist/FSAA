/* eslint-disable multiline-ternary */
import { useEffect, useRef } from "react";
import Link from "next/link";
import BLOG from "@/blog.config";
import { useLocale } from "@/lib/locale";

const NavBar = () => {
  const locale = useLocale();
  const links = [
    // { id: 0, name: locale.NAV.INDEX, to: BLOG.path || "/", show: true },
    { id: 0, name: locale.NAV.INDEX, to: "/blog", show: true },
    { id: 1, name: locale.NAV.ABOUT, to: "/about", show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: "/feed", show: true },
    { id: 3, name: locale.NAV.SEARCH, to: "/search", show: true },
  ];
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef(null);
  const sentinalRef = useRef([]);
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add("sticky-nav-full");
      } else {
        navRef.current?.classList.remove("sticky-nav-full");
      }
    } else {
      navRef.current?.classList.add("remove-sticky");
    }
  };
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler);
    obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef]);
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? "max-w-5xl px-4" : "px-4 md:px-24"
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 720 712"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <path fill="#000" d="M-431-211h1603V904H-431z" />
                    <path fill="#DA121A" d="M-431-211h1603L-431 904z" />
                    <path
                      d="m516.427-258.728 235.74 336.671-776.556 543.75-235.74-336.67z"
                      fill="#DA121A"
                    />
                    <g
                      fill="#000"
                      fillRule="nonzero"
                      stroke="#FFF"
                      strokeWidth="16"
                    >
                      <path d="m309.11 442.61-40.5 40.5m0-40.5 40.5 40.5M389.933 442.61l-40.5 40.5m0-40.5 40.5 40.5M470.755 442.61l-40.5 40.5m0-40.5 40.5 40.5" />
                    </g>
                    <path
                      d="M369 18C187.501 18 39 166.501 39 348s148.501 330 330 330 330-148.501 330-330S550.499 18 369 18Zm43.248 75.214c123.266 20.713 216.24 126.925 216.24 256.135 0 47.978-12.832 92.778-35.26 131.215l-180.98-387.35Zm-86.496 0L144.74 480.564c-22.409-38.431-35.226-83.216-35.226-131.168 0-129.205 92.967-235.427 216.24-256.182Zm44.19 71.453 83.673 178.632h-167.35l83.677-178.632ZM251.84 413.812h232.414l58.678 126.135c-45.977 42.02-107.256 67.54-174.845 67.54-67.615 0-128.918-25.545-174.899-67.594l58.652-126.081Z"
                      fill="#FFF"
                      fillRule="nonzero"
                    />
                  </g>
                </svg>
              </div>
            </a>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name heading">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name heading">
              {BLOG.title}{" "}
              <span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
