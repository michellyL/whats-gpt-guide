# 🤖 Chatbot RAG para WhatsApp

Um sistema completo de chatbot com Retrieval-Augmented Generation (RAG) para atendimento automático via WhatsApp, desenvolvido com React, TypeScript e integração com OpenAI.

## 🚀 Características Principais

### ✨ Interface de Administração Completa
- **Dashboard** com métricas em tempo real
- **Gerenciamento de Documentos** para base de conhecimento
- **Monitor de Conversas** para acompanhamento das interações
- **Analytics Avançado** com insights detalhados
- **Configuração do Bot** centralizada

### 🎨 Design System Profissional
- Interface moderna e responsiva
- Design system consistente com Tailwind CSS
- Componentes shadcn/ui customizados
- Animações e transições suaves
- Suporte a dark/light mode

### 🔧 Tecnologias Utilizadas

#### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **Vite** - Build tool otimizado
- **React Router** - Roteamento
- **TanStack Query** - Gerenciamento de estado
- **Lucide Icons** - Ícones consistentes

#### Componentes UI
- **shadcn/ui** - Biblioteca de componentes
- **Radix UI** - Primitivos acessíveis
- **Recharts** - Gráficos e visualizações
- **React Hook Form** - Formulários performáticos

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
```bash
# Node.js 18+
node --version

# npm ou yarn
npm --version
```

### Setup Local
```bash
# Clonar o repositório
git clone <repository-url>
cd chatbot-rag-whatsapp

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm run preview      # Preview do build

# Qualidade de Código
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## 🏗️ Arquitetura do Sistema

### Estrutura do Projeto
```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes UI base (shadcn)
│   ├── Dashboard.tsx   # Painel principal
│   ├── DocumentManager.tsx  # Gerenciamento de docs
│   ├── ChatMonitor.tsx # Monitor de conversas
│   ├── Analytics.tsx   # Analytics e métricas
│   ├── BotConfig.tsx   # Configurações do bot
│   └── Sidebar.tsx     # Navegação lateral
├── pages/              # Páginas da aplicação
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e configurações
├── assets/             # Assets estáticos
└── types/              # Definições TypeScript
```

### Design System
O projeto utiliza um design system robusto baseado em:
- **Tokens de Design** no `index.css`
- **Configuração Tailwind** customizada
- **Variantes de Componentes** consistentes
- **Gradientes e Animações** predefinidos

## 🚀 Deploy no Google Cloud Platform

### Deploy Rápido
```bash
# Executar script automatizado
chmod +x deploy.sh
./deploy.sh
```

### Deploy Manual
```bash
# Build da aplicação
npm run build

# Build e push da imagem Docker
docker build -t gcr.io/YOUR_PROJECT_ID/chatbot-rag .
docker push gcr.io/YOUR_PROJECT_ID/chatbot-rag

# Deploy no Cloud Run
gcloud run deploy chatbot-rag \
    --image gcr.io/YOUR_PROJECT_ID/chatbot-rag \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated
```

### Arquivos de Deploy Incluídos
- `Dockerfile` - Configuração Docker otimizada
- `nginx.conf` - Configuração Nginx para produção
- `cloudbuild.yaml` - CI/CD com Cloud Build
- `deploy.sh` - Script automatizado de deploy
- `app.yaml` - Configuração App Engine (alternativa)
- `gcp-setup.md` - Guia completo de setup GCP

## 🔧 Configuração para Backend

Para conectar com um backend Node.js/Express, configure:

### Variáveis de Ambiente
```env
VITE_API_URL=https://your-backend-api.com
VITE_WHATSAPP_WEBHOOK=https://your-webhook.com
```

### Integração com APIs
O frontend está preparado para integrar com:
- **OpenAI API** - Geração de respostas
- **WhatsApp Business API** - Mensagens
- **Backend RAG** - Busca vetorial
- **Analytics API** - Métricas e relatórios

## 📊 Funcionalidades Implementadas

### ✅ Dashboard
- Métricas em tempo real
- Indicadores de performance
- Status do sistema
- Atividade recente

### ✅ Gerenciamento de Documentos
- Upload drag & drop
- Processamento de PDFs, DOCX, TXT
- Status de processamento
- Busca e filtros

### ✅ Monitor de Conversas
- Lista de conversas ativas
- Visualização de mensagens
- Status de entrega
- Filtros avançados

### ✅ Analytics
- Gráficos de uso
- Tópicos populares
- Taxa de satisfação
- Métricas de API

### ✅ Configuração do Bot
- Personalização de respostas
- Configuração de horários
- Integração com APIs
- Configurações avançadas

## 🔐 Segurança e Performance

### Características de Produção
- **Nginx** otimizado para serving estático
- **Gzip compression** habilitada
- **Security headers** configurados
- **Health checks** para GCP
- **Caching** de assets estáticos

### Performance
- **Code splitting** automático
- **Lazy loading** de componentes
- **Otimização de imagens**
- **Bundle analysis** integrado

## 📚 Próximos Passos

### Backend Integration
1. Desenvolver API Node.js/Express
2. Implementar RAG com vetorização
3. Conectar WhatsApp Business API
4. Integrar OpenAI API
5. Setup de banco de dados

### Funcionalidades Avançadas
- [ ] Autenticação de usuários
- [ ] Multi-tenancy
- [ ] Relatórios PDF
- [ ] Notificações push
- [ ] API webhooks
- [ ] Integração com CRM

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- 📧 Email: support@chatbot-rag.com
- 📚 Documentação: [docs.chatbot-rag.com](https://docs.chatbot-rag.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

**Desenvolvido com ❤️ para automatizar atendimento ao cliente via WhatsApp**

🚀 **Deploy pronto para produção no Google Cloud Platform!**
