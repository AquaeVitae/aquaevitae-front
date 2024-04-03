import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { skinType } from "@/lib/formDictionary";
import { toast } from "@/components/ui/use-toast";

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

  const [skinTypeValue, setSkinTypeValue] = React.useState<Option[]>([]);

  return (
    <Card className="relative flex h-[500px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Como você descreveria sua pele?"
        description="Por favor selecione até 5 opções que se aplicam para descrever sua pele da melhor forma"
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between"
        >
          <div>
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
              maxSelected={5}
              onMaxSelected={(maxLimit) => {
                toast({
                  title: `Você atingiu o limite de ${maxLimit} opções`,
                });
              }}
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
