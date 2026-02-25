# Project Tools, Technologies, and Libraries

## 1. Frontend Stack (Client-Side)

### Core Frameworks
*   **Next.js 16 (App Router)**: The main React framework used for server-side rendering (SSR), routing, and API integration.
*   **React 19**: The UI library for building component-based interfaces.
*   **TypeScript**: Ensures type safety across the application.

### State Management & Data Fetching
*   **Redux Toolkit**: Manages global client state (`teacherSlice`, `authSlice`, etc.).
*   **Axios**: Handles HTTP requests to the backend API with interceptors for authentication.

### Styling & UI Components
*   **Tailwind CSS 4**: A utility-first CSS framework for rapid styling.
*   **Radix UI**: Used as the headless primitive foundation for accessible UI components (Dialogs, Dropdowns, Toggles).
*   **Lucide React**: Provides the icon set used throughout the application.
*   **Recharts**: Powers the data visualization charts (bar charts, line graphs) in the dashboards.
*   **Framer Motion**: Handles complex animations and transitions.

### Specialized Libraries
*   **Web Speech API**: Browser-native API used for capturing microphone input and performing Speech-to-Text (STT).
*   **React Hook Form + Zod**: Manages form state, validation, and schema definitions.

---

## 2. Backend Stack (Server-Side)

### Core Server
*   **Node.js**: The runtime environment.
*   **Express.js**: The web server framework handling API routing, middleware, and request processing.

### Database & ORM
*   **Prisma ORM**: Handles database schema definitions, migrations, and type-safe queries.
*   **PostgreSQL / MongoDB**: (Inferred from Prisma/Keywords) The underlying database storing user data, assessments, and reports.

### Authentication & Security
*   **JSON Web Tokens (JWT)**: Handles stateless user authentication.
*   **Bcrypt.js**: Secures user passwords through hashing.

---

## 3. AI & Natural Language Processing (NLP) Layer

### Programming Language
*   **Python 3.8+**: Used for all heavy NLP processing tasks.

### AI Libraries
*   **spaCy**:
    *   **Model**: `en_core_web_sm`
    *   **Usage**: Tokenization, Part-of-Speech (POS) tagging for comprehension analysis using nouns/verbs/adjectives.
*   **NLTK (Natural Language Toolkit)**:
    *   **Usage**: Provides additional tokenization support and phoneme data (`cmudict`) for detailed analysis.
*   **Python-Levenshtein**:
    *   **Usage**: fast computation of Levenshtein distance for fuzzy word matching and accuracy scoring.

---

## 4. Development Tools
*   **pnpm**: Package manager for efficient dependency installation.
*   **ESLint**: Code linting tool used to enforce coding standards.
*   **PostCSS / Autoprefixer**: CSS processing tools.
*   **Nodemon**: Used in backend development for hot-reloading the server.
