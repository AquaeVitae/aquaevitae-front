import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { skinDisease } from "@/lib/formDictionary";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

function SkinProblemsStep() {
  const { handleSubmit } = useFormContext<FormData>();
  const { onSubmit } = useFormState();

  const SKIN_DISEASE_OPTIONS: Option[] = Object.entries(skinDisease).map(
    ([value, { pt: label }]) => ({
      label: label,
      value: label,
      index: value,
    }),
  );

  const [skinDiseaseValue, setSkinDiseaseValue] = React.useState<Option[]>([]);
  const [skinDiseaseIntensity, setSkinDiseaseIntensity] = React.useState<
    Record<string, number>
  >({});

  const handleSliderChange = (value: number, option: Option) => {
    setSkinDiseaseIntensity((prevState) => ({
      ...prevState,
      [option.value]: value,
    }));
  };

  return (
    <Card className="relative flex h-[600px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Patologias de pele"
        description="Selecione até 5 patologias de pele que você enfrenta e o seu grau:"
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <MultipleSelector
            value={skinDiseaseValue}
            onChange={setSkinDiseaseValue}
            defaultOptions={SKIN_DISEASE_OPTIONS}
            placeholder="Selecione todas as opções que se aplicam."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                Não encontrado
              </p>
            }
            className="mt-4"
            maxSelected={5}
            onMaxSelected={(maxLimit) => {
              toast({
                title: `Você atingiu o limite de ${maxLimit} opções.`,
              });
            }}
          />
          {skinDiseaseValue.map((option) => (
            <div key={option.value} className="mt-4 flex items-center gap-4">
              <span className="w-1/2 text-sm font-medium md:w-1/4">
                {option.label}
              </span>
              <Slider
                // defaultValue={[1]}
                max={3}
                min={1}
                // step={1}
                onValueChange={(value) => handleSliderChange(value[0], option)}
              />
              <span className="text-sm">
                {skinDiseaseIntensity[option.value] || "Baixo"}
              </span>
            </div>
          ))}
        </form>
      </CardContent>
      <FormFooter />
    </Card>
  );
}

export default SkinProblemsStep;
