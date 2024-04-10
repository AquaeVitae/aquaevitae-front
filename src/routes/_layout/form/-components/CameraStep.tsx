import { Card, CardContent } from "@/components/ui/card";

import { FormData, useFormState } from "./FormContext";
import { useFormContext } from "react-hook-form";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

import Webcam from "react-webcam";

import React from "react";
import { CameraIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function CameraStep() {
  const { handleSubmit } = useFormContext<FormData>();
  const { onSubmit } = useFormState();
  const webcamRef = React.useRef(null);
  const [imageSrc, setImageSrc] = React.useState("");

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    if (imageSrc) {
      setImageSrc("");
    } else {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setImageSrc(imageSrc);
      }
    }
  }, [webcamRef, setImageSrc, imageSrc]);

  return (
    <Card className="relative flex h-[600px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Captura Automática de Dados via Câmera"
        description="Certifique-se de estar em um local bem iluminado e sem acessórios como óculos ou bonés. Tire uma foto e permita que nossa inteligência artificial preencha o formulário automaticamente."
      />
      <CardContent className="flex flex-grow flex-col overflow-hidden p-4 md:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex h-full flex-col"
        >
          <div className="flex flex-grow overflow-hidden rounded-lg">
            {imageSrc ? (
              <>
                <img
                  src={imageSrc}
                  alt="Captura da câmera"
                  className="h-full max-h-full w-full self-center object-cover"
                />
                <Button
                  onClick={capture}
                  variant="destructive"
                  size="icon"
                  className="absolute bottom-4 right-4 z-10"
                >
                  <TrashIcon />
                </Button>
              </>
            ) : (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  mirrored={true}
                  videoConstraints={videoConstraints}
                  className="h-full max-h-full w-full self-center object-cover"
                />
                <Button
                  onClick={capture}
                  variant="default"
                  size="icon"
                  className="absolute bottom-4 right-4 z-10"
                >
                  <CameraIcon />
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
      <FormFooter />
    </Card>
  );
}

export default CameraStep;
