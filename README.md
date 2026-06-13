# Barakat — Investment with Blessing

A modern investment platform for managing projects and commitments with an elegant Islamic-inspired design.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Getting Started

This project is built with **Next.js 16** and **React 18**, featuring TypeScript and Tailwind CSS for styling.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

You can check your versions:

```bash
node --version
npm --version
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/barakat.git
cd barakat
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables** (if needed)

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
```

## 💻 Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The app will automatically reload as you make changes.

### Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm start`** - Start production server
- **`npm run lint`** - Run ESLint

## 🏗️ Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
barakat/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── investor/          # Investor pages
│   ├── manager/           # Manager pages
│   ├── projects/          # Projects pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ornaments/        # Decorative components (Islamic patterns)
│   ├── ui/               # Reusable UI components
│   └── *.tsx             # Page components
├── data/                 # JSON data files
│   ├── investors.json
│   ├── manager.json
│   └── projects.json
├── lib/                  # Utility functions
│   ├── data.ts
│   ├── format.ts
│   └── role.ts
├── types/                # TypeScript types
│   └── index.ts
├── public/              # Static assets
├── .gitignore           # Git ignore rules
├── next.config.mjs      # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## 🛠️ Technologies

- **[Next.js](https://nextjs.org/)** - React framework with built-in routing and optimization
- **[React](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PostCSS](https://postcss.org/)** - CSS transformations

## 🔧 Environment Variables

Create a `.env.local` file in the root directory for local environment variables:

```env
# Example - Add your environment variables here
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

Note: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/my-feature`
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️**
