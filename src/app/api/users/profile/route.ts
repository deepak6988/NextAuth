import connect from '@/dbcongif/dbconfig';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDataFromToken } from '@/helpers/getDataToken';
import User from '@/models/user.model';

connect();

export async function POST(req: NextRequest){
    try{
        const userId = await getDataFromToken(req);
        const user = await User.findOne({ _id: userId }).select('-password');
        return NextResponse.json({message: "User profile fetched successfully", success: true, user});
    }
    catch(error:any){
        return NextResponse.json({message: error.message, success: false}, {status: 500});
    }
}