import { Link } from "@tanstack/react-router";

import { PackageSearch, SquarePen, Handshake } from "lucide-react";

function Header() {
  return (
    <header className="border-border70 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-8 py-2">
        <Link to="/" className="flex items-center space-x-2">
          <img
            className="h-6 w-6"
            src="./src/assets/logo.png"
            alt="Dermaform Logo"
          />
          <h1 className="text-1xl font-bold">Dermaform</h1>
        </Link>
        <div className="flex space-x-4 md:space-x-6">
          <Link
            to="/products"
            className="flex flex-row items-center text-sm font-medium text-secondary-foreground transition-colors hover:text-muted-foreground"
          >
            <PackageSearch className="mr-2 h-5 w-5" />
            <span className="hidden md:inline">Produtos</span>
          </Link>
          <Link
            to="/form"
            className="flex flex-row items-center text-sm font-medium text-secondary-foreground transition-colors hover:text-muted-foreground"
          >
            <SquarePen className="mr-2 h-5 w-5" />
            <span className="hidden md:inline">Formulário</span>
          </Link>
          <Link
            to="/about"
            className="flex flex-row items-center text-sm font-medium text-secondary-foreground transition-colors hover:text-muted-foreground"
          >
            <Handshake className="mr-2 h-5 w-5" />
            <span className="hidden md:inline">Parceria</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
