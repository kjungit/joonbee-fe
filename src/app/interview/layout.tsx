export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full p-14">{children}</div>;
}
