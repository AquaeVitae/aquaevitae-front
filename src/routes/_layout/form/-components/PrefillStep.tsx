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
import { useEffect, useState } from "react";

function PrefillStep() {
  const { handleSubmit } = useFormContext<FormData>();
  const { onSubmit, setFormData, formData } = useFormState();
  const [nextStep, setNextStep] = useState(1);

  const handlePrefillChange = (value: string) => {
    setFormData({ prefill: value === "feature-extraction" });
    setNextStep(value === "feature-extraction" ? 1 : 2);
  };

  const handleConfirmationChange = (checked: boolean | "indeterminate") => {
    setFormData({ confirmation: checked === true });
  };

  useEffect(() => {
    setNextStep(formData.prefill ? 1 : 2);
  }, []);

  const radioGroupDefaultValue = formData.prefill
    ? "feature-extraction"
    : "manual";

  return (
    <Card className="relative flex h-[600px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Recomendação de produtos"
        description="Preencha o formulário e descubra os produtos mais indicados para cuidar da sua pele"
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
                    Envie uma fotografia do seu rosto para preencher o
                    formulário automaticamente.
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
                    Responda as perguntas do questionário e receba sua lista de
                    produtos personalizada.
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
          <div className="justify-left items-left flex flex-col gap-2 pr-4">
            <div className="items-top ml-2 flex space-x-2">
              <Checkbox
                id="storeImage"
                checked={formData.storeImage && formData.prefill}
                onCheckedChange={(v) => setFormData({ storeImage: v === true })}
                disabled={!formData.prefill}
                className="peer my-1"
              />
              <div className="grid gap-1.5 leading-none peer-disabled:opacity-70">
                <label
                  htmlFor="storeImage"
                  className="text-justify text-xs font-medium peer-disabled:cursor-not-allowed md:text-left"
                >
                  Autorizo que minha fotografia seja armazenada pelo time
                  AquaeVitae e posteriormente utilizada para melhoria da
                  ferramenta.
                </label>
              </div>
            </div>
            <div className="items-top ml-2 flex space-x-2">
              <Checkbox
                id="terms"
                checked={formData.confirmation}
                onCheckedChange={handleConfirmationChange}
                className="peer my-1"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-justify text-xs font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-left"
                >
                  Estou ciente e autorizo que minha resposta seja armazenada e
                  utilizada unico e exclusivamente para geração do meu plano de
                  produtos.
                </label>
              </div>
            </div>
          </div>
        </CardContent>
        <FormFooter
          disableContinue={!formData.confirmation}
          nextStep={nextStep}
        />
      </form>
    </Card>
  );
}

export default PrefillStep;
