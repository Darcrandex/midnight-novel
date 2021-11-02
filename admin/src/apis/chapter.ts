import http from "@/utils/http";

export async function apiCreateChapter(params: {
  novel: string;
  title: string;
  content?: string;
}): Promise<{ data: string }> {
  const url = "/chapter";
  return await http.post(url, params);
}

export async function apiRemoveChapter(params: {
  novelId: string;
  chapterId: string;
}): Promise<void> {
  const url = "/chapter";
  return await http.delete(url, { params });
}

export async function apiGetChapter(
  id: string
): Promise<{ data: Record<string, unknown> }> {
  const url = `/chapter/${id}`;
  return await http.get(url);
}

export async function apiUpdateChapter(
  id: string,
  params: { title?: string; content?: string }
): Promise<void> {
  const url = `/chapter/${id}`;
  return await http.patch(url, params);
}
