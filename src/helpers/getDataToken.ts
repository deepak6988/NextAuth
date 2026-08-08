// import connect from '@/dbcongif/dbconfig';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// connect();

export const getDataFromToken = async (req: NextRequest) => {
    try{
        const token = req.cookies.get('token')?.value;
        const decodedToken : any = jwt.verify(token!, process.env.JWT_SECRET!);
        return decodedToken.id;
    }
    catch(error:any){
        throw new Error(error.message);
    }
}