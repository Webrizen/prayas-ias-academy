"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@nextui-org/react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated) {
                router.push("/auth");
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner color="primary" />
                <p className="ml-4 text-lg">Checking authentication, please wait...</p>
            </div>
        );
    }

    // Render the children if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;