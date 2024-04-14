import { Card, CardContent } from "@/components/ui/card";
import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import { skinType } from "@/lib/formDictionary";
import { toast } from "@/components/ui/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect } from "react";

function SkinStep() {
  const { handleSubmit, setValue } = useFormContext<FormData>();
  const { onSubmit, skinTypes, setSkinTypes, setFormData } = useFormState();

  const SKIN_TYPE_OPTIONS: { label: string; value: string; index: string }[] =
    Object.entries(skinType).map(([value, { pt: label }]) => ({
      label: label,
      value: label,
      index: value,
    }));

  const handleCheckboxChange = (values: string[]) => {
    setSkinTypes((prevSelected: string[]) => {
      if (!prevSelected.includes("0") && values.includes("0")) {
        return ["0"];
      } else {
        const newValues = [...values.filter((item) => item !== "0")];
        if (newValues.length > 3) {
          newValues.shift();
          toast({
            title: "Você atingiu o limite de 3 opções",
          });
        }
        return newValues;
      }
    });
  };

  useEffect(() => {
    setFormData({ skinTypes });
    setValue("skinTypes", skinTypes);
  }, [skinTypes]);

  return (
    <Card className="relative flex h-[600px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Como você descreveria sua pele?"
        description="Por favor selecione até 3 opções que descrevam sua pele da melhor forma"
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between"
        >
          <ToggleGroup
            className="grid grid-cols-2 gap-4"
            type="multiple"
            value={skinTypes}
            variant="outline"
            onValueChange={handleCheckboxChange}
          >
            {SKIN_TYPE_OPTIONS.reverse().map(({ label, value, index }) => (
              <ToggleGroupItem
                value={index}
                className="border-2 border-muted hover:border-primary hover:bg-background focus-visible:border-primary data-[state=on]:border-primary data-[state=on]:bg-background"
              >
                <label
                  htmlFor={value}
                  className="font-small text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-sm"
                >
                  {label}
                </label>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </form>
      </CardContent>
      <FormFooter
        nextStep={3}
        disableContinue={skinTypes.length == 0}
        fieldsToValidate={["skinTypes"]}
      />
    </Card>
  );
}

export default SkinStep;
