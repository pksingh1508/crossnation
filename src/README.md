# Source Code Structure

This directory contains the source code for the service website.

## Directory Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── [lang]/            # Internationalized routes
│   │   ├── layout.tsx     # Language-specific layout
│   │   └── page.tsx       # Homepage for each language
│   ├── api/               # API routes
│   ├── policies/          # Legal policy pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page
├── components/             # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (Navbar, Footer, etc.)
│   └── sections/          # Page-specific sections (Hero, About, etc.)
├── constants/              # Global constants and configuration
│   └── site.ts            # Site configuration
├── fonts/                  # Custom font files
├── hooks/                  # Custom React hooks
├── i18n/                  # Internationalization configuration
│   └── request.ts         # next-intl request configuration
├── lib/                    # Utility functions and shared logic
│   └── utils.ts           # Common utility functions
├── store/                  # State management
├── types/                  # TypeScript type definitions
│   └── index.ts           # Main type definitions
└── README.md               # This file
```

**Note**: Translation files are located in the root `messages/` folder:
```
messages/
├── en.json                # English translations
└── es.json                # Spanish translations
```

## Key Files

- **`app/[lang]/layout.tsx`**: Internationalized layout wrapper
- **`app/[lang]/page.tsx`**: Internationalized homepage
- **`constants/site.ts`**: Site-wide configuration
- **`types/index.ts`**: TypeScript interfaces and types
- **`lib/utils.ts`**: Common utility functions
- **`i18n/request.ts`**: next-intl configuration
- **`messages/*.json`**: Translation files for different languages

## Next Steps

1. Install essential dependencies (shadcn/ui, next-intl, etc.)
2. Set up Tailwind CSS configuration
3. Configure internationalization
4. Set up Supabase integration
5. Begin component development
