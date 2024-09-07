import { createCheckoutSession } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const priceId = searchParams.get("priceId");

  if (!priceId) {
    return NextResponse.json(
      { error: "Price ID is required" },
      { status: 400 }
    );
  }

  try {
    const checkoutUrl = await createCheckoutSession(priceId);
    return NextResponse.redirect(checkoutUrl as string);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
