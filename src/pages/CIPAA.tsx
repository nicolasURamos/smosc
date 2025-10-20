import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Bell, 
  User, 
  FileText,
  Clock,
  Menu,
  X,
  History,
  Users,
  Video,
  Calendar,
  ClipboardList,
  Stethoscope,
  BookOpen,
  Shield,
  Settings
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CIPAA = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: FileText, href: "/dashboard" },
    { name: "Histórico", icon: History, href: "/history" },
    { name: "Perfil", icon: User, href: "/profile" },
    { name: "Notificações", icon: Bell, href: "/notifications" },
    { name: "CIPAA", icon: Users, href: "/cipaa", current: true },
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
          <div className="max-w-4xl mx-auto">
            <Card className="smo-card text-center py-16">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-foreground mb-4">
                  CIPAA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <Clock className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Em Breve
                </h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Esta funcionalidade está em desenvolvimento e estará disponível em breve.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CIPAA;