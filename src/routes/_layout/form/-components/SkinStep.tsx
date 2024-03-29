import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { skinType, skinDisease } from "@/lib/formDictionary";

function SkinStep() {
  const { handleSubmit } = useFormContext<FormData>();
  const { onSubmit } = useFormState();

  const SKIN_TYPE_OPTIONS: Option[] = Object.entries(skinType).map(
    ([value, { pt: label }]) => ({
      label: label,
      value: label,
      index: value,
    }),
  );

  const SKIN_DISEASE_OPTIONS: Option[] = Object.entries(skinDisease).map(
    ([value, { pt: label }]) => ({
      label: label,
      value: label,
      index: value,
    }),
  );

  const [skinTypeValue, setSkinTypeValue] = React.useState<Option[]>([]);
  const [skinDiseaseValue, setSkinDiseaseValue] = React.useState<Option[]>([]);

  return (
    <Card className="relative flex h-[500px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Como você descreveria sua pele?"
        description="Por favor selecione todas as opções que se aplicam."
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <MultipleSelector
            value={skinTypeValue}
            onChange={setSkinTypeValue}
            defaultOptions={SKIN_TYPE_OPTIONS}
            placeholder="Selecione todas as opções que se aplicam."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                Não encontrado
              </p>
            }
          />
          <div>
            <CardTitle className="text-xl md:text-3xl">
              Selecione até três problemas de pele que você enfrenta
            </CardTitle>
            <CardDescription className="text-left text-xs md:text-sm mt-1.5">
              como você descreveria sua pele?
            </CardDescription>
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
              className="mt-6"
            />
          </div>
        </form>
      </CardContent>
      <FormFooter />
    </Card>
  );
}

export default SkinStep;
