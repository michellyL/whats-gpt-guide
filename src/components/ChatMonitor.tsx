import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  Users,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  User
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  userPhone: string;
  userName: string;
  lastMessage: string;
  lastMessageTime: string;
  status: "active" | "resolved" | "pending";
  messageCount: number;
  satisfaction?: "positive" | "negative" | "neutral";
  messages: ChatMessage[];
}

const ChatMonitor = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "resolved" | "pending">("all");

  // Mock data - replace with real API calls
  const conversations: Conversation[] = [
    {
      id: "1",
      userPhone: "+55 11 99999-1234",
      userName: "Maria Silva",
      lastMessage: "Obrigada! O problema foi resolvido.",
      lastMessageTime: "14:32",
      status: "resolved",
      messageCount: 8,
      satisfaction: "positive",
      messages: [
        { id: "1", type: "user", content: "Olá, preciso de ajuda com meu pedido", timestamp: "14:20", status: "read" },
        { id: "2", type: "bot", content: "Olá! Claro, posso ajudá-la. Qual é o número do seu pedido?", timestamp: "14:20" },
        { id: "3", type: "user", content: "É o pedido #12345", timestamp: "14:21", status: "read" },
        { id: "4", type: "bot", content: "Encontrei seu pedido! Vejo que foi enviado ontem às 16:30. O rastreamento mostra que está em trânsito e deve chegar hoje até às 18h.", timestamp: "14:22" },
        { id: "5", type: "user", content: "Perfeito! Muito obrigada", timestamp: "14:32", status: "read" },
        { id: "6", type: "bot", content: "De nada! Há mais alguma coisa em que posso ajudar?", timestamp: "14:32" },
        { id: "7", type: "user", content: "Não, está tudo certo", timestamp: "14:32", status: "read" },
        { id: "8", type: "bot", content: "Ótimo! Se precisar de mais alguma coisa, estarei aqui. Tenha um ótimo dia! 😊", timestamp: "14:32" }
      ]
    },
    {
      id: "2",
      userPhone: "+55 11 98888-5678",
      userName: "João Santos",
      lastMessage: "Ainda estou esperando uma resposta sobre a política de troca...",
      lastMessageTime: "14:28",
      status: "pending",
      messageCount: 5,
      satisfaction: "neutral",
      messages: [
        { id: "1", type: "user", content: "Qual é a política de troca de vocês?", timestamp: "14:15", status: "read" },
        { id: "2", type: "bot", content: "Nossa política de troca permite trocas em até 30 dias após a compra, desde que o produto esteja em perfeitas condições...", timestamp: "14:16" },
        { id: "3", type: "user", content: "E se o produto veio com defeito?", timestamp: "14:17", status: "read" },
        { id: "4", type: "bot", content: "Em caso de defeito, oferecemos troca imediata ou reembolso integral. Você precisa entrar em contato conosco em até 7 dias.", timestamp: "14:18" },
        { id: "5", type: "user", content: "Ainda estou esperando uma resposta sobre a política de troca...", timestamp: "14:28", status: "delivered" }
      ]
    },
    {
      id: "3", 
      userPhone: "+55 11 97777-9012",
      userName: "Ana Costa",
      lastMessage: "Como faço para cancelar minha assinatura?",
      lastMessageTime: "14:25",
      status: "active",
      messageCount: 3,
      messages: [
        { id: "1", type: "user", content: "Oi!", timestamp: "14:20", status: "read" },
        { id: "2", type: "bot", content: "Olá! Como posso ajudá-la hoje?", timestamp: "14:21" },
        { id: "3", type: "user", content: "Como faço para cancelar minha assinatura?", timestamp: "14:25", status: "delivered" }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = 
      conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.userPhone.includes(searchTerm) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const getStatusBadge = (status: Conversation["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary-foreground border-primary/20">Ativa</Badge>;
      case "resolved":
        return <Badge className="bg-success/10 text-success border-success/20">Resolvida</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
    }
  };

  const getSatisfactionIcon = (satisfaction?: Conversation["satisfaction"]) => {
    if (!satisfaction) return null;
    
    switch (satisfaction) {
      case "positive":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "negative":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">Monitor de Conversas</h1>
          <p className="text-muted-foreground">
            Acompanhe todas as conversas do WhatsApp em tempo real
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
            <MessageSquare className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              {conversations.filter(c => c.status === 'active').length} conversas ativas
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Users className="h-5 w-5 text-accent-foreground" />
                Conversas ({filteredConversations.length})
              </CardTitle>
              
              {/* Search and Filters */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar conversas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={statusFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("all")}
                  >
                    Todas
                  </Button>
                  <Button
                    variant={statusFilter === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("active")}
                  >
                    Ativas
                  </Button>
                  <Button
                    variant={statusFilter === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("pending")}
                  >
                    Pendentes
                  </Button>
                  <Button
                    variant={statusFilter === "resolved" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("resolved")}
                  >
                    Resolvidas
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-y-auto max-h-[calc(100vh-350px)]">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedConversation === conversation.id ? 'bg-muted border-l-4 border-l-primary-foreground' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {conversation.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-card-foreground truncate">
                              {conversation.userName}
                            </h4>
                            {getSatisfactionIcon(conversation.satisfaction)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {conversation.userPhone}
                          </p>
                          <p className="text-sm text-card-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {conversation.lastMessageTime}
                            </span>
                            {getStatusBadge(conversation.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat View */}
        <div className="lg:col-span-2">
          <Card className="h-full shadow-medium">
            {selectedConv ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {selectedConv.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-card-foreground">{selectedConv.userName}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {selectedConv.userPhone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedConv.status)}
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="overflow-y-auto max-h-[calc(100vh-350px)] p-4 space-y-4">
                    {selectedConv.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-2 max-w-[80%] ${
                          message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          <div className={`p-2 rounded-full ${
                            message.type === 'user' 
                              ? 'bg-success/10' 
                              : 'bg-primary/10'
                          }`}>
                            {message.type === 'user' ? 
                              <User className="h-4 w-4 text-success" /> : 
                              <Bot className="h-4 w-4 text-primary-foreground" />
                            }
                          </div>
                          <div className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-success text-success-foreground'
                              : 'bg-muted text-card-foreground'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs opacity-70">{message.timestamp}</span>
                              {message.type === 'user' && message.status && (
                                <div className="flex">
                                  <CheckCircle className={`h-3 w-3 ${
                                    message.status === 'read' ? 'text-success-foreground' : 'opacity-50'
                                  }`} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium text-card-foreground">
                      Selecione uma conversa
                    </h3>
                    <p className="text-muted-foreground">
                      Escolha uma conversa da lista para visualizar as mensagens
                    </p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatMonitor;