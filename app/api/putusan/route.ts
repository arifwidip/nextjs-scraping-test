import { scrapePutusan } from "@/lib/scrapper";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const items = await scrapePutusan()

    return Response.json({
      data: items,
    });

  } catch (e: any) {
    return Response.json({
      error: e.message,
    }, {
      status: 500,
    })
  }
}
