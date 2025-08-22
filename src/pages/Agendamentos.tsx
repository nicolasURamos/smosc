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
  Calendar,
  Search,
  Clock,
  MapPin,
  Phone,
  Menu,
  X
} from "lucide-react";

const Agendamentos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const agendamentos = [
    {
      id: 1,
      type: "Exame Admissional",
      date: "2024-03-15",
      time: "14:30",
      status: "Agendado",
      clinic: "Clínica Saúde Ocupacional",
      address: "Rua das Flores, 123 - Centro",
      phone: "(11) 3333-4444"
    },
    {
      id: 2,
      type: "Exame Periódico",
      date: "2024-04-20",
      time: "09:00",
      status: "Confirmado",
      clinic: "Medicina do Trabalho São Paulo",
      address: "Av. Paulista, 1000 - Bela Vista",
      phone: "(11) 5555-6666"
    },
    {
      id: 3,
      type: "Audiometria",
      date: "2024-02-10",
      time: "16:00",
      status: "Realizado",
      clinic: "Centro Médico Industrial",
      address: "Rua Augusta, 500 - Consolação",
      phone: "(11) 7777-8888"
    },
    {
      id: 4,
      type: "Exame Demissional",
      date: "2024-05-05",
      time: "10:15",
      status: "Pendente",
      clinic: "Clínica Saúde Ocupacional",
      address: "Rua das Flores, 123 - Centro",
      phone: "(11) 3333-4444"
    }
  ];

  const menuItems = [
    { name: "Dashboard", icon: FileText, href: "/dashboard" },
    { name: "Histórico", icon: FileText, href: "/history" },
    { name: "Perfil", icon: User, href: "/profile" },
    { name: "Notificações", icon: Bell, href: "/notifications" },
    { name: "Agendamentos", icon: Calendar, href: "/agendamentos", current: true },
  ];

  const filteredAgendamentos = agendamentos.filter(agendamento =>
    agendamento.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agendamento.clinic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Realizado": return "text-success";
      case "Confirmado": return "text-info";
      case "Agendado": return "text-warning";
      case "Pendente": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Realizado": return "bg-success/10";
      case "Confirmado": return "bg-info/10";
      case "Agendado": return "bg-warning/10";
      case "Pendente": return "bg-destructive/10";
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
                    Agendamentos de Exames
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Gerencie seus agendamentos médicos ocupacionais
                  </p>
                </div>
                <div className="flex space-x-2">
                  <SmoButton variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Novo Agendamento
                  </SmoButton>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6 slide-up">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar agendamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border/50"
                />
              </div>
            </div>

            {/* Agendamentos Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAgendamentos.map((agendamento, index) => (
                <Card 
                  key={agendamento.id} 
                  className="smo-card hover:shadow-primary transition-all scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{agendamento.type}</CardTitle>
                        <CardDescription className="mt-1">
                          {agendamento.clinic}
                        </CardDescription>
                      </div>
                      <Badge 
                        className={`${getStatusBgColor(agendamento.status)} ${getStatusColor(agendamento.status)} border-0`}
                      >
                        {agendamento.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(agendamento.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{agendamento.time}</span>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {agendamento.address}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {agendamento.phone}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      {agendamento.status === "Agendado" && (
                        <SmoButton variant="outline" size="sm" className="flex-1">
                          Reagendar
                        </SmoButton>
                      )}
                      {agendamento.status === "Pendente" && (
                        <SmoButton size="sm" className="flex-1">
                          Confirmar
                        </SmoButton>
                      )}
                      {agendamento.status === "Realizado" && (
                        <SmoButton variant="outline" size="sm" className="flex-1">
                          Ver Resultado
                        </SmoButton>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredAgendamentos.length === 0 && (
              <Card className="smo-card text-center py-12">
                <CardContent>
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nenhum agendamento encontrado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Não encontramos agendamentos com os termos de busca utilizados.
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

export default Agendamentos;