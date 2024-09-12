"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!fullName || !email || !password) {
        toast({
          variant: "destructive",
          title: "Please Fill Out All Fields",
        });
        setIsLoading(false);
      } else {
        // Send signup request to your backend
        toast({
          title: `Signup successful - Welcome ${fullName}`,
        });
        setIsLoading(false);
      }
    } catch (error) {
      // Handle signup errors
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Signup unsuccessful",
      });
      // Reset loading state after a brief delay (for demo purposes)
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Send signup request to your backend
      toast({
        title: "Google Sign-In successful",
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Google Sign-In error:", error);
      toast({
        variant: "destructive",
        title: "Google Sign-In unsuccessful",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="fullName"
              label="Full Name"
              placeholder="John Deo"
              type="text"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              label="Email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="Password"
              label="Password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOpenIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <svg
                className="animate-spin h-4 w-4 mr-2 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Sign Up with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-950 rounded-full px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 mr-2 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <IconBrandGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
