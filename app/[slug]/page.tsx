import { createClient } from "@/utils/supabase/server";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch the link
  const { data: link, error } = await supabase
    .from("links")
    .select("*")
    .eq("slug", slug)
    .single();

  // DEBUGGING: Show me what happened on the screen
  return (
    <div className="p-10 text-white bg-black h-screen">
      <h1 className="text-2xl font-bold mb-4">Bifrost Debugger 🐞</h1>
      <p><strong>Slug:</strong> {slug}</p>
      
      <h2 className="text-xl mt-4 font-bold text-blue-400">Database Result:</h2>
      <pre className="bg-gray-800 p-4 rounded mt-2">
        {JSON.stringify({ link, error }, null, 2)}
      </pre>
    </div>
  );
}