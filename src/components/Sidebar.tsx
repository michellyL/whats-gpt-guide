import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  Bot,
  BarChart3,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: "documents",
      label: "Documentos",
      icon: FileText,
      badge: "156"
    },
    {
      id: "conversations",
      label: "Conversas",
      icon: MessageSquare,
      badge: "12"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null
    },
    {
      id: "bot-config",
      label: "Config. do Bot",
      icon: Bot,
      badge: null
    },
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      badge: null
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-card-foreground">RAG Chatbot</h2>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-11 transition-all duration-200 ${
                isActive 
                  ? "bg-gradient-primary text-white shadow-medium" 
                  : "hover:bg-muted hover:shadow-soft"
              } ${isCollapsed ? "px-3" : "px-4"}`}
              onClick={() => {
                onSectionChange(item.id);
                setIsMobileOpen(false);
              }}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
              {!isCollapsed && (
                <>
                  <span className={`flex-1 text-left ${isActive ? "text-white" : ""}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className={`${
                        isActive 
                          ? "bg-white/20 text-white border-white/30" 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-border">
        <div className={`flex items-center gap-3 p-3 bg-success/10 rounded-lg ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-success">Sistema Online</p>
              <p className="text-xs text-muted-foreground">Último sync: agora</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
          {!isCollapsed && <span className="ml-2">Recolher</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform lg:hidden ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold text-card-foreground">Menu</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-80"
      }`}>
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;