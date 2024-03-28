import { Link } from "@tanstack/react-router";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky bottom-0 z-50 w-full border-t border-white/75 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex max-w-screen-2xl items-end justify-between py-8 text-xs text-secondary-foreground  md:text-sm">
        <div className="flex flex-row gap-2">
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
