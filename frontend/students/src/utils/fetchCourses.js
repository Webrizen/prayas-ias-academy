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
