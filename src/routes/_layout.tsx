import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

export function LayoutComponent() {
  return (
    <AuroraBackground>
      <Header />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1,
          ease: "easeInOut",
        }}
        className="relative flex h-full w-full flex-col items-center justify-center"
      >
        <Outlet />
      </motion.div>
      <Footer />
    </AuroraBackground>
  );
}
