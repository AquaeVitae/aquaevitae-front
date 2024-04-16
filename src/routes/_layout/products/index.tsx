import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Product } from "@/lib/types";
import ProductCard from "./-components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { FormLoading } from "../form/-components/FormLoading";

const productSearchSchema = z.object({
  page: z.number().catch(1),
  form_id: z.string().uuid().catch("")
})


export const Route = createFileRoute("/_layout/products/")({
  component: ProductsPage,
  validateSearch: productSearchSchema
});

function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter()
  const { form_id, page } = Route.useSearch()

  const fetchProducts = async ({form_id, page}: z.infer<typeof productSearchSchema>) => {
    var params = {};
    if (form_id) {
      params = {...params, ...{"form_id": form_id}}
    }
    if (page) {
      params = {...params, ...{"page": page}}
    }
    try {
      const res = await axios.get("products/", {params})
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == 404) {
          return router.navigate({
            from: Route.fullPath,
            search: {form_id}
          })
        }
      }
    throw error
    } 
  }

  const { isPending, isError, data} = useQuery({
    queryKey: ["products", form_id, page],
    queryFn: () => fetchProducts({form_id, page})
  })

  const handleNextPage = useCallback(()=>{
    router.navigate({
      from: Route.fullPath,
      search: {form_id, page:data.next}
    })
  }, [data])

  const handlePreviousPage = useCallback(()=>{
    router.navigate({
      from: Route.fullPath,
      search: {form_id, page:data.previous}
    })
  }, [data])

  if (isPending) {
    return <FormLoading/>
  }

  if (isError) {
    toast({
      variant: "destructive",
      title: "Algo deu errado :(",
      description:
        "Por favor tente novamente mais tarde ou entre em contato com um dos nossos administradores.",
    });
    router.navigate({to: "/"})
    return <></>
  }

  return (
    <>
      <div className="z-40 grid w-full max-w-screen-xl grid-cols-[repeat(auto-fill,minmax(18rem,2fr))] gap-4 p-6">
        {data.results.map((product:any, index:any) => {
          return (
            <ProductCard
              key={index}
              product={product}
              index={index}
              setSelectedProduct={setSelectedProduct}
              productsLength={data.results.length}
              hasBadge={form_id && (!page || page === 1) ? true : false}
            />
          );
        })}
      </div>
      { form_id || (data.count <= 20) ? null :
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious isActive={data.previous ? true : false} onClick={handlePreviousPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={true}>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext isActive={data.next ? true : false} onClick={handleNextPage} /> 
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      }
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
