import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Server-side check to force dynamic rendering
async function checkLoginRoute() {
  // This makes the route dynamic and forces server-side rendering
  return true;
}

// Dynamically import the login content
const AdminLoginContent = dynamic(() => import('./AdminLoginContent'), {
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading login...</p>
      </div>
    </div>
  )
});

export default async function AdminLogin() {
  // This forces the route to be dynamic/server-rendered
  await checkLoginRoute();
  
  return <AdminLoginContent />;
}