import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Toaster } from "sonner";

const ALLOWED_ADMIN_EMAILS = ["info@staycoolairco.nl"];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // Not logged in
  if (!user) {
    redirect("/sign-in?redirect_url=/admin");
  }

  // Check email
  const userEmail = user.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!userEmail || !ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
    redirect("/");
  }

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
