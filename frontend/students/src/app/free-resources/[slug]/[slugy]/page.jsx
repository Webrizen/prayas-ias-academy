import { fetchSingleCurrentAffairs } from "@/utils/fetchSingleCurrentAffairs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/utils/timeAgo";
import { getImage } from "@/utils/getImage";
import { PortableText } from "next-sanity";

const components = {
    types: {
      code: props => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      )
    }
}  

export default async function Page({ params }) {
  const CurrentAffairs = await fetchSingleCurrentAffairs(params.slugy);
  const authorImage = getImage(CurrentAffairs.author.image) || "https://github.com/shadcn.png";
  return (
    <>
      <div className="max-w-4xl mx-auto flex flex-col gap-4 my-4">
        <h1 className="text-5xl font-bold w-full text-slate-900">
          {CurrentAffairs.title}
        </h1>
        <div className="flex flex-row justify-between items-center my-4">
          <div className="flex flex-row gap-3 items-center">
            <div className="flex flex-row items-center">
              <Avatar>
                <AvatarImage src={authorImage} />
                <AvatarFallback>{CurrentAffairs.author.name || "N/A"}</AvatarFallback>
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
