import { useState, useEffect } from 'react';

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000); // Atualiza a cada minuto para manter o ano atualizado
    return () => clearInterval(intervalId);
  }, []); // Apenas é executado uma vez após a montagem do componente

  return (
    <footer className="border-border70 sticky bottom-0 z-50 py-4 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-8 max-w-screen-2xl items-center justify-between px-8">
        <div>
          <a href="https://aquavitaeproject.eu/" target="_blank" rel="noopener noreferrer">AQUAVITAE</a>
          <p>Água Termal como Fonte de Vida e Saúde</p>
        </div>
        <div className='text-sm'>
          <p className="float-right">{currentYear}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;