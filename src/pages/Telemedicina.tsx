import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmoButton } from "@/components/ui/smo-button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Bell, 
  User, 
  FileText,
  Calendar,
  Clock,
  Video,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  History,
  Users,
  ClipboardList,
  Stethoscope,
  BookOpen,
  Shield,
  Settings
} from "lucide-react";

const Telemedicina = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const menuItems = [
    { name: "Dashboard", icon: FileText, href: "/dashboard" },
    { name: "Histórico", icon: History, href: "/history" },
    { name: "Perfil", icon: User, href: "/profile" },
    { name: "Notificações", icon: Bell, href: "/notifications" },
    { name: "CIPAA", icon: Users, href: "/cipaa" },
    { name: "Telemedicina", icon: Video, href: "/telemedicina", current: true },
    { name: "Exames", icon: Stethoscope, href: "/exames" },
    { name: "Treinamentos", icon: BookOpen, href: "/treinamentos" },
    { name: "EPI's", icon: Shield, href: "/epis" },
    { name: "Procedimentos", icon: ClipboardList, href: "/procedimentos" },
    { name: "Agendamentos", icon: Calendar, href: "/agendamentos" },
  ];

  // Gerar datas disponíveis e indisponíveis para o mês atual
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Adicionar dias vazios no início do mês
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Adicionar todos os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dayOfWeek = currentDate.getDay();
      
      // Simular disponibilidade - disponível de segunda a sexta, algumas datas indisponíveis
      const unavailableDates = [5, 12, 19, 26]; // Alguns dias específicos indisponíveis
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isUnavailable = unavailableDates.includes(day);
      
      let status = 'available';
      if (isWeekend || isUnavailable) {
        status = 'unavailable';
      }
      if (day < new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
        status = 'past';
      }

      days.push({
        date: day,
        fullDate: currentDate,
        status: status
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const availableTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const getDayStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success/10 text-success hover:bg-success/20';
      case 'unavailable': return 'bg-muted text-muted-foreground cursor-not-allowed';
      case 'past': return 'bg-muted/50 text-muted-foreground cursor-not-allowed';
      default: return 'bg-muted text-muted-foreground';
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
                    Telemedicina
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Agende suas consultas online com nossos profissionais
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card className="smo-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigateMonth('prev')}
                          className="p-2 rounded-lg hover:bg-accent"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => navigateMonth('next')}
                          className="p-2 rounded-lg hover:bg-accent"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Days of week header */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {days.map((day, index) => (
                        <div key={index} className="aspect-square">
                          {day && (
                            <button
                              disabled={day.status !== 'available'}
                              className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${getDayStatusColor(day.status)}`}
                            >
                              {day.date}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-success/20 rounded"></div>
                        <span className="text-sm text-muted-foreground">Disponível</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-muted rounded"></div>
                        <span className="text-sm text-muted-foreground">Indisponível</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Available Times */}
              <div className="lg:col-span-1">
                <Card className="smo-card">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Horários Disponíveis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground mb-4">
                        Selecione uma data disponível para ver os horários
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimes.map((time) => (
                          <SmoButton
                            key={time}
                            variant="outline"
                            size="sm"
                            className="w-full"
                            disabled
                          >
                            {time}
                          </SmoButton>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="smo-card mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Video className="h-5 w-5 mr-2" />
                      Como Funciona
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                          1
                        </div>
                        <span>Escolha uma data e horário disponível</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                          2
                        </div>
                        <span>Confirme o agendamento</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                          3
                        </div>
                        <span>Acesse a consulta pelo link enviado</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Telemedicina;