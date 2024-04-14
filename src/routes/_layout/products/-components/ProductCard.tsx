import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";

export default function ProductCard({
  product,
  index,
  setSelectedProduct,
  productsLength,
}: {
  product: Product;
  index: number;
  productsLength: number;
  setSelectedProduct: (product: Product) => void;
}) {
  return (
    <Card
      key={index}
      className="group min-h-[520px] hover:cursor-pointer"
      onClick={() => setSelectedProduct(product)}
    >
      <CardHeader className="relative p-4 pb-0">
        <img
          alt="Product thumbnail"
          className="aspect-square w-full overflow-hidden rounded-md object-cover"
          src={product.image}
        />
        {
          <Badge
            variant="secondary"
            className={`absolute left-7 top-5 z-10 w-fit animate-shine border border-primary/75 bg-white ${
              index < productsLength * 0.3
                ? "bg-gradient-to-r from-primary via-primary/50 to-primary"
                : index < productsLength * 0.6
                  ? "bg-gradient-to-r from-primary/65 via-primary/25 to-primary/65"
                  : "bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25"
            } bg-[length:400%_100%] uppercase`}
          >
            {index < productsLength * 0.3
              ? "High"
              : index < productsLength * 0.6
                ? "Medium"
                : "Low"}
          </Badge>
        }
      </CardHeader>
      <CardContent className="p-4 text-muted-foreground">
        <div className="space-y-2">
          <div className="flex w-full space-x-2">
            {product.skin_needs.map((need, index) => (
              <Badge
                key={index}
                className="bg-primary/75 uppercase transition-all duration-300 ease-in-out hover:bg-primary"
              >
                {need.verbose_name}
              </Badge>
            ))}
          </div>
          <div>
            <h3 className="text-balance text-lg font-bold group-hover:text-secondary-foreground">
              {product.name} {product.size}{" "}
              <span className="lowercase">{product.size_type}</span>
            </h3>

            <p className={`${product.price === null ? "opacity-0" : ""}`}>
              {product.price
                ? new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.price)
                : 0}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-1">
        <p className="text-xs text-muted-foreground">
          {product.characteristics}
        </p>
      </CardFooter>
    </Card>
  );
}
