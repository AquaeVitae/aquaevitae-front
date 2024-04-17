import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Product } from "@/lib/types";

import { Dispatch, SetStateAction } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";

interface SelectedProductProps {
  selectedProduct: Product;
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
}

export default function SelectedProduct({
  selectedProduct,
  setSelectedProduct,
}: SelectedProductProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  console.log(isDesktop);

  return (
    <Sheet
      open={!!selectedProduct}
      onOpenChange={() => setSelectedProduct(null)}
    >
      {isDesktop ? (
        <SheetContent side="right">
          <SheetHeader className="mb-6">
            <div className="flex h-full flex-row gap-4">
              <img
                alt={`${selectedProduct.name} thumbnail`}
                className="aspect-square w-1/3 overflow-hidden rounded-md object-cover"
                src={selectedProduct.image}
              />
              {/* TODO: Add badge if you want look at line 36 of productCard */}
              <div className="h-full w-2/3 space-y-2">
                <div className="flex w-full space-x-2">
                  {selectedProduct.skin_needs.map((need, index) => (
                    <Badge
                      key={index}
                      className="bg-primary/75 text-xs uppercase transition-all duration-300 ease-in-out hover:bg-primary"
                    >
                      {need.verbose_name}
                    </Badge>
                  ))}
                </div>
                <div className="flex h-full flex-col justify-between">
                  <div className="mb-12">
                    <SheetTitle className="text-2xl">
                      {selectedProduct.name}
                    </SheetTitle>
                    <SheetDescription>
                      {selectedProduct.characteristics}
                    </SheetDescription>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex">
                      {selectedProduct.price !== null && (
                        <p className="mr-4 text-lg font-bold text-muted-foreground">
                          {new Intl.NumberFormat("pt-PT", {
                            style: "currency",
                            currency: "EUR",
                          }).format(selectedProduct.price)}
                        </p>
                      )}
                      <p className="text-lg lowercase">
                        {selectedProduct.size} {selectedProduct.size_type}
                      </p>
                    </div>
                    <Button
                      Icon={() => <Link size={12} />}
                      size="sm"
                      variant="expandIcon"
                      iconPlacement="left"
                      onClick={() => window.open(selectedProduct.url, "_blank")}
                    >
                      Ir para loja
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetHeader>
          <Accordion type="single" collapsible>
            <AccordionItem value="recommended_use">
              <AccordionTrigger>Uso Recomendado</AccordionTrigger>
              <AccordionContent>
                <p className="text-base">{selectedProduct.recommended_use}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="contraindications">
              <AccordionTrigger>Contraindicações</AccordionTrigger>
              <AccordionContent>
                <p className="text-base">{selectedProduct.contraindications}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="other-infos">
              <AccordionTrigger>Outras Informações</AccordionTrigger>
              <AccordionContent>
                <p className="text-base">
                  {selectedProduct.type.verbose_name} -{" "}
                  {selectedProduct.category.verbose_name}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ingredients">
              <AccordionTrigger>Ingredientes</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2">
                  <ul className="list-none text-xs">
                    {selectedProduct.ingredients
                      .slice(
                        0,
                        Math.ceil(selectedProduct.ingredients.length / 2),
                      )
                      .map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                  </ul>
                  <ul className="list-none text-xs">
                    {selectedProduct.ingredients
                      .slice(
                        Math.ceil(selectedProduct.ingredients.length / 2),
                        selectedProduct.ingredients.length,
                      )
                      .map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      ) : (
        <SheetContent side="bottom">
          <SheetHeader className="mb-6">
            <div className="flex h-full flex-row gap-4">
              <img
                alt={`${selectedProduct.name} thumbnail`}
                className="aspect-square w-1/2 overflow-hidden rounded-md object-cover"
                src={selectedProduct.image}
              />
              {/* TODO: Add badge if you want look at line 36 of productCard */}
              <div className="h-full w-1/2 space-y-2">
                <div className="flex h-full flex-col justify-between text-left">
                  <div className="">
                    <SheetTitle className="text-xl">
                      {selectedProduct.name} {selectedProduct.size}
                      {selectedProduct.size_type.toLowerCase()}
                    </SheetTitle>
                    <SheetDescription className="text-xs">
                      {selectedProduct.characteristics}
                    </SheetDescription>
                  </div>
                  <div className="mt-2 flex w-full flex-row items-center justify-between">
                    <div className="flex">
                      {selectedProduct.price !== null && (
                        <p className="text-md mr-4 font-bold text-muted-foreground">
                          {new Intl.NumberFormat("pt-PT", {
                            style: "currency",
                            currency: "EUR",
                          }).format(selectedProduct.price)}
                        </p>
                      )}
                    </div>
                    <Button
                      className="w-full"
                      Icon={() => <Link size={12} />}
                      size="sm"
                      variant="shine"
                      iconPlacement="left"
                      onClick={() => window.open(selectedProduct.url, "_blank")}
                    >
                      Ir para loja
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetHeader>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-baseline gap-2">
              {selectedProduct.skin_needs.map((need, index) => (
                <Badge
                  key={index}
                  className="bg-primary/75 text-xs uppercase transition-all duration-300 ease-in-out hover:bg-primary"
                >
                  {need.verbose_name}
                </Badge>
              ))}
            </div>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="recommended_use">
              <AccordionTrigger className="text-sm">
                Uso Recomendado
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">{selectedProduct.recommended_use}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="contraindications">
              <AccordionTrigger className="text-sm">
                Contraindicações
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">{selectedProduct.contraindications}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="text-sm" value="other-infos">
              <AccordionTrigger>Outras Informações</AccordionTrigger>
              <AccordionContent className="text-sm">
                <p className="text-sm">
                  {selectedProduct.type.verbose_name} -{" "}
                  {selectedProduct.category.verbose_name}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-sm">
                Ingredientes
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2">
                  <ul className="list-none text-xs">
                    {selectedProduct.ingredients
                      .slice(
                        0,
                        Math.ceil(selectedProduct.ingredients.length / 2),
                      )
                      .map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                  </ul>
                  <ul className="list-none text-xs">
                    {selectedProduct.ingredients
                      .slice(
                        Math.ceil(selectedProduct.ingredients.length / 2),
                        selectedProduct.ingredients.length,
                      )
                      .map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
}
