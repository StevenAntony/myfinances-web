'use client'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAuth } from "@/src/hooks/useAuth";
import FullScreenLoading from '@/src/components/loading/FullScreenLoading';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const { session, supabase, isLoading } = useAuth();
    
    if (isLoading) {
        return (<FullScreenLoading />)
    }

    if (session) {
        router.push('/dashboard/transactions');
        return <FullScreenLoading />;
    }
    
    return (
        <div className='w-screen h-svh flex justify-center items-center'>
            <div className='w-96'>
                <Auth 
                    supabaseClient={supabase} 
                    appearance={{ theme: ThemeSupa }} 
                    showLinks={false}
                    localization={{
                        variables: {
                            sign_in: {
                                email_label: 'Correo Electronico',
                                password_label: 'Contraseña',
                                email_input_placeholder: 'Correo Electronico',
                                password_input_placeholder: 'Contraseña',
                                button_label: 'Iniciar Sesión',
                                loading_button_label: 'Iniciando Sesión',
                                social_provider_text: 'Iniciar Sesión con',
                                link_text: 'Iniciar Sesión',
                            },
                            forgotten_password: {
                                email_label: 'Correo Electronico',
                                password_label: 'Contraseña',
                                email_input_placeholder: 'Correo Electronico',
                                button_label: 'Recuperar Contraseña',
                                loading_button_label: 'Recuperando Contraseña',
                                link_text: '¿Olvidaste tu contraseña?',
                            },
                            sign_up: {
                                email_label: 'Correo Electronico',
                                password_label: 'Contraseña',
                                email_input_placeholder: 'Correo Electronico',
                                password_input_placeholder: 'Contraseña',
                                button_label: 'Registrarse',
                                loading_button_label: 'Registrando',
                                social_provider_text: 'Registrarse con',
                                link_text: '',
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}