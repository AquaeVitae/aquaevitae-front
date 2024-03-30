import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { SponsorsSlider } from "./-components/Sponsors";

export const Route = createFileRoute("/_layout/")({
  component: HomePageComponent,
});

function HomePageComponent() {
  return (
    <div className="mt-24 flex w-full flex-col items-center md:mt-48">
      <div className="mx-auto flex w-9/12 flex-col items-center justify-center gap-6 md:gap-10">
        <div className="flex flex-col items-center gap-1.5 text-center md:gap-3">
          <h1 className="font-display bg-gradient-to-b from-card via-primary-foreground to-primary-foreground bg-clip-text text-3xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-5xl">
            O que sua pele precisa?
          </h1>
          <p className="text-sm text-secondary-foreground md:text-base">
            Responda o formulário com suas características e receba uma lista de
            produtos personalizada
          </p>
        </div>
        <Button variant="ringHover" className="inline-block w-auto" asChild>
          <Link to="/form">Faça o teste</Link>
        </Button>
      </div>
      <div className="relative pt-16 md:pt-32">
        <SponsorsSlider />
      </div>
    </div>
  );
}
