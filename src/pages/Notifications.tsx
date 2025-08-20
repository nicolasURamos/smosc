import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SmoButton } from "@/components/ui/smo-button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Bell, 
  User, 
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  BookOpen,
  Stethoscope,
  X,
  Menu,
  Trash2
} from "lucide-react";

const Notifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "document",
      title: "Documento ASO Pendente",
      description: "Você tem um novo documento ASO aguardando assinatura. Prazo: 3 dias.",
      time: "Há 2 horas",
      read: false,
      priority: "high",
      icon: FileText,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      id: 2,
      type: "exam",
      title: "Exame Periódico Vencendo",
      description: "Seu exame periódico vence em 15 dias. Agende o mais breve possível.",
      time: "Há 4 horas",
      read: false,
      priority: "medium",
      icon: Stethoscope,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 3,
      type: "training",
      title: "Treinamento NR-35 Disponível",
      description: "Novo treinamento de Trabalho em Altura disponível para realização.",
      time: "Há 1 dia",
      read: false,
      priority: "medium",
      icon: BookOpen,
      color: "text-info",
      bgColor: "bg-info/10"
    },
    {
      id: 4,
      type: "document",
      title: "Documento EPI Assinado",
      description: "O termo de responsabilidade de EPI foi assinado com sucesso.",
      time: "Há 2 dias",
      read: true,
      priority: "low",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 5,
      type: "system",
      title: "Atualização do Sistema",
      description: "O sistema SMO foi atualizado com novas funcionalidades de segurança.",
      time: "Há 3 dias",
      read: true,
      priority: "low",
      icon: Bell,
      color: "text-muted-foreground",
      bgColor: "bg-muted/10"
    },
    {
      id: 6,
      type: "document",
      title: "Termo de Treinamento Pendente",
      description: "Novo termo de treinamento SIPAT aguardando sua assinatura.",
      time: "Há 5 dias",
      read: false,
      priority: "medium",
      icon: FileText,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
  ]);

  const menuItems = [
    { name: "Dashboard", icon: FileText, href: "/dashboard" },
    { name: "Histórico", icon: FileText, href: "/history" },
    { name: "Perfil", icon: User, href: "/profile" },
    { name: "Notificações", icon: Bell, href: "/notifications", current: true },
  ];

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
            <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-accent">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
                  {unreadCount}
                </Badge>
              )}
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
                {item.name === "Notificações" && unreadCount > 0 && (
                  <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Notificações
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Mantenha-se atualizado com suas atividades de segurança ocupacional
                  </p>
                </div>
                {unreadCount > 0 && (
                  <SmoButton 
                    variant="outline" 
                    onClick={markAllAsRead}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Marcar todas como lidas</span>
                  </SmoButton>
                )}
              </div>
            </div>

            {/* Notifications Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 slide-up">
              <Card className="smo-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
                    </div>
                    <Bell className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="smo-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Não Lidas</p>
                      <p className="text-2xl font-bold text-destructive">{unreadCount}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="smo-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Prioridade Alta</p>
                      <p className="text-2xl font-bold text-warning">
                        {notifications.filter(n => n.priority === 'high').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <Card 
                  key={notification.id} 
                  className={`smo-card transition-all scale-in ${
                    !notification.read ? 'border-l-4 border-l-primary shadow-primary/10' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-3 rounded-lg ${notification.bgColor} flex-shrink-0`}>
                          <notification.icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`font-semibold text-foreground ${!notification.read ? 'font-bold' : ''}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                Nova
                              </Badge>
                            )}
                            {notification.priority === 'high' && (
                              <Badge variant="destructive" className="text-xs">
                                Urgente
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2 line-clamp-2">
                            {notification.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{notification.time}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <SmoButton
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center space-x-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </SmoButton>
                        )}
                        <SmoButton
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="flex items-center space-x-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </SmoButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {notifications.length === 0 && (
              <Card className="smo-card text-center py-12">
                <CardContent>
                  <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nenhuma notificação
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Você está em dia! Não há notificações pendentes no momento.
                  </p>
                  <Link to="/dashboard">
                    <SmoButton variant="outline">
                      Voltar ao Dashboard
                    </SmoButton>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;