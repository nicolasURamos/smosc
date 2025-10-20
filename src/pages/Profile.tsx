import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SmoButton } from "@/components/ui/smo-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  CreditCard,
  Edit3,
  Save,
  X,
  FileText,
  Bell,
  Menu,
  Phone,
  MapPin,
  Briefcase,
  Shield,
  Camera,
  History,
  Users,
  Video,
  Calendar,
  ClipboardList,
  Stethoscope,
  BookOpen
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "João Silva Santos",
    email: "joao.silva@empresa.com.br",
    cpf: "123.456.789-00",
    phone: "(11) 99999-9999",
    address: "São Paulo, SP",
    position: "Técnico de Segurança",
    company: "Nicolini",
    setor: "Segurança do Trabalho",
    admissionDate: "15/01/2022"
  });

  const menuItems = [
    { name: "Dashboard", icon: FileText, href: "/dashboard" },
    { name: "Histórico", icon: History, href: "/history" },
    { name: "Perfil", icon: User, href: "/profile", current: true },
    { name: "Notificações", icon: Bell, href: "/notifications" },
    { name: "CIPAA", icon: Users, href: "/cipaa" },
    { name: "Telemedicina", icon: Video, href: "/telemedicina" },
    { name: "Exames", icon: Stethoscope, href: "/exames" },
    { name: "Treinamentos", icon: BookOpen, href: "/treinamentos" },
    { name: "EPI's", icon: Shield, href: "/epis" },
    { name: "Procedimentos", icon: ClipboardList, href: "/procedimentos" },
    { name: "Agendamentos", icon: Calendar, href: "/agendamentos" },
  ];

  const handleSave = () => {
    // Simulação de salvamento
    setIsEditing(false);
    // Aqui seria feita a chamada para a API
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
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
            {/* Header */}
            <div className="mb-8 fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Meu Perfil
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Gerencie suas informações pessoais e profissionais
                  </p>
                </div>
                {!isEditing && (
                  <SmoButton
                    variant="hero"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Editar Perfil</span>
                  </SmoButton>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture and Status */}
              <div className="lg:col-span-1">
                <Card className="smo-card slide-up">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl font-bold mb-4">
                        {formData.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 p-2 bg-primary text-primary-foreground rounded-full shadow-primary hover:shadow-xl transition-all">
                          <Camera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {formData.fullName}
                    </h3>
                    <p className="text-muted-foreground mb-4">{formData.position}</p>
                    <Badge variant="outline" className="border-success text-success">
                      <Shield className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="smo-card mt-6 scale-in">
                  <CardHeader>
                    <CardTitle className="text-lg">Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Documentos Assinados</span>
                      <span className="font-semibold text-foreground">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Treinamentos</span>
                      <span className="font-semibold text-foreground">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Exames Realizados</span>
                      <span className="font-semibold text-foreground">4</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Information */}
              <div className="lg:col-span-2">
                <Card className="smo-card slide-up">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Informações Pessoais</CardTitle>
                      <CardDescription>
                        {isEditing ? 'Edite suas informações pessoais' : 'Suas informações pessoais'}
                      </CardDescription>
                    </div>
                    {isEditing && (
                      <div className="flex items-center space-x-2">
                        <SmoButton variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-1" />
                          Cancelar
                        </SmoButton>
                        <SmoButton variant="success" size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" />
                          Salvar
                        </SmoButton>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Nome Completo */}
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          Nome Completo
                        </Label>
                        {isEditing ? (
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="h-12 border-border/50 focus:border-primary"
                          />
                        ) : (
                          <p className="text-foreground font-medium py-3 px-4 bg-muted/50 rounded-lg">
                            {formData.fullName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          E-mail
                        </Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-12 border-border/50 focus:border-primary"
                          />
                        ) : (
                          <p className="text-foreground font-medium py-3 px-4 bg-muted/50 rounded-lg">
                            {formData.email}
                          </p>
                        )}
                      </div>

                      {/* CPF */}
                      <div className="space-y-2">
                        <Label htmlFor="cpf" className="text-sm font-medium flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                          CPF
                        </Label>
                        <p className="text-foreground font-medium py-3 px-4 bg-muted/50 rounded-lg">
                          {formData.cpf}
                        </p>
                      </div>

                      {/* Telefone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          Telefone
                        </Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-12 border-border/50 focus:border-primary"
                          />
                        ) : (
                          <p className="text-foreground font-medium py-3 px-4 bg-muted/50 rounded-lg">
                            {formData.phone}
                          </p>
                        )}
                      </div>

                      {/* Endereço */}
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          Endereço
                        </Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="h-12 border-border/50 focus:border-primary"
                          />
                        ) : (
                          <p className="text-foreground font-medium py-3 px-4 bg-muted/50 rounded-lg">
                            {formData.address}
                          </p>
                        )}
                      </div>

                      {/* Cargo */}
                      <div className="space-y-2">
                        <Label htmlFor="position" className="text-sm font-medium flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          Cargo
                        </Label>
                        <p className="text-foreground font-medium py-3 px-4 bg-muted/50 rounded-lg">
                          {formData.position}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Information */}
                <Card className="smo-card mt-6 scale-in">
                  <CardHeader>
                    <CardTitle className="text-xl">Informações Profissionais</CardTitle>
                    <CardDescription>
                      Detalhes sobre sua posição na empresa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          Empresa
                        </Label>
                        <p className="text-foreground font-medium py-3 px-4 bg-muted/50 rounded-lg">
                          {formData.company}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          Setor
                        </Label>
                        <p className="text-foreground font-medium py-3 px-4 bg-muted/50 rounded-lg">
                          {formData.setor}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          Data de Admissão
                        </Label>
                        <p className="text-foreground font-medium py-3 px-4 bg-muted/50 rounded-lg">
                          {formData.admissionDate}
                        </p>
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

export default Profile;