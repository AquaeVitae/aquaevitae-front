import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import { skinType } from "@/lib/formDictionary";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

function SkinStep() {
  const { handleSubmit } = useFormContext<FormData>();
  const { onSubmit } = useFormState();

  const SKIN_TYPE_OPTIONS: { label: string; value: string }[] = Object.entries(
    skinType
  ).map(([value, { pt: label }]) => ({
    label: label,
    value: label,
    index: value,
  }));

  const [selectedSkinTypes, setSelectedSkinTypes] = React.useState<string[]>(
    []
  );

  const handleCheckboxChange = (value: string) => {
    setSelectedSkinTypes((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        if (prevSelected.length >= 5) {
          toast({
            title: "Você atingiu o limite de 5 opções",
          });
          return prevSelected;
        }
        return [...prevSelected, value];
      }
    });
  };

  return (
    <Card className="relative flex h-[600px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Como você descreveria sua pele?"
        description="Por favor selecione até 5 opções que se aplicam para descrever sua pele da melhor forma"
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between"
        >
          <div className="grid grid-cols-2 gap-4">
            {SKIN_TYPE_OPTIONS.map(({ label, value }) => (
              <div
                key={value}
                className="flex items-center space-x-2 space-y-0"
              >
                <Checkbox
                  id={value}
                  checked={selectedSkinTypes.includes(value)}
                  onCheckedChange={() => handleCheckboxChange(value)}
                />
                <label
                  htmlFor={value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <FormFooter />
    </Card>
  );
}

export default SkinStep;
