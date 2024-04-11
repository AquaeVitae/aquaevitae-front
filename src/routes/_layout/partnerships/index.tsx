import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import React, { useState } from "react";

import {
  type CountryCallingCode,
  type E164Number,
  getExampleNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import i18nIsoCountries from "i18n-iso-countries";
import enCountries from "i18n-iso-countries/langs/en.json";
import PhoneInput, { type Country } from "react-phone-number-input/input";
import examples from "libphonenumber-js/mobile/examples";

import { ComboboxCountryInput } from "./-components/phone-input/combobox";
import {
  getCountriesOptions,
  isoToEmoji,
  replaceNumbersWithZeros,
} from "./-components/phone-input/helpers";
import { SelectCountry } from "./-components/country-select";

type CountryOption = {
  value: Country;
  label: string;
  indicatif: CountryCallingCode;
};

i18nIsoCountries.registerLocale(enCountries);

export const Route = createFileRoute("/_layout/partnerships/")({
  component: PartnershipsPage,
});

const partnershipSchema = z.object({
  companyName: z.string().min(1),
  agentName: z.string().min(1),
  agentEmail: z.string().min(1).email(),
  agentRole: z.string(),
  message: z.string().min(1).max(1000),
  phone: z.string().refine(isValidPhoneNumber).or(z.literal("")),
  selectedCountry: z.string(),
});

type PartnershipSchema = z.infer<typeof partnershipSchema>;

function PartnershipsPage() {
  const { handleSubmit, register, resetField, setValue, watch } = useForm<PartnershipSchema>({
    resolver: zodResolver(partnershipSchema),
  });

  const mutation = useMutation({
    mutationFn: (partnership: PartnershipSchema) => {
      return axios.post("partnerships/", partnership);
    },
    onSuccess: () => {
      resetField("companyName");
      resetField("agentName");
      resetField("agentEmail");
      resetField("agentRole");
      resetField("message");
      resetField("phone");
      resetField("selectedCountry");
      toast({
        title: "Muito obrigado por querer ser um de nossos parceiros!",
        description: "Um agente entrará em contato em breve.",
      });
      mutation.reset();
    },
    onError: () => {
      toast({
        title: "Algo deu errado :(",
        description:
          "Por favor tente novamente ou entre em contato com um dos nossos administradores.",
      });
      mutation.reset();
    },
  });

  function submitPartnershipForm(data: PartnershipSchema) {
    mutation.mutate({
      phone: data.phone,
      company_name: data.companyName,
      agent_fullname: data.agentName,
      agent_role: data.agentRole,
      agent_email: data.agentEmail,
      country: data.selectedCountry,
      agent_message: data.message,
    });
  }

  const options = getCountriesOptions();
  const defaultCountry = parsePhoneNumber("+55606060606")?.country;
  const defaultCountryOption = options.find(
    (option) => option.value === defaultCountry,
  );
  const [country, setCountry] = useState<CountryOption>(
    defaultCountryOption || options[0]!,
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
    options[1] || options[0]!,
  );
  const [phoneNumber, setPhoneNumber] = useState<E164Number>();
  const placeholder = replaceNumbersWithZeros(
    getExampleNumber(country.value, examples)!.formatInternational(),
  );
  const onCountryChange = (value: CountryOption) => {
    setPhoneNumber(undefined);
    setCountry(value);
    setValue("selectedCountry", value.label);
  };
  const onSelectedCountryChange = (value: CountryOption) => {
    setSelectedCountry(value);
    setValue("selectedCountry", value.label);
  };

  watch("selectedCountry");

  return (
    <div className="z-40 flex h-full w-full flex-col items-center justify-center">
      <Card className="relative flex h-[600px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border md:h-[600px]">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-xl md:text-3xl">
            Seja um dos nossos parceiros!
          </CardTitle>
          <CardDescription className="text-left text-xs md:text-sm">
            Quer ter seus produtos na nossa plataforma? Informe os dados da sua
            empresa e aguarde um dos nossos agentes entrar em contato.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex h-full flex-col p-4 pt-0 md:p-6">
          <form
            onSubmit={handleSubmit(submitPartnershipForm)}
            className="flex h-full flex-col gap-4"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                type="text"
                className="w-full md:w-3/5"
                placeholder="Nome da sua empresa*"
                {...register("companyName")}
              />
              <SelectCountry
                value={selectedCountry}
                onValueChange={onSelectedCountryChange}
                options={options}
                renderOption={({ option }) => `${option.label}`}
                renderValue={(option) => option.label}
                emptyMessage="No country found."
              />
            </div>
            <Input
              type="text"
              placeholder="Seu nome*"
              {...register("agentName")}
            />
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                type="email"
                placeholder="Seu email*"
                className="w-full md:w-3/5"
                {...register("agentEmail")}
              />
              <div className="flex flex-grow gap-1 md:w-2/5">
                <ComboboxCountryInput
                  value={country}
                  onValueChange={onCountryChange}
                  options={options}
                  placeholder="Find your country..."
                  renderOption={({ option }) =>
                    `${isoToEmoji(option.value)} ${option.label}`
                  }
                  renderValue={(option) => option.label}
                  emptyMessage="No country found."
                />
                <PhoneInput
                  international
                  withCountryCallingCode
                  country={country.value.toUpperCase() as Country}
                  value={phoneNumber}
                  inputComponent={Input}
                  placeholder={placeholder}
                  onChange={(value) => {
                    setPhoneNumber(value);
                  }}
                />
              </div>
            </div>
            <Input
              type="text"
              placeholder="Seu cargo"
              {...register("agentRole")}
            />
            <Textarea
              placeholder="Escreva como seus produtos fazem sentido com o projeto Aquaevitae ;)"
              className="h-full min-h-max resize-none md:max-h-full"
              maxLength={1000}
              {...register("message")}
            />

            <Button type="submit">Enviar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default PartnershipsPage;
