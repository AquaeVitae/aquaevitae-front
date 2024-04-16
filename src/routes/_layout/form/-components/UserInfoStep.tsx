import { Card, CardContent } from "@/components/ui/card";
import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

function UserInfoStep() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    clearErrors,
  } = useFormContext<FormData>();
  const { onSubmit, setFormData, formData } = useFormState();

  const name = watch("name");
  const age = watch("age");
  const email = watch("email");

  useEffect(() => {
    setFormData({ name, age, email });
  }, [name, age, email]);

  useEffect(() => {
    clearErrors(["age", "name", "email"]);
  }, []);

  return (
    <Card className="relative flex h-[600px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Quase lá..."
        description="Precisamos de algumas das suas informações pessoais! Se quiser receber sua lista de produtos no email, não deixe de preencher o campo ;)"
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Nome*"
              className="w-2/3"
              {...register("name", { onChange: (_) => clearErrors(["name"]) })}
            />
            <Input
              type="number"
              placeholder="Idade*"
              className="w-1/3"
              {...register("age", {
                valueAsNumber: true,
                onChange: (_) => clearErrors(["age"]),
              })}
            />
          </div>
          <Input
            type="email"
            placeholder="E-mail não obrigatório"
            {...register("email", { onChange: (_) => clearErrors(["email"]) })}
          />
          {errors.name && (
            <span className="text-destructive">{errors.name.message}</span>
          )}
          {errors.age && (
            <span className="text-destructive">{errors.age.message}</span>
          )}
          {errors.email && (
            <span className="text-destructive">{errors.email.message}</span>
          )}
        </form>
      </CardContent>
      <FormFooter
        disableContinue={!formData.name || !formData.age}
        fieldsToValidate={["name", "age", "email"]}
        nextStep={5}
      />
    </Card>
  );
}

export default UserInfoStep;
