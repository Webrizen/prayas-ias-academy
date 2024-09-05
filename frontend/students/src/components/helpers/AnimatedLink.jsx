"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const titleAnimation = {
    rest: {
        transition: {
            staggerChildren: 0.003,
        },
    },
    hover: {
        transition: {
            staggerChildren: 0.003,
        },
    },
};

const letterAnimation = {
    rest: {
        y: 0,
    },
    hover: {
        y: -30,
        transition: {
            duration: 0.3,
            ease: [0.6, 0.01, 0.05, 0.95],
            type: "tween",
        },
    },
};

const letterAnimationTwo = {
    rest: {
        y: 30,
    },
    hover: {
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.6, 0.01, 0.05, 0.95],
            type: "tween",
        },
    },
};

export default function AnimatedLink({ title, link }) {
    const [isHovered, setHovered] = useState(false);
    const AnimatedLetter = ({ character, animation }) => {
        return (
            <motion.span
                variants={animation}
                className="relative inline-block whitespace-nowrap"
            >
                {character}
            </motion.span>
        );
    };
    
    const AnimatedWord = ({ title, animation }) => {
        return (
            <motion.span
                variants={titleAnimation}
                initial="rest"
                animate={isHovered ? "hover" : "rest"}
                className="whitespace-nowrap relative"
            >
                {title
                    .split("")
                    .map((character, i) =>
                        character === " " ? (
                            <span key={i}>&nbsp;</span>
                        ) : (
                            <AnimatedLetter character={character} animation={animation} />
                        )
                    )}
            </motion.span>
        );
    };

    return (
        <Link href={link} className="lg:inline-flex lg:w-auto px-3 py-2 rounded-full text-slate-700 dark:text-slate-300 dark:hover:text-blue-300 items-center hover:text-blue-500 justify-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)]">
            <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative overflow-hidden cursor-pointer w-full h-full"
        >
            <AnimatedWord title={title} animation={letterAnimation} />
            <div className="absolute top-0 w-full h-full">
                <AnimatedWord title={title} animation={letterAnimationTwo} />
            </div>
        </motion.div>
        </Link>
    );
}