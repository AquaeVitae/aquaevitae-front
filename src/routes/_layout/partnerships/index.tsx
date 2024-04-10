import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent,
    CardDescription,
    CardTitle, CardHeader} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import {useMutation} from '@tanstack/react-query'
import axios from 'axios';
import { toast } from "@/components/ui/use-toast";
// import {CountryDropdown} from "@/components/dropdown/countries";

export const Route = createFileRoute("/_layout/partnerships/")({
    component: PartnershipsPage,
});

const partnershipSchema = z.object({
  companyName: z.string().min(1),
  agentName: z.string().min(1),
  agentEmail: z.string().min(1).email(),
  agentRole: z.string(),
  message: z.string().min(1).max(1000),
  // country: z.string().min(1),
  phone: z.string()
    .refine(isValidPhoneNumber)
    .or(z.literal("")),
})

type PartnershipSchema = z.infer<typeof partnershipSchema>

function PartnershipsPage() {
    const {
      handleSubmit,
      register,
      resetField,
    } = useForm<PartnershipSchema>({
      resolver: zodResolver(partnershipSchema)
    });

  const mutation = useMutation({
      mutationFn: (partnership: any) => {
        return axios.post('partnerships/', partnership)
      },
      onSuccess: () => {
        resetField("companyName")
        resetField("agentName")
        resetField("agentEmail")
        resetField("agentRole")
        resetField("message")
        resetField("phone")
        // resetField("country")
        toast({
          title: "Muito obrigado por querer ser um de nossos parceiros!",
          description: "Um agente entrará em contato em breve."
        });
        mutation.reset()
      },
      onError: () => {
        toast({
          title: "Algo deu errado :(",
          description: "Por favor tente novamente ou entre em contato com um dos nossos administradores."
        });
        mutation.reset()
      }
    })

  function submitPartnershipForm(data: PartnershipSchema) {
    mutation.mutate({
      "phone": data.phone,
      "company_name": data.companyName,
      "agent_fullname": data.agentName,
      "agent_role": data.agentRole,
      "agent_email": data.agentEmail,
      "country": "PT",
      "agent_message": data.message
    })
  }

  return (
    <div className="z-40 flex h-full w-full flex-col items-center justify-center">
    <Card className="relative flex md:h-[600px] h-[650px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <CardHeader>
        <CardTitle>Seja um dos nossos parceiros!</CardTitle>
        <CardDescription>Quer ter seus produtos na nossa plataforma? Informe os dados da sua empresa e aguarde um dos nossos agentes entrar em contato.</CardDescription>
      </CardHeader>

      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form onSubmit={handleSubmit(submitPartnershipForm)} className="flex flex-col h-full gap-4">
          <div className="flex gap-4">
            <Input
              type="text"
              className="w-3/5"
              placeholder="Nome da sua empresa*"
              {...register("companyName")}
            />
          </div>
            <Input
              type="text"
              placeholder="Seu nome*"
              {...register("agentName")}
            />
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="Seu email*"
              className="w-full md:w-3/5"
              {...register("agentEmail")}
            />
            <PhoneInput className="w-full md:w-2/5" international={true} placeholder="Seu número de telefone" {...register("phone")}/>
          </div>
            <Input
              type="text"
              placeholder="Seu cargo"
              {...register("agentRole")}
            />
            <Textarea
              placeholder="Escreva como seus produtos fazem sentido com o projeto Aquaevitae ;)"
              className="h-full resize-none"
              maxLength={1000}
              {...register("message")}
            />

          <Button
              type="submit"
              >
                Enviar
            </Button>
        </form>
      </CardContent>
    </Card>
      </div>
  );
}
export default PartnershipsPage;
