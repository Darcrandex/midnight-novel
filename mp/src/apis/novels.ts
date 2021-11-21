import { get } from "@/utils/http";

export async function apiGetNovels<T>() {
  return await get<T>("/novel");
}
