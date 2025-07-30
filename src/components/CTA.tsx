import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Junte-se a milhares de pessoas que já transformaram suas ideias em realidade. 
            Comece hoje mesmo e veja a diferença.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group">
              Comece gratuitamente
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Falar com especialista
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Sem compromisso • Cancele quando quiser • Suporte 24/7
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;