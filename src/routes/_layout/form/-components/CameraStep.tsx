import { Card, CardContent } from "@/components/ui/card";

import { useFormState, type FormData } from "./FormContext";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Camera, type CameraOptions } from "@mediapipe/camera_utils";
import {
  FaceDetection,
  type InputImage,
  type NormalizedRect,
} from "@mediapipe/face_detection";
import { toast } from "@/components/ui/use-toast";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

import Webcam from "react-webcam";
import axios from "axios";

import React from "react";
import { CameraIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FaceMaskComponent from "@/components/ui/faceMask";
import Instructions from "./InstructionsStep";

function CameraStep() {
  const { handleSubmit } = useFormContext<FormData>();
  const { onSubmit, formData, setFormData } = useFormState();
  const webcamRef = React.useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [understood, setUnderstood] = React.useState(false);
  const [facesDetected, setFacesDetected] = React.useState(0);
  const [boundingBox, setBoundingBox] = React.useState<NormalizedRect>();
  const [faceDetection, setFaceDetection] = React.useState<FaceDetection>();
  const [isBigEnough, setIsBigEnough] = React.useState(false);

  const [camera, setCamera] = React.useState<Camera>();

  React.useEffect(() => {
    setTimeout(() => {
      setUnderstood(true);
    }, 13000);
  }, []);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    if (imageSrc) {
      setIsLoading(true);
      camera?.start();
      setImageSrc("");
    } else {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        camera?.stop();
        setImageSrc(imageSrc);
      }
    }
  }, [webcamRef, setImageSrc, imageSrc, camera]);

  var pictureLandmarks: any;
  React.useEffect(() => {
    const faceDetection = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.85,
    });

    faceDetection.onResults((results) => {
      setFacesDetected(results.detections.length);
      results.detections[0] &&
        setBoundingBox(results.detections[0].boundingBox);
      pictureLandmarks = results.detections[0]
        ? results.detections[0].landmarks
        : pictureLandmarks;
      setIsLoading(false);
    });
    setFaceDetection(faceDetection);
  }, []);

  React.useEffect(()=>{
    return () => {
      camera?.stop()
    }
  },[camera])

  React.useEffect(() => {
    if (faceDetection && !camera && understood) {
      const camera = new Camera(
        webcamRef?.current?.video as HTMLVideoElement,
        {
          onFrame: async () => {
            await faceDetection.send({
              image: webcamRef?.current?.video as InputImage,
            });
          },
          ...videoConstraints,
        } as CameraOptions,
      );
      setCamera(camera);
      camera.start();
    }
  }, [faceDetection, imageSrc, understood]);

  React.useEffect(() => {
    if (facesDetected === 1 && boundingBox) {
      if (
        boundingBox.width > 0.25 &&
        boundingBox.xCenter > 0.4 &&
        boundingBox.xCenter < 0.6 &&
        boundingBox.yCenter > 0.5 &&
        boundingBox.yCenter < 0.65
      ) {
        return setIsBigEnough(true);
      }
    }
    setIsBigEnough(false);
  }, [facesDetected, boundingBox]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const form = new FormData();
      form.append("autorized_to_store", data.storeImage);
      const image = await fetch(data.image);
      const file = await image.blob();
      form.append("image", file, "image.jpeg");

      return axios.post("analysis/", form);
    },
    onSuccess: (data) => {
      setFormData({ facialAnalysis: data.data.analysis_id });
      mutation.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Algo deu errado com sua foto :(",
        description:
          "Por favor tente novamente mais tarde ou entre em contato com um dos nossos administradores.",
      });
      mutation.reset();
    },
  });

  const submitPicture = () => {
    camera?.stop();
    mutation.mutate({ storeImage: formData.storeImage, image: imageSrc });
  };

  return (
    <Card className="relative flex h-[600px] w-11/12 max-w-3xl flex-col justify-between rounded-lg border">
      <FormHeader
        title="Analise automática"
        description="Para garantir um melhor resultado recomendamos que siga as seguintes instruções:"
      />
      <CardContent className="flex flex-grow flex-col overflow-hidden p-4 md:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex h-full flex-col"
        >
          <div className="flex flex-grow overflow-hidden rounded-lg">
            <div className={imageSrc ? "w-full" : "hidden"}>
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
            </div>
            <div className={!imageSrc && understood ? "w-full" : "hidden"}>
              <FaceMaskComponent />
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
                className="absolute bottom-4 right-4 z-20"
                disabled={!isBigEnough || isLoading}
              >
                <CameraIcon />
              </Button>
            </div>
            <div className={!understood ? "w-full" : "hidden"}>
              <Instructions setUnderstood={setUnderstood} />
            </div>
          </div>
        </form>
      </CardContent>
      <FormFooter
        onHandleBack={() => camera?.stop()}
        disableContinue={imageSrc === "" || !understood}
        nextStep={2}
        onHandleNext={submitPicture}
      />
    </Card>
  );
}

export default CameraStep;
