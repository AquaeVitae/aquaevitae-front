import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import Webcam from "react-webcam";

export const Route = createFileRoute("/camera")({
  component: CameraPage,
});

function CameraPage() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="m-8 w-full md:w-4/5">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-4xl">Formulário de pele</CardTitle>
          <CardDescription className="text-center">
            Preencha um formulário e descubra os produtos mais indicados para
            cuidar da sua pele
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <Webcam
              audio={false}
              height={1080}
              screenshotFormat="image/jpeg"
              width={1920}
              mirrored={true}
              videoConstraints={videoConstraints}
              className="rounded-lg"
            />
            <button
              onClick={() => {
                const webcamRef = React.createRef<Webcam>();
                const imageSrc = webcamRef.current?.getScreenshot();
                console.log(imageSrc);
              }}
            >
              Capture photo
            </button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant="expandIcon"
            Icon={() => <Camera size={16} />}
            iconPlacement="right"
          >
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
