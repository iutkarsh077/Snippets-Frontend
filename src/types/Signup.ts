import  * as z  from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignupZod = z.object({
    name: z.string().min(2, {
        message: "Name is too small"
    }),
    email: z.string().email({
        message: "Enter a valid email"
    }),
    password: z.string().min(6, {
        message: "Password is too small"
    })
})

export const signupResolver = zodResolver(SignupZod);
export type signupTypes = z.infer<typeof SignupZod>;