# luna-styles

CSS Custom Properties for the LUNA theming system.

`@dugyu/luna-styles` converts the theme token values from `@dugyu/luna-tokens` into CSS variables, scoped under theme class names (e.g. `.lunaris-dark`, `.luna-light`).

## Installation

```bash
pnpm add @dugyu/luna-styles
```

## How It Works

- Each theme is emitted as a CSS file that defines variables inside a theme selector:

  ```css
  .lunaris-dark {
    --canvas: #0d0d0d;
    --content: #f8f8f8;
  }
  ```
- Variables are only available within the DOM subtree that has the theme class applied
- `index.css` imports all built-in themes, so you can switch themes by toggling the class name

## Usage

Import all themes (recommended for theme switching):

```css
@import "@dugyu/luna-styles/index.css";
```

Or import a single theme only:

```css
@import "@dugyu/luna-styles/lunaris-dark.css";
```

Use the variables in your styles:

```css
.canvas {
  color: var(--content);
  background-color: var(--canvas);
}

.luna-gradient-rose {
  background: linear-gradient(
    0deg,
    var(--gradient-a),
    var(--gradient-b)
  );
}
```

Apply a theme class to scope the variables:

```tsx
function App() {
  return (
    <view className='canvas lunaris-dark luna-gradient-rose'>
      {/* Your Demo */}
    </view>
  );
}
```

## LUNA Packages

- `@dugyu/luna-tokens` — source of truth for token values
- `@dugyu/luna-core` — token and theme type definitions
- `@dugyu/luna-styles` — CSS variables output (this package)
- `@dugyu/luna-tailwind` — Tailwind utilities output
- `@dugyu/luna-reactlynx` — ReactLynx runtime integration
