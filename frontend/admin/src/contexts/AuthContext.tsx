"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const cookies = useCookies();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = cookies.get("jwt");
        setIsAuthenticated(!!token);
        setLoading(false);
    }, [cookies]);

    const login = (token: string) => {
        cookies.set("jwt", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        cookies.remove('jwt');
        setIsAuthenticated(false);
        router.back();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};