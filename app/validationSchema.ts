import { z } from "zod";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/png"];
const accountUpdateSchema = z
  .object({
    picture: z
      .any()
      .refine(file => {
        console.log("file", file);
        return true;
        return file?.size <= MAX_FILE_SIZE;
      }, `Max image size is 10MB.`)
      //.refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg and .png formats are supported.")
      .optional(),
    email: z.string().email(),
    phone: z.string().min(10).max(12),
    nickname: z.string().min(2).max(20),
    sex: z.string(),
    status: z.string(),
    kakaoLink: z.string().url(),
  })
  .required();

export default accountUpdateSchema;
