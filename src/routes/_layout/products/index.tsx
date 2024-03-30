import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/products/")({
  component: ProductsPage,
});

function ProductsPage() {
  const products = [
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
      special: true,
    },
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
    },
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
    },
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
    },
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
    },
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
    },
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
    },
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
    },
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
    },
    {
      title: "Vintage Bluetooth Speaker",
      price: "$99",
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
    },
  ];

  return (
    <div className="z-40 grid w-full max-w-screen-xl grid-cols-4 gap-2 p-6">
      {products.map((product, index) => {
        if (index === 0 && product.special) {
          return (
            <Card key={index} className="col-span-3 flex h-full w-full">
              <img
                alt="Product thumbnail"
                className="aspect-square h-full w-[calc(100%/3_-_0.37rem)] overflow-hidden rounded-l-md object-cover"
                src={product.imageUrl}
              />
              <CardContent className="w-1/2 p-4">
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.price}</CardDescription>
              </CardContent>
            </Card>
          );
        } else {
          return (
            <Card key={index} className="h-full w-full">
              <img
                alt="Product thumbnail"
                className="aspect-square h-64 w-full overflow-hidden rounded-t-md object-cover "
                src={product.imageUrl}
              />
              <CardContent className="p-4">
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.price}</CardDescription>
              </CardContent>
            </Card>
          );
        }
      })}
    </div>
  );
}

export default ProductsPage;
