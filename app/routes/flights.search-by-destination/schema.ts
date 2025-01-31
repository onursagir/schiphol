import { z } from "zod";

// This is overkill for this scenario however in a real life situation I would have done it this way
export const schema = z.object({
  q: z.string().min(3, "Search keyword has to be at least 3 character long"),
  sort: z.enum(["asc", "desc"]).optional(),
});
