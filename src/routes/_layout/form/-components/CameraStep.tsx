import { Card, CardContent } from "@/components/ui/card";

import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

import Webcam from "react-webcam";

function CameraStep() {
  const { handleSubmit } = useFormContext<FormData>();
  const { onSubmit } = useFormState();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <Card className="relative flex h-[500px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Captura Automática de Dados via Câmera"
        description="Certifique-se de estar em um local bem iluminado e sem acessórios como óculos ou bonés. Tire uma foto e permita que nossa inteligência artificial preencha o formulário automaticamente."
      />
      <CardContent className="flex h-full flex-col p-4 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full max-h-full">
          <div className="flex h-full max-h-[284px] w-full overflow-hidden rounded-lg">
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              mirrored={true}
              videoConstraints={videoConstraints}
              className="h-full w-full self-center object-cover"
            />
          </div>
        </form>
      </CardContent>
      <FormFooter />
    </Card>
  );
}

export default CameraStep;
