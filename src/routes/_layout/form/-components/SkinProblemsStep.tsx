import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";
import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { skinDisease } from "@/lib/formDictionary";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

function SkinProblemsStep() {
  const { handleSubmit, setValue } = useFormContext<FormData>();
  const { onSubmit, setSkinDiseases, skinDiseases, setFormData } =
    useFormState();

  const SKIN_DISEASE_OPTIONS: Option[] = Object.entries(skinDisease).map(
    ([value, { pt: label }]) => ({
      label,
      value,
    }),
  );

  const MAP_LEVEL = ["Baixo", "Médio", "Alto"];

  const [skinDiseaseValue, setSkinDiseaseValue] = React.useState<Option[]>([]);

  const handleSliderChange = (value: number, option: Option) => {
    setSkinDiseases((prevState) => ({
      ...prevState,
      [option.value]: value,
    }));
  };

  useEffect(() => {
    const tempDiseases: Option[] = [];
    for (let k in skinDiseases) {
      tempDiseases.push(
        SKIN_DISEASE_OPTIONS.find((value) => value.value === k) as Option,
      );
    }
    setSkinDiseaseValue(tempDiseases);
  }, []);

  useEffect(() => {
    setFormData({ skinDiseases });
    setValue("skinDiseases", skinDiseases);
  }, [skinDiseases]);

  return (
    <Card className="relative flex h-[600px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Principais patologias da sua pele"
        description="Selecione até 5 problemas que sua pele enfrenta e o seu grau:"
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <MultipleSelector
            value={skinDiseaseValue}
            onChange={(vs) => {
              setSkinDiseaseValue(vs);
              const tmp: Record<string, number> = {};
              vs.map((v) => (tmp[v.value] = skinDiseases[v.value] | 1));
              setSkinDiseases(tmp);
            }}
            defaultOptions={SKIN_DISEASE_OPTIONS}
            placeholder="Selecione todas as opções que se aplicam."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                Não encontrado
              </p>
            }
            className="mt-4"
            hidePlaceholderWhenSelected={true}
            maxSelected={5}
            onMaxSelected={(maxLimit) => {
              toast({
                title: `Você atingiu o limite de ${maxLimit} opções.`,
              });
            }}
          />
          {skinDiseaseValue
            .sort((a, b) => (a.value > b.value ? 1 : -1))
            .map((option) => (
              <div key={option.value} className="mt-4 flex items-center gap-4">
                <span className="w-1/5 text-xs font-medium md:w-1/2 md:w-1/4 md:text-sm">
                  Nível de {option.label}
                </span>
                <Slider
                  defaultValue={[skinDiseases[option.value]]}
                  max={3}
                  min={1}
                  step={1}
                  className="w-7/12 md:w-full"
                  onValueChange={(value) =>
                    handleSliderChange(value[0], option)
                  }
                />
                <span className="text-sm md:w-1/12">
                  {MAP_LEVEL[skinDiseases[option.value] - 1]}
                </span>
              </div>
            ))}
        </form>
      </CardContent>
      <FormFooter
        nextStep={4}
        disableContinue={skinDiseaseValue.length == 0}
        fieldsToValidate={["skinDiseases"]}
      />
    </Card>
  );
}

export default SkinProblemsStep;
