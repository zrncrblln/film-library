# Search Icons System

A comprehensive collection of search-related icons for the MovieDB application.

## Available Icons

### 🔍 SearchIcon

The main search icon used in search input fields.

**Props:**

- `className?: string` - Additional CSS classes
- `size?: number` - Icon size in pixels (default: 16)
- `variant?: "default" | "filled" | "outline" | "rounded"` - Icon style variant

**Usage:**

```tsx
import { SearchIcon } from './icons';

// Basic usage
<SearchIcon className="search-icon" />

// With custom size and variant
<SearchIcon size={20} variant="filled" />
```

### 🔘 SearchButtonIcon

A larger search icon designed for buttons and standalone search elements.

**Props:**

- `className?: string` - Additional CSS classes
- `size?: number` - Icon size in pixels (default: 20)
- `variant?: "default" | "filled" | "outline"` - Icon style variant

**Usage:**

```tsx
import { SearchButtonIcon } from './icons';

// For search buttons
<SearchButtonIcon className="button-icon" />

// Different variants
<SearchButtonIcon variant="filled" size={24} />
```

### ❌ ClearIcon

A clear/cross icon for clearing search inputs.

**Props:**

- `className?: string` - Additional CSS classes
- `size?: number` - Icon size in pixels (default: 14)

**Usage:**

```tsx
import { ClearIcon } from "./icons";

// For clear buttons
<ClearIcon className="clear-icon" />;
```

## Import Options

### Import Individual Icons

```tsx
import SearchIcon from "./icons/SearchIcon";
import ClearIcon from "./icons/ClearIcon";
import SearchButtonIcon from "./icons/SearchButtonIcon";
```

### Import All Icons

```tsx
import { SearchIcon, ClearIcon, SearchButtonIcon } from "./icons";
```

### Backward Compatibility

```tsx
import { SearchIconOriginal } from "./icons"; // Original SearchIcon component
```

## Styling

All icons use `currentColor` for theming support and inherit colors from their parent elements or CSS variables.

### CSS Classes

- `.search-icon` - For search input icons
- `.clear-icon` - For clear button icons
- `.button-icon` - For button icons

### Example CSS

```css
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--secondary-color);
  z-index: 1;
  pointer-events: none;
}

.clear-icon {
  position: absolute;
  right: 8px;
  color: var(--secondary-color);
  cursor: pointer;
}
```

## Variants

### SearchIcon Variants

- **default**: Stroke-based icon with rounded line caps
- **filled**: Solid filled icon
- **outline**: Thinner stroke outline
- **rounded**: More rounded stroke style

### SearchButtonIcon Variants

- **default**: Stroke-based with outer circle
- **filled**: Filled icon with white outline circle
- **outline**: Outline style with circle

## Accessibility

All icons include proper ARIA labels and semantic structure for screen readers.
