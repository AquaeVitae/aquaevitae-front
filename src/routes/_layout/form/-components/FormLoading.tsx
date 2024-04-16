import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const FormLoading = () => {
  return (
    <Card className="relative z-40 flex h-[600px] w-11/12 max-w-3xl flex-col items-center justify-center rounded-lg border">
      <Loader2 className="h-1/6 w-1/6 animate-spin stroke-secondary" />
    </Card>
  );
};
