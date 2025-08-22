import AdminGuard from '@/utils/route-guard/AdminGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <main>{children}</main>
    </AdminGuard>
  );
}
