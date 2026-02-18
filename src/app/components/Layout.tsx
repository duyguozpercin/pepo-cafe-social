import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border/40">
        <nav className="mx-auto flex max-w-5xl gap-4 p-4">
          <Link className="hover:underline" to="/">
            Home
          </Link>
          <Link className="hover:underline" to="/menu">
            Menu
          </Link>
          <Link className="hover:underline" to="/franchise">
            Franchise
          </Link>
          <Link className="hover:underline" to="/kariyer">
            Kariyer
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
