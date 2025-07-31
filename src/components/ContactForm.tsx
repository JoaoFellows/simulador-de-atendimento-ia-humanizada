import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Bot, User, Loader2 } from "lucide-react";

const formSchema = z.object({
  nomeEmpresa: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
  segmento: z.string().min(1, "Selecione um segmento"),
  produtoServico: z.string().min(2, "Produto/serviço deve ter pelo menos 2 caracteres"),
  tipoAtendimento: z.string().min(1, "Selecione um tipo de atendimento"),
});

interface Message {
  text: string;
  isBot: boolean;
}

const ContactForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingIsBot, setTypingIsBot] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeEmpresa: "",
      segmento: "",
      produtoServico: "",
      tipoAtendimento: "",
    },
  });

  const simulateTyping = (duration: number) => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve(void 0);
      }, duration);
    });
  };

  const displayMessages = async (conversation: string) => {
    const conversationLines = conversation.split('\n').filter(line => line.trim() && !line.trim().startsWith('---'));
    setMessages([]);
    
    for (let i = 0; i < conversationLines.length; i++) {
      const line = conversationLines[i];
      const isBot = line.includes('Atendente:') || line.includes('Bot:') || line.includes('Assistente:');
      const text = line.replace(/^(Cliente:|Atendente:|Bot:|Assistente:)\s*/, '');
      
      if (text.trim()) {
        // Define quem está "digitando" baseado na mensagem atual
        setTypingIsBot(isBot);
        
        await simulateTyping(1500 + Math.random() * 1000);
        setMessages(prev => [...prev, { text, isBot }]);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsModalOpen(true);
    
    try {
      const response = await fetch('https://joaofellows.app.n8n.cloud/webhook/simulador-ia-conversa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Erro na chamada da API');
      }

      const data = await response.json();
      const conversationContent = data.choices[0].message.content;
      await displayMessages(conversationContent);
      
      toast.success("Simulação concluída!");
      form.reset();
    } catch (error) {
      toast.error("Erro ao simular atendimento. Tente novamente.");
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="contact-form-section" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Simule seu Atendimento
            </h2>
            <p className="text-muted-foreground">
              Preencha os dados abaixo e vamos simular como podemos ajudar sua empresa
            </p>
          </div>

          <div className="bg-background rounded-2xl p-8 shadow-elegant">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nomeEmpresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome da sua empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="segmento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Segmento da Empresa</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o segmento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="saude">Saúde</SelectItem>
                          <SelectItem value="varejo">Varejo</SelectItem>
                          <SelectItem value="tecnologia">Tecnologia</SelectItem>
                          <SelectItem value="educacao">Educação</SelectItem>
                          <SelectItem value="financeiro">Financeiro</SelectItem>
                          <SelectItem value="servicos">Serviços</SelectItem>
                          <SelectItem value="industria">Indústria</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="produtoServico"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produto ou Serviço</FormLabel>
                      <FormControl>
                        <Input placeholder="Descreva seu produto ou serviço" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipoAtendimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Atendimento</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de atendimento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="vendas">Vendas</SelectItem>
                          <SelectItem value="suporte">Suporte</SelectItem>
                          <SelectItem value="pos-venda">Pós-venda</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando simulação...
                    </>
                  ) : (
                    "Simular Atendimento"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Simulação de Atendimento</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-[60vh]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30 rounded-lg">
              {isLoading && messages.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Gerando conversa...</span>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${
                        message.isBot ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      {message.isBot && (
                        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isBot
                            ? 'bg-background border text-foreground'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      
                      {!message.isBot && (
                        <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className={`flex items-start gap-3 ${
                      typingIsBot ? 'justify-start' : 'justify-end'
                    }`}>
                      {typingIsBot && (
                        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      
                      <div className={`p-3 rounded-lg ${
                        typingIsBot 
                          ? 'bg-background border' 
                          : 'bg-primary'
                      }`}>
                        <div className="flex space-x-1">
                          <div className={`w-2 h-2 rounded-full animate-bounce ${
                            typingIsBot ? 'bg-muted-foreground' : 'bg-primary-foreground'
                          }`} style={{ animationDelay: '0ms' }}></div>
                          <div className={`w-2 h-2 rounded-full animate-bounce ${
                            typingIsBot ? 'bg-muted-foreground' : 'bg-primary-foreground'
                          }`} style={{ animationDelay: '150ms' }}></div>
                          <div className={`w-2 h-2 rounded-full animate-bounce ${
                            typingIsBot ? 'bg-muted-foreground' : 'bg-primary-foreground'
                          }`} style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                      
                      {!typingIsBot && (
                        <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactForm;