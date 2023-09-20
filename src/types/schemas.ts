import { Prisma } from "@prisma/client";
import { z } from "zod";

const schema = z.object({}) satisfies z.ZodType<Prisma.SetDefaultArgs>;

type Inferred = z.infer<typeof schema>;
