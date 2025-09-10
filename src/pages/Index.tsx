import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import DocumentManager from "@/components/DocumentManager";
import ChatMonitor from "@/components/ChatMonitor";
import Analytics from "@/components/Analytics";
import BotConfig from "@/components/BotConfig";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "documents":
        return <DocumentManager />;
      case "conversations":
        return <ChatMonitor />;
      case "analytics":
        return <Analytics />;
      case "bot-config":
        return <BotConfig />;
      case "settings":
        return <div className="p-8 text-center text-muted-foreground">Em desenvolvimento...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-8 overflow-auto">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
