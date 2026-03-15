import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">Page not found.</p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
        >
          Go Home
        </Link>
        <Link
          href="/start-here"
          className="rounded-lg border px-6 py-3 hover:bg-muted"
        >
          Start Here
        </Link>
      </div>
    </div>
  );
}
