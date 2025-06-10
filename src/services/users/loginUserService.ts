import prismaClient from "../../prisma"
import jwt from "jsonwebtoken"

interface LoginUserProps {
    name: string,
    email:string
}

class LoginUserService{
    async execute({name, email} : LoginUserProps){

        const findUser = await prismaClient.user.findFirst({
            where: {
                name: name,
                email: email
            }
        })

        console.log(findUser)

        if(!findUser){
            throw new Error("Usuário não encontrado")
        }

         const token = jwt.sign(
            { id: findUser.id, name: findUser.name, email: findUser.email },
            process.env.JWT_SECRET || "secreto",
            { expiresIn: "48h" }
        );

        return { user: findUser, token };

    }
}

export {LoginUserService}