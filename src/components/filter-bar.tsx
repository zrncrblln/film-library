import { Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
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
    { value: "rating", label: "Rating" },
    { value: "year", label: "Release Year" },
    { value: "title", label: "Title" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 px-4 md:px-8 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="gap-2">
            <Filter className="h-4 w-4" />
            Genre
            {selectedGenres.length > 0 && (
              <Badge
                variant="default"
                className="ml-1 rounded-full h-5 w-5 p-0 flex items-center justify-center bg-primary"
              >
                {selectedGenres.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {genres.map((genre) => (
            <DropdownMenuCheckboxItem
              key={genre.name}
              checked={selectedGenres.includes(genre.name)}
              onCheckedChange={() => onGenreToggle(genre.name)}
            >
              {genre.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="gap-2">
            Sort by: {sortOptions.find((s) => s.value === sortBy)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={sortBy === option.value}
              onCheckedChange={() => onSortChange(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedGenres.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectedGenres.forEach(onGenreToggle)}
          className="text-muted-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}
