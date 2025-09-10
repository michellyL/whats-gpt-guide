import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  FileText, 
  Users, 
  TrendingUp, 
  Bot, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Zap
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  status?: "success" | "warning" | "default";
}

const MetricCard = ({ title, value, description, icon, trend, status = "default" }: MetricCardProps) => {
  const getStatusColors = () => {
    switch (status) {
      case "success":
        return "bg-gradient-success text-success-foreground shadow-glow";
      case "warning":
        return "bg-gradient-to-br from-warning to-warning-light text-warning-foreground";
      default:
        return "bg-gradient-primary text-primary-foreground";
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-medium hover:shadow-large transition-all duration-300 animate-slide-up">
      <CardHeader className={`${getStatusColors()} pb-3`}>
        <div className="flex items-center justify-between">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            {icon}
          </div>
          {trend && (
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {trend}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-card-foreground">{value}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">Dashboard do Chatbot RAG</h1>
          <p className="text-muted-foreground">
            Monitore o desempenho do seu assistente de WhatsApp em tempo real
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-success/10 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">Sistema Online</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Conversas Hoje"
          value="2,847"
          description="↗️ +12% desde ontem"
          icon={<MessageSquare className="h-5 w-5" />}
          trend="+12%"
          status="success"
        />
        <MetricCard
          title="Documentos Ativos"
          value="156"
          description="Base de conhecimento atual"
          icon={<FileText className="h-5 w-5" />}
          status="default"
        />
        <MetricCard
          title="Usuários Únicos"
          value="1,239"
          description="Últimas 24 horas"
          icon={<Users className="h-5 w-5" />}
          trend="+8%"
          status="default"
        />
        <MetricCard
          title="Taxa de Resolução"
          value="94.2%"
          description="Respostas satisfatórias"
          icon={<CheckCircle className="h-5 w-5" />}
          trend="+2.1%"
          status="success"
        />
      </div>

      {/* Performance Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Response Time */}
        <Card className="shadow-medium hover:shadow-large transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Clock className="h-5 w-5 text-accent-foreground" />
              Tempo de Resposta
            </CardTitle>
            <CardDescription>Velocidade média das respostas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-card-foreground">1.2s</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Meta: &lt;2s</span>
                <span className="text-success">Excelente</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* RAG Performance */}
        <Card className="shadow-medium hover:shadow-large transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Bot className="h-5 w-5 text-accent-foreground" />
              Performance RAG
            </CardTitle>
            <CardDescription>Qualidade das buscas vetoriais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-card-foreground">98.7%</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Precisão</span>
                <span className="text-success">Otimal</span>
              </div>
              <Progress value={98.7} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* API Usage */}
        <Card className="shadow-medium hover:shadow-large transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Zap className="h-5 w-5 text-accent-foreground" />
              Uso da API OpenAI
            </CardTitle>
            <CardDescription>Tokens consumidos hoje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-card-foreground">847K</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Limite: 1M</span>
                <span className="text-warning">84% usado</span>
              </div>
              <Progress value={84.7} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <TrendingUp className="h-5 w-5 text-accent-foreground" />
            Atividade Recente
          </CardTitle>
          <CardDescription>Últimas interações e eventos do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "14:32",
                message: "Novo documento adicionado: Manual de Atendimento v2.0",
                type: "info",
                icon: <FileText className="h-4 w-4" />
              },
              {
                time: "14:28",
                message: "Pico de conversas detectado (+300% em 5min)",
                type: "warning",
                icon: <AlertTriangle className="h-4 w-4" />
              },
              {
                time: "14:15",
                message: "Base vetorial reindexada com sucesso",
                type: "success",
                icon: <CheckCircle className="h-4 w-4" />
              },
              {
                time: "13:45",
                message: "1000+ conversas processadas na última hora",
                type: "info",
                icon: <MessageSquare className="h-4 w-4" />
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'success' ? 'bg-success/10 text-success' :
                  activity.type === 'warning' ? 'bg-warning/10 text-warning' :
                  'bg-accent/10 text-accent-foreground'
                }`}>
                  {activity.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-card-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;