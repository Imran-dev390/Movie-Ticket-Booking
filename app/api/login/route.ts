import bcrypt from "bcrypt";
import { fakeUsers } from "@/app/fakeDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:Request){
    try{
      const {email,password} = await req.json();
         if(!email || !password){
            return NextResponse.json({messsage:"All fields are required"},{status:400});
         };
        const user = fakeUsers.find((user)=>user.email===email);
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        };
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return NextResponse.json({message:"Invalid credentials"},{status:401});
        };
     //  return NextResponse.json({message:"Login successful",user:{user}},{status:200});
    return NextResponse.json(
  {
    message: "Login successful",
    user: {
      name: user.name,
      email: user.email,
    },
  },
  { status: 200 }
);

    } catch(err){
       return NextResponse.json({message:"Internal Server Error"},{status:500});
    }
}