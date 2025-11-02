//user service here
import bcrypt from 'bcryptjs';
 
import { prisma } from '../../shared/prisma';
import { Request } from 'express';
import { UserStatus } from '@prisma/client';
import { jwtHelper } from '../../helpers/jwtHelpers';

 const login = async ({email, password} : {email :string, password : string}) => {
 
   
     const isUserExit = await prisma.user.findUnique({
         where: {
             email,
             status : UserStatus.ACTIVE
            },
        })
    const isCorrectPassword = await bcrypt.compare(password,isUserExit?.password as string);
    if(!isCorrectPassword) {
        throw new Error("password is incorrect")
    }
    
    const accessToken = jwtHelper.generateToken({ email: isUserExit?.email, role: isUserExit?.role }, "abcd", "1h");

    const refreshToken = jwtHelper.generateToken({ email: isUserExit?.email, role: isUserExit?.role }, "abcdefgh", "90d");

    return {
        accessToken,
        refreshToken,
        needPasswordChange: isUserExit?.needPasswordChange
    }
}
 
 

export const AuthService = {
    login
}