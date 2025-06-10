import { FastifyRequest, FastifyReply } from "fastify";
import { LoginUserService } from "../../services/users/loginUserService";

class LoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, email } = request.body as { name: string, email: string }

        const loginUser = new LoginUserService;
        const user = await loginUser.execute({ name, email })

        reply.send(user)
    }
}

export { LoginUserController }