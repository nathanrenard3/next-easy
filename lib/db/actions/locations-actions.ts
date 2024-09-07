"use server";

import prisma from "@/lib/db/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/**
 * Adds a new location to the database.
 * @param {FormData} formData - The form data containing the required fields for adding a new location.
 * @param {string} formData.address - The address of the location.
 * @param {string} formData.city - The city of the location.
 * @param {string} formData.postalCode - The postal code of the location.
 * @param {string} formData.companyId - The ID of the company to add the location to.
 */
export const addNewLocationAction = async (formData: FormData) => {
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const postalCode = formData.get("postalCode") as string;
  const companyId = formData.get("companyId") as string;

  if (!address || !city || !postalCode) {
    throw new Error("Missing required fields");
  }

  // Check if a location with the same address already exists
  const existingLocation = await prisma.location.findFirst({
    where: {
      address,
      city,
      postalCode,
      companyId,
    },
  });

  if (existingLocation) {
    existingLocation.deletedAt = null;
    await prisma.location.update({
      where: {
        id: existingLocation.id,
      },
      data: existingLocation,
    });

    // We add the location to the user's current locations
    const allUserOfCompany = await prisma.user.findMany({
      where: {
        locations: {
          some: {
            companyId: companyId,
          },
        },
      },
    });

    for (const user of allUserOfCompany) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          locations: {
            connect: {
              id: existingLocation.id,
            },
          },
        },
      });
    }

    return revalidatePath("/dashboard");
  }

  const newLocation = await prisma.location.create({
    data: {
      address,
      city,
      postalCode,
      companyId: companyId,
    },
  });

  // We create all opening hours for the location
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  await prisma.openingHours.createMany({
    data: daysOfWeek.map((day) => ({
      locationId: newLocation.id,
      day: day,
      morningOpen: null,
      morningClose: null,
      afternoonOpen: null,
      afternoonClose: null,
    })),
  });

  // We create the loyalty program for the location
  await prisma.loyaltyProgram.create({
    data: {
      locationId: newLocation.id,
      name: "Programme de fidélité",
    },
  });

  // We add the new location to the user's current locations
  const allUserOfCompany = await prisma.user.findMany({
    where: {
      locations: {
        some: {
          companyId: companyId,
        },
      },
    },
  });

  for (const user of allUserOfCompany) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        locations: {
          connect: {
            id: newLocation.id,
          },
        },
      },
    });
  }

  revalidatePath("/dashboard");
};

/**
 * Updates the information of a location in the database.
 *
 * @param {FormData} formData - The form data containing the required fields for updating the location.
 * @param {string} formData.address - The address of the location.
 * @param {string} formData.city - The city of the location.
 * @param {string} formData.postalCode - The postal code of the location.
 * @param {string} formData.locationId - The ID of the location to update.
 * @param {File} formData.logo - The logo of the location.
 * @throws {Error} If any required fields are missing.
 */
export const updateLocationAction = async (formData: FormData) => {
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const postalCode = formData.get("postalCode") as string;
  const locationId = formData.get("locationId") as string;
  const logo = formData.get("logo") as File;
  const name = formData.get("name") as string;
  const primaryColor = formData.get("primaryColor") as string;

  if (!locationId || !address || !city || !postalCode) {
    throw new Error("Missing required fields");
  }

  let updateData: any = {
    address,
    city,
    postalCode,
  };

  const location = await prisma.location.findUnique({
    where: { id: locationId },
    include: { company: true },
  });
  const companyId = location?.companyId;

  try {
    if (logo && logo.size > 0) {
      if (location && location.company) {
        const fileExtension = logo.name.split(".").pop();
        const fileName = `${location.company.name}_${location.company.id}.${fileExtension}`;

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

    if (name && location) {
      await prisma.company.update({
        where: { id: companyId },
        data: { name },
      });
    }

    await prisma.company.update({
      where: { id: companyId },
      data: { primaryColor },
    });

    await prisma.location.update({
      where: { id: locationId },
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

/**
 * Updates the opening hours of a location in the database.
 *
 * @param {FormData} formData - The form data containing the required fields for updating the opening hours.
 * @param {string} formData.locationId - The ID of the location to update.
 * @param {string} formData.openingHours - The opening hours to update. (JSON string of an array of objects containing the opening hours for each day)
 * @throws {Error} If any required fields are missing.
 */
export const updateOpeningHoursAction = async (formData: FormData) => {
  const locationId = formData.get("locationId") as string;
  const openingHours = JSON.parse(formData.get("openingHours") as string);

  if (!locationId || !openingHours) {
    throw new Error("Missing required fields");
  }

  for (const {
    day,
    morningOpen,
    morningClose,
    afternoonOpen,
    afternoonClose,
  } of openingHours) {
    const existingRecord = await prisma.openingHours.findFirst({
      where: {
        locationId,
        day,
      },
    });

    if (existingRecord) {
      await prisma.openingHours.update({
        where: { id: existingRecord.id },
        data: {
          morningOpen,
          morningClose,
          afternoonOpen,
          afternoonClose,
        },
      });
    } else {
      await prisma.openingHours.create({
        data: {
          locationId,
          day,
          morningOpen,
          morningClose,
          afternoonOpen,
          afternoonClose,
        },
      });
    }
  }

  await revalidatePath("/dashboard/location");
};

/**
 * Deletes a location from the database.
 * @param {string} locationId - The ID of the location to delete.
 */
export const deleteLocationAction = async (locationId: string) => {
  const location = await prisma.location.update({
    where: {
      id: locationId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  // We remove the location from the user's current locations
  const allUserOfLocation = await prisma.user.findMany({
    where: {
      locations: {
        some: {
          id: locationId,
        },
      },
    },
  });

  for (const user of allUserOfLocation) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        locations: {
          disconnect: {
            id: locationId,
          },
        },
      },
    });
  }

  // Set a new current location for the user if the deleted location was the current one
  const currentLocation = cookies().get("current-location");

  if (currentLocation?.value === locationId) {
    const newCurrentLocation = await prisma.location.findFirst({
      where: {
        companyId: location.companyId,
        deletedAt: null,
      },
    });

    if (newCurrentLocation) {
      cookies().set("current-location", newCurrentLocation.id, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
  }

  await revalidatePath("/dashboard");
};

/**
 * Function to change the current location of the user.
 * @param {string} locationId - The ID of the location to change to.
 */
export const changeLocationAction = async (locationId: string) => {
  cookies().set("current-location", locationId, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  await revalidatePath("/", "layout");
};
