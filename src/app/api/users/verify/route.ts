import connect from '@/dbcongif/dbconfig';
import User from '@/models/user.model';
import { NextRequest,NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest){
    try{
        const {token} = await req.json();
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});
        if(!user){
            return NextResponse.json(
                {error:"Invalid or expired token"},
                {status: 500}
            )
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json(
            {message: "User verified successfully"},
            {status: 200}
        )
    }
    catch(error:any){
        return NextResponse.json(
            {error:error.message},
            {status: 500}
        )
    }
}