import http from "@/utils/http";

export async function apiCreateChapter(params: {
  novel: string;
  title: string;
  content?: string;
}): Promise<{ record: Record<string, unknown> }> {
  const url = "/chapter";
  return await http.post(url, params);
}
