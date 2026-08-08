import connect from '@/dbcongif/dbconfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sendEmail } from '@/helpers/mailer';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest){
    try{
        const {email, password} = await req.json();
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({error: "Invalid credentials"}, {status: 401});
        }

        const token = jwt.sign({id: user._id,email: user.email}, process.env.JWT_SECRET!, {expiresIn: '1h'});

        const response = NextResponse.json({message: "User logged in successfully", success: true});
        response.cookies.set('token', token, {httpOnly: true});
        return response;
    }
    catch(error:any){
        throw new Error(error.message);
    }
}