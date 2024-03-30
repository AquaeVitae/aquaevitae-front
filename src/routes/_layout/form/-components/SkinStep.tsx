import {
  Card,
  CardContent,
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
        title="Características da pele"
        description="Selecione multiplas respostas para descrever sua pele da melhor forma"
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between"
        >
          <div>
            <h2 className="text-lg">Pele pele pele</h2>
            <p className="mt-1 text-left text-xs text-muted-foreground md:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
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
              className="mt-4"
            />
          </div>
          <div>
            <h2 className="text-lg">
              Selecione até 3 problemas de pele que você enfrenta
            </h2>
            <p className="mt-1 text-left text-xs text-muted-foreground md:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
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
            />
          </div>
        </form>
      </CardContent>
      <FormFooter />
    </Card>
  );
}

export default SkinStep;
