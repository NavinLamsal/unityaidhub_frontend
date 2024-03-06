"use server";

export const uploadCloudinary = async (
  file: File
): Promise<{ publicId: string; url: string }> => {
    console.log("inside uploading function")
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "dsrapcvkq");
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dsrapcvkq/image/upload",
    { method: "POST", body: formData }
  );
  const data = await response.json();
  console.log("data from upload",data)

  return { publicId: data?.public_id, url: data?.secure_url };
};
