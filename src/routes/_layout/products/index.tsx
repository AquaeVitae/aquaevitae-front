import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Product } from "@/lib/types";
import ProductCard from "./-components/ProductCard";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_layout/products/")({
  component: ProductsPage,
});

function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const response = {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        id: "1fe449cb-d10f-43ad-bb9d-4b858b461b6a",
        ingredients: [
          "Aqua (water)",
          "glycerin",
          "cetearyl octanoate",
          "caprilic-capric triglyceride",
          "glyceryl stearate",
          "cetyl alcohol",
          "urea",
          "aloe barbadensis (aloe vera extract)",
          "lanolin",
          "tocopheryl acetate",
          "allantoin",
          "triethanolamine",
          "sodium laurylsulphate",
          "sodium lauryl sulphosuccinate",
          "methylparaben",
          "potassium sorbate",
          "propylparaben",
          "propyl gallate",
          "BHA",
          "fragance (parfum)",
          "benzyl alcohol",
          "citral",
          "tree moss extract",
          "geraniol",
          "hexyl cinnamal",
          "limonene",
          "linalool",
        ],
        skin_types: [
          {
            code: 0,
            verbose_name: "All",
          },
        ],
        skin_needs: [
          {
            code: 17,
            verbose_name: "Feet",
          },
          {
            code: 3,
            verbose_name: "Hidrate",
          },
          {
            code: 4,
            verbose_name: "Nourish",
          },
        ],
        skin_solar_needs: [],
        image: "https://generated.vusercontent.net/placeholder.svg",
        score: 2.5,
        created_at: "2024-04-12T12:02:55.464829Z",
        updated_at: "2024-04-12T12:02:55.464856Z",
        is_deleted: false,
        name: "Creme Hidratante de Pés",
        size: 75.0,
        size_type: "Ml",
        characteristics:
          "Indicado para todos os tipos de pele, o Creme de Pés Hidratante com Água Termal Flaviense é excelente para manter os pés suaves e macios",
        recommended_use:
          "Aplicar de manhã e/ou à noite na pele previamente limpa e seca.",
        contraindications: "Uso externo.",
        price: 4.95,
        url: "https://loja.termasdechaves.com/produto/creme-de-pes-hidratante-75ml/",
        category: {
          code: "B",
          verbose_name: "Body",
        },
        type: {
          code: 8,
          verbose_name: "Cream",
        },
      },
      {
        id: "1fe449cb-d10f-43ad-bb9d-4b858b461b6a",
        ingredients: [
          "Aqua (water)",
          "glycerin",
          "cetearyl octanoate",
          "caprilic-capric triglyceride",
          "glyceryl stearate",
          "cetyl alcohol",
          "urea",
          "aloe barbadensis (aloe vera extract)",
          "lanolin",
          "tocopheryl acetate",
          "allantoin",
          "triethanolamine",
          "sodium laurylsulphate",
          "sodium lauryl sulphosuccinate",
          "methylparaben",
          "potassium sorbate",
          "propylparaben",
          "propyl gallate",
          "BHA",
          "fragance (parfum)",
          "benzyl alcohol",
          "citral",
          "tree moss extract",
          "geraniol",
          "hexyl cinnamal",
          "limonene",
          "linalool",
        ],
        skin_types: [
          {
            code: 0,
            verbose_name: "All",
          },
        ],
        skin_needs: [
          {
            code: 17,
            verbose_name: "Feet",
          },
          {
            code: 3,
            verbose_name: "Hidrate",
          },
          {
            code: 4,
            verbose_name: "Nourish",
          },
        ],
        skin_solar_needs: [],
        image: "https://generated.vusercontent.net/placeholder.svg",
        score: 2.0,
        created_at: "2024-04-12T12:02:55.464829Z",
        updated_at: "2024-04-12T12:02:55.464856Z",
        is_deleted: false,
        name: "Creme Hidratante de Pés",
        size: 75.0,
        size_type: "Ml",
        characteristics:
          "Indicado para todos os tipos de pele, o Creme de Pés Hidratante com Água Termal Flaviense é excelente para manter os pés suaves e macios",
        recommended_use:
          "Aplicar de manhã e/ou à noite na pele previamente limpa e seca.",
        contraindications: "Uso externo.",
        price: null,
        url: "https://loja.termasdechaves.com/produto/creme-de-pes-hidratante-75ml/",
        category: {
          code: "B",
          verbose_name: "Body",
        },
        type: {
          code: 8,
          verbose_name: "Cream",
        },
      },
      {
        id: "1fe449cb-d10f-43ad-bb9d-4b858b461b6a",
        ingredients: [
          "Aqua (water)",
          "glycerin",
          "cetearyl octanoate",
          "caprilic-capric triglyceride",
          "glyceryl stearate",
          "cetyl alcohol",
          "urea",
          "aloe barbadensis (aloe vera extract)",
          "lanolin",
          "tocopheryl acetate",
          "allantoin",
          "triethanolamine",
          "sodium laurylsulphate",
          "sodium lauryl sulphosuccinate",
          "methylparaben",
          "potassium sorbate",
          "propylparaben",
          "propyl gallate",
          "BHA",
          "fragance (parfum)",
          "benzyl alcohol",
          "citral",
          "tree moss extract",
          "geraniol",
          "hexyl cinnamal",
          "limonene",
          "linalool",
        ],
        skin_types: [
          {
            code: 0,
            verbose_name: "All",
          },
        ],
        skin_needs: [
          {
            code: 17,
            verbose_name: "Feet",
          },
          {
            code: 3,
            verbose_name: "Hidrate",
          },
          {
            code: 4,
            verbose_name: "Nourish",
          },
        ],
        skin_solar_needs: [],
        image: "https://generated.vusercontent.net/placeholder.svg",
        score: null,
        created_at: "2024-04-12T12:02:55.464829Z",
        updated_at: "2024-04-12T12:02:55.464856Z",
        is_deleted: false,
        name: "Creme Hidratante de Pés",
        size: 75.0,
        size_type: "Ml",
        characteristics:
          "Indicado para todos os tipos de pele, o Creme de Pés Hidratante com Água Termal Flaviense é excelente para manter os pés suaves e macios",
        recommended_use:
          "Aplicar de manhã e/ou à noite na pele previamente limpa e seca.",
        contraindications: "Uso externo.",
        price: 4.95,
        url: "https://loja.termasdechaves.com/produto/creme-de-pes-hidratante-75ml/",
        category: {
          code: "B",
          verbose_name: "Body",
        },
        type: {
          code: 8,
          verbose_name: "Cream",
        },
      },
      {
        id: "1fe449cb-d10f-43ad-bb9d-4b858b461b6a",
        ingredients: [
          "Aqua (water)",
          "glycerin",
          "cetearyl octanoate",
          "caprilic-capric triglyceride",
          "glyceryl stearate",
          "cetyl alcohol",
          "urea",
          "aloe barbadensis (aloe vera extract)",
          "lanolin",
          "tocopheryl acetate",
          "allantoin",
          "triethanolamine",
          "sodium laurylsulphate",
          "sodium lauryl sulphosuccinate",
          "methylparaben",
          "potassium sorbate",
          "propylparaben",
          "propyl gallate",
          "BHA",
          "fragance (parfum)",
          "benzyl alcohol",
          "citral",
          "tree moss extract",
          "geraniol",
          "hexyl cinnamal",
          "limonene",
          "linalool",
        ],
        skin_types: [
          {
            code: 0,
            verbose_name: "All",
          },
        ],
        skin_needs: [
          {
            code: 17,
            verbose_name: "Feet",
          },
          {
            code: 3,
            verbose_name: "Hidrate",
          },
          {
            code: 4,
            verbose_name: "Nourish",
          },
        ],
        skin_solar_needs: [],
        image: "https://generated.vusercontent.net/placeholder.svg",
        score: 9.0,
        created_at: "2024-04-12T12:02:55.464829Z",
        updated_at: "2024-04-12T12:02:55.464856Z",
        is_deleted: false,
        name: "Creme Hidratante de Pés",
        size: 75.0,
        size_type: "Ml",
        characteristics:
          "Indicado para todos os tipos de pele, o Creme de Pés Hidratante com Água Termal Flaviense é excelente para manter os pés suaves e macios",
        recommended_use:
          "Aplicar de manhã e/ou à noite na pele previamente limpa e seca.",
        contraindications: "Uso externo.",
        price: 4.95,
        url: "https://loja.termasdechaves.com/produto/creme-de-pes-hidratante-75ml/",
        category: {
          code: "B",
          verbose_name: "Body",
        },
        type: {
          code: 8,
          verbose_name: "Cream",
        },
      },
      {
        id: "1fe449cb-d10f-43ad-bb9d-4b858b461b6a",
        ingredients: [
          "Aqua (water)",
          "glycerin",
          "cetearyl octanoate",
          "caprilic-capric triglyceride",
          "glyceryl stearate",
          "cetyl alcohol",
          "urea",
          "aloe barbadensis (aloe vera extract)",
          "lanolin",
          "tocopheryl acetate",
          "allantoin",
          "triethanolamine",
          "sodium laurylsulphate",
          "sodium lauryl sulphosuccinate",
          "methylparaben",
          "potassium sorbate",
          "propylparaben",
          "propyl gallate",
          "BHA",
          "fragance (parfum)",
          "benzyl alcohol",
          "citral",
          "tree moss extract",
          "geraniol",
          "hexyl cinnamal",
          "limonene",
          "linalool",
        ],
        skin_types: [
          {
            code: 0,
            verbose_name: "All",
          },
        ],
        skin_needs: [
          {
            code: 17,
            verbose_name: "Feet",
          },
          {
            code: 3,
            verbose_name: "Hidrate",
          },
          {
            code: 4,
            verbose_name: "Nourish",
          },
        ],
        skin_solar_needs: [],
        image: "https://generated.vusercontent.net/placeholder.svg",
        score: null,
        created_at: "2024-04-12T12:02:55.464829Z",
        updated_at: "2024-04-12T12:02:55.464856Z",
        is_deleted: false,
        name: "Creme Hidratante de Pés",
        size: 75.0,
        size_type: "Ml",
        characteristics:
          "Indicado para todos os tipos de pele, o Creme de Pés Hidratante com Água Termal Flaviense é excelente para manter os pés suaves e macios",
        recommended_use:
          "Aplicar de manhã e/ou à noite na pele previamente limpa e seca.",
        contraindications: "Uso externo.",
        price: 4.95,
        url: "https://loja.termasdechaves.com/produto/creme-de-pes-hidratante-75ml/",
        category: {
          code: "B",
          verbose_name: "Body",
        },
        type: {
          code: 8,
          verbose_name: "Cream",
        },
      },
    ],
  };

  return (
    <>
      <div className="z-40 grid w-full max-w-screen-xl grid-cols-[repeat(auto-fill,minmax(18rem,2fr))] gap-4 p-6">
        {response.results.map((product, index) => {
          return (
            <ProductCard
              key={index}
              product={product}
              index={index}
              setSelectedProduct={setSelectedProduct}
              productsLength={response.results.length}
            />
          );
        })}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {selectedProduct && (
        <Sheet
          open={!!selectedProduct}
          onOpenChange={() => setSelectedProduct(null)}
        >
          <SheetContent>
            <SheetHeader>
              <div className="flex h-full flex-row gap-4">
                <img
                  alt={`${selectedProduct.name} thumbnail`}
                  className="aspect-square w-1/3 overflow-hidden rounded-md object-cover"
                  src={selectedProduct.image}
                />
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
                    <div>
                      <SheetTitle className="text-2xl">
                        {selectedProduct.name}
                      </SheetTitle>
                      <SheetDescription>
                        {selectedProduct.characteristics}
                      </SheetDescription>
                      <SheetDescription className="lowercase">
                        {selectedProduct.size} {selectedProduct.size_type}
                      </SheetDescription>
                    </div>
                    <p
                      className={`text-lg font-bold text-muted-foreground ${selectedProduct.price === null ? "opacity-0" : ""}`}
                    >
                      {selectedProduct.price
                        ? new Intl.NumberFormat("pt-PT", {
                            style: "currency",
                            currency: "EUR",
                          }).format(selectedProduct.price)
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </SheetHeader>
            <div className="space-y-2">
              <p>
                <strong>Contraindications</strong>{" "}
                {selectedProduct.contraindications}
              </p>

              <p>
                <strong>Recommended Use</strong>{" "}
                {selectedProduct.recommended_use}
              </p>
            </div>
            <div className="grid space-y-1 py-2">
              <strong>Ingredients</strong>
              <div className="grid grid-cols-2">
                <ul className="list-none text-xs">
                  {selectedProduct.ingredients
                    .slice(0, Math.ceil(selectedProduct.ingredients.length / 2))
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
            </div>
            <SheetFooter>
              <SheetClose asChild></SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}

export default ProductsPage;
