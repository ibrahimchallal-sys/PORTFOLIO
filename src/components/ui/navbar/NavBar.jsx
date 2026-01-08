import { useEffect, useState, useRef } from "react";
import { Link } from "react-scroll";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

const NavBar = () => {
  const { t } = useTranslation();
  const [position, setPosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add fade-in animation when component mounts
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 1, name: t('navbar.home'), url: "introduction" },
    { id: 2, name: t('navbar.about'), url: "profile" },
    { id: 3, name: t('navbar.process'), url: "work-process" },
    { id: 4, name: t('navbar.portfolio'), url: "portfolio" },
    { id: 5, name: t('navbar.services'), url: "services" },
  ];

  const handleMenuClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div
      ref={navRef}
      className={`sticky top-0 w-full ${
        position > 50
          ? "bg-soft-white border-b border-gray-300"
          : "bg-white border-white"
      } z-50 transition-all duration-1000`}
    >
      <div className="navbar flex justify-between mx-auto content w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Mobile menu button */}
          <div className="dropdown lg:hidden">
            <button 
              tabIndex={0} 
              className="btn btn-ghost lg:hidden focus:outline-none"
              aria-label="Menu"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"}
                />
              </svg>
            </button>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className={`menu menu-lg dropdown-content rounded-box z-1 mt-3 p-2 shadow font-semibold flex flex-col bg-white text-black absolute left-4 right-4 top-16`}
              >
                {navItems.map((item) => (
                  <li key={item.id} onMouseDown={(e) => e.preventDefault()}>
                    <Link
                      onClick={() => {
                        handleMenuClick();
                        closeMenu();
                      }}
                      to={item.url}
                      smooth={false}
                      duration={0}
                      spy={true}
                      offset={-80}
                      activeClass="text-picto-primary font-bold underline"
                      className={`hover:text-picto-primary px-5 py-3 mx-1 cursor-pointer text-gray-900`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="mt-2">
                  <Link
                    onClick={() => {
                      handleMenuClick();
                      closeMenu();
                    }}
                    to={`contact`}
                    smooth={false}
                    duration={0}
                    offset={-80}
                    activeClass="text-picto-primary font-bold underline"
                    className="btn btn-primary w-full"
                  >
                    {t('navbar.contact')}
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Logo */}
          <Link
            to={`introduction`}
            smooth={false}
            duration={0}
            offset={-80}
            className="flex items-center border-0 cursor-pointer"
            onClick={closeMenu}
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-picto-primary text-white font-bold text-lg">
              IC
            </div>
            <p className="text-xl sm:text-2xl my-auto ms-3 font-semibold text-gray-900">
              Ibrahim challal
            </p>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center">
            <ul className="flex menu menu-horizontal text-[16px] font-medium md:shrink-0">
              {navItems.map((item) => (
                <li key={item.id} onMouseDown={(e) => e.preventDefault()}>
                  <Link
                    onClick={handleMenuClick}
                    to={item.url}
                    smooth={false}
                    duration={0}
                    spy={true}
                    offset={-80}
                    activeClass="text-picto-primary font-bold underline"
                    className={`hover:text-picto-primary px-4 py-3 mx-1 cursor-pointer`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li onMouseDown={(e) => e.preventDefault()}>
                <Link
                  onClick={handleMenuClick}
                  to={`contact`}
                  smooth={false}
                  duration={0}
                  offset={-80}
                  activeClass="text-picto-primary font-bold underline"
                  className={`hover:text-picto-primary px-4 py-3 mx-1 cursor-pointer`}
                >
                  {t('navbar.contact')}
                </Link>
              </li>
            </ul>
            <div className="ml-4 flex items-center space-x-4">
              <LanguageSwitcher />
              <Link
                className="btn btn-primary btn-sm md:btn-md"
                to={`contact`}
                smooth={false}
                duration={0}
                offset={-80}
                activeClass="text-picto-primary font-bold underline"
              >
                {t('navbar.contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;