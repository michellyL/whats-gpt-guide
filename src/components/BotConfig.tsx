import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  Bot,
  Zap,
  Shield,
  MessageSquare,
  Sliders,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

const BotConfig = () => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock configuration state
  const [config, setConfig] = useState({
    // Bot Personality
    botName: "AssistenteRAG",
    personality: "profissional",
    greeting: "Olá! Sou o AssistenteRAG, como posso ajudá-lo hoje?",
    fallbackMessage: "Desculpe, não consegui encontrar uma resposta para sua pergunta. Você pode reformulá-la ou entrar em contato com nossa equipe de suporte.",
    
    // OpenAI Settings
    openaiApiKey: "sk-proj-****************************",
    model: "gpt-4-turbo-preview",
    temperature: 0.7,
    maxTokens: 1000,
    
    // RAG Settings
    similarityThreshold: 0.75,
    maxContextChunks: 5,
    reranking: true,
    
    // WhatsApp Settings
    whatsappToken: "EAA****************************",
    webhookUrl: "https://myapp.herokuapp.com/webhook",
    verifyToken: "my_verify_token_123",
    
    // Features
    enableTypingIndicator: true,
    enableReadReceipts: true,
    enableFallbackToHuman: true,
    enableAnalytics: true,
    
    // Limits
    rateLimitPerUser: 10,
    rateLimitWindow: 60, // seconds
    maxMessageLength: 4000
  });

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Configurações salvas",
      description: "As configurações do bot foram atualizadas com sucesso.",
    });
    
    setIsLoading(false);
  };

  const handleTest = async () => {
    setIsLoading(true);
    
    // Simulate test
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Teste concluído",
      description: "Todas as conexões estão funcionando corretamente.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">Configuração do Bot</h1>
          <p className="text-muted-foreground">
            Configure o comportamento e integração do seu assistente RAG
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleTest}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Testar Conexões
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="gap-2 bg-gradient-primary hover:shadow-glow"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Salvar Configurações
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Bot Personality */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Bot className="h-5 w-5 text-accent-foreground" />
              Personalidade do Bot
            </CardTitle>
            <CardDescription>Configure como o bot se comporta e responde</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="botName">Nome do Bot</Label>
              <Input
                id="botName"
                value={config.botName}
                onChange={(e) => setConfig({...config, botName: e.target.value})}
                placeholder="Nome do seu assistente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="greeting">Mensagem de Saudação</Label>
              <Textarea
                id="greeting"
                value={config.greeting}
                onChange={(e) => setConfig({...config, greeting: e.target.value})}
                placeholder="Como o bot deve cumprimentar os usuários"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fallback">Mensagem de Fallback</Label>
              <Textarea
                id="fallback"
                value={config.fallbackMessage}
                onChange={(e) => setConfig({...config, fallbackMessage: e.target.value})}
                placeholder="Quando o bot não consegue responder"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>Temperatura da IA ({config.temperature})</Label>
              <Slider
                value={[config.temperature]}
                onValueChange={(value) => setConfig({...config, temperature: value[0]})}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                0 = Mais conservador, 1 = Mais criativo
              </p>
            </div>
          </CardContent>
        </Card>

        {/* API Integrations */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Zap className="h-5 w-5 text-accent-foreground" />
              Integrações da API
            </CardTitle>
            <CardDescription>Configure as chaves e tokens das APIs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="openaiKey">Chave da API OpenAI</Label>
              <div className="relative">
                <Input
                  id="openaiKey"
                  type={showApiKey ? "text" : "password"}
                  value={config.openaiApiKey}
                  onChange={(e) => setConfig({...config, openaiApiKey: e.target.value})}
                  placeholder="sk-proj-..."
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappToken">Token do WhatsApp</Label>
              <Input
                id="whatsappToken"
                type="password"
                value={config.whatsappToken}
                onChange={(e) => setConfig({...config, whatsappToken: e.target.value})}
                placeholder="EAA..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookUrl">URL do Webhook</Label>
              <Input
                id="webhookUrl"
                value={config.webhookUrl}
                onChange={(e) => setConfig({...config, webhookUrl: e.target.value})}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verifyToken">Token de Verificação</Label>
              <Input
                id="verifyToken"
                value={config.verifyToken}
                onChange={(e) => setConfig({...config, verifyToken: e.target.value})}
                placeholder="Token secreto para verificação"
              />
            </div>
          </CardContent>
        </Card>

        {/* RAG Settings */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Sliders className="h-5 w-5 text-accent-foreground" />
              Configurações RAG
            </CardTitle>
            <CardDescription>Ajuste como o sistema busca e usa informações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Limite de Similaridade ({config.similarityThreshold})</Label>
              <Slider
                value={[config.similarityThreshold]}
                onValueChange={(value) => setConfig({...config, similarityThreshold: value[0]})}
                max={1}
                min={0}
                step={0.01}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Quão similar o conteúdo deve ser para ser considerado relevante
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxChunks">Máximo de Chunks por Contexto</Label>
              <Input
                id="maxChunks"
                type="number"
                value={config.maxContextChunks}
                onChange={(e) => setConfig({...config, maxContextChunks: parseInt(e.target.value)})}
                min="1"
                max="10"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="reranking">Reranking de Resultados</Label>
                <p className="text-xs text-muted-foreground">
                  Melhora a qualidade dos resultados de busca
                </p>
              </div>
              <Switch
                id="reranking"
                checked={config.reranking}
                onCheckedChange={(checked) => setConfig({...config, reranking: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features & Limits */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Shield className="h-5 w-5 text-accent-foreground" />
              Funcionalidades e Limites
            </CardTitle>
            <CardDescription>Configure recursos e limites de uso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  key: "enableTypingIndicator",
                  label: "Indicador de Digitação",
                  description: "Mostra quando o bot está 'digitando'"
                },
                {
                  key: "enableReadReceipts",
                  label: "Confirmação de Leitura",
                  description: "Marca mensagens como lidas"
                },
                {
                  key: "enableFallbackToHuman",
                  label: "Fallback para Humano",
                  description: "Transfere para atendente quando necessário"
                },
                {
                  key: "enableAnalytics",
                  label: "Analytics Avançado",
                  description: "Coleta dados detalhados de uso"
                }
              ].map((feature) => (
                <div key={feature.key} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor={feature.key}>{feature.label}</Label>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <Switch
                    id={feature.key}
                    checked={config[feature.key as keyof typeof config] as boolean}
                    onCheckedChange={(checked) => setConfig({...config, [feature.key]: checked})}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Limite por Usuário/min</Label>
                  <Input
                    id="rateLimit"
                    type="number"
                    value={config.rateLimitPerUser}
                    onChange={(e) => setConfig({...config, rateLimitPerUser: parseInt(e.target.value)})}
                    min="1"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLength">Tamanho Máx. Mensagem</Label>
                  <Input
                    id="maxLength"
                    type="number"
                    value={config.maxMessageLength}
                    onChange={(e) => setConfig({...config, maxMessageLength: parseInt(e.target.value)})}
                    min="100"
                    max="8000"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Status */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <MessageSquare className="h-5 w-5 text-accent-foreground" />
            Status das Conexões
          </CardTitle>
          <CardDescription>Verifique se todas as integrações estão funcionando</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { service: "OpenAI API", status: "connected", latency: "120ms" },
              { service: "WhatsApp API", status: "connected", latency: "85ms" },
              { service: "Base Vetorial", status: "connected", latency: "45ms" },
              { service: "Webhook", status: "warning", latency: "230ms" }
            ].map((connection, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-card-foreground">{connection.service}</h4>
                  {connection.status === "connected" ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  )}
                </div>
                <div className="space-y-1">
                  <Badge 
                    variant="secondary"
                    className={connection.status === "connected" 
                      ? "bg-success/10 text-success border-success/20" 
                      : "bg-warning/10 text-warning border-warning/20"
                    }
                  >
                    {connection.status === "connected" ? "Conectado" : "Atenção"}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Latência: {connection.latency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BotConfig;