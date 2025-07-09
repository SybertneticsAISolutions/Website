import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Server-side authentication check
async function checkAdminAuth() {
  // This makes the route dynamic and forces server-side rendering
  // The actual auth check will happen client-side after hydration
  return true;
}

// Dynamically import the admin content
const AdminContent = dynamic(() => import('./components/AdminContent'), {
  loading: () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading admin panel...</p>
      </div>
    </div>
  )
});

export default async function AdminDashboard() {
  // This forces the route to be dynamic/server-rendered
  await checkAdminAuth();
  
  return <AdminContent />;
} 