import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";

export default function Instructions({ setUnderstood }: any) {
  const terms = {
    firstParagraph: "A fotografia deve ser do seu rosto de frente e alinhado;",
    secondParagraph: "Realize a fotografia de frente para a luz;",
    thirdParagraph:
      "Não utilize nenhum tipo de acessório (óculos, boné, etc) e/ou maquiagem no momento da fotografia;",
    forthParagraph: "Se certifique que não há nada cobrindo o seu rosto;",
    footer:
      "Lembrando que a imagem enviada será utilizada única e exclusivamente para gerar seu plano de produtos exclusivo ;)",
  };

  const createMarkup = (html: any) => {
    return { __html: html };
  };

  return (
    <CardDescription className="flex h-full w-full items-start justify-start bg-card bg-opacity-40">
      <div className="flex h-full flex-col items-end justify-start gap-6 p-8">
        <div className="mb-6 flex flex-col gap-4">
          <ul className="list-inside list-disc space-y-2">
            <li
              className="text-xs md:text-sm"
              dangerouslySetInnerHTML={createMarkup(terms.firstParagraph)}
            />
            <li
              className="text-xs md:text-sm"
              dangerouslySetInnerHTML={createMarkup(terms.secondParagraph)}
            />
            <li
              className="text-xs md:text-sm"
              dangerouslySetInnerHTML={createMarkup(terms.thirdParagraph)}
            />
            <li
              className="text-xs md:text-sm"
              dangerouslySetInnerHTML={createMarkup(terms.forthParagraph)}
            />
          </ul>
          <p
            className="text-xs md:text-sm"
            dangerouslySetInnerHTML={createMarkup(terms.footer)}
          />
        </div>
        <Button
          variant="link"
          className="font-color text-xs"
          onClick={() => setUnderstood(true)}
        >
          Pular
        </Button>
      </div>
    </CardDescription>
  );
}
