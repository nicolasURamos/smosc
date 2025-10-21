import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SmoButton } from "@/components/ui/smo-button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  BookOpen, 
  Stethoscope, 
  Bell, 
  User, 
  History,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Menu,
  X,
  Shield,
  Users,
  Video,
  Calendar,
  ClipboardList,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Usuário");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      if (data && !error) {
        setUserName(data.full_name);
      }
    };
    
    fetchUserProfile();
  }, [user]);

  const dashboardCards = [
    {
      title: "Documentos Pendentes",
      value: "3",
      description: "Documentos aguardando assinatura",
      icon: FileText,
      color: "text-warning",
      bgColor: "bg-warning/10",
      action: () => navigate("/history"),
    },
    {
      title: "Treinamentos em Aberto",
      value: "2",
      description: "Treinamentos obrigatórios",
      icon: BookOpen,
      color: "text-info",
      bgColor: "bg-info/10",
      action: () => navigate("/treinamentos"),
    },
    {
      title: "Exames Vencendo",
      value: "1",
      description: "Próximo vencimento em 15 dias",
      icon: Stethoscope,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      action: () => navigate("/exames"),
    },
    {
      title: "Documentos Assinados",
      value: "12",
      description: "Total de documentos assinados",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
      action: () => navigate("/history"),
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "document",
      title: "Documento ASO assinado",
      time: "Há 2 horas",
      status: "completed"
    },
    {
      id: 2,
      type: "training",
      title: "Treinamento de Segurança iniciado",
      time: "Há 1 dia",
      status: "in-progress"
    },
    {
      id: 3,
      type: "exam",
      title: "Exame periódico agendado",
      time: "Há 2 dias",
      status: "scheduled"
    },
  ];

  const menuItems = [
    { name: "Dashboard", icon: FileText, href: "/dashboard", current: true },
    { name: "Histórico", icon: History, href: "/history" },
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
            {/* Welcome Header */}
            <div className="mb-8 fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Bem-vindo, {userName}
              </h1>
              <p className="text-muted-foreground text-lg">
                Aqui está um resumo das suas atividades de segurança ocupacional
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 slide-up">
              {dashboardCards.map((card, index) => (
                <Card 
                  key={index} 
                  className="smo-card hover:shadow-primary transition-all cursor-pointer group"
                  onClick={card.action}
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${card.bgColor}`}>
                      <card.icon className={`h-4 w-4 ${card.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {card.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Notifications Section */}
            <div className="mb-8">
              <Card className="smo-card scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Notificações</span>
                  </CardTitle>
                  <CardDescription>
                    Suas notificações mais recentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="p-2 rounded-full bg-destructive/10">
                        <FileText className="h-4 w-4 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Documento ASO Pendente</p>
                        <p className="text-sm text-muted-foreground">Você tem um novo documento ASO aguardando assinatura. Prazo: 3 dias.</p>
                        <p className="text-xs text-muted-foreground mt-1">Há 2 horas</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">Urgente</Badge>
                    </div>
                    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="p-2 rounded-full bg-warning/10">
                        <Stethoscope className="h-4 w-4 text-warning" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Exame Periódico Vencendo</p>
                        <p className="text-sm text-muted-foreground">Seu exame periódico vence em 15 dias. Agende o mais breve possível.</p>
                        <p className="text-xs text-muted-foreground mt-1">Há 4 horas</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="p-2 rounded-full bg-info/10">
                        <BookOpen className="h-4 w-4 text-info" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Treinamento NR-35 Disponível</p>
                        <p className="text-sm text-muted-foreground">Novo treinamento de Trabalho em Altura disponível para realização.</p>
                        <p className="text-xs text-muted-foreground mt-1">Há 1 dia</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <Link to="/notifications">
                      <SmoButton variant="outline" className="w-full justify-between group">
                        Ver Todas as Notificações
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </SmoButton>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div>
              <Card className="smo-card scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Atividades Recentes</span>
                  </CardTitle>
                  <CardDescription>
                    Suas últimas atividades no sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                        <div className={`p-2 rounded-full ${
                          activity.status === 'completed' ? 'bg-success/10' :
                          activity.status === 'in-progress' ? 'bg-warning/10' :
                          'bg-info/10'
                        }`}>
                          {activity.status === 'completed' && <CheckCircle className="h-4 w-4 text-success" />}
                          {activity.status === 'in-progress' && <Clock className="h-4 w-4 text-warning" />}
                          {activity.status === 'scheduled' && <AlertCircle className="h-4 w-4 text-info" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;