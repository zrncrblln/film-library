import { Filter, X, Check, ArrowUpDown, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TMDBGenre } from "../lib/tmdb-api";

interface FilterBarProps {
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  genres: TMDBGenre[];
}

export function FilterBar({
  selectedGenres,
  onGenreToggle,
  sortBy,
  onSortChange,
  genres,
}: FilterBarProps) {
  const sortOptions = [
    { value: "rating", label: "Rating", icon: "⭐" },
    { value: "year", label: "Release Year", icon: "📅" },
    { value: "title", label: "Title", icon: "🔤" },
  ];

  return (
    <div className="relative flex flex-wrap items-center gap-3 px-4 md:px-8 mb-6">
      {/* Genre Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="gap-2 hover:bg-accent transition-colors"
          >
            <Tag className="h-4 w-4" />
            Genres
            {selectedGenres.length > 0 && (
              <Badge
                variant="default"
                className="ml-1 rounded-full h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground"
              >
                {selectedGenres.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 z-50">
          <DropdownMenuLabel className="flex items-center gap-2 font-semibold">
            <Tag className="h-4 w-4" />
            Filter by Genre
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-64 overflow-y-auto">
            {genres.map((genre) => (
              <DropdownMenuItem
                key={genre.name}
                onClick={() => onGenreToggle(genre.name)}
                className="cursor-pointer flex items-center hover:bg-accent transition-colors py-2"
              >
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedGenres.includes(genre.name)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedGenres.includes(genre.name) && (
                      <Check className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                  <span
                    className={
                      selectedGenres.includes(genre.name)
                        ? "text-primary font-medium"
                        : "text-foreground"
                    }
                  >
                    {genre.name}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="gap-2 hover:bg-accent transition-colors"
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort: {sortOptions.find((s) => s.value === sortBy)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-50">
          <DropdownMenuLabel className="flex items-center gap-2 font-semibold">
            <ArrowUpDown className="h-4 w-4" />
            Sort Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className="cursor-pointer flex items-center hover:bg-accent transition-colors py-2"
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-lg">{option.icon}</span>
                <span
                  className={
                    sortBy === option.value
                      ? "text-primary font-medium"
                      : "text-foreground"
                  }
                >
                  {option.label}
                </span>
                {sortBy === option.value && (
                  <Check className="ml-auto h-4 w-4 text-primary" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters */}
      {selectedGenres.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectedGenres.forEach(onGenreToggle)}
          className="text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}
