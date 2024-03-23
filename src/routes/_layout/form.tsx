import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

import { createFileRoute } from "@tanstack/react-router";
import { SquarePen, Camera, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_layout/form")({
  component: Form,
});

function Form() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Card className="relative m-1 flex h-[500px] w-11/12 max-w-4xl flex-col justify-between rounded-lg border">
        <CardHeader className="flex flex-col p-4 md:p-6">
          <CardTitle className="text-xl md:text-3xl">
            Formulário de pele
          </CardTitle>
          <CardDescription className="text-left text-xs md:text-sm">
            Preencha um formulário e descubra os produtos mais indicados para
            cuidar da sua pele
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-full flex-col justify-between p-4 pt-0 md:p-6">
          <RadioGroup
            defaultValue="card"
            className="flex flex-col gap-2 md:gap-4"
            onValueChange={setSelectedOption}
          >
            <div>
              <RadioGroupItem
                value="feature-extraction"
                id="feature-extraction"
                className="peer sr-only"
              />
              <Label
                htmlFor="feature-extraction"
                className="flex flex-row items-center gap-4 rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Camera className="h-6 w-6 md:h-8 md:w-8" />
                <div className="flex flex-1 flex-col gap-1 text-left text-xs md:text-sm">
                  <div className="font-bold">
                    Fazer a extração automática
                    <Badge
                      variant="secondary"
                      className="border-card-background -mb-1 ml-2 animate-shine border bg-gradient-to-r from-card via-background/50 to-card bg-[length:400%_100%]"
                    >
                      IA
                    </Badge>
                  </div>
                  <div>
                    Pré preencher formulário com extração de características
                    faciais com fotografia
                  </div>
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="manual"
                id="manual"
                className="peer sr-only "
              />
              <Label
                htmlFor="manual"
                className="flex flex-row items-center gap-4 rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <SquarePen className="h-6 w-6 md:h-8 md:w-8" />
                <div className="flex flex-1 flex-col gap-1 text-left text-xs md:text-sm">
                  <p className="font-bold">Preencher formulário manualmente</p>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
          <div className="items-top ml-2 flex space-x-2">
            <Checkbox id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-left text-xs font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-sm"
              >
                Aceito que minhas respostas sejam utilizadas para a criação de
                um perfil de pele
              </label>
              {/* <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p> */}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0 md:p-6">
          <Button
            size="sm"
            variant="ghost"
            iconPlacement="right"
            Icon={() => <ArrowRightIcon size={16} />}
            disabled={!selectedOption}
          >
            Voltar
          </Button>
          <Button
            size="sm"
            variant="expandIcon"
            iconPlacement="right"
            Icon={() => <ArrowRightIcon size={16} />}
            disabled={!selectedOption}
          >
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
