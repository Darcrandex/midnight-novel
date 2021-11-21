import { get } from "@/utils/http";

export async function apiGetCategories<T>() {
  return await get<T>("/category");
}
