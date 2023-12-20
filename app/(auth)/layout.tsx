

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row md:overflow-hidden">
      {children}
    </div>
  );
}