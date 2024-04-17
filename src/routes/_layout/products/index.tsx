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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";

import SelectedProduct from "./-components/SelectedProduct";

const productSearchSchema = z.object({
  page: z.number().catch(1),
  form_id: z.string().uuid().catch(""),
});

export const Route = createFileRoute("/_layout/products/")({
  component: ProductsPage,
  validateSearch: productSearchSchema,
});

function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { form_id, page } = Route.useSearch();

  const fetchProducts = async ({
    form_id,
    page,
  }: z.infer<typeof productSearchSchema>) => {
    let params = {};
    if (form_id) {
      params = { ...params, ...{ form_id: form_id } };
    }
    if (page) {
      params = { ...params, ...{ page: page } };
    }
    try {
      const res = await axios.get("products/", { params });
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 second delay
      // const res = { data: response }; // Use the response object from the context
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == 404) {
          return router.navigate({
            from: Route.fullPath,
            search: { form_id },
          });
        }
      }
      throw error;
    }
  };

  const { isPending, isError, data } = useQuery({
    queryKey: ["products", form_id, page],
    queryFn: () => fetchProducts({ form_id, page }),
  });

  const handleNextPage = useCallback(() => {
    router.navigate({
      from: Route.fullPath,
      search: { form_id, page: data.next },
    });
  }, [data]);

  const handlePreviousPage = useCallback(() => {
    router.navigate({
      from: Route.fullPath,
      search: { form_id, page: data.previous },
    });
  }, [data]);

  if (isError) {
    toast({
      variant: "destructive",
      title: "Algo deu errado :(",
      description:
        "Por favor tente novamente mais tarde ou entre em contato com um dos nossos administradores.",
    });
    router.navigate({ to: "/" });
    return <></>;
  }

  return isPending ? (
    <div className="z-40 grid w-full max-w-screen-xl grid-cols-[repeat(auto-fill,minmax(18rem,2fr))] gap-4 p-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="min-h-[520px]" />
      ))}
    </div>
  ) : (
    <>
      <div className="z-40 grid w-full max-w-screen-xl grid-cols-[repeat(auto-fill,minmax(18rem,2fr))] gap-4 p-6">
        {data.results.map((product: Product, index: number) => {
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
      {form_id || data.count <= 20 ? null : (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                isActive={data.previous ? true : false}
                onClick={handlePreviousPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={true}>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                isActive={data.next ? true : false}
                onClick={handleNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      {selectedProduct && (
        <SelectedProduct
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </>
  );
}

export default ProductsPage;
