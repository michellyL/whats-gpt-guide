import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  File,
  FileImage,
  Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "processing" | "ready" | "error";
  uploadDate: string;
  chunks: number;
  lastProcessed?: string;
}

const DocumentManager = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "processing" | "ready" | "error">("all");

  // Mock data - replace with real API calls
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Manual de Atendimento ao Cliente.pdf",
      type: "PDF",
      size: "2.4 MB",
      status: "ready",
      uploadDate: "2024-01-15",
      chunks: 48,
      lastProcessed: "2024-01-15 10:30"
    },
    {
      id: "2",
      name: "FAQ Produtos e Serviços.docx",
      type: "DOCX",
      size: "1.1 MB",
      status: "ready",
      uploadDate: "2024-01-14",
      chunks: 23,
      lastProcessed: "2024-01-14 15:20"
    },
    {
      id: "3",
      name: "Políticas da Empresa.pdf",
      type: "PDF",
      size: "856 KB",
      status: "processing",
      uploadDate: "2024-01-16",
      chunks: 0
    },
    {
      id: "4",
      name: "Catálogo de Produtos 2024.pdf",
      type: "PDF",
      size: "5.2 MB",
      status: "error",
      uploadDate: "2024-01-13",
      chunks: 0
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type === "application/pdf" || 
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "text/plain") {
        
        toast({
          title: "Upload iniciado",
          description: `Processando ${file.name}...`,
        });
        
        // Simulate upload process
        setTimeout(() => {
          toast({
            title: "Upload concluído",
            description: `${file.name} foi adicionado à base de conhecimento.`,
          });
        }, 2000);
      } else {
        toast({
          title: "Formato não suportado",
          description: "Apenas arquivos PDF, DOCX e TXT são aceitos.",
          variant: "destructive",
        });
      }
    });
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "processing":
        return <Clock className="h-4 w-4 text-warning" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-success/10 text-success border-success/20">Pronto</Badge>;
      case "processing":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Processando</Badge>;
      case "error":
        return <Badge variant="destructive">Erro</Badge>;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-destructive" />;
      case "DOCX":
        return <File className="h-5 w-5 text-primary-foreground" />;
      case "TXT":
        return <FileText className="h-5 w-5 text-muted-foreground" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">Gerenciamento de Documentos</h1>
          <p className="text-muted-foreground">
            Gerencie a base de conhecimento do seu chatbot RAG
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Upload className="h-5 w-5 text-accent-foreground" />
            Upload de Documentos
          </CardTitle>
          <CardDescription>
            Adicione documentos à base de conhecimento (PDF, DOCX, TXT)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
              dragActive 
                ? "border-primary-foreground bg-primary/5 shadow-glow" 
                : "border-border hover:border-primary-foreground hover:bg-muted/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={handleFileInput}
              className="hidden"
            />
            
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-primary rounded-full">
                  <Upload className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Arraste e solte arquivos aqui
                </h3>
                <p className="text-muted-foreground">
                  ou clique para selecionar arquivos
                </p>
              </div>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Selecionar Arquivos
              </Button>
              <p className="text-xs text-muted-foreground">
                Formatos suportados: PDF, DOCX, TXT • Tamanho máximo: 10MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === "ready" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("ready")}
          >
            Prontos
          </Button>
          <Button
            variant={filterStatus === "processing" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("processing")}
          >
            Processando
          </Button>
          <Button
            variant={filterStatus === "error" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("error")}
          >
            Com Erro
          </Button>
        </div>
      </div>

      {/* Documents List */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <FileText className="h-5 w-5 text-accent-foreground" />
            Documentos na Base ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <div>
                      <h4 className="font-medium text-card-foreground">{doc.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{doc.type} • {doc.size}</span>
                        <span>Upload: {doc.uploadDate}</span>
                        {doc.chunks > 0 && <span>{doc.chunks} chunks</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {getStatusBadge(doc.status)}
                  
                  {doc.status === "processing" && (
                    <div className="w-24">
                      <Progress value={65} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  Nenhum documento encontrado
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "all" 
                    ? "Tente ajustar os filtros de busca"
                    : "Comece fazendo upload de documentos para criar sua base de conhecimento"
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManager;