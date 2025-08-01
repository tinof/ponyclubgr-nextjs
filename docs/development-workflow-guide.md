# Development Workflow & CI/CD Guide for Pony Club Next.js App

## Overview

This document outlines the complete development workflow, CI/CD pipeline, and code quality standards for the Pony Club travel tour operator website. This guide serves as a reference for developers and AI coding agents working on this codebase.

## Project Stack

- **Framework:** Next.js 15 with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel
- **Version Control:** GitHub
- **Package Manager:** npm

## 1. Local Development Environment

### Code Quality Requirements

The project enforces code quality through automated tools that run before commits:

#### Required Dependencies
- **Prettier:** Code formatting (to be added)
- **Husky:** Git hooks automation (to be added)
- **lint-staged:** Run tools on staged files only (to be added)

#### Pre-commit Hooks
Every commit automatically triggers:
1. **Prettier formatting** on staged files (`.js`, `.ts`, `.tsx`, `.css`, `.json`)
2. **Commit blocks** if any errors are found

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run preview      # Preview production build
```

## 2. Git Branching Strategy

### Branch Structure
- **`main` branch:** Production-ready code only
  - Protected branch with required status checks
  - Automatic deployment to production via Vercel
  - All changes must come through Pull Requests

- **Feature branches:** Individual development work
  - Naming convention: `feature/description`, `fix/issue-name`, `chore/task`
  - Created from and merged back to `main`
  - Deleted after successful merge

### Workflow Steps
1. Create feature branch from `main`
2. Develop and commit changes (pre-commit hooks ensure quality)
3. Push branch and open Pull Request
4. Automated checks run (CI pipeline)
5. Code review and approval
6. Merge to `main` (triggers production deployment)

## 3. Continuous Integration (CI) - GitHub Actions

### CI Pipeline Triggers
- Every Pull Request to `main` branch
- Manual workflow dispatch (if needed)

### CI Jobs
The CI pipeline (`.github/workflows/ci.yml`) performs:

1. **Environment Setup**
   - Checkout code
   - Setup Node.js (LTS version)
   - Cache npm dependencies

2. **Dependency Installation**
   ```bash
   npm install
   ```

3. **Code Quality Checks**
   ```bash
   # ESLint has been removed from this project
   npx prettier --check .          # Format validation
   ```

4. **Build Validation**
   ```bash
   npm run build                   # Production build test
   ```

### Success Criteria
All CI jobs must pass before PR can be merged. Failed checks block the merge and require fixes.

## 4. Continuous Deployment (CD) - Vercel

### Deployment Strategy
- **Production:** Automatic deployment from `main` branch
- **Preview:** Automatic preview deployments for all PRs
- **Environment:** Production environment variables managed in Vercel dashboard

### Vercel Configuration
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node.js Version:** 18.x (or latest LTS)

### Deployment Flow
1. Code merged to `main` → Automatic production deployment
2. PR opened → Automatic preview deployment with unique URL
3. PR updated → Preview deployment updates automatically
4. PR closed → Preview deployment cleaned up

## 5. Code Standards & Best Practices

### TypeScript Configuration
- Strict mode enabled
- Path mapping configured for clean imports
- Type checking enforced in CI

### Tailwind CSS Guidelines
- Using Tailwind CSS v4
- Custom configuration in `postcss.config.js`
- Utility-first approach with custom components when needed

### File Structure Standards
```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
└── index.css           # Global styles with Tailwind
```

### Component Guidelines
- Functional components with TypeScript
- Props interfaces defined
- Responsive design with Tailwind classes
- Semantic HTML structure

## 6. Quality Gates

### Pre-commit (Local)
- ✅ Prettier formatting
- ✅ Type checking

### Pre-merge (CI)
- ✅ All pre-commit checks
- ✅ Production build success
- ✅ Code review approval

### Pre-deployment (Automatic)
- ✅ All CI checks passed
- ✅ Merge to main branch
- ✅ Vercel build success

## 7. Environment Management

### Local Development
```bash
npm run dev  # http://localhost:3000
```

### Preview Deployments
- Unique URL per PR
- Full feature testing environment
- Shareable for stakeholder review

### Production
- Custom domain through Vercel
- Performance monitoring
- Error tracking via Vercel analytics

## 8. Emergency Procedures

### Hotfixes
1. Create `hotfix/description` branch from `main`
2. Make minimal necessary changes
3. Follow standard PR process (CI still runs)
4. Fast-track review and merge
5. Monitor deployment

### Rollback
1. Revert commit in `main` branch
2. Automatic redeployment with previous version
3. Or use Vercel dashboard rollback feature

## 9. AI Coding Agent Guidelines

### When Working on This Codebase:
1. **Always run local checks** before suggesting changes
2. **Follow existing patterns** in component structure
3. **Maintain TypeScript strict typing**
4. **Use Tailwind utilities** over custom CSS
5. **Test builds locally** with `npm run build`
6. **Respect the branching strategy** - never commit directly to main
7. **Update this guide** if workflow changes are made

### Common Tasks:
- New features: Create feature branch, develop, test, PR
- Bug fixes: Follow same process as features
- Dependencies: Update package.json, test build, update docs if needed
- Configuration changes: Test locally, verify CI still passes

## 10. Monitoring & Maintenance

### Regular Tasks
- Monitor Vercel deployment status
- Review GitHub Actions workflow runs
- Update dependencies monthly
- Performance monitoring via Vercel analytics

### Key Metrics to Watch
- Build times
- Bundle size
- Core Web Vitals
- Error rates

---

**Last Updated:** July 31, 2025
**Version:** 1.0
**Maintainer:** Development Team

This guide should be updated whenever workflow changes are implemented.
