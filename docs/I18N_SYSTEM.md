# Internationalization (i18n) System Guide

LearnDetect supports multiple languages (English, Sinhala, Tamil) to make the platform accessible to a wider audience. The system is built using React Context and a custom translation dictionary.

## Architecture

### 1. Dictionary (`lib/translations.ts`)
*   **Concept**: A single source of truth for all text strings.
*   **Structure**:
    ```typescript
    type Language = "en" | "si" | "ta"
    type TranslationKeys = "key_name" | ...

    export const translations = {
      en: { key_name: "English Text" },
      si: { key_name: "Sinhala Text" },
      ta: { key_name: "Tamil Text" }
    }
    ```
*   **Type Safety**: TypeScript ensures all languages have entries for all defined keys.

### 2. Language Provider (`components/providers/language-provider.tsx`)
*   **Context**: Wraps the application in `app/layout.tsx`.
*   **State Management**:
    *   Stores current language in React state.
    *   Persists preference to `localStorage` (key: `language`).
*   **Exported Hook**: `useLanguage()`
    *   Returns `{ language, setLanguage, t }`.

### 3. Usage in Components

**Visual Elements**:
*   `LanguageSwitcher`: A dropdown component available in the Navbar/Sidebar to let users change the language.

**Code Implementation**:
To translate text in a component:

```tsx
import { useLanguage } from "@/components/providers/language-provider"

export function MyComponent() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Instead of "Hello" */}
      <h1>{t("greeting_hello")}</h1> 
    </div>
  )
}
```

## Adding New Translations
1.  Open `lib/translations.ts`.
2.  Add the new key string to the `TranslationKeys` type definition.
3.  Add the key and its translation to the `en`, `si`, and `ta` objects within the `translations` constant.
4.  TypeScript will error if you miss a language, ensuring complete coverage.
