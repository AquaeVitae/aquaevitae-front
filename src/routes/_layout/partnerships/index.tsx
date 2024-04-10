import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent,
    CardDescription,
    CardTitle, CardHeader} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
// import {CountryDropdown} from "@/components/dropdown/countries";

export const Route = createFileRoute("/_layout/partnerships/")({
    component: PartnershipsPage,
});

function PartnershipsPage() {
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<FormData>();


  function submitPartnershipForm(data: any) {
    console.log(data)
  }
  return (
    <div className="z-40 flex h-full w-full flex-col items-center justify-center">
    <Card className="relative flex h-[500px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <CardHeader>
        <CardTitle>Seja um dos nossos parceiros!</CardTitle>
        <CardDescription>Quer ter seus produtos na nossa plataforma? Informe os dados da sua empresa e aguarde um dos nossos agentes entrar em contato.</CardDescription>
      </CardHeader>

      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form onSubmit={handleSubmit(submitPartnershipForm)} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              type="text"
              className="w-2/3"
              placeholder="Nome da sua empresa*"
              {...register("companyName")}
            />
            {/*
            Preciso que o cara informe o pais da empresa e enviar o codigo do pais pra API tipo "BR" ou "PT", conseguir trazer por default Portugal é top 
            Deixar na msm linha q o nome da empresa ou aonde tu achar melhor
            <CountryDropdown className="w-1/3" {...register("country")} /> */
            }
          </div>
          <PhoneInput defaultCountry="PT" international={true} placeholder="Enter a phone number" {...register("phone")} />
            {/* <Input
              type="text"
              placeholder="Seu nome*"
              {...register("agentName")}
            />
            <Input
              type="text"
              placeholder="Seu nome*"
              {...register("companyName")}
            />
            <Input
              type="text"
              placeholder="Seu cargo*"
              {...register("companyName")}
            />
            <Input
              type="email"
              placeholder="Seu email*"
              className="w-2/3"
              {...register("companyName")}
            />
            <Input
              type=""
              placeholder="Seu email*"
              {...register("companyName")}
            /> */}

          {/* {errors.name && (
            <span className="text-destructive">{errors.name.message}</span>
          )}
          {errors.age && (
            <span className="text-destructive">{errors.age.message}</span>
          )} */}
        </form>
      </CardContent>
    </Card>
      </div>
  );
}
export default PartnershipsPage;
