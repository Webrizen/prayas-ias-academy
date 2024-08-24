"use client";
import React from "react";
import Image from "next/image";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
    const { setTheme } = useTheme();
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="p-2 bg-[rgba(225,225,225,0.1)] backdrop-blur-3xl z-50 sticky top-0">
            <div className="md:container mx-auto flex justify-between items-center">
                <Link
                    href="/"
                    className="h-8 w-auto whitespace-nowrap md:flex hidden gap-2 justify-start items-center p-1 rounded-md hover:bg-[rgba(225,225,225,0.05)]"
                >
                    <Image
                        src={Logo}
                        placeholder="blur"
                        alt="Logo"
                        width={500}
                        height={500}
                        className="h-8 w-auto"
                    />
                    <span>Prayas IAS Academy</span>
                </Link>
                <div className="w-full flex justify-end items-center gap-2">
                    <Button className="rounded-full min-w-[30px] bg-transparent px-1">
                        <Search className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0" />
                        <span className="sr-only">Toggle Search</span>
                    </Button>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="rounded-full min-w-[30px] bg-transparent px-1">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="light" onClick={() => setTheme("light")}>
                                Light
                            </DropdownItem>
                            <DropdownItem key="dark" onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownItem>
                            <DropdownItem key="system" onClick={() => setTheme("system")}>
                                System
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    {isAuthenticated ? (
                        <Dropdown placement="bottom-end" backdrop="blur">
                            <DropdownTrigger>
                                <Avatar className="cursor-pointer h-8 w-auto">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Menu">
                                <DropdownItem key="profile" description="View your profile" href="/profile">
                                    Profile
                                </DropdownItem>
                                <DropdownItem key="settings" description="Adjust your preferences" showDivider href="/settings">
                                    Settings
                                </DropdownItem>
                                <DropdownItem key="logout" description="Sign out of your account" className="text-danger" color="danger" onClick={logout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Button className="rounded hover:backdrop-blur-lg">
                            <Link href="/auth">
                                Login
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;