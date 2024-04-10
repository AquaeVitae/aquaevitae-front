import { Link } from "@tanstack/react-router";

import { PackageSearch, SquarePen, Handshake } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border border-white/75 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-5 py-2">
        <Link to="/" className="flex items-center space-x-2">
          <img className="size-6" src="/logo.png" alt="Dermaform Logo" />
          <h1 className="text-1xl font-bold">Aquaevitae Care Plan</h1>
        </Link>
        <div className="flex space-x-6 md:space-x-6">
          <Link
            to="/products"
            className="flex flex-row items-center text-sm font-medium text-secondary-foreground transition-colors hover:text-muted-foreground"
          >
            <PackageSearch className="mr-0 h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">Produtos</span>
          </Link>
          <Link
            to="/form"
            className="flex flex-row items-center text-sm font-medium text-secondary-foreground transition-colors hover:text-muted-foreground"
          >
            <SquarePen className="mr-0 h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">Formulário</span>
          </Link>
          <Link
            to="/partnerships"
            className="flex flex-row items-center text-sm font-medium text-secondary-foreground transition-colors hover:text-muted-foreground"
          >
            <Handshake className="mr-0 h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">Parceria</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
