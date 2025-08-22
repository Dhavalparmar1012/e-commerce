import UserGuard from '@/utils/route-guard/UserGuard';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserGuard>
      <main>{children}</main>
    </UserGuard>
  );
}
