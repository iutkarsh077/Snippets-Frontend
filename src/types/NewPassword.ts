import  * as z  from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const NewPassword = z.object({
    password: z.string().min(6, {
        message: "Password is too small"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password is too small"
    })
})

export const newPasswordResolver = zodResolver(NewPassword);
export type newPasswordTypes = z.infer<typeof NewPassword>;