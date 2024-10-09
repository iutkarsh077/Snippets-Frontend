import  * as z  from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = z.object({
    email: z.string().email({
        message: "Enter a valid email"
    }),
    password: z.string().min(6, {
        message: "Password is too small"
    })
})

export const loginResolver = zodResolver(Login);
export type LoginTypes = z.infer<typeof Login>;