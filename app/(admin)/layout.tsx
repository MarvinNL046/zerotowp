import { ClerkProvider } from "@clerk/nextjs";

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
