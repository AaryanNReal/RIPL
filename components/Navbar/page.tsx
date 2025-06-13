'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiHome, FiPackage, FiUser, FiMail } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Original color definitions
  const oakwood = '#C19A6B';
  const ashwood = '#E8E3D6';

  const navItems = [
    { href: '#home', label: 'Home', icon: FiHome, key: 'home' },
    { href: '#projects', label: 'Projects', icon: FiPackage, key: 'project' },
    { href: '#work', label: 'Services', icon: FiMail, key: 'work' },
    { href: '#about', label: 'About', icon: FiUser, key: 'about' },
    { href: '#contact', label: 'Contact', icon: FiMail, key: 'contact' },
    
];

  return (
    <>
      {/* Backdrop blur overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}
      
      <header 
        style={{
          background: scrolled 
            ? `rgba(232, 227, 214, 0.95)` // ashwood with transparency
            : `rgba(193, 154, 107, 0.95)`, // oakwood with transparency
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? `1px solid ${oakwood}20` : 'none',
          boxShadow: scrolled ? '0 8px 32px rgba(193, 154, 107, 0.1)' : 'none',
        }}
        className="fixed w-full z-50 transition-all duration-500 ease-out"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Brand Logo */}
            <Link 
              href="/" 
              className="relative group"
              style={{ 
                color: scrolled ? oakwood : ashwood,
              }}
            >
              <div className="flex items-center space-x-4">
                
                <div className="flex flex-col">
                  <span className="text-5xl font-black tracking-tight leading-none">RIPL</span>
                  <div 
                    className="h-1 rounded-full mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ 
                      background: `linear-gradient(90deg, ${scrolled ? oakwood : ashwood}, transparent)`
                    }}
                  />
                </div>
                <div 
                  className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle, ${scrolled ? oakwood : ashwood}30, transparent 70%)`
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation with floating effect */}
            <nav className="hidden md:flex items-center">
              <div 
                className="flex items-center space-x-2 p-2 rounded-2xl"
                style={{
                  background: scrolled 
                    ? `${oakwood}15` 
                    : `${ashwood}15`,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${scrolled ? oakwood : ashwood}20`,
                }}
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.key;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setActiveItem(item.key)}
                      className="relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group"
                      style={{
                        color: scrolled ? oakwood : ashwood,
                        background: isActive 
                          ? scrolled 
                            ? `${oakwood}20` 
                            : `${ashwood}20`
                          : 'transparent',
                      }}
                    >
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div 
                          className="absolute inset-0 rounded-xl border-2 opacity-50"
                          style={{ borderColor: scrolled ? oakwood : ashwood }}
                        />
                      )}
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        style={{ background: scrolled ? oakwood : ashwood }}
                      />
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Animated Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group"
              style={{
                color: scrolled ? oakwood : ashwood,
                background: scrolled 
                  ? `${oakwood}15` 
                  : `${ashwood}15`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${scrolled ? oakwood : ashwood}20`,
              }}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <FiMenu 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
                  }`} 
                />
                <FiX 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'
                  }`} 
                />
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div 
              className="py-6 px-4 mx-4 mb-4 rounded-2xl"
              style={{
                background: `rgba(232, 227, 214, 0.95)`, // ashwood
                backdropFilter: 'blur(20px)',
                border: `1px solid ${oakwood}20`,
                boxShadow: `0 20px 25px -5px rgba(193, 154, 107, 0.1), 0 10px 10px -5px rgba(193, 154, 107, 0.04)`,
              }}
            >
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.key);
                        toggleMenu();
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group hover:scale-105"
                      style={{
                        color: oakwood,
                        background: 'transparent',
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: oakwood,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: ashwood }} />
                      </div>
                      <span className="font-medium text-lg">{item.label}</span>
                      <div className="flex-1" />
                      <div 
                        className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: oakwood }}
                      />
                    </Link>
                  );
                })}
              </nav>
              
              {/* Decorative gradient line using original colors */}
              <div 
                className="mt-6 h-1 rounded-full mx-4"
                style={{
                  background: `linear-gradient(90deg, ${oakwood}, ${ashwood}, ${oakwood})`,
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}