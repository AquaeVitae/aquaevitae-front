import {
  createContext,
  useContext,
  useState,
  type SetStateAction,
  Dispatch,
} from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider as RHFProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
  prefill: z.boolean(),
  confirmation: z.boolean(),
  storeImage: z.boolean(),
  name: z.string().min(1, "Por favor informe seu nome."),
  skinTypes: z.array(z.string().min(1).max(2)).min(1).max(3),
  skinDiseases: z.record(z.string().min(1).max(2), z.number().min(1).max(3)),
  age: z.number().min(8, "Idade inválida.").max(110, "Idade inválida."),
  email: z.string().email("E-mail Invalido").or(z.literal("")),
});

export type FormData = z.infer<typeof schema>;

interface FormState {
  step: number;
  setStep: (step: number) => void;
  previousStep: number[];
  setPreviousStep: (step: number[]) => void;
  skinTypes: string[];
  setSkinTypes: Dispatch<SetStateAction<string[]>>;
  skinDiseases: Record<string, number>;
  setSkinDiseases: Dispatch<SetStateAction<Record<string, number>>>;
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  onSubmit: SubmitHandler<FormData>;
}

const FormContext = createContext<FormState | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(0);
  const [previousStep, setPreviousStep] = useState<number[]>([]);
  const [skinTypes, setSkinTypes] = useState<string[]>([]);
  const [skinDiseases, setSkinDiseases] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState<FormData>({
    prefill: true,
    confirmation: false,
    name: "",
    age: NaN,
    storeImage: false,
    email: "",
    skinDiseases: {},
    skinTypes: [],
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      const serializedDiseases = [];

      for (let k in formData.skinDiseases) {
        serializedDiseases.push({
          skin_disease: k,
          level: formData.skinDiseases[k],
        });
      }

      return axios.post("forms/", {
        skin_types: formData.skinTypes,
        user_email: formData.email,
        informed_age: formData.age,
        user_name: formData.name,
        skin_diseases: serializedDiseases,
        autorized: formData.confirmation,
        facial_analyzis: "",
      });
    },
    onSuccess: (data) => {
      router.navigate({
        to: "/products",
        search: { form_id: data.data.form_id },
      });
      mutation.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Algo deu errado :(",
        description:
          "Por favor tente novamente mais tarde ou entre em contato com um dos nossos administradores.",
      });
      mutation.reset();
    },
  });

  const router = useRouter();

  const methods = useForm<FormData>({
    defaultValues: formData,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    mutation.mutate(data);
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <FormContext.Provider
      value={{
        step,
        setStep,
        formData,
        setFormData: updateFormData,
        onSubmit,
        previousStep,
        setPreviousStep,
        skinTypes,
        setSkinTypes,
        skinDiseases,
        setSkinDiseases,
      }}
    >
      <RHFProvider {...methods}>{children}</RHFProvider>
    </FormContext.Provider>
  );
};

export const useFormState = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormState must be used within a FormProvider");
  return context;
};
