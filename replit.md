# DoJ Legal Assistant - Department of Justice Chatbot

## Overview

This is a full-stack web application serving as an AI-powered legal assistant for the Department of Justice, Government of India. The application provides intelligent responses to queries about judicial services including case status checking, eFiling procedures, judge appointments, traffic violations, court streaming, and legal aid services. It features a modern, government-themed UI with a conversational chat interface backed by OpenAI's GPT-4 model.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessible, customizable interface
- **Styling**: Tailwind CSS with custom Indian government color scheme (saffron, navy, indian-green)
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful endpoints for conversations, messages, and judicial queries
- **Session Management**: Session-based conversation tracking without user authentication
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured) with Neon Database serverless driver
- **Fallback Storage**: In-memory storage implementation for development/testing
- **Schema**: Well-defined database schema with conversations, messages, and judicial queries tables
- **Migrations**: Drizzle-kit for database schema migrations

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Tracking**: Temporary session IDs for conversation continuity
- **Future Consideration**: Designed to accommodate user authentication when required

### AI Integration
- **Provider**: OpenAI GPT-4o model for natural language processing
- **Architecture**: Service layer abstraction for AI interactions
- **Knowledge Base**: Pre-populated judicial information database for context-aware responses
- **Query Processing**: Intelligent categorization and context-aware response generation
- **Response Structure**: JSON-formatted responses with categories, confidence scores, and suggested actions

## External Dependencies

### Core Services
- **OpenAI API**: GPT-4o model for intelligent legal query processing and response generation
- **Neon Database**: Serverless PostgreSQL hosting for production deployment

### Development Tools
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Fast JavaScript bundling for production builds
- **TSX**: TypeScript execution for development server

### UI Libraries
- **Radix UI**: Comprehensive set of accessible React components
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form handling with validation
- **Date-fns**: Date manipulation and formatting utilities

### Styling and Theming
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management
- **CLSX**: Utility for constructing className strings
- **Replit Theme Plugin**: Custom theme integration for Replit environment

### Development Dependencies
- **TypeScript**: Static type checking and enhanced developer experience
- **Vite Plugins**: Development tools including runtime error overlay and theme support
- **PostCSS**: CSS processing with Tailwind and Autoprefixer