import AdminDashboard from "./AdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — Hacoo Elite",
  description: "Panel de administración exclusivo para gestionar Hacoo Elite.",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#080808]">
      <AdminDashboard />
    </main>
  );
}
