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
  Shield,
  Search,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Package,
  Menu,
  X,
  History,
  Users,
  Video,
  ClipboardList,
  Stethoscope,
  BookOpen
} from "lucide-react";

const EPIs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const epis = [
    {
      id: 1,
      name: "Capacete de Segurança",
      category: "Proteção da Cabeça",
      status: "Entregue",
      deliveryDate: "2024-01-15",
      nextInspection: "2024-04-15",
      condition: "Bom",
      ca: "12345",
      description: "Capacete de segurança classe B para proteção contra impactos"
    },
    {
      id: 2,
      name: "Óculos de Proteção",
      category: "Proteção Visual",
      status: "Pendente",
      deliveryDate: null,
      nextInspection: null,
      condition: null,
      ca: "23456",
      description: "Óculos de segurança para proteção contra respingos químicos"
    },
    {
      id: 3,
      name: "Luvas de Segurança",
      category: "Proteção das Mãos",
      status: "Vencido",
      deliveryDate: "2023-10-15",
      nextInspection: "2024-01-15",
      condition: "Substituir",
      ca: "34567",
      description: "Luvas de proteção contra produtos químicos"
    },
    {
      id: 4,
      name: "Protetor Auricular",
      category: "Proteção Auditiva", 
      status: "Entregue",
      deliveryDate: "2024-02-01",
      nextInspection: "2024-08-01",
      condition: "Bom",
      ca: "45678",
      description: "Protetor auricular tipo concha para proteção contra ruído"
    },
    {
      id: 5,
      name: "Calçado de Segurança",
      category: "Proteção dos Pés",
      status: "Entregue",
      deliveryDate: "2023-12-15",
      nextInspection: "2024-06-15",
      condition: "Regular",
      ca: "56789",
      description: "Calçado de segurança com biqueira de aço"
    },
    {
      id: 6,
      name: "Cinto de Segurança",
      category: "Proteção Contra Quedas",
      status: "Inspecionar",
      deliveryDate: "2023-11-01",
      nextInspection: "2024-02-01",
      condition: "Verificar",
      ca: "67890",
      description: "Cinto de segurança tipo paraquedista para trabalho em altura"
    }
  ];

  const menuItems = [
    { name: "Dashboard", icon: FileText, href: "/dashboard" },
    { name: "Histórico", icon: FileText, href: "/history" },
    { name: "Perfil", icon: User, href: "/profile" },
    { name: "Notificações", icon: Bell, href: "/notifications" },
    { name: "CIPAA", icon: FileText, href: "/cipaa" },
    { name: "Telemedicina", icon: FileText, href: "/telemedicina" },
    { name: "Exames", icon: FileText, href: "/exames" },
    { name: "Treinamentos", icon: FileText, href: "/treinamentos" },
    { name: "EPI's", icon: Shield, href: "/epis", current: true },
    { name: "Procedimentos", icon: FileText, href: "/procedimentos" },
    { name: "Agendamentos", icon: FileText, href: "/agendamentos" },
  ];

  const filteredEPIs = epis.filter(epi =>
    epi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    epi.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Vencido": return "text-destructive";
      case "Pendente": return "text-warning";
      case "Inspecionar": return "text-info";
      case "Entregue": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Vencido": return "bg-destructive/10";
      case "Pendente": return "bg-warning/10";
      case "Inspecionar": return "bg-info/10";
      case "Entregue": return "bg-success/10";
      default: return "bg-muted/10";
    }
  };

  const getConditionColor = (condition: string | null) => {
    if (!condition) return "text-muted-foreground";
    switch (condition) {
      case "Substituir": return "text-destructive";
      case "Verificar": return "text-warning";
      case "Regular": return "text-info";
      case "Bom": return "text-success";
      default: return "text-muted-foreground";
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
                    Equipamentos de Proteção Individual
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Gerencie seus EPIs e mantenha a segurança em dia
                  </p>
                </div>
                <div className="flex space-x-2">
                  <SmoButton variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Solicitar EPI
                  </SmoButton>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6 slide-up">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar EPIs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border/50"
                />
              </div>
            </div>

            {/* EPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEPIs.map((epi, index) => (
                <Card 
                  key={epi.id} 
                  className="smo-card hover:shadow-primary transition-all scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getStatusBgColor(epi.status)}`}>
                          <Shield className={`h-5 w-5 ${getStatusColor(epi.status)}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{epi.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {epi.category}
                          </Badge>
                        </div>
                      </div>
                      <Badge 
                        className={`${getStatusBgColor(epi.status)} ${getStatusColor(epi.status)} border-0`}
                      >
                        {epi.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {epi.description}
                    </CardDescription>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">CA:</span>
                        <span className="font-medium">{epi.ca}</span>
                      </div>
                      
                      {epi.deliveryDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Entrega:</span>
                          <span className="font-medium">
                            {new Date(epi.deliveryDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                      
                      {epi.nextInspection && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Próxima Inspeção:</span>
                          <span className="font-medium">
                            {new Date(epi.nextInspection).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                      
                      {epi.condition && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Condição:</span>
                          <Badge 
                            variant="outline" 
                            className={`${getConditionColor(epi.condition)} border-current`}
                          >
                            {epi.condition}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <SmoButton variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Termo
                      </SmoButton>
                      {epi.deliveryDate && (
                        <SmoButton size="sm" className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {epi.status === "Entregue" ? "Assinado" : "Assinar"}
                        </SmoButton>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredEPIs.length === 0 && (
              <Card className="smo-card text-center py-12">
                <CardContent>
                  <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nenhum EPI encontrado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Não encontramos EPIs com os termos de busca utilizados.
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

export default EPIs;