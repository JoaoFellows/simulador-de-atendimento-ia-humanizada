import { Zap, Shield, Heart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Rápido e Eficiente",
      description: "Solução otimizada para entregar resultados em tempo recorde, sem comprometer a qualidade."
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Tecnologia de ponta com os mais altos padrões de segurança para proteger seus dados."
    },
    {
      icon: Heart,
      title: "Fácil de Usar",
      description: "Interface intuitiva e amigável, pensada para proporcionar a melhor experiência possível."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Por que escolher nossa solução?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desenvolvemos uma experiência única que combina simplicidade, segurança e performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4 p-6 rounded-xl hover:bg-accent/50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;