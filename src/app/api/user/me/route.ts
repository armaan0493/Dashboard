import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUsersCollection, type UserDocument } from "@/lib/mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email.toLowerCase();

  const users = await getUsersCollection();
  const user: UserDocument | null = await users.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const createdAt = user.createdAt instanceof Date ? user.createdAt : new Date(user.createdAt);

  return NextResponse.json({
    id: user._id?.toString() ?? "",
    name: user.name,
    email: user.email,
    image: user.image ?? null,
    createdAt: createdAt.toISOString(),
  });
}
