import { groq } from "next-sanity";
import { client } from "../sanity/lib/client";

export const query = groq`
*[_type=="CurrentAffairs"]{
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

export const fetchCurrentAffairs = async (querySlug) => {
  const query = groq`
    *[_type=="CurrentAffairs" && slug.current == "${querySlug}"][0]{
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
      },
      body
  }
`;

  const CurrentAffair = await client.fetch(query);
  return CurrentAffair;
};