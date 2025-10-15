import { Home, Search, Bookmark, User, Film } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "library", label: "Library", icon: Bookmark },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-2">
          <Film className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Moviez
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex items-center gap-2 ${
                  activeView === item.id ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 ${
                  activeView === item.id ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
