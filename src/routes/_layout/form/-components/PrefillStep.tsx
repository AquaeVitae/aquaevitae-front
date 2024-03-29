import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Camera, SquarePen } from "lucide-react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

function PrefillStep() {
  const { handleSubmit } = useFormContext<FormData>();
  const { onSubmit, setFormData, formData } = useFormState();

  const handlePrefillChange = (value: string) => {
    console.log(value);
    setFormData({ prefill: value === "feature-extraction" });
  };

  const handleConfirmationChange = (checked: boolean | "indeterminate") => {
    setFormData({ confirmation: checked === true });
  };

  const radioGroupDefaultValue = formData.prefill
    ? "feature-extraction"
    : "manual";

  return (
    <Card className="relative flex h-[500px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Formulário de pele"
        description="Preencha um formulário e descubra os produtos mais indicados para cuidar da sua pele"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col justify-between"
      >
        <CardContent className="flex h-full flex-col justify-between p-4 md:p-6">
          <RadioGroup
            defaultValue={radioGroupDefaultValue}
            className="flex flex-col gap-2 md:gap-4"
            onValueChange={handlePrefillChange}
          >
            <div>
              <RadioGroupItem
                value="feature-extraction"
                id="feature-extraction"
                className="peer sr-only"
              />
              <Label
                htmlFor="feature-extraction"
                className="flex flex-row items-center gap-4 rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Camera className="h-6 w-6 md:h-8 md:w-8" />
                <div className="flex flex-1 flex-col gap-1 text-left text-xs md:text-sm">
                  <div className="font-bold">
                    Fazer a extração automática
                    <Badge
                      variant="secondary"
                      className="-mb-1 ml-2 animate-shine border border-primary/75 bg-white bg-gradient-to-r from-primary/75 via-primary/25 to-primary/75 bg-[length:400%_100%]"
                    >
                      IA
                    </Badge>
                  </div>
                  <div>
                    Pré preencher formulário com extração de características
                    faciais com fotografia
                  </div>
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="manual"
                id="manual"
                className="peer sr-only"
              />
              <Label
                htmlFor="manual"
                className="flex flex-row items-center gap-4 rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <SquarePen className="h-6 w-6 md:h-8 md:w-8" />
                <div className="flex flex-1 flex-col gap-1 text-left text-xs md:text-sm">
                  <p className="font-bold">Preencher formulário manualmente</p>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
          <div className="ml-2 flex items-center space-x-2">
            <Checkbox
              id="terms1"
              checked={formData.confirmation}
              onCheckedChange={handleConfirmationChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-left text-xs font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-sm"
              >
                Aceito que minhas respostas sejam utilizadas para a criação de
                um perfil de pele
              </label>
            </div>
          </div>
        </CardContent>
        <FormFooter disableContinue={!formData.confirmation} />
      </form>
    </Card>
  );
}

export default PrefillStep;
