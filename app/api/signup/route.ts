import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { fakeUsers } from "@/app/fakeDB";
export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        };
        if (password.length < 4) {
            return NextResponse.json(
                { message: "Passsword must be at least 4 characters" },
                { status: 400 })
        }
        if(fakeUsers.find((user) => user.email === email)){
            return NextResponse.json({message:"User already exists"},{status:400})
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password:hashedPassword
        };
        fakeUsers.push(newUser);
        return NextResponse.json({
            message: "User Created", user:
            {
             user:newUser
            }
        }
        ,{ status: 201 }
        )
    } catch (err) {
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}