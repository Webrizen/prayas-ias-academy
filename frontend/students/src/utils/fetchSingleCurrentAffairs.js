import { groq } from "next-sanity";
import { client } from "../sanity/lib/client";

export const query = groq`
  *[_type=="currentAffairs"]{
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
  } | order(_createdAt asc)
`;

export const fetchSingleCurrentAffairs = async (querySlug) => {
  const posts = await client.fetch(query);

  // Find the post with the matching slug
  const post = posts.find((p) => p.slug.current === querySlug);

  return post || null;
};