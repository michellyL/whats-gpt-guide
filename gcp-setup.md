# 🚀 Guia de Deploy no Google Cloud Platform (GCP)

Este guia te ajudará a fazer o deploy completo do Chatbot RAG no Google Cloud Platform.

## 📋 Pré-requisitos

### 1. Conta Google Cloud
- Crie uma conta no [Google Cloud Console](https://console.cloud.google.com/)
- Configure um projeto ou crie um novo
- Habilite a faturação (necessário para usar os serviços)

### 2. Ferramentas Locais
```bash
# Instalar Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Instalar Docker
# Ubuntu/Debian:
sudo apt-get update
sudo apt-get install docker.io

# macOS:
brew install docker

# Windows: Download Docker Desktop
```

### 3. Autenticação
```bash
# Login na sua conta Google
gcloud auth login

# Configurar projeto
gcloud config set project YOUR_PROJECT_ID

# Configurar Docker para usar Container Registry
gcloud auth configure-docker
```

## 🛠️ Métodos de Deploy

### Método 1: Script Automatizado (Recomendado)
```bash
# Tornar o script executável
chmod +x deploy.sh

# Executar deploy
./deploy.sh
```

### Método 2: Deploy Manual Passo a Passo

#### Passo 1: Habilitar APIs
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

#### Passo 2: Build da Aplicação
```bash
npm run build
```

#### Passo 3: Criar e Enviar Imagem Docker
```bash
# Build da imagem
docker build -t gcr.io/YOUR_PROJECT_ID/chatbot-rag .

# Push para Container Registry
docker push gcr.io/YOUR_PROJECT_ID/chatbot-rag
```

#### Passo 4: Deploy no Cloud Run
```bash
gcloud run deploy chatbot-rag \
    --image gcr.io/YOUR_PROJECT_ID/chatbot-rag \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 1Gi
```

### Método 3: CI/CD com Cloud Build

#### 1. Conectar Repositório
- No Console GCP, vá para Cloud Build > Triggers
- Conecte seu repositório GitHub/GitLab
- Crie um trigger baseado no arquivo `cloudbuild.yaml`

#### 2. Push para Deploy Automático
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

## 🔧 Configurações Avançadas

### Domínio Customizado
```bash
# Mapear domínio customizado
gcloud run domain-mappings create \
    --service chatbot-rag \
    --domain your-domain.com \
    --region us-central1
```

### Variáveis de Ambiente
```bash
# Definir variáveis de ambiente
gcloud run services update chatbot-rag \
    --set-env-vars "NODE_ENV=production,API_URL=https://api.example.com" \
    --region us-central1
```

### Escalonamento Automático
```bash
# Configurar escalonamento
gcloud run services update chatbot-rag \
    --min-instances 1 \
    --max-instances 100 \
    --concurrency 80 \
    --region us-central1
```

## 🔒 Segurança e Monitoramento

### 1. Configurar HTTPS
- Cloud Run já inclui HTTPS automático
- Para domínios customizados, configure SSL no Cloud Load Balancer

### 2. Monitoramento
```bash
# Habilitar Cloud Monitoring
gcloud services enable monitoring.googleapis.com

# Ver logs em tempo real
gcloud run services logs tail chatbot-rag --region us-central1
```

### 3. Backup e Disaster Recovery
```bash
# Criar backup da imagem
gcloud container images add-tag \
    gcr.io/YOUR_PROJECT_ID/chatbot-rag:latest \
    gcr.io/YOUR_PROJECT_ID/chatbot-rag:backup-$(date +%Y%m%d)
```

## 📊 Custos Estimados

### Cloud Run (Pay-per-use)
- **CPU**: $0.00002400 por vCPU-segundo
- **Memória**: $0.00000250 por GiB-segundo
- **Requests**: $0.40 por milhão de requests
- **Tráfego de rede**: $0.12 por GB

### Exemplo para 10k requests/dia:
- ~$5-15/mês (dependendo do uso)

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. Erro de Autenticação
```bash
# Re-autenticar
gcloud auth login
gcloud auth configure-docker
```

#### 2. Erro de Permissões
```bash
# Verificar permissões do projeto
gcloud projects get-iam-policy YOUR_PROJECT_ID
```

#### 3. Build Falhando
```bash
# Verificar logs detalhados
gcloud builds log BUILD_ID
```

#### 4. Service não Acessível
```bash
# Verificar status do serviço
gcloud run services describe chatbot-rag --region us-central1

# Verificar logs
gcloud run services logs read chatbot-rag --region us-central1
```

## 📚 Recursos Úteis

- [Documentação Cloud Run](https://cloud.google.com/run/docs)
- [Pricing Calculator](https://cloud.google.com/products/calculator)
- [Best Practices](https://cloud.google.com/run/docs/best-practices)
- [Security Guidelines](https://cloud.google.com/run/docs/securing)

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs: `gcloud run services logs read chatbot-rag`
2. Consulte a documentação oficial
3. Use o Stack Overflow com a tag `google-cloud-run`
4. Entre em contato com o suporte Google Cloud

---

**Pronto!** Seu Chatbot RAG está agora rodando no Google Cloud Platform com alta disponibilidade e escalabilidade automática! 🎉