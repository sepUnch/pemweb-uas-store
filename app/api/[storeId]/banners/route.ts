import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { label, imageUrl } = body;

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Harus menginput label", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image banner perlu di input", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id URL dibutuhkan", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Store tidak ditemukan", { status: 403 });
    }

    const banner = await db.banner.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id URL dibutuhkan", { status: 400 });
    }

    const banner = await db.banner.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
