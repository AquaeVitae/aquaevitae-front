import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface FormHeaderProps {
  title: string;
  description: string;
}

function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <CardHeader className="flex flex-col p-4 pb-0 md:p-6 md:pb-0">
      <CardTitle className="text-xl md:text-3xl">{title}</CardTitle>
      <CardDescription className="text-left text-xs md:text-sm">
        {description}
      </CardDescription>
    </CardHeader>
  );
}

export default FormHeader;
