"use server";

import { IShareMeal } from "@/models/meals/Meal";
import { mealsService } from "./meal";
import { redirect } from "next/navigation";
import { isInvalidText } from "@/utils/helper";
import { revalidatePath } from "next/cache";

export const shareMeal = async (
  previous: { message: string },
  formData: FormData
) => {
  const meal: IShareMeal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    creator_email: formData.get("email") as string,
    image: formData.get("image") as File,
    creator: formData.get("name") as string,
    instructions: formData.get("instructions") as string,
    slug: "",
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid inputs",
    };
    // return formData;
  }

  const savedMeal = await mealsService.saveMeal(meal);
  if (savedMeal) {
    revalidatePath("/meals", "layout");
    redirect("/meals");
  }
  return {
    message: "Meal created",
  };
};
