import connect from '@/dbcongif/dbconfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(req: NextRequest){
    try{
        const {name, email, password} = await req.json();
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        const savedUser = await newUser.save();
        console.log("User signed up successfully:", savedUser);

        // Verification email
        await sendEmail({email, type: 'VERIFY', userId: savedUser._id.toString()});

        return NextResponse.json({message : "User signed up successfully",success: true, savedUser});
    }
    catch(error){
        throw new Error("Error signing up user");
    }
}