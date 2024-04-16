import { Card, CardContent } from "@/components/ui/card";

import { useFormState, type FormData } from "./FormContext";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Camera, type CameraOptions } from "@mediapipe/camera_utils";
import {
  FaceDetector,
  type BoundingBox,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

import Webcam from "react-webcam";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

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
  const [boundingBox, setBoundingBox] = React.useState<BoundingBox>();
  const [faceDetection, setFaceDetection] = React.useState<FaceDetector>();
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

  React.useEffect(() => {
    const loadFaceDectector = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
      );
      const faceDetection = await FaceDetector.createFromOptions(vision, {
        minDetectionConfidence: 0.85,
        runningMode: "VIDEO",
        baseOptions: {
          delegate: "CPU",
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
        },
      });
      setFaceDetection(faceDetection);
    };
    loadFaceDectector();
  }, []);

  React.useEffect(() => {
    return () => {
      camera?.stop();
    };
  }, [camera]);

  React.useEffect(() => {
    if (faceDetection && !camera) {
      const camera = new Camera(
        webcamRef?.current?.video as HTMLVideoElement,
        {
          onFrame: () => {
            const results = faceDetection.detectForVideo(
              webcamRef?.current?.video as HTMLVideoElement,
              webcamRef?.current?.video?.currentTime as number,
            );
            setFacesDetected(results.detections.length);
            results.detections[0] &&
              setBoundingBox(results.detections[0].boundingBox);

            if (isLoading) setIsLoading(false);
          },
          ...videoConstraints,
        } as CameraOptions,
      );
      setCamera(camera);
      camera.start();
    }
  }, [faceDetection, imageSrc]);

  React.useEffect(() => {
    if (facesDetected === 1 && boundingBox) {
      if (
        boundingBox.width > 330 &&
        boundingBox.originX > 430 &&
        boundingBox.originX < 510 &&
        boundingBox.originY < 300 &&
        boundingBox.originY > 200
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
                screenshotQuality={1}
                disablePictureInPicture={true}
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
