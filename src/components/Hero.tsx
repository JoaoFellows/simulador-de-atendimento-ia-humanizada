import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import frontImage from "@/assets/front-image.jpg";

const Hero = () => {
  // Função para rolar até o ContactForm
  const scrollToContactForm = () => {
    const section = document.getElementById("contact-form-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Simulador de Atendimento
                <span className="bg-gradient-primary bg-clip-text text-transparent"> IA  </span> Humanizada
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Uma solução simples e elegante para levar seu negócio ao próximo nível. 
                Descubra como podemos ajudar você a alcançar seus objetivos.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" className="group" onClick={scrollToContactForm}>
                <Play className="mr-2 h-5 w-5" />
                Ver simulação
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img
                src={frontImage}
                alt="Hero"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;