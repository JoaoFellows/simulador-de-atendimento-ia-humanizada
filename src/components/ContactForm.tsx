import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { toast } from "sonner";

const formSchema = z.object({
  nomeEmpresa: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
  segmento: z.string().min(1, "Selecione um segmento"),
  produtoServico: z.string().min(2, "Produto/serviço deve ter pelo menos 2 caracteres"),
  tipoAtendimento: z.string().min(1, "Selecione um tipo de atendimento"),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeEmpresa: "",
      segmento: "",
      produtoServico: "",
      tipoAtendimento: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Simulação iniciada! Entraremos em contato em breve.");
    console.log(values);
    form.reset();
  }

  return (
    <section className="py-24 bg-card">
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

                <Button type="submit" className="w-full" size="lg">
                  Simular Atendimento
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;