import { useState, useEffect } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '', process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? '');

/**
 * Custom hook para gestionar la sesión de autenticación de Supabase.
 * Retorna la sesión actual y un booleano indicando si la sesión está cargando.
 */
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Nuevo estado para controlar la carga

  useEffect(() => {
    // Intentar obtener la sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false); // La sesión inicial ya se cargó
    });

    // Suscribirse a los cambios de estado de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setIsLoading(false); // En cada cambio, aseguramos que isLoading sea false
    });

    // Limpieza de la suscripción al desmontar el componente
    return () => subscription.unsubscribe();
  }, []); // El array de dependencias vacío asegura que se ejecute una sola vez al montar

  return { session, isLoading, supabase, setSession };
}