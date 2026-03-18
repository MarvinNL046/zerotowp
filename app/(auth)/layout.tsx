import { ClerkProvider } from "@clerk/nextjs";

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
