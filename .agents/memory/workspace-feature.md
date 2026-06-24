---
name: My Workspace Feature
description: Architecture decisions for the My Workspace private knowledge vault page
---

# My Workspace Feature

## Core Concept
Each user gets a 5 GB private storage area. Documents are marked `visibility: 'private'` and have an `ownerId`. `getVisibleDocuments()` in `workspacePermissions.ts` filters to only show docs where `ownerId === currentUser.id`.

## File Layout
- `src/data/workspace/workspaceTypes.ts` — all TS interfaces (WorkspaceDocument, StorageInfo, AISearchMode, etc.)
- `src/data/workspace/workspaceData.ts` — all mock constants; never hardcode in components
- `src/data/workspace/workspacePermissions.ts` — canViewPrivateDocument, getVisibleDocuments
- `src/data/workspace/storageUtils.ts` — isStorageFull() gates the upload button

## StorageRing
Pure SVG with `stroke-dasharray` / `stroke-dashoffset`. No third-party chart lib needed. Fixed-size component, not inside ResponsiveContainer.

## StorageBreakdownChart
Uses Recharts PieChart with **fixed width/height** (not ResponsiveContainer) to avoid the "fixed numbers" console warning.

## AI Search Modes
Three modes: `enterprise | workspace | hybrid`. `hybrid` is default. Mode label is passed to `RecentAIChats` for display. State lives in WorkspacePage.

## Routing
`/workspace` and `/workspace/:sub` both render WorkspacePage. Sub-path routing for My Documents / My Notes / etc. is a future enhancement — all sub-routes currently show the same page.

## Sidebar Section
WORKSPACE_NAV_ITEMS in navigationConfig.ts is rendered as a separate labeled section ("MY WORKSPACE") in both Sidebar.tsx and MobileSidebarDrawer.tsx. The section divider is a `<p>` label, not a nav item.

**Why:** Keeps enterprise nav and personal workspace nav visually separated — mirrors how enterprise products like Confluence / Notion structure user-scoped content.
