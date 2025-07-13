'use client'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAuth } from "@/src/hooks/useAuth";
import FullScreenLoading from '@/src/components/loading/FullScreenLoading';
import { useRouter } from 'next/navigation';


type Props = {}

export default function Login({ }: Props) {
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
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
            </div>
        </div>
    )
}