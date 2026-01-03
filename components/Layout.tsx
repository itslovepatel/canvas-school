import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import { Button } from './ui';
import { SCHOOL_NAME, SCHOOL_PHONE, SCHOOL_EMAIL, SCHOOL_ADDRESS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
             {/* Logo Representation - Mimicking the Pink Splash with Yellow Text */}
            <div className="relative h-12 flex items-center justify-center bg-brand-pink text-brand-yellow font-heading font-extrabold px-3 py-1 rounded-sm transform skew-x-[-10deg] shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-xl md:text-2xl transform skew-x-[10deg] tracking-wide">CANWAS</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-bold text-sm md:text-base leading-tight ${scrolled ? 'text-slate-800' : 'text-slate-800'}`}>
                PUBLIC
              </span>
              <span className="text-[0.6rem] tracking-wider uppercase font-bold text-brand-pink">School</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-semibold text-base transition-colors duration-200 ${isActive ? 'text-brand-pink' : 'text-slate-600 hover:text-brand-blue'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Button to="/contact" variant="primary" className="!py-2 !px-5 text-sm">
              Book a Visit
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden fixed inset-x-0 top-[60px] bg-white shadow-lg transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 text-base font-semibold rounded-md w-full text-center ${isActive ? 'bg-brand-pink/10 text-brand-pink' : 'text-slate-600 hover:bg-slate-50'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 w-full max-w-xs">
            <Button to="/contact" variant="primary" className="w-full justify-center">
              Book a Visit
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="bg-brand-pink text-brand-yellow font-heading font-bold px-2 py-1 rounded-sm transform skew-x-[-10deg]">
                  <span className="transform skew-x-[10deg]">CANWAS</span>
               </div>
               <span className="font-heading font-bold text-xl">PUBLIC SCHOOL</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nurturing little minds with care, creativity, and joy. Join us to give your child the best start.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-blue transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-pink transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-brand-yellow">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/programs" className="hover:text-white transition-colors">Programs</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-brand-mint">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-brand-mint shrink-0 mt-0.5" />
                <span>{SCHOOL_ADDRESS}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-brand-mint shrink-0" />
                <span>{SCHOOL_PHONE}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-brand-mint shrink-0" />
                <span>{SCHOOL_EMAIL}</span>
              </li>
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-brand-blue">School Hours</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>8:30 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 12:00 PM</span>
              </li>
              <li className="flex justify-between text-slate-500">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {SCHOOL_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center"
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};

export const StickyMobileCTA: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-4 z-40 flex justify-between items-center gap-4">
      <div className="flex flex-col">
        <span className="text-xs text-slate-500 font-bold">Admissions Open</span>
        <span className="text-sm font-bold text-slate-800">2024-25 Session</span>
      </div>
      <Button to="/contact" variant="primary" className="flex-1 py-2 text-sm shadow-none">
        Book a Visit
      </Button>
    </div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyMobileCTA />
    </div>
  );
};