#!/bin/bash

# Chatbot RAG - Deploy Script for Google Cloud Platform
# Este script automatiza o deploy completo da aplicação no GCP

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações padrão
DEFAULT_PROJECT_ID="your-project-id"
DEFAULT_REGION="us-central1"
DEFAULT_SERVICE_NAME="chatbot-rag-frontend"

echo -e "${BLUE}🚀 Chatbot RAG - Deploy GCP${NC}"
echo "================================="

# Verificar se gcloud está instalado
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Google Cloud SDK não encontrado. Instale em: https://cloud.google.com/sdk${NC}"
    exit 1
fi

# Obter configurações do usuário
read -p "🔹 Project ID (default: $DEFAULT_PROJECT_ID): " PROJECT_ID
PROJECT_ID=${PROJECT_ID:-$DEFAULT_PROJECT_ID}

read -p "🔹 Region (default: $DEFAULT_REGION): " REGION
REGION=${REGION:-$DEFAULT_REGION}

read -p "🔹 Service Name (default: $DEFAULT_SERVICE_NAME): " SERVICE_NAME
SERVICE_NAME=${SERVICE_NAME:-$DEFAULT_SERVICE_NAME}

echo ""
echo -e "${YELLOW}📋 Configurações:${NC}"
echo "   Project ID: $PROJECT_ID"
echo "   Region: $REGION"
echo "   Service Name: $SERVICE_NAME"
echo ""

read -p "Continuar com o deploy? (y/N): " CONFIRM
if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠️  Deploy cancelado pelo usuário${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}🔧 Configurando projeto...${NC}"

# Configurar projeto
gcloud config set project $PROJECT_ID

# Habilitar APIs necessárias
echo -e "${BLUE}🔌 Habilitando APIs necessárias...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build da aplicação
echo -e "${BLUE}🏗️  Iniciando build...${NC}"
npm run build

# Build e push da imagem Docker
echo -e "${BLUE}🐳 Criando imagem Docker...${NC}"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"
docker build -t $IMAGE_NAME .

echo -e "${BLUE}📤 Enviando imagem para Container Registry...${NC}"
docker push $IMAGE_NAME

# Deploy no Cloud Run
echo -e "${BLUE}☁️  Fazendo deploy no Cloud Run...${NC}"
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 1Gi \
    --cpu 1 \
    --max-instances 10 \
    --min-instances 0 \
    --concurrency 80

# Obter URL do serviço
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format="value(status.url)")

echo ""
echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo ""
echo -e "${GREEN}🌐 URL da aplicação: $SERVICE_URL${NC}"
echo ""
echo -e "${YELLOW}📚 Próximos passos:${NC}"
echo "   1. Configure um domínio customizado se necessário"
echo "   2. Configure HTTPS com certificado SSL"
echo "   3. Configure monitoring e alertas"
echo "   4. Configure backup e disaster recovery"
echo ""
echo -e "${BLUE}📖 Documentação útil:${NC}"
echo "   - Cloud Run: https://cloud.google.com/run/docs"
echo "   - Custom Domains: https://cloud.google.com/run/docs/mapping-custom-domains"
echo "   - Monitoring: https://cloud.google.com/monitoring/docs"
echo ""

# Opcional: abrir a aplicação no browser
read -p "Abrir aplicação no navegador? (y/N): " OPEN_BROWSER
if [[ $OPEN_BROWSER =~ ^[Yy]$ ]]; then
    if command -v open &> /dev/null; then
        open $SERVICE_URL
    elif command -v xdg-open &> /dev/null; then
        xdg-open $SERVICE_URL
    else
        echo -e "${YELLOW}⚠️  Não foi possível abrir automaticamente. Acesse: $SERVICE_URL${NC}"
    fi
fi