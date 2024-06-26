import { Button } from "@/components/ui/button";
import { useFormState } from "./FormContext";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { useFormContext } from "react-hook-form";

interface FormFooterProps {
  hideBack?: boolean;
  hideContinue?: boolean;
  disableBack?: boolean;
  disableContinue?: boolean;
  nextStep: number;
  onHandleBack?: () => void;
  onHandleNext?: () => void;
  fieldsToValidate?: string[];
}

function FormFooter({
  hideBack,
  hideContinue,
  disableBack,
  disableContinue,
  onHandleBack,
  onHandleNext,
  nextStep,
  fieldsToValidate = [],
}: FormFooterProps) {
  const { step, setStep, onSubmit, formData } = useFormState();
  const { trigger } = useFormContext();
  const router = useRouter();

  const handleBack = () => {
    if (step != 2 && step != 0) {
      setStep(step - 1);
    } else if (window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/" });
    }
    onHandleBack?.();
  };

  const handleNext = async () => {
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (step === 4) {
        onSubmit(formData);
      } else {
        setStep(nextStep);
      }
      onHandleNext?.();
    }
  };

  return (
    <div className="flex p-4 pt-0 md:p-6 md:pt-0">
      {!hideBack && (
        <Button
          size="sm"
          variant="ghost"
          iconPlacement="left"
          Icon={() => <ArrowLeftIcon size={16} />}
          disabled={disableBack}
          className="left-0 mr-auto"
          onClick={handleBack}
        >
          {step === 0 ? "Sair" : "Voltar"}
        </Button>
      )}
      {!hideContinue && (
        <Button
          size="sm"
          type="submit"
          variant="expandIcon"
          iconPlacement="right"
          Icon={() => <ArrowRightIcon size={16} />}
          disabled={disableContinue}
          className="ml-auto mr-0"
          onClick={handleNext}
        >
          {step === 4 ? "Enviar" : "Continuar"}
        </Button>
      )}
    </div>
  );
}

export default FormFooter;
