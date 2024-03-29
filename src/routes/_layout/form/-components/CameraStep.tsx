import { Card, CardContent } from "@/components/ui/card";

import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

import Webcam from "react-webcam";

function CameraStep() {
  const { handleSubmit, watch } = useFormContext<FormData>();
  const { onSubmit } = useFormState();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <Card className="relative m-1 flex h-[500px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Captura Automática de Dados via Câmera"
        description="Certifique-se de estar em um local bem iluminado e sem acessórios como óculos ou bonés. Tire uma foto e permita que nossa inteligência artificial preencha o formulário automaticamente."
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full max-h-full">
          <div className="flex h-full w-full max-h-[284px] overflow-hidden rounded-lg">
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              mirrored={true}
              videoConstraints={videoConstraints}
              className="object-cover h-full self-center w-full"
            />
          </div>
        </form>
      </CardContent>
      <FormFooter disableContinue={!watch("confirmation")} />
    </Card>
  );
}

export default CameraStep;
