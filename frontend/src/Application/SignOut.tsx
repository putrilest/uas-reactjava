import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut: React.FC = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/sign-out', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Failed to sign out:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred during sign out:', error);
        }
    };

    React.useEffect(() => {
        handleSignOut();
    }, []);

    return <div>Signing out...</div>;
};

export default SignOut;
