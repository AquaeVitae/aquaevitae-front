import avLogo from "@/assets/av.svg";
import ipbLogo from "@/assets/ipb.svg";
import utfprLogo from "@/assets/utfpr.svg";
import bpiLogo from "@/assets/bpi.svg";
import fctLogo from "@/assets/fct.svg";
import flcLogo from "@/assets/flc.svg";

export const SPONSORS = [
  {
    icon: <img src={bpiLogo} alt="BPI logo" className="h-12" />,
    link: "https://www.bancobpi.pt/particulares",
  },
  {
    icon: <img src={fctLogo} alt="FCT logo" className="h-14" />,
    link: "https://www.fct.pt/",
  },
  {
    icon: <img src={flcLogo} alt="FLC logo" className="h-12" />,
    link: "https://fundacaolacaixa.pt/pt/",
  },
  {
    icon: <img src={avLogo} alt="AV logo" className="h-16" />,
    link: "https://aquaevitae.pt/",
  },
  {
    icon: <img src={ipbLogo} alt="IPB logo" className="h-12" />,
    link: "https://portal3.ipb.pt/index.php/pt/ipb",
  },
  {
    icon: <img src={utfprLogo} alt="UTFPR logo" className="h-12" />,
    link: "https://www.utfpr.edu.br/",
  },
];