# Overview

MonTero is a modern e-commerce application for a racing-themed streetwear brand featuring leopard print hoodies. Built as a full-stack web application, it features a sleek React frontend with a Node.js/Express backend, providing a complete online shopping experience with product browsing, cart management, user authentication, and order processing. The site supports three languages (Korean, English, Russian) with comprehensive translation coverage across all pages and components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI elements
- **State Management**: Zustand for client-side state (cart, wishlist, language preferences)
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Internationalization**: Custom hook-based solution supporting Korean, English, and Russian

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Session Management**: Express sessions with in-memory store (MemoryStore)
- **Authentication**: bcryptjs for password hashing with session-based auth
- **Input Validation**: express-validator with custom sanitization middleware
- **Security**: Helmet.js for security headers with CSP configured for Google reCAPTCHA, CORS support, and rate limiting
- **API Design**: RESTful endpoints with consistent error handling

## Data Storage Solutions
- **Database**: PostgreSQL using Neon serverless platform
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Connection**: @neondatabase/serverless with connection pooling
- **Migrations**: Drizzle Kit for schema management
- **Local Storage**: Browser localStorage for cart persistence and guest wishlist

## Database Schema Design
- **Users**: Authentication with email/password, profile information
- **Products**: Core product data with categories, pricing, and featured flags
- **Cart Items**: Session-based shopping cart with product references
- **Orders**: Order management with customer details and status tracking
- **Order Items**: Line items for individual order products
- **Wishlist**: User-specific product favorites

## Authentication & Authorization
- **Strategy**: Session-based authentication using express-session
- **Password Security**: bcryptjs for hashing with salt rounds
- **Session Storage**: MemoryStore (suitable for development, should be Redis in production)
- **Guest Support**: Cart and basic wishlist functionality for non-authenticated users
- **Route Protection**: Middleware-based auth checks for protected endpoints
- **Bot Protection**: Google reCAPTCHA v2 integrated in login and registration forms with server-side verification

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: @tanstack/react-query, wouter, react-hook-form
- **UI Components**: Extensive Radix UI primitives (@radix-ui/react-*)
- **Styling**: tailwindcss, class-variance-authority, clsx, tailwind-merge

### Backend Dependencies
- **Express Middleware**: helmet, cors, express-rate-limit, express-validator
- **Database**: @neondatabase/serverless, drizzle-orm, drizzle-kit
- **Authentication**: bcryptjs, express-session, memorystore

### Development Tools
- **Build Tools**: Vite with React plugin, esbuild for server bundling
- **TypeScript**: Full TypeScript support with strict configuration
- **Development**: tsx for TypeScript execution, custom Vite plugins

### Payment Integration
- **Stripe**: @stripe/stripe-js and @stripe/react-stripe-js for payment processing
- **Note**: Payment functionality appears to be set up but not fully implemented

### Asset Management
- **Fonts**: Google Fonts (Inter) and custom font (IFC LOS BANDITOS)
- **Images**: Static asset serving with Vite alias configuration
- **Icons**: Lucide React for consistent iconography

The application uses a monorepo structure with shared TypeScript schemas between client and server, ensuring type safety across the full stack. The architecture supports both development and production deployments with appropriate security measures and performance optimizations.

## Recent Updates

### Translation System (October 2025)
- **Complete Translation Coverage**: Added 60+ new translation keys covering cart, checkout, profile, auth modal, and product cards
- **Components Updated**: cart-sidebar.tsx, product-card.tsx, auth-modal.tsx, checkout.tsx, profile.tsx now fully use t() translation function
- **Fixed Duplicate Keys**: Resolved all duplicate translation key issues in useLanguage.ts
- **Product Updates**: All hoodies renamed to "Leopard Untamed hoodie (color)" with tagline "Keeping the hood vibe alive"
- **Image Optimization**: Hoodie images optimized from ~1MB to ~580-640KB (38% reduction), changed display from object-cover to object-contain for proper visibility

### Authentication UX Fix (October 2025)
- **Fixed Account Menu Modal Routing**: Account menu now correctly routes "Login" and "Registration" buttons to their respective forms
- **Implementation**: Added `authModalMode` state and `initialMode` prop to AuthModal component to control which form displays
- **User Impact**: Users clicking "Регистрация" now see registration form (not login form)