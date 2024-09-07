"use server";

import prisma from "@/lib/db/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Updates the information of a location in the database.
 *
 * @param {FormData} formData - The form data containing the required fields for updating the location.
 * @param {string} formData.companyId - The ID of the company to update.
 * @param {File} formData.logo - The logo of the location.
 * @param {string} formData.name - The name of the company.
 * @param {string} formData.primaryColor - The primary color of the company.
 * @param {string} formData.tiktokUrl - The TikTok URL of the company.
 * @param {string} formData.facebookUrl - The Facebook URL of the company.
 * @param {string} formData.instagramUrl - The Instagram URL of the company.
 * @param {string} formData.twitterUrl - The Twitter URL of the company.
 * @param {string} formData.websiteUrl - The website URL of the company.
 * @param {string} formData.googleReviewUrl - The Google Review URL of the company.
 * @throws {Error} If any required fields are missing.
 */
export const updateCompanyAction = async (formData: FormData) => {
  const logo = formData.get("logo") as File;
  const name = formData.get("name") as string;
  const primaryColor = formData.get("primaryColor") as string;
  const companyId = formData.get("companyId") as string;
  const tiktokUrl = formData.get("tiktokUrl") as string;
  const facebookUrl = formData.get("facebookUrl") as string;
  const instagramUrl = formData.get("instagramUrl") as string;
  const twitterUrl = formData.get("twitterUrl") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const googleReviewUrl = formData.get("googleReviewUrl") as string;

  if (!companyId || !name || !primaryColor) {
    throw new Error("Missing required fields");
  }

  let updateData: any = {
    name,
    primaryColor,
    tiktokUrl,
    facebookUrl,
    instagramUrl,
    twitterUrl,
    websiteUrl,
    googleReviewUrl,
  };

  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  try {
    if (logo && logo.size > 0) {
      if (company) {
        const fileExtension = logo.name.split(".").pop();
        const fileName = `${company.name}_${company.id}.${fileExtension}`;

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from("logos")
          .upload(fileName, logo, {
            upsert: true, // This will replace the file if it already exists
          });

        if (error) throw error;

        // Get public URL of the uploaded file
        const {
          data: { publicUrl },
        } = supabase.storage.from("logos").getPublicUrl(fileName);

        // Update company's logo URL
        await prisma.company.update({
          where: { id: companyId },
          data: { logo: publicUrl },
        });
      }
    }

    await prisma.company.update({
      where: { id: companyId },
      data: updateData,
    });

    revalidatePath("/dashboard/location");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
