# DoJ Legal Assistant - Department of Justice Chatbot

## Overview

This is a comprehensive full-stack web application serving as an advanced AI-powered legal assistant for the Department of Justice, Government of India. The application provides intelligent responses covering all major judicial services with enhanced capabilities including case status tracking via CNR/party name, legal aid information, court services info, basic legal guidance, multilingual support (22 Indian languages), and voice input/natural language search. It features a modern, government-themed UI with professional Indian flag colors and is powered by Google's free Gemini AI service.

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
- **Provider**: Google Gemini AI (free tier) for natural language processing and multimodal capabilities
- **Model**: Gemini-2.5-flash for fast, intelligent responses without cost limitations
- **Architecture**: Service layer abstraction for AI interactions with comprehensive judicial knowledge
- **Enhanced Features**: 
  - Case status tracking simulation (CNR/party name lookup)
  - Legal aid eligibility and application guidance
  - Court services information (timings, procedures, locations)
  - Basic legal guidance (FIR filing, consumer complaints, property registration)
  - Multilingual support (22 scheduled Indian languages)
  - Voice input and natural language search capabilities
- **Knowledge Base**: Comprehensive judicial information database covering all DoJ services
- **Query Processing**: Advanced categorization with expanded service coverage
- **Response Structure**: JSON-formatted responses with detailed information, categories, confidence scores, and actionable suggestions

## External Dependencies

### Core Services
- **Google Gemini API**: Free Gemini-2.5-flash model for intelligent legal query processing, multimodal capabilities, and comprehensive response generation
- **Neon Database**: Serverless PostgreSQL hosting for production deployment (with in-memory fallback for development)

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