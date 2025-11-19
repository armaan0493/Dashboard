import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUsersCollection, type UserDocument } from "@/lib/mongodb";
import { compare, hash } from "bcryptjs";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email.toLowerCase();

  const body = await request.json();
  const { name, image, currentPassword, newPassword } = body as {
    name?: string;
    image?: string | null;
    currentPassword?: string;
    newPassword?: string;
  };

  const users = await getUsersCollection();
  const user: UserDocument | null = await users.findOne({ email });

  if (!user || !user._id) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const updateFields: Partial<UserDocument> = {};

  if (typeof name === "string") {
    const trimmed = name.trim();
    if (trimmed && trimmed !== user.name) {
      updateFields.name = trimmed;
    }
  }

  if (image !== undefined && image !== user.image) {
    updateFields.image = image || null;
  }

  if (newPassword) {
    if (!currentPassword) {
      return NextResponse.json(
        { message: "Current password is required to set a new password" },
        { status: 400 },
      );
    }

    const isCurrentValid = await compare(currentPassword, user.passwordHash);
    if (!isCurrentValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "New password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const newHash = await hash(newPassword, 10);
    updateFields.passwordHash = newHash;
  }

  if (Object.keys(updateFields).length === 0) {
    return NextResponse.json(
      { message: "No changes detected" },
      { status: 400 },
    );
  }

  await users.updateOne({ _id: user._id }, { $set: updateFields });

  return NextResponse.json({ message: "Profile updated" }, { status: 200 });
}
