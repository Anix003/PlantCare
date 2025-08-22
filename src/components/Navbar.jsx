'use client';

import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Code, Hash, Menu, Settings, User, X } from 'lucide-react';
import { Button } from './ui/button';
import Swal from 'sweetalert2';

const Navbar = ({ className }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState((status === "authenticated"))
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userImage, setUserImage] = useState("");
  const pathName = usePathname();
  const [doHide, setDoHide] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle sign out with confirmation
  const handleSignOut = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to sign out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
      }
    });
  };

  const menu = [
    {
      name: "dashboard",
      path: "/dashboard",
      icon: <Hash className="w-5 h-5" />,
    },
    {
      name: "settings",
      path: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      name: "profile",
      path: "/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "playground",
      path: "/playground",
      icon: <Code className="w-5 h-5" />,
    }
  ];

  const NavLink = ({ href, active, children, onClick }) => {
    return (
      <Link
        href={href}
        onClick={onClick}
      >
        <Button
          variant="outline"
          size="sm"
          className={`text-gray-600 hover:text-gray-900 capitalize ${active ? "bg-gray-100 text-black border-b-4" : ""}`}
        >
          {children}
        </Button>
      </Link>
    );
  };

  const MobileNavLink = ({ href, active, children, onClick }) => {
    return (
      <Link
        href={href}
        onClick={onClick}
      >
        <div className={`flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-gray-100 ${active ? "bg-gray-100 border-b-4 text-black" : ""}`}>
          {children}
        </div>
      </Link>
    );
  };

  // Toggle hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigate and close menu
  const navigateTo = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    (status == "authenticated") ? setAuth(true) : setAuth(false);
    // pathName.startsWith("/login") || pathName.startsWith("/signup") || pathName.startsWith("/forgot-password") ? setDoHide(true) : setDoHide(false);
  }, [status, auth]);

  useEffect(() => {
    if (status === "authenticated") {
      setUserEmail(session.user.email);
      setUserFullName(session.user.fullName || session.user.email);
      setUserImage(session.user.image || '');
    }
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status, session]);

  return (
    <nav className={`bg-white border-b border-gray-200 ${className}
      ${(pathName.startsWith("/login") || pathName.startsWith("/signup") || pathName.startsWith("/forgot-password") || pathName.startsWith("/editor")) ? 'hidden' : 'block'}`
    }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Hash className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {auth ? pathName.startsWith("/dashboard") ? `Haritra Dashboard` : `Haritra` : `haritra-ai`}
              </h1>
            </div>
            {false && auth && <div className="hidden md:block ml-10 space-x-4">
              {menu.map((item) => (
                <Button
                  key={item.name}
                  onClick={() => navigateTo(item.path)}
                  variant="outline"
                  size="sm"
                >
                  {item.icon}
                  {item.name}
                </Button>
              ))}
            </div>}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {auth && (
              <div className="flex items-center space-x-4">
                {menu.map((item) => (
                  <NavLink href={item.path} key={item.name} active={pathname === item.path}>
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {auth ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 font-medium capitalize">
                    {userFullName || userEmail}
                  </span>
                  {userImage ? (
                    <Image
                      className="h-8 w-8 rounded-full ring-2 ring-blue-200"
                      src={userImage}
                      alt="Profile"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 uppercase font-semibold">
                        {userFullName && Array.from(userFullName.split(' ')).map((word, index) => (
                          word[0] || ''
                        )).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="destructive"
                  size="sm"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => router.push("/login")}
                  variant="outline"
                  size="sm"
                >
                  Sign in
                </Button>
              </div>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <div className="flex items-center md:hidden">
            {auth ? <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
              : <Button
                onClick={() => navigateTo("/login")}
                variant="default"
                size="sm"
                className="w-full"
              >
                Sign in
              </Button>}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg absolute top-16 left-0 w-full z-50 border-b border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {auth && menu.map((item) => (
              <MobileNavLink
                href={item.path} 
                key={item.name} 
                active={pathname === item.path}
              >
                {item.icon}
                <span className="text-gray-700 font-medium">{item.name}</span>
              </MobileNavLink>
            ))}

            {auth && (
              <div className="pt-4 border-t border-gray-200 mt-4">
                <div className="flex items-center space-x-3 px-2 mb-3">
                  {userImage ? (
                    <Image
                      className="h-8 w-8 rounded-full ring-2 ring-blue-200"
                      src={userImage}
                      alt="Profile"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 uppercase font-semibold">
                        {userFullName && Array.from(userFullName.split(' ')).map((word, index) => (
                          word[0] || ''
                        )).join('')}
                      </span>
                    </div>
                  )}
                  <span className="text-gray-700 font-medium capitalize truncate">
                    {userFullName || userEmail}
                  </span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="destructive"
                  size="sm"
                  className="w-full"
                >
                  Sign out
                </Button>
              </div>
            )}

            {!auth && (
              <Button
                onClick={() => navigateTo("/login")}
                variant="default"
                size="sm"
                className="w-full"
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;