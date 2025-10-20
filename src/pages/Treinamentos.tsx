import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SmoButton } from "@/components/ui/smo-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Bell, 
  User, 
  FileText,
  BookOpen,
  Search,
  Download,
  Play,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  History,
  Users,
  Video,
  ClipboardList,
  Stethoscope,
  Shield
} from "lucide-react";

const Treinamentos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const trainings = [
    {
      id: 1,
      name: "NR-35 - Trabalho em Altura",
      category: "Segurança",
      status: "Pendente",
      duration: "8h",
      dueDate: "2024-03-15",
      progress: 0,
      priority: "high",
      description: "Treinamento obrigatório para atividades em altura superior a 2 metros"
    },
    {
      id: 2,
      name: "SIPAT 2024",
      category: "Prevenção",
      status: "Em Andamento",
      duration: "4h",
      dueDate: "2024-04-20",
      progress: 60,
      priority: "medium",
      description: "Semana Interna de Prevenção de Acidentes do Trabalho"
    },
    {
      id: 3,
      name: "NR-10 - Segurança Elétrica",
      category: "Segurança",
      status: "Concluído",
      duration: "12h", 
      dueDate: "2023-12-15",
      progress: 100,
      priority: "low",
      description: "Segurança em instalações e serviços em eletricidade"
    },
    {
      id: 4,
      name: "Primeiros Socorros",
      category: "Emergência",
      status: "Disponível",
      duration: "6h",
      dueDate: "2024-05-10",
      progress: 0,
      priority: "medium", 
      description: "Técnicas básicas de primeiros socorros no ambiente de trabalho"
    },
    {
      id: 5,
      name: "NR-33 - Espaços Confinados",
      category: "Segurança",
      status: "Vencido",
      duration: "16h",
      dueDate: "2024-01-15",
      progress: 0,
      priority: "high",
      description: "Segurança e saúde no trabalho em espaços confinados"
    }
  ];

  const menuItems = [
    { name: "Dashboard", icon: FileText, href: "/dashboard" },
    { name: "Histórico", icon: History, href: "/history" },
    { name: "Perfil", icon: User, href: "/profile" },
    { name: "Notificações", icon: Bell, href: "/notifications" },
    { name: "CIPAA", icon: Users, href: "/cipaa" },
    { name: "Telemedicina", icon: Video, href: "/telemedicina" },
    { name: "Exames", icon: Stethoscope, href: "/exames" },
    { name: "Treinamentos", icon: BookOpen, href: "/treinamentos", current: true },
    { name: "EPI's", icon: Shield, href: "/epis" },
    { name: "Procedimentos", icon: ClipboardList, href: "/procedimentos" },
    { name: "Agendamentos", icon: Calendar, href: "/agendamentos" },
  ];

  const filteredTrainings = trainings.filter(training =>
    training.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Vencido": return "text-destructive";
      case "Pendente": return "text-warning";
      case "Em Andamento": return "text-info";
      case "Disponível": return "text-muted-foreground";
      case "Concluído": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Vencido": return "bg-destructive/10";
      case "Pendente": return "bg-warning/10";
      case "Em Andamento": return "bg-info/10";
      case "Disponível": return "bg-muted/10";
      case "Concluído": return "bg-success/10";
      default: return "bg-muted/10";
    }
  };

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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Treinamentos
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Acompanhe seus treinamentos obrigatórios e opcionais
                  </p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6 slide-up">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar treinamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border/50"
                />
              </div>
            </div>

            {/* Training Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrainings.map((training, index) => (
                <Card 
                  key={training.id} 
                  className="smo-card hover:shadow-primary transition-all scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getStatusBgColor(training.status)}`}>
                          <BookOpen className={`h-5 w-5 ${getStatusColor(training.status)}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{training.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {training.category}
                          </Badge>
                        </div>
                      </div>
                      <Badge 
                        className={`${getStatusBgColor(training.status)} ${getStatusColor(training.status)} border-0`}
                      >
                        {training.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {training.description}
                    </CardDescription>
                    
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Duração: {training.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Prazo: {new Date(training.dueDate).toLocaleDateString('pt-BR')} às 14:00
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      {training.status === "Concluído" && (
                        <SmoButton variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Certificado
                        </SmoButton>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredTrainings.length === 0 && (
              <Card className="smo-card text-center py-12">
                <CardContent>
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nenhum treinamento encontrado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Não encontramos treinamentos com os termos de busca utilizados.
                  </p>
                  <SmoButton variant="outline" onClick={() => setSearchTerm("")}>
                    Limpar Busca
                  </SmoButton>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Treinamentos;