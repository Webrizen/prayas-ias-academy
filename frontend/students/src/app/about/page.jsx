import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: `Truth? A powerful but double-edge sward! use it wisely - Know about Webrizen, it's creator and history.`,
};

export default function page() {
  return (
    <>
      <div className="container mx-auto lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12 px-10">
          <div className="mx-auto grid w-full gap-6">
            <span className="w-min whitespace-nowrap border border-gray-500 px-3 py-0.5 rounded-full bg-gray-50 dark:bg-gray-950 bg-opacity-50 text-gray-700 dark:text-gray-300">
              About Prayas IAS Academy
            </span>
            <h1 className="text-indigo-950 dark:text-white text-4xl/snug sm:text-6xl/tight lg:text-5xl/tight xl:text-6xl/tight font-semibold text">
              WE NURTURE YOUR{" "}
              <span className="bg-indigo-50 dark:bg-gray-900 dark:text-indigo-300 inline-block border border-dashed border-indigo-600 px-3">
                DREAMS
              </span>
            </h1>
            <p className="mt-10 text-gray-700 dark:text-gray-300 lg:text-lg max-w-2xl lg:max-w-none mx-auto">
              Greetings from PRAYAS IAS ACADEMY, a prestigious institution
              committed to developing candidates through a creative and holistic
              approach to education At the core of PRAYAS IAS ACADEMY, our
              visionary leadership that brings a wealth of experience and
              expertise to guide aspirants through the foundation of Civil
              Services preparation. Our experienced mentors are committed to
              shaping not just successful candidates but ethical and responsible
              leaders for the nation.
              <br />
              <br />
              Our visionary leadership, which provides a wealth of knowledge and
              skill to assist aspirants through the basis of Civil Services
              preparation, is the cornerstone of PRAYAS IAS ACADEMY. Our
              seasoned mentors are dedicated to developing not only qualified
              candidates but also morally upright and accountable leaders for
              the country. We understand that civil services preparation goes
              beyond textbooks, hence in accordance with the current pattern and
              demand of the examinations, our curriculum is meticulously crafted
              to encompass a comprehensive range of subjects, along with
              interactive classrooms, focused approach towards every single
              aspirant under supportive ambience. The strength of any
              educational institution lies in its faculty delivery system,
              PRAYAS boasts a team of seasoned mentors, subject matter experts,
              and retired bureaucrats who bring a wealth of knowledge and real
              world insights to the classroom providing aspirants with
              invaluable guidance. Since every candidate is unique, we provide
              individualized mentorship programs. Our staff works closely with
              students to discover their strengths and weaknesses, then provides
              specialized direction and support to help them reach their full
              potential.
              <br />
              <br />
              PRAYAS IAS ACADEMY has state-of-the-art facilities to support an
              ideal learning environment, including well-furnished classrooms, a
              sizable library with a wealth of study materials, and cutting-edge
              technical resources. Our ACADEMY takes a strategic approach to
              exam preparation, including carefully thought-out study plans,
              frequent evaluations, and exam-simulation scenarios to guarantee
              candidates are confident and well-prepared on test day.
            </p>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="https://placehold.co/500x500"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-bl-2xl"
          />
        </div>
      </div>
    </>
  );
}
