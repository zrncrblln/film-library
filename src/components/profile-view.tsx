import { User, Film, Clock, Star, Palette, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

interface ProfileViewProps {
  watchlistCount: number;
  favoritesCount: number;
  watchedCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ProfileView({
  watchlistCount,
  favoritesCount,
  watchedCount,
  darkMode,
  onToggleDarkMode,
}: ProfileViewProps) {
  const totalMovies = watchlistCount + favoritesCount + watchedCount;
  const totalHours = Math.floor(watchedCount * 2.2);

  return (
    <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-1">Movie Enthusiast</h2>
            <p className="text-muted-foreground mb-3">moviefan@example.com</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6 border-border">
          <div className="flex items-center gap-3 mb-2">
            <Film className="h-5 w-5 text-primary" />
            <h3>Movies Collected</h3>
          </div>
          <p className="text-3xl mb-1">{totalMovies}</p>
          <p className="text-muted-foreground">total movies in library</p>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-accent" />
            <h3>Hours Watched</h3>
          </div>
          <p className="text-3xl mb-1">{totalHours}+</p>
          <p className="text-muted-foreground">estimated watch time</p>
        </Card>
      </div>

      <Card className="p-6 mb-6 border-border">
        <h3 className="mb-4">Your Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Watchlist</span>
            <span>{watchlistCount} movies</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Favorites</span>
            <span>{favoritesCount} movies</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Watched</span>
            <span>{watchedCount} movies</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Average Rating Given</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span>8.5</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border">
        <h3 className="mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {darkMode ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={onToggleDarkMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <Label>Theme Color</Label>
            </div>
            <div className="flex gap-2">
              <button className="h-8 w-8 rounded-full bg-primary border-2 border-white" />
              <button className="h-8 w-8 rounded-full bg-accent border-2 border-transparent" />
              <button className="h-8 w-8 rounded-full bg-green-500 border-2 border-transparent" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
