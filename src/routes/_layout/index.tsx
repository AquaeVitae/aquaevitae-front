import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { SponsorsSlider } from "./-components/Sponsors";

export const Route = createFileRoute("/_layout/")({
  component: HomePageComponent,
});

function HomePageComponent() {
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div className="flex h-[50vh] flex-col items-center justify-end gap-8">
        <div className="flex flex-col items-center">
          <h1 className="font-display bg-gradient-to-b from-card via-primary-foreground/75 to-primary-foreground bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-5xl md:leading-[5rem]">
            O que sua pele precisa?
          </h1>
        </div>
        <Button variant="ringHover" className="inline-block w-auto" asChild>
          <Link to="/form">
            Faça o teste agora e <b>descubra</b>
          </Link>
        </Button>
        <SponsorsSlider />
      </div>
    </div>
  );
}
