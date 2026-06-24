---
name: CIAL Knowledge OS Dashboard
description: Architecture and key decisions for the CIAL Knowledge OS enterprise dashboard (artifacts/cial-dashboard)
---

# CIAL Knowledge OS Dashboard

## Architecture
- React + TypeScript + Vite + Tailwind CSS at `artifacts/cial-dashboard/`
- Routing: wouter with `base={import.meta.env.BASE_URL.replace(/\/$/, "")}`
- All data is static mock arrays — no real API calls
- CIAL logo at `public/cial-logo.png` — referenced as `"/cial-logo.png"` in img src (not imported)

## Key Design Decisions

**Why:** Link from wouter already renders an `<a>` tag. Wrapping it in another `<a>` causes a React hydration warning. Use `<Link className="...">` directly, never `<Link><a>...</a></Link>`.

**How to apply:** In Sidebar.tsx and MobileSidebarDrawer.tsx, nav items use `<Link href={...} className={...}>` directly — no inner anchor tag.

## CIAL Brand Colors
- Primary green: `#4a7c3f` / CSS var `--primary: 95 50% 33%`
- Dark olive: `#2d4f22`
- Light green: `#7ab648`
- Soft mint background: `#f3f7f0`
- Accent orange: `#e8820c`

## CSS Variables
Already set correctly in `src/index.css` — do NOT overwrite the `:root` block. All HSL values use space-separated format: `--primary: 95 50% 33%` (no `hsl()` wrapper).

## File Structure
- `src/config/` — themeConfig, navigationConfig, dashboardConfig, securityConfig, userConfig, appConfig
- `src/data/` — documentsData (20), assetsData (15), sopData (10), faqData (8+), knowledgeBaseData, departmentsData (6), auditLogData (20)
- `src/components/layout/` — AppShell, Sidebar, TopBar, MobileSidebarDrawer
- `src/components/common/` — StatCard, DashboardBlock, SearchBar, FilterBar, StatusPill, EmptyState, ChartCard, PageHeader
- `src/pages/` — 10 pages (Dashboard, AIAssistant, Documents, KnowledgeBase, Assets, PoliciesSOPs, FAQs, Departments, Analytics, AdminSettings)

## Future Work
- Auth: replace CURRENT_USER in userConfig.ts with real Microsoft Entra ID / Keycloak session
- AI: replace mock setTimeout responses in AIAssistantPage with real LLM call via API server /chat endpoint
- DB: move mock data arrays to PostgreSQL via API server REST endpoints
