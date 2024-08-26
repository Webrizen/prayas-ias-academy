"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASEURL}/auth/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const { token } = response.data;
            login(token);
            toast.success("Login successful - we're redirecting you to the dashboard.", {
                duration: 4000,
                position: "bottom-center",
            });
            setIsLoading(false);
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error(`Login error - ${error.response?.data?.message || "Unknown error"}`, {
                duration: 4000,
                position: "bottom-center",
            });
            setIsLoading(false);
        }
    };

    if (isAuthenticated) {
        toast.success("so, you're already logged in - we're redirecting you to the dashboard.", {
            duration: 4000,
            position: "bottom-center",
        });
        router.back();
    }

    return (
        <>
            <Toaster position="bottom-center" />
            <div className="container relative md:min-h-screen h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative h-full flex-col bg-muted p-10 md:text-white text-slate-950 lg:flex dark:border-r dark:border-slate-700">
                    <div className="absolute inset-0 bg-[url('/bg-login.svg')] bg-center bg-cover bg-no-repeat" />
                    <Link
                        href="/"
                        className="md:hidden relative whitespace-nowrap opacity-0 md:top-0 -top-[15%] z-20 flex items-center text-lg font-medium bg-transparent backdrop-blur-3xl md:backdrop-blur-0 md:px-0 md:py-0 px-3 py-2 rounded-xl"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Customer Connect Portal.
                    </Link>
                    <div className="relative z-20 mt-auto"></div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login to your account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password to log in
                            </p>
                        </div>
                        <Card className="w-full">
                            <CardContent className="w-full py-10">
                                <form className="w-full grid gap-4" onSubmit={onSubmit}>
                                    <div className="grid gap-2">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            label="Email"
                                            variant="underlined"
                                            placeholder="example@example.com"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="underlined"
                                            placeholder="*********"
                                            autoCapitalize="none"
                                            autoComplete="current-password"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="rounded"
                                        color="primary"
                                    >
                                        {isLoading ? <Spinner color="warning" /> : "Login"}
                                    </Button>
                                </form>
                                <div className="flex justify-center mt-3 items-center">
                                    <Link href="#" className="text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                        <p className="px-8 text-center text-sm text-muted-foreground md:pb-0 pb-10">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms-and-conditions"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy-policy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}