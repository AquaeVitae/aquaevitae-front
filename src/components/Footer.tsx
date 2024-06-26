import { Link } from "@tanstack/react-router";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-1 bottom-0 w-full border-t border-white/75 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex max-w-screen-2xl items-end justify-between px-6 py-6 text-xs text-secondary-foreground md:text-sm">
        <div className="flex flex-col gap-0 md:flex-row md:gap-2">
          <Link
            className="font-bold"
            to="https://aquaevitae.pt/"
            target="_blank"
          >
            AQUAVITAE
          </Link>
          <p>Água Termal como Fonte de Vida e Saúde</p>
        </div>
        <div>
          <p className="float-right">© {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
