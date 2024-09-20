import { groq } from "next-sanity";
import { client } from "../sanity/lib/client";

export const query = groq`
*[_type == "currentAffairs"]{
    _id,
    title,
    description,
    publishedAt,
    slug,
    author->{
      name,
      image
    },
    categories[]->{
      _id,
      description,
      title
    }
  } | order(_createdAt asc)
`;

export const fetchCurrentAffair = async () => {
  const CurrentAffairs = await client.fetch(query);
  return CurrentAffairs;
};