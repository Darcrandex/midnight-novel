import http from "@/utils/http";

export async function apiCreateNovel(params: {
  name?: string;
  author?: string;
}): Promise<{ id: string }> {
  const url = "/novel";
  return await http.post(url, params);
}

export async function apiUpdateNovel(
  id: string,
  params: { name?: string; author?: string }
): Promise<void> {
  const url = `/novel/${id}`;
  return await http.patch(url, params);
}

export async function apiRemoveNovel(id: string): Promise<void> {
  const url = `/novel/${id}`;
  return await http.delete(url);
}

export async function apiGetNovels(): Promise<{
  list: Record<string, unknown>;
  total: number;
}> {
  const url = "/novel";
  return await http.get(url);
}

export async function apiGetNovelById(
  id: string
): Promise<{ record: Record<string, unknown> }> {
  const url = `/novel/${id}`;
  return await http.get(url);
}
