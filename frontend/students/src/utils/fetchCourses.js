"use server";

// Function to fetch all Blogs with only required fields populated
export const fetchCourses = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data?.data || [];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Function to fetch a single course by Slug
export const fetchCourseBySlug = async (slug) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/slug/${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch course by slug");
    }

    const data = await response.json();
    return data?.data || null;
  } catch (err) {
    console.error("Error fetching course by slug:", err);
    throw err;
  }
};