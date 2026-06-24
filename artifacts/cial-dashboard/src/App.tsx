import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/layout/AppShell";
import DashboardPage from "@/pages/DashboardPage";
import AIAssistantPage from "@/pages/AIAssistantPage";
import DocumentsPage from "@/pages/DocumentsPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import AssetsPage from "@/pages/AssetsPage";
import PoliciesSOPsPage from "@/pages/PoliciesSOPsPage";
import FAQsPage from "@/pages/FAQsPage";
import DepartmentsPage from "@/pages/DepartmentsPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import AdminSettingsPage from "@/pages/AdminSettingsPage";
import WorkspacePage from "@/pages/WorkspacePage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppShell>
      <Switch>
        <Route path="/" component={DashboardPage} />
        <Route path="/assistant" component={AIAssistantPage} />
        <Route path="/documents" component={DocumentsPage} />
        <Route path="/knowledge" component={KnowledgeBasePage} />
        <Route path="/assets" component={AssetsPage} />
        <Route path="/policies" component={PoliciesSOPsPage} />
        <Route path="/faqs" component={FAQsPage} />
        <Route path="/departments" component={DepartmentsPage} />
        <Route path="/analytics" component={AnalyticsPage} />
        <Route path="/admin" component={AdminSettingsPage} />
        <Route path="/workspace" component={WorkspacePage} />
        <Route path="/workspace/:sub" component={WorkspacePage} />
        <Route component={NotFound} />
      </Switch>
    </AppShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
