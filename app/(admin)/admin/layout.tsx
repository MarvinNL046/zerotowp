import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-[240px] p-8">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
