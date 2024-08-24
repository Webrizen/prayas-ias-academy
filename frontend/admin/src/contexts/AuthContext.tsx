"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';

// Define the shape of the authentication context
interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const cookies = useCookies();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = cookies.get("jwt");
        setIsAuthenticated(!!token);
    }, [cookies]);

    const login = ({ jwt } : any) => {
        cookies.set("jwt", jwt);
        setIsAuthenticated(true);
    };

    const logout = () => {
        cookies.remove('jwt');
        setIsAuthenticated(false);
        router.push('/auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};