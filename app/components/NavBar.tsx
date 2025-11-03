"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

function splitToChars(text: string) {
  return text.split("");
}

const containerVariants: Variants = {
  rest: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
  hover: {
    transition: { staggerChildren: 0.03, staggerDirection: 1 },
  },
};

const charVariants: Variants = {
  rest: { y: 0, opacity: 1 },
  hover: { y: -6, opacity: 0.9 },
};

function AnimatedLabel({ text }: { text: string }) {
  const chars = useMemo(() => splitToChars(text), [text]);
  return (
    <motion.span
      className="inline-flex"
      variants={containerVariants}
      initial="rest"
      whileHover="hover"
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          transition={{ type: "tween", duration: 0.2 }}
          className="inline-block"
        >
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function LogoSpinner() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <motion.svg
      style={{ rotate }}
      className="h-6 w-6 md:h-8 md:w-8 text-blue-600"
      viewBox="0 0 100 100"
      aria-label="Logo"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />
      <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
      <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
      <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
    </motion.svg>
  );
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/30 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-12 md:h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-3">
            <LogoSpinner />
            <span className="text-xs md:text-sm font-semibold tracking-wide text-gray-900">CreativeDev</span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu.Root className="hidden md:block">
            <NavigationMenu.List className="flex items-center gap-4 lg:gap-6">
              {menuItems.map((item) => (
                <NavigationMenu.Item key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <AnimatedLabel text={item.label} />
                  </Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.4 
        }}
        className="fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-2xl md:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <LogoSpinner />
              <span className="text-sm font-semibold tracking-wide text-gray-900">CreativeDev</span>
            </div>
            <motion.button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-5 w-5 text-gray-700" />
            </motion.button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0, 
                    x: isMenuOpen ? 0 : 20 
                  }}
                  transition={{ 
                    delay: isMenuOpen ? index * 0.1 + 0.2 : 0,
                    duration: 0.3 
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0, 
              y: isMenuOpen ? 0 : 20 
            }}
            transition={{ 
              delay: isMenuOpen ? 0.6 : 0,
              duration: 0.3 
            }}
            className="p-4 border-t border-gray-200"
          >
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Ready to work together?</p>
              <Link
                href="#contact"
                onClick={closeMenu}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}