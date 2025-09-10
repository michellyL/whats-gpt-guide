import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Clock,
  Users,
  Zap,
  Target,
  Download,
  Calendar
} from "lucide-react";

const Analytics = () => {
  // Mock data for charts - in real app, this would come from API
  const chartData = {
    conversationsPerHour: [
      { hour: "00:00", conversations: 12 },
      { hour: "04:00", conversations: 8 },
      { hour: "08:00", conversations: 45 },
      { hour: "12:00", conversations: 78 },
      { hour: "16:00", conversations: 92 },
      { hour: "20:00", conversations: 34 }
    ],
    topTopics: [
      { topic: "Rastreamento de Pedidos", count: 847, percentage: 28 },
      { topic: "Políticas de Troca", count: 623, percentage: 21 },
      { topic: "Informações de Produtos", count: 456, percentage: 15 },
      { topic: "Suporte Técnico", count: 334, percentage: 11 },
      { topic: "Cancelamentos", count: 267, percentage: 9 },
      { topic: "Outros", count: 473, percentage: 16 }
    ],
    satisfactionTrend: [
      { date: "01/01", positive: 85, negative: 15 },
      { date: "02/01", positive: 87, negative: 13 },
      { date: "03/01", positive: 91, negative: 9 },
      { date: "04/01", positive: 89, negative: 11 },
      { date: "05/01", positive: 94, negative: 6 },
      { date: "06/01", positive: 92, negative: 8 }
    ]
  };

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    positive = true 
  }: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    positive?: boolean;
  }) => (
    <Card className="shadow-medium hover:shadow-large transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-card-foreground">{value}</p>
            <div className="flex items-center gap-1">
              {positive ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-sm font-medium ${positive ? "text-success" : "text-destructive"}`}>
                {change}
              </span>
              <span className="text-sm text-muted-foreground">vs. ontem</span>
            </div>
          </div>
          <div className="p-3 bg-gradient-primary rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">Analytics do Chatbot</h1>
          <p className="text-muted-foreground">
            Análise detalhada do desempenho e uso do seu assistente
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Últimos 7 dias
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Conversas"
          value="12,847"
          change="+12.5%"
          icon={<MessageSquare className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title="Tempo Médio de Resposta"
          value="1.2s"
          change="-0.3s"
          icon={<Clock className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title="Usuários Ativos"
          value="3,456"
          change="+8.2%"
          icon={<Users className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title="Taxa de Sucesso"
          value="94.2%"
          change="+2.1%"
          icon={<Target className="h-6 w-6 text-white" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conversations per Hour */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <BarChart3 className="h-5 w-5 text-accent-foreground" />
              Conversas por Horário
            </CardTitle>
            <CardDescription>Distribuição de conversas ao longo do dia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.conversationsPerHour.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground w-12">
                    {data.hour}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${(data.conversations / 100) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-card-foreground w-8">
                    {data.conversations}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Topics */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <MessageSquare className="h-5 w-5 text-accent-foreground" />
              Tópicos Mais Discutidos
            </CardTitle>
            <CardDescription>Assuntos mais frequentes nas conversas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.topTopics.map((topic, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">
                      {topic.topic}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {topic.count}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {topic.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${topic.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Response Quality */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Target className="h-5 w-5 text-accent-foreground" />
              Qualidade das Respostas
            </CardTitle>
            <CardDescription>Avaliação dos usuários</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">94.2%</div>
              <p className="text-sm text-muted-foreground">Avaliações Positivas</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Muito Satisfeito</span>
                <span className="font-medium text-success">67%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Satisfeito</span>
                <span className="font-medium text-success">27%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Neutro</span>
                <span className="font-medium text-warning">4%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Insatisfeito</span>
                <span className="font-medium text-destructive">2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Usage */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Zap className="h-5 w-5 text-accent-foreground" />
              Uso da API
            </CardTitle>
            <CardDescription>Consumo de tokens OpenAI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-card-foreground mb-2">847K</div>
              <p className="text-sm text-muted-foreground">Tokens hoje</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Limite diário</span>
                  <span className="font-medium">1M tokens</span>
                </div>
                <div className="bg-muted rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-success to-warning w-[84.7%] transition-all duration-500" />
                </div>
                <p className="text-xs text-warning">84.7% utilizado</p>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Custo estimado hoje</span>
                  <span className="font-medium text-card-foreground">$12.67</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <TrendingUp className="h-5 w-5 text-accent-foreground" />
              Saúde do Sistema
            </CardTitle>
            <CardDescription>Status dos componentes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { component: "API WhatsApp", status: "online", uptime: "99.9%" },
              { component: "OpenAI API", status: "online", uptime: "99.8%" },
              { component: "Base Vetorial", status: "online", uptime: "100%" },
              { component: "Servidor Principal", status: "online", uptime: "99.9%" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-card-foreground">
                    {item.component}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  {item.uptime}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;