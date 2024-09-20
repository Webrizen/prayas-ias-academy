import { fetchSingleCurrentAffairs } from "@/utils/fetchSingleCurrentAffairs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/utils/timeAgo";
import { getImage } from "@/utils/getImage";
import { PortableText } from "next-sanity";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
          className="my-4"
        />
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold my-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold my-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold my-4">{children}</h4>
    ),
    normal: ({ children }) => <p className="my-2">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-8 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-8 my-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="my-2">{children}</li>,
    number: ({ children }) => <li className="my-2">{children}</li>,
  },
};

export default async function Page({ params }) {
  const CurrentAffairs = await fetchSingleCurrentAffairs(params.slugy);
  const authorImage =
    getImage(CurrentAffairs.author.image) || "https://github.com/shadcn.png";
  return (
    <>
      <div className="max-w-4xl mx-auto flex flex-col gap-4 my-4 mt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/free-resources">Free Resources</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/free-resources/${params.slug}`}>{params.slug}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink href={`/free-resources/${params.slug}/${params.slugy}`}>{params.slugy}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-5xl font-bold w-full text-slate-900">
          {CurrentAffairs.title}
        </h1>
        <div className="flex flex-row justify-between items-center my-4">
          <div className="flex flex-row gap-3 items-center">
            <div className="flex flex-row items-center">
              <Avatar>
                <AvatarImage src={authorImage} />
                <AvatarFallback>
                  {CurrentAffairs.author.name || "N/A"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-0 text-sm">
              <h2 className="font-bold">{CurrentAffairs.author.name}</h2>
              <div className="flex flex-row gap-2">
                <span className="text-slate-700">
                  Posted {timeAgo(CurrentAffairs.publishedAt)}
                </span>
                <span>·</span>
                <span className="text-slate-700">
                  {CurrentAffairs.categories[0].title}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <Button>share</Button>
          </div>
        </div>
        <div className="w-full">
          {/* <pre className="mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(CurrentAffairs, null, 2)}
            </code>
          </pre> */}
          <PortableText value={CurrentAffairs.body} components={components} />
        </div>
      </div>
    </>
  );
}
