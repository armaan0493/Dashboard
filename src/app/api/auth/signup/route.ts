import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getUsersCollection, type UserDocument } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase();

    const users = await getUsersCollection();
    const existing = await users.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { message: "A user with this email already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 10);
    const now = new Date();

    const newUser: Omit<UserDocument, "_id"> = {
      name: name?.trim() || "User",
      email: normalizedEmail,
      passwordHash,
      image: null,
      createdAt: now,
    };

    const result = await users.insertOne(newUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: result.insertedId.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
