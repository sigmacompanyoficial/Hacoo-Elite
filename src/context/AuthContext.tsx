"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: "admin" | "user";
  createdAt?: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.user_metadata, session.user.email);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        fetchProfile(currentUser.id, currentUser.user_metadata, currentUser.email);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, userMetadata?: any, userEmail?: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        setProfile({
          uid: data.id,
          displayName: data.display_name,
          email: data.email,
          photoURL: data.photo_url,
          role: data.role || "user"
        });
      } else {
        // Create profile from metadata if it doesn't exist
        const newProfile = {
          id: userId,
          display_name: userMetadata?.full_name || userMetadata?.name || null,
          email: userEmail || null,
          photo_url: userMetadata?.avatar_url || userMetadata?.picture || null,
          role: "user"
        };

        const { error: insertError } = await supabase
          .from("profiles")
          .upsert(newProfile);

        if (!insertError) {
          setProfile({
            uid: userId,
            displayName: newProfile.display_name,
            email: newProfile.email,
            photoURL: newProfile.photo_url,
            role: "user"
          });
        } else {
          console.error("Supabase Profile Error:", insertError.message, insertError.details);
        }
      }
    } catch (err) {
      console.error("Unexpected Profile Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
