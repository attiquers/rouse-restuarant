"use client";

import { useState } from "react";
import Image from "/vite.svg";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" to="/">
              <span className="hidden font-bold sm:inline-block">ACME</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/about">About</Link>
              <Link to="/products">Products</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-14 items-center">
            <button
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
              onClick={toggleMenu}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close Menu</span>
            </button>
          </div>
          <nav className="container grid gap-6 p-6 text-lg font-medium">
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/products" onClick={toggleMenu}>
              Products
            </Link>
            <Link to="/contact" onClick={toggleMenu}>
              Contact
            </Link>
          </nav>
        </div>
      )}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Our Amazing Product
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                  Discover how we can transform your experience with
                  cutting-edge technology.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl pt-8 md:pt-12 lg:pt-16">
              <img
                src="/vite.svg"
                alt="Product showcase"
                className="aspect-[16/9] overflow-hidden rounded-xl object-cover"
                width={1920}
                height={1080}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
