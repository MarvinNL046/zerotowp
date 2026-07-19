import { ExternalLink } from "lucide-react";

export default function SubscribersAdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Subscribers</h1>
      <div className="rounded-xl border border-border bg-muted/30 p-6 max-w-xl">
        <p className="text-sm leading-relaxed">
          Newsletter subscriptions have moved to the shared{" "}
          <span className="font-semibold">wetry-sites-leads</span> backend
          (Convex project <code className="text-xs">wetry-sites-leads</code>,
          site id <code className="text-xs">zerotowp</code>). This admin page no
          longer stores or lists subscribers.
        </p>
        <p className="text-sm leading-relaxed mt-3 text-muted-foreground">
          To view or manage the list, run from the wetry-sites-leads repo:
        </p>
        <pre className="mt-2 rounded-lg bg-muted p-3 text-xs overflow-x-auto">
          {`npx convex run admin:listSubscribers '{"site":"zerotowp"}' --prod`}
        </pre>
        <p className="text-xs text-muted-foreground mt-4 inline-flex items-center gap-1">
          <ExternalLink className="h-3 w-3" />
          See the wetry-sites-leads README for the full admin CLI.
        </p>
      </div>
    </div>
  );
}
