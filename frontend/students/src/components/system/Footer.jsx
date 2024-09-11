import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { fetchCourseTitlesAndSlugs } from "@/utils/fetchCourses";

// Footer component rendering items
const FooterItem = ({ text, link }) => {
  return (
    <li>
      <Link
        href={link}
        className="duration-200 hover:text-blue-600 dark:hover:text-blue-500"
      >
        {text}
      </Link>
    </li>
  );
};

const FooterBlockItem = ({ title, items }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <ul className="space-y-3">
        {items.map((item) => (
          <FooterItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

const Footer = async () => {
  const courses = await fetchCourseTitlesAndSlugs();
  const footerBlocks = [
    {
      id: 1,
      title: "Courses",
      items: courses.map((course, index) => ({
        id: index + 1,
        text: course.title,
        link: `/courses/${course.slug}`,
      })),
    },
    {
      id: 3,
      title: "Quick Links",
      items: [
        { id: 1, text: "Admission", link: "/take-admission-at-prayasiasacademy" },
        { id: 2, text: "Gallery", link: "/gallery" },
        { id: 3, text: "FAQs", link: "/faqs" },
        { id: 4, text: "Students", link: "/auth" },
        { id: 5, text: "Notifications", link: "/notifications" },
        { id: 6, text: "Live Classes", link: "/resources/live-classes" },
      ],
    },
    {
      id: 2,
      title: "Company",
      items: [
        { id: 1, text: "About", link: "/about" },
        { id: 2, text: "Career", link: "/careers" },
        { id: 3, text: "Infrastructure", link: "/infrastructure" },
        { id: 4, text: "Faculty", link: "/infrastructure/#faculty" },
        { id: 5, text: "Contact", link: "/contact" },
      ],
    },
    {
      id: 4,
      title: "Resources",
      items: [
        { id: 1, text: "Blog", link: "/blogs" },
        { id: 2, text: "Test Series", link: "/resources/test-series" },
        { id: 3, text: "Legal", link: "/legal" },
        { id: 4, text: "Current Affairs", link: "/resources/current-affairs" },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-5 md:px-20 py-20 flex flex-col lg:flex-row gap-14">
        <div className="space-y-6 lg:w-96">
          <Link href="#">
            <Image
              src={Logo}
              placeholder="blur"
              alt="PRAYAS IAS ACADEMY Logo"
              width={500}
              height={500}
              className="h-10 w-auto"
            />
            Prayas IAS Academy
          </Link>
          <p className="max-w-lg">
            Empowering students with top-notch IAS coaching and resources to
            excel in their exams.
          </p>
          <div className="flex w-full gap-5">
            <a href="#" aria-label="social link" rel="noreferer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 16 16"
              >
                {/* Social icon paths */}
              </svg>
            </a>
          </div>
        </div>

        <nav className="lg:flex-1 grid grid-cols-2 md:grid-cols-4 gap-10">
          {footerBlocks.map((footerBlock) => (
            <FooterBlockItem key={footerBlock.id} {...footerBlock} />
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
