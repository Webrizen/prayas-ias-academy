import { Checkbox, Input, Textarea } from "@nextui-org/react";
import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    PhoneCall,
    Twitter,
} from "lucide-react";
import React from "react";

const page = (props) => {
    return (
        <section className="md:container mx-auto md:p-14 p-4">
            <div className="flex flex-col items-center justify-center gap-5 px-5 py-7">
                <h1 className="font-sora text-5xl font-extrabold">Contact Us</h1>
                <p className="text-center text-lg font-medium text-gray-500">
                    Any question or remarks? Just write us a message!
                </p>
            </div>
            <div className="grid grid-cols-7 rounded-xl border bg-white p-3 sm:min-h-[600px]">
                <div className="col-span-7 flex flex-col items-start justify-between gap-10 rounded-xl bg-black p-10 sm:col-span-3">
                    <div>
                        <h1 className="font-sora text-3xl font-medium text-white">
                            Contact Information
                        </h1>
                        <p className="text-left font-medium text-gray-500">
                            Say something to start a live chat!
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-7">
                        <p className="flex items-center gap-4 text-lg font-medium text-white">
                            <Mail size={20} />
                            <a
                                href="mailto:support@prayasiasacademy.com"
                                className="font-rubik text-sm font-light text-white"
                            >
                                support@prayasiasacademy.com
                            </a>
                        </p>
                        <p className="flex items-center gap-4 text-lg font-medium text-white">
                            <PhoneCall size={20} />
                            <a
                                href="tel:+(516)387-2922"
                                className="font-rubik text-sm font-light text-white"
                            >
                                +(516) 387-2922
                            </a>
                        </p>
                        <p className="flex items-center gap-4 text-lg font-medium text-white">
                            <MapPin size={20} />
                            <a
                                href="https://goo.gl/maps/3zrQb8jGj8C2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-rubik text-sm font-light text-white"
                            >
                                Westbury NY 11590
                            </a>
                        </p>
                    </div>
                    <div className="flex items-center justify-start gap-1">                        
                        <a href="https://instagram.com/heda_healing" target="_blank"
                            rel="noopener noreferrer" className="w-10 h-10 rounded-xl text-slate-300 hover:text-slate-100 cursor-pointer backdrop-blur-3xl hover:bg-[rgba(225,225,225,0.1)] flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram w-4 h-4" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                            </svg>
                        </a>
                        <a href="https://tiktok.com/heda_healing17" target="_blank"
                            rel="noopener noreferrer" className="w-10 h-10 rounded-xl text-slate-300 hover:text-slate-100 cursor-pointer backdrop-blur-3xl hover:bg-[rgba(225,225,225,0.1)] flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg>
                        </a>
                    </div>
                </div>
                <form action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`} method="POST" className="col-span-7 flex flex-col items-start justify-start gap-10 p-5 *:w-full sm:col-span-4 sm:p-10">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Input
                            label="First Name"
                            // placeholder="Enter your first name"
                            // labelPlacement="outside"
                            variant="underlined"
                            classNames={{
                                base: "font-rubik",
                            }}
                        // size="lg"
                        />
                        <Input
                            label="Last Name"
                            // placeholder="Enter your last name"
                            // labelPlacement="outside"
                            variant="underlined"
                            classNames={{
                                base: "font-rubik",
                            }}
                        // size="lg"
                        />
                        <Input
                            type="email"
                            label="Email"
                            // placeholder="Enter your email address"
                            // labelPlacement="outside"
                            variant="underlined"
                            classNames={{
                                base: "font-rubik",
                            }}
                        // size="lg"
                        />
                        <Input
                            type="tel"
                            label="Phone Number"
                            // placeholder="Enter your phone number"
                            // labelPlacement="outside"
                            variant="underlined"
                            classNames={{
                                base: "font-rubik",
                            }}
                        // size="lg"
                        />
                    </div>
                    <div className="flex flex-col justify-start gap-3">
                        <p className="font-rubik text-sm font-semibold text-black">
                            Select subject?
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Checkbox color="default" radius="full">
                                <span className="text-sm font-medium text-black">
                                    General Inquiry
                                </span>
                            </Checkbox>
                            <Checkbox color="default" radius="full">
                                <span className="text-sm font-medium text-black">
                                    Partnership
                                </span>
                            </Checkbox>
                            <Checkbox color="default" radius="full">
                                <span className="text-sm font-medium text-black">Support</span>
                            </Checkbox>

                            <Checkbox color="default" radius="full">
                                <span className="text-sm font-medium text-black">Other</span>
                            </Checkbox>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start gap-7 *:w-full">
                        {/* <p className="font-rubik text-sm font-semibold text-black">
              Message
            </p> */}
                        <Textarea
                            label="Message"
                            variant="underlined"
                            labelPlacement="outside"
                            placeholder="Enter your message"
                            classNames={{
                                innerWrapper: "w-full",
                            }}
                        ></Textarea>
                        <div className="flex items-center justify-end">
                            <button className="flex h-12 items-center justify-center rounded-lg bg-black px-7 font-rubik font-medium text-white">
                                Send Message
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default page;