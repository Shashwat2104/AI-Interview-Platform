/**
 * Route-change transition for the dashboard area: content rises in softly
 * when navigating between major sections (dashboard, jobs, applications...).
 */
export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <div className="rise-in">{children}</div>;
}
