import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: Cabins, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return Cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(newCabin);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("Cabins");
  console.log(newCabin);

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    console.log(query);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }

  return data;
}
