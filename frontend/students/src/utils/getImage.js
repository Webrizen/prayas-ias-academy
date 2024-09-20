import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/utils/sanity.client";

export const getImage = (source) => {
  const builder = imageUrlBuilder(client);

  // Check if the asset ref is available before proceeding
  if (source?.asset?._ref) {
    return builder.image(source).url(); // Generate the URL synchronously
  }
  
  return ""; // Return an empty string if the image doesn't exist
};