# 🚀 OpenRouter - Multi-AI Router Platform

A modern, full-stack application that provides unified access to multiple AI providers including OpenAI, Anthropic Claude, and Google's Generative AI. Built with cutting-edge technologies and optimized for performance.

## ✨ Features

### 🎯 Multi-AI Integration
- **OpenAI API Support** - Access to GPT models and advanced AI capabilities
- **Anthropic Claude Integration** - Enterprise-grade AI reasoning
- **Google Generative AI** - Google's latest AI models
- **Unified API Interface** - Single endpoint to route requests to any AI provider
- **Bearer Token Authentication** - Secure API access with token-based auth

### 🎨 Modern Dashboard
- **React 19 Frontend** - Latest React with improved performance
- **TailwindCSS Styling** - Beautiful, responsive UI
- **Shadcn Components** - High-quality component library
- **React Router** - Smooth client-side navigation
- **TanStack Query** - Powerful data fetching and caching

### ⚡ High-Performance Backend
- **Elysia Framework** - Ultra-fast TypeScript web framework
- **Bun Runtime** - Lightning-fast JavaScript runtime
- **Hot Module Reload** - Development with instant updates
- **Type-Safe** - Full TypeScript support

## 📊 Project Architecture

```
New-OpenRouter (Monorepo)
├── 📦 Root Configuration
│   ├── turbo.json          # Turborepo build orchestration
│   ├── package.json        # Monorepo workspace setup
│   └── bun.lock            # Bun package manager lockfile
│
├── 🏗️ apps/
│   ├── api-backend/
│   │   ├── src/
│   │   │   └── index.ts    # Elysia server entry point
│   │   ├── package.json    # Backend dependencies
│   │   └── tsconfig.json   # TypeScript configuration
│   │
│   └── dashboard-frontend/
│       ├── src/            # React components & pages
│       ├── styles/         # TailwindCSS styles
│       ├── build.ts        # Bun build configuration
│       ├── package.json    # Frontend dependencies
│       └── tsconfig.json   # TypeScript configuration
│
└── 📚 packages/
    └── [Shared libraries & utilities]
```

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │     React 19 Dashboard Frontend (Port 3001)            ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ ││
│  │  │ React Router │  │ TanStack     │  │ Shadcn       │ ││
│  │  │ Navigation   │  │ Query (Data) │  │ Components   │ ││
│  │  └──────────────┘  └──────────────┘  └──────────────┘ ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ ││
│  │  │ TailwindCSS  │  │ Lucide Icons │  │ Form Handler │ ││
│  │  │ Styling      │  │              │  │              │ ││
│  │  └──────────────┘  └──────────────┘  └──────────────┘ ││
│  └─────────────────────────────────────────────────────────┘│
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/REST
                         │
┌────────────────────────┴────────────────────────────────────┐
│                    API LAYER                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │    Elysia Backend Server (Port 3000)                   ││
│  │  ┌──────────────────────────────────────────────────┐  ││
│  │  │          Bearer Token Authentication             │  ││
│  │  └──────────────────────────────────────────────────┘  ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ ││
│  │  │ OpenAI API   │  │ Anthropic    │  │ Google       │ ││
│  │  │ Integration  │  │ Claude SDK   │  │ GenAI SDK    │ ││
│  │  └──────────────┘  └──────────────┘  └──────────────┘ ││
│  └─────────────────────────────────────────────────────────┘│
└────────────────────────┬────────────────────────────────────┘
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
┌───▼────┐          ┌───▼────┐          ┌───▼────┐
│ OpenAI │          │Anthropic│         │ Google │
│ Cloud  │          │ Claude  │         │ GenAI  │
└────────┘          └────────┘         └────────┘
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Bun 1.2.2 (Ultra-fast JavaScript runtime)
- **Framework**: Elysia (High-performance TypeScript web framework)
- **Language**: TypeScript 5.9.2
- **Auth**: Bearer Token with @elysiajs/bearer
- **AI SDKs**:
  - OpenAI SDK v6.25.0
  - Anthropic SDK v0.78.0
  - Google GenAI SDK v1.42.0

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.1.11
- **Components**: shadcn/ui with Radix UI primitives
- **Routing**: React Router 7.13.0
- **State Management**: TanStack Query 5.90.21
- **Icons**: Lucide React 0.545.0
- **Build Tool**: Bun with custom build configuration

### Monorepo Management
- **Orchestration**: Turborepo 2.8.10 (Build system optimization)
- **Package Manager**: Bun 1.2.2
- **Code Quality**: 
  - ESLint (Linting)
  - Prettier 3.7.4 (Code formatting)
  - TypeScript (Type checking)

## 📋 Project Features

### Backend Capabilities
✅ Multi-provider AI routing (OpenAI, Claude, Google GenAI)
✅ RESTful API endpoints with Elysia
✅ Bearer token authentication and authorization
✅ Type-safe TypeScript implementation
✅ Fast startup and response times with Bun
✅ Hot reload development mode

### Frontend Features
✅ Interactive dashboard UI
✅ Real-time data fetching with React Query
✅ Responsive design with TailwindCSS
✅ Accessible component library (shadcn/ui)
✅ Smooth page transitions with React Router
✅ Modern React 19 hooks and features

## 🚀 Getting Started

### Prerequisites
- Bun 1.2.2 or higher
- Node.js 18 or higher
- API keys for:
  - OpenAI
  - Anthropic (Claude)
  - Google Generative AI

### Installation

```bash
# Clone the repository
git clone https://github.com/harshitsharmaaaa/New-OpenRouter.git
cd New-OpenRouter

# Install dependencies
bun install
```

### Development

```bash
# Run all apps in development mode
bun dev

# Or run specific app
cd apps/api-backend && bun run dev
cd apps/dashboard-frontend && bun dev
```

### Production Build

```bash
# Build all packages
bun run build

# Start frontend (production)
cd apps/dashboard-frontend && bun start

# Start backend (production)
cd apps/api-backend && bun run start
```

## 📦 Monorepo Structure

### Apps
- **api-backend**: Elysia-powered REST API server
  - Integrates with OpenAI, Claude, and Google GenAI
  - Provides unified routing to multiple AI providers
  - Port: 3000

- **dashboard-frontend**: React frontend dashboard
  - Interactive UI for interacting with AI models
  - Real-time data updates
  - Port: 3001

### Scripts (Root Level)
```bash
bun run dev         # Development mode for all apps
bun run build       # Build all apps
bun run lint        # Lint all code
bun run format      # Format code with Prettier
bun run check-types # Type check all code
```

## 🔐 Environment Variables

Create `.env` files in respective app directories:

### Backend (.env)
```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_API_KEY=your_google_key
```

### Frontend (.env)
```
API_URL=http://localhost:3000
```

## 📡 API Endpoints

### Health Check
```
GET /health
```

### AI Routing
```
POST /api/chat
Authorization: Bearer {token}
Content-Type: application/json

{
  "provider": "openai|claude|google",
  "model": "gpt-4|claude-3|gemini-pro",
  "messages": [...],
  "temperature": 0.7
}
```

## 🎯 Key Benefits

🚀 **Performance**: Bun runtime provides 3x faster execution
🔄 **Flexibility**: Switch between AI providers seamlessly
🛡️ **Security**: Bearer token authentication
🎨 **Modern UI**: Beautiful, responsive design
⚙️ **Maintainability**: Full TypeScript codebase
📦 **Scalability**: Monorepo structure for easy expansion

## 🧪 Development Workflow

```bash
# Watch mode development
turbo run dev

# Build with caching
turbo run build

# Run linter
turbo run lint

# Type checking
turbo run check-types

# Code formatting
bun run format
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the codebase structure

---

**Built with ❤️ using Bun, Elysia, React, and TailwindCSS**

*Last Updated: 2026-02-25 20:44:08*