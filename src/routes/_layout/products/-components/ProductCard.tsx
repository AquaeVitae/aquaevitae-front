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
  hasBadge
}: {
  product: Product;
  index: number;
  productsLength: number;
  setSelectedProduct: (product: Product) => void;
  hasBadge: boolean;
}) {
  return (
    <Card
      key={index}
      className="group min-h-[500px] hover:cursor-pointer"
      onClick={() => setSelectedProduct(product)}
    >
      <CardHeader className="relative p-4 pb-0">
        <img
          alt="Product thumbnail"
          className="aspect-square w-full overflow-hidden rounded-md object-cover"
          src={product.image}
        />
        {hasBadge ?
          <Badge
            variant="secondary"
            className={`absolute left-7 top-5 z-10 w-fit animate-shine border border-primary/75 bg-white ${
              index < productsLength * 0.3
                ? "bg-gradient-to-r from-primary via-primary/60 to-primary"
                : index < productsLength * 0.6
                  ? "bg-gradient-to-r from-primary/55 via-primary/35 to-primary/55"
                  : "bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25"
            } bg-[length:400%_100%] uppercase`}
          >
            {index < productsLength * 0.3
              ? "Importante"
              : index < productsLength * 0.6
                ? "Recomendado"
                : "Opcional"}
          </Badge> : null
        }
      </CardHeader>
      <CardContent className="p-4 text-muted-foreground">
        <div className="space-y-2">
          
          <div>
            <h3 className="text-balance text-lg font-bold group-hover:text-secondary-foreground">
              {product.name} {product.size}{" "}
              <span className="lowercase">{product.size_type}</span>
            </h3>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col justify-between h-auto gap-4 pt-1">
        <p className="text-xs min-h-16 w-full text-left text-muted-foreground">
          {product.characteristics}
        </p>
        <div className="flex w-full flex-wrap gap-2">
            {product.skin_needs.map((need, index) => (
              <Badge
                key={index}
                className="bg-primary/75 uppercase transition-all duration-300 ease-in-out hover:bg-primary"
              >
                {need.verbose_name}
              </Badge>
            ))}
          </div>
      </CardFooter>
    </Card>
  );
}
