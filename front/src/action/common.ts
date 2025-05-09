"use server";
import { revalidateTag } from "next/cache";

export async function clearCache(tag: string) {
  console.log("cache")
  revalidateTag(tag);
}
