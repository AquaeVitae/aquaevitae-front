import { createFileRoute } from "@tanstack/react-router";
import PrefillStep from "./-components/PrefillStep";
import CameraStep from "./-components/CameraStep";
import { FormProvider, useFormState } from "./-components/FormContext";
import SkinStep from "./-components/SkinStep";

export const Route = createFileRoute("/_layout/form/")({
  component: Form,
});

function ActiveStepFormComponent() {
  const { step } = useFormState();
  switch (step) {
    case 0:
      return <PrefillStep />;
    case 1:
      return <CameraStep />;
    case 2:
      return <SkinStep />;
    default:
      return null;
  }
}

function Form() {
  return (
    <FormProvider>
      <div className="z-50 flex h-full w-full flex-col items-center justify-center">
        <ActiveStepFormComponent />
      </div>
    </FormProvider>
  );
}
