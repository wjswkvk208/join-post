import { z } from "zod";
const postSchema = z.object({
  editor: z.object({
    title: z.string().default(""),
    content: z.string().default(""),
  }),
  tags: z.array(z.string()),
  gameDate: z.date(),
  golfCourse: z.string(),
  kakao: z.boolean(),
  phone: z.boolean(),
});
//.required();

export default postSchema;
