'use client'
import { cartTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuid } from "uuid";

export const GET = async (request: NextRequest, {params}:{params:{id:string}}) => {

  try {
    const res = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.user_id, params.id as string));
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};
export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const uid = uuid();
  const setCookies = cookies();
  const user_id = cookies().get("user_id");

  if (!user_id) {
    setCookies.set("user_id", uid);
  }

  try {
    const res = await db
      .insert(cartTable)
      .values({
        product_id: req.product_id, 
        quantity: req.quantity,
        user_id: cookies().get("user_id")?.value as string,
      })
      .returning();
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
  }
};
export const DELETE = async (request: NextRequest) => {
  const req = await request.json();
  try {
    const res = await db
      .delete(cartTable)
      .where(eq(cartTable.id, req.id))
      .returning();
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
  }
};
