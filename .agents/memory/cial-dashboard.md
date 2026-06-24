---
name: CIAL Knowledge OS Dashboard
description: Architecture and key decisions for the CIAL Knowledge OS enterprise dashboard (artifacts/cial-dashboard)
---

# CIAL Knowledge OS Dashboard

## Stack
React + TypeScript + Vite + Tailwind CSS at `artifacts/cial-dashboard/`. Routing via wouter. No real API calls — all data is static mock arrays.

## Core Architecture Rules

**Config-driven dashboard blocks:**
- `src/config/dashboardConfig.ts` defines `DASHBOARD_BLOCKS[]` with `component` string names
- `DashboardPage` maps component names to actual React components via `BLOCK_COMPONENTS` record
- Individual blocks live in `src/components/dashboard/blocks/`
- Block col span controlled by `colSpan: 1 | 2 | 3` in config → mapped to Tailwind classes

**All business data lives in data files, never in page components:**
- KPI stats, quick searches, quick actions → `src/data/dashboardData.ts`
- Filter options (categories, departments, types) → exported from each domain data file
- Admin integrations, theme config, ingestion settings → `src/data/adminData.ts`

**FilterBar API:** Accepts `filters: { key, label, options: string[] }[]` + `values: Record<string, string>` + `onChange`. Do NOT pass `FilterOption[]` — options are `string[]`.

**Link from wouter:** Already renders `<a>`. Never wrap in another `<a>`. Use `<Link className="...">` directly.

**CIAL Logo:** Always `<img src="/cial-logo.png" />` — never import as module.

**CIAL Brand Colors:**
- Primary green: `#4a7c3f` / CSS var `--primary: 95 50% 33%`
- Dark olive: `#2d4f22`, Light green: `#7ab648`, Soft mint bg: `#f3f7f0`, Accent orange: `#e8820c`

**CSS Variables:** Set correctly in `src/index.css`. Do NOT overwrite the `:root` block.

## INITIAL_CHAT IDs
Messages in `INITIAL_CHAT` (faqData.ts) must have explicit string `id` fields (`init-user-1`, `init-ai-1`). Without them, React key=undefined triggers warnings.

## Component Locations
- Layout: `src/components/layout/` — AppShell, Sidebar, TopBar, MobileSidebarDrawer
- Common: `src/components/common/` — StatCard, DashboardBlock, SearchBar, FilterBar, StatusPill, EmptyState, ChartCard, PageHeader
- Dashboard: `src/components/dashboard/` — HeroSearch, KpiRow + `blocks/` subdirectory
- Assistant: `src/components/assistant/` — ChatPanel, ChatMessage, SourceCitationCard, ConversationHistory
- Documents: `src/components/documents/` — DocumentRow, DocumentCard, UploadModal
- Assets: `src/components/assets/` — AssetRow

## Future Work (planned follow-ups)
- Auth: replace CURRENT_USER (userConfig.ts) with real Microsoft Entra ID / Keycloak session
- AI: replace mock setTimeout in ChatPanel with real LLM call via API server /chat endpoint
- DB: move static data arrays to PostgreSQL via API server REST endpoints
- Mobile: Expo React Native companion app
