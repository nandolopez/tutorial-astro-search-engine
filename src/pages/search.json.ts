import { getCollection } from "astro:content";

export async function GET() {
  const Posts = (
    await getCollection("blog").map((post: any) => {
    const data = post.data;
    return {
      title: data.title,
      description: data.description,
      slug: post.slug
    };
  });

  return new Response(JSON.stringify(Posts));
}
