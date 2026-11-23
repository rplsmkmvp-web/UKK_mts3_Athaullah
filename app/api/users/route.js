import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function generateAutoNumber() {
  const lastUser = await prisma.user.findFirst({
    orderBy: { id: "desc" },
  });

  if (!lastUser || !lastUser.kodeUser) {
    return "USR-001";
  }

  const lastNumber = parseInt(lastUser.kodeUser.split("-")[1], 10);
  const nextNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;

  return `USR-${String(nextNumber).padStart(3, "0")}`;
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
    });
    const nextKode = await generateAutoNumber();

    return NextResponse.json({
      success: true,
      nextKode,
      data: users,
    });
  } catch (error) {
  console.error("DETAIL ERROR:", error);
  return NextResponse.json(
    { success: false, message: error.message },
    { status: 500 }
  );
}

}

export async function POST(request) {
  try {
    const body = await request.json();
    const { nama, email, alamat } = body;
    const kodeUser = await generateAutoNumber();

    const newUser = await prisma.user.create({
      data: {
        kodeUser,
        nama,
        email,
        alamat,
      },
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
