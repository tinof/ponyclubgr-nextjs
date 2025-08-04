# Pony Club Acheron - Adventure Tours Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive web application for Pony Club Acheron, showcasing horse riding and rafting adventure tours at the mythical Acheron River in Greece.

## Live Website

**Production**: [ponyclub.gr](https://ponyclub.gr)

## Project Overview

This application provides a platform for Pony Club Acheron to showcase adventure tour packages through a mobile-first interface.

### Key Features

-   **Interactive Tour Packages**: Dynamic presentation of rafting and horse riding experiences.
-   **Visual Storytelling**: High-quality image galleries with smooth transitions.
-   **Responsive Design**: Optimized for all devices with a mobile-first approach.
-   **Performance Optimized**: Fast loading times and smooth animations.
-   **Accessibility Focused**: WCAG compliant with keyboard navigation support.

## Technical Architecture

### Core Technologies

-   **Next.js 15.4.5**: Latest App Router with React Server Components
-   **React 19.1.1**: Leveraging concurrent features and modern hooks
-   **TypeScript 5.5.4**: Full type safety and enhanced developer experience
-   **Tailwind CSS 4.1**: Utility-first styling with custom design system
-   **Lucide React**: Modern, customizable icon library

### Modern Development Practices

-   **Static Site Generation (SSG)**: Pre-rendered for optimal performance.
-   **Component-Based Architecture**: Modular, reusable UI components.
-   **Type-Safe Development**: Comprehensive TypeScript implementation.
-   **Performance Optimization**: Image optimization and code splitting.
-   **Responsive Design**: Mobile-first approach with fluid layouts.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [[...slug]]/       # Dynamic catch-all routing
│   │   ├── page.tsx       # Main page component
│   │   └── client.tsx     # Client-side wrapper (if applicable)
│   └── layout.tsx         # Root layout with metadata
├── components/            # Reusable UI components
│   ├── Header.tsx         # Site header with branding
│   ├── WelcomeSection.tsx # Hero section with company info
│   ├── PackageCards.tsx   # Tour package displays
│   ├── ImageSlider.tsx    # Interactive image carousel
│   └── BottomNav.tsx      # Mobile navigation
└── index.css             # Global styles and Tailwind config
```

## Installation & Setup

### Prerequisites

-   Node.js 18.0 or higher
-   pnpm 8.0 or higher

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/ponyclub-acheron.git
cd ponyclub-acheron

# Install dependencies
pnpm install

# Set up environment variables (for weather widget)
cp .env.local.example .env.local
# Edit .env.local and add your WeatherAPI.com API key

# Start development server
pnpm run dev

# Open browser to http://localhost:3000
```

### Weather Widget Setup

The application includes a real-time weather widget for Glyki, Greece. To enable it:

1.  **Get a free API key** from [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
2.  **Configure environment variables** as shown in the Quick Start section
3.  **For production deployment**, add the `WEATHER_API_KEY` to your Vercel environment variables

For detailed setup instructions, see [Weather Setup Guide](docs/WEATHER_SETUP.md).

### Available Scripts

```bash
pnpm run dev        # Start development server
pnpm run build      # Create production build
pnpm run start      # Start production server
pnpm run preview    # Preview production build locally
pnpm run lint       # Lint source code with Biome
pnpm run lint:fix   # Fix linting issues with Biome
pnpm run format     # Format source code with Biome
pnpm run format:fix # Fix formatting issues with Biome
pnpm run check      # Check source code with Biome
pnpm run check:fix  # Fix check issues with Biome
```

## Build & Deployment

### Static Export Configuration

The application is configured for static export, making it compatible with any static hosting service:

```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',
  distDir: './dist',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
}
```

### Deployment Process

```bash
# Build for production
pnpm run build

# Deploy the ./dist folder to your hosting service
# Compatible with: Vercel, Netlify, GitHub Pages, AWS S3, etc.
```

### Hosting Recommendations

-   **Vercel**: Optimal for Next.js applications with automatic deployments
-   **Netlify**: Excellent for static sites with form handling capabilities
-   **GitHub Pages**: Free hosting for open-source projects
-   **AWS S3 + CloudFront**: Enterprise-grade hosting with global CDN

## Design System

### Color Palette

```css
:root {
  --sage-50: #f0f3f0;      /* Background tones */
  --sage-primary: #5a6f5a;  /* Brand primary */
}
```

### Typography

-   **Primary Font**: Poppins (Google Fonts)
-   **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
-   **Loading**: Optimized with `font-display: swap`

### Component Design Principles

-   **Mobile-First**: Responsive design starting from 320px
-   **Accessibility**: WCAG 2.1 AA compliance
-   **Performance**: Optimized animations and transitions
-   **Consistency**: Unified spacing and color system

## Key Features & Implementation

### Interactive Image Slider

```typescript
// Advanced carousel with accessibility features
export function ImageSlider({ images, alt, smallDots }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <img src={images[currentIndex]} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`cursor-pointer transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </>
  );
}
```

### Dynamic Package Cards

-   **Responsive Layout**: Adapts to different screen sizes.
-   **Interactive Elements**: Hover effects and smooth transitions.
-   **Accessibility**: Proper ARIA labels and keyboard navigation.
-   **Performance**: Optimized rendering with React best practices.

### Modern Navigation

-   **Bottom Navigation**: Mobile-optimized with backdrop blur effects.
-   **Semantic HTML**: Proper use of navigation landmarks.
-   **Touch-Friendly**: Optimized for mobile interactions.

## Performance Metrics

### Google PageSpeed Insights Scores

[![PageSpeed Performance](https://img.shields.io/badge/Performance-98/100-brightgreen?logo=google-chrome)](https://pagespeed.web.dev/)
[![PageSpeed Best Practices](https://img.shields.io/badge/Best_Practices-100/100-brightgreen?logo=google-chrome)](https://pagespeed.web.dev/)

### Lighthouse Scores (Target)

-   **Performance**: 95+
-   **Accessibility**: 100
-   **Best Practices**: 100
-   **SEO**: 95+

### Optimization Techniques

-   **Image Optimization**: WebP format with fallbacks.
-   **Code Splitting**: Dynamic imports for optimal loading.
-   **CSS Optimization**: Tailwind CSS purging for minimal bundle size.
-   **Font Loading**: Optimized Google Fonts integration.

## Code Quality

### Biome Configuration

This project uses [Biome](https://biomejs.dev/) for linting, formatting, and checking. Biome provides comprehensive type checking and static analysis for the codebase.

### Available Biome Commands

-   `pnpm run lint`: Lint source code.
-   `pnpm run lint:fix`: Fix linting issues.
-   `pnpm run format`: Format source code.
-   `pnpm run format:fix`: Fix formatting issues.
-   `pnpm run check`: Check source code for errors.
-   `pnpm run check:fix`: Fix check issues.

## Browser Support

-   **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
-   **Mobile**: iOS Safari 14+, Chrome Mobile 90+
-   **Progressive Enhancement**: Graceful degradation for older browsers.

## Future Enhancements

### Planned Features

-   **Booking System Integration**: Real-time availability and reservations.
-   **Multi-language Support**: Greek and English localization.
-   **Payment Processing**: Secure online booking with Stripe integration.
-   **Content Management**: Headless CMS integration for dynamic content.
-   **Analytics Integration**: Google Analytics 4 and performance monitoring.

### Technical Roadmap

-   **React 19 Features**: Implement concurrent features and Suspense.
-   **Next.js 15 Optimizations**: Leverage new caching strategies.
-   **Performance Monitoring**: Real User Monitoring (RUM) implementation.
-   **SEO Enhancement**: Structured data and advanced meta tags.

## Contributing

This project follows modern development practices and welcomes contributions that maintain code quality and performance standards.

### Development Guidelines

-   **Code Style**: Adheres to Biome's strict mode configuration.
-   **Commit Messages**: Conventional Commits specification.
-   **Testing**: Component testing with React Testing Library.
-   **Documentation**: Comprehensive inline documentation.

### Getting Started with Development

```bash
# Fork the repository and clone your fork
git clone https://github.com/your-username/ponyclub-acheron.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and test thoroughly
pnpm run dev
pnpm run build
pnpm run lint

# Commit with conventional commit format
git commit -m "feat: add new booking component"

# Push and create a pull request
git push origin feature/your-feature-name
```

## Security & Privacy

### Data Protection

-   **No Personal Data Collection**: Static site with no backend data storage.
-   **HTTPS Enforcement**: Secure connections for all traffic.
-   **Content Security Policy**: Implemented for XSS protection.
-   **Privacy Compliant**: GDPR-ready architecture.

### Security Best Practices

-   **Dependency Scanning**: Regular security audits with `pnpm audit`.
-   **Static Analysis**: TypeScript strict mode and Biome type checking.
-   **Build Security**: Secure build pipeline with integrity checks.

## Contact & Support

### Business Inquiries

-   **Website**: [ponyclub.gr](https://ponyclub.gr)
-   **Location**: Acheron River, Glyki, Greece
-   **Established**: 1998

### Technical Support

For technical issues or questions about the codebase:

1.  Check the [Issues](https://github.com/your-username/ponyclub-acheron/issues) section.
2.  Review the [Next.js 15 Improvement Plan](./nextjs15-improvement-plan.md).
3.  Consult the [Next.js Documentation](https://nextjs.org/docs).

## License

This project is proprietary software developed for Pony Club Acheron. All rights reserved.

### Usage Rights

-   **Commercial Use**: Restricted to Pony Club Acheron business operations.
-   **Modification**: Authorized developers only.
-   **Distribution**: Not permitted without explicit permission.
-   **Study/Reference**: Code structure and patterns may be referenced for educational purposes.
