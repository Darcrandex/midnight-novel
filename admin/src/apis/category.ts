import http from "@/utils/http";

export async function apiGetCategories(params?: {
  page?: number;
  pageSize?: number;
}): Promise<{ list: Record<string, unknown>[]; total: number }> {
  const url = "/category";
  return await http.get(url, { params });
}

export async function apiCreateCategory(params: {
  name?: string;
  children?: { name: string }[];
}): Promise<string> {
  const url = "/category";
  return await http.post(url, params);
}

export async function apiUpdateCategory(
  id: string,
  params: { name?: string; children?: { name: string }[] }
): Promise<unknown> {
  const url = `/category/${id}`;
  return await http.patch(url, params);
}

export async function apiRemoveCategory(id: string) {
  const url = `/category/${id}`;
  return await http.delete(url);
}
