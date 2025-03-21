'use client'
import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();

    const handleGuestLogin = () => {
        localStorage.setItem('isGuest', 'true');

        router.push('/'); // Redirect to home page
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen space-y-4'>
            <SignUp />
            {/* <Button
                onClick={handleGuestLogin}
            >
                Continue as Guest
            </Button> */}
        </div>
    );
}
