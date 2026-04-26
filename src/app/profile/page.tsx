import ProfileSettings from "./ProfileSettings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil — Hacoo Elite",
  description: "Gestiona tu cuenta y ajustes personales en Hacoo Elite.",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#080808]">
      <ProfileSettings />
    </main>
  );
}
