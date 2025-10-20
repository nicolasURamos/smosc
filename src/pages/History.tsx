import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SmoButton } from "@/components/ui/smo-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  FileText, 
  Download,
  CheckCircle,
  Calendar,
  User,
  Menu,
  X,
  Bell,
  History as HistoryIcon,
  Users,
  Video,
  ClipboardList,
  Stethoscope,
  BookOpen,
  Shield
} from "lucide-react";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const documents = [
    {
      id: 1,
      type: "ASO",
      title: "Atestado de Saúde Ocupacional",
      signedDate: "15/12/2024",
      description: "Exame admissional - Aprovado",
      status: "signed",
      category: "Exames"
    },
    {
      id: 2,
      type: "Treinamento",
      title: "Treinamento de Segurança do Trabalho",
      signedDate: "10/12/2024",
      description: "Treinamento NR-35 - Trabalho em Altura",
      status: "signed",
      category: "Treinamentos"
    },
    {
      id: 3,
      type: "EPI",
      title: "Termo de Responsabilidade - EPI",
      signedDate: "08/12/2024",
      description: "Entrega de equipamentos de proteção individual",
      status: "signed",
      category: "Documentos"
    },
    {
      id: 4,
      type: "Exame",
      title: "Exame Periódico",
      signedDate: "05/12/2024",
      description: "Exame periódico anual - Aprovado",
      status: "signed",
      category: "Exames"
    },
    {
      id: 5,
      type: "Treinamento",
      title: "Treinamento SIPAT",
      signedDate: "01/12/2024",
      description: "Semana Interna de Prevenção de Acidentes",
      status: "signed",
      category: "Treinamentos"
    },
    {
      id: 6,
      type: "ASO",
      title: "Atestado de Saúde Ocupacional",
      signedDate: "28/11/2024",
      description: "Exame de retorno ao trabalho - Aprovado",
      status: "signed",
      category: "Exames"
    },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menuItems = [
    { name: "Dashboard", icon: FileText, href: "/dashboard" },
    { name: "Histórico", icon: HistoryIcon, href: "/history", current: true },
    { name: "Perfil", icon: User, href: "/profile" },
    { name: "Notificações", icon: Bell, href: "/notifications" },
    { name: "CIPAA", icon: Users, href: "/cipaa" },
    { name: "Telemedicina", icon: Video, href: "/telemedicina" },
    { name: "Exames", icon: Stethoscope, href: "/exames" },
    { name: "Treinamentos", icon: BookOpen, href: "/treinamentos" },
    { name: "EPI's", icon: Shield, href: "/epis" },
    { name: "Procedimentos", icon: ClipboardList, href: "/procedimentos" },
    { name: "Agendamentos", icon: Calendar, href: "/agendamentos" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white smo-card">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/5e9d5601-ee98-4196-b7a2-7427c7d90e3e.png" 
                alt="SMO Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold text-primary">SMO</span>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.current 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Voltar</span>
            </Link>
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/5e9d5601-ee98-4196-b7a2-7427c7d90e3e.png" 
                alt="SMO Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold text-primary text-lg">SMO</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="hidden md:block text-sm text-muted-foreground font-medium">Nicolini</span>
            <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-accent">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
                3
              </Badge>
            </Link>
            <Link to="/profile" className="p-2 rounded-lg hover:bg-accent">
              <User className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white/50 backdrop-blur-sm border-r border-border/50 min-h-screen">
          <nav className="p-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  item.current 
                    ? 'smo-gradient text-primary-foreground shadow-primary' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Histórico de Assinaturas
              </h1>
              <p className="text-muted-foreground text-lg">
                Visualize todos os documentos que você já assinou
              </p>
            </div>

            {/* Search and Filter */}
            <Card className="smo-card mb-6 slide-up">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar por documento, tipo ou descrição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-border/50 focus:border-primary"
                    />
                  </div>
                  <SmoButton variant="outline" className="flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Filtros</span>
                  </SmoButton>
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <div className="space-y-4">
              {filteredDocuments.map((document, index) => (
                <Card key={document.id} className={`smo-card hover:shadow-primary transition-all scale-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="p-2 rounded-lg bg-success/10">
                            <CheckCircle className="h-5 w-5 text-success" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground text-lg">{document.title}</h3>
                            <p className="text-muted-foreground">{document.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Assinado em {document.signedDate}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {document.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-success text-success">
                            Assinado
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <SmoButton variant="outline" size="sm" className="flex items-center space-x-2">
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">Download</span>
                        </SmoButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <Card className="smo-card text-center py-12">
                <CardContent>
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nenhum documento encontrado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Não encontramos documentos que correspondam à sua busca.
                  </p>
                  <SmoButton variant="outline" onClick={() => setSearchTerm("")}>
                    Limpar Busca
                  </SmoButton>
                </CardContent>
              </Card>
            )}

            {/* Summary */}
            <Card className="smo-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Resumo</span>
                </CardTitle>
                <CardDescription>
                  Estatísticas dos seus documentos assinados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {documents.length}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total de Documentos
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mb-1">
                      {documents.filter(d => d.category === 'Exames').length}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Exames Realizados
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-info mb-1">
                      {documents.filter(d => d.category === 'Treinamentos').length}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Treinamentos Concluídos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;