import { scrapePutusan } from "@/lib/scrapper";
import { NextRequest } from "next/server";
import { prisma } from '@/server/db/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageNumber = parseInt(searchParams.get('page')!)
    const items = await scrapePutusan(pageNumber ?? 1)

    await items.reduce(async (promise: Promise<any>, item: any) => {
      await promise
      const uniqueId = item.link.replace('https://putusan3.mahkamahagung.go.id/direktori/putusan/', '').replace('.html', '')
      const data = {
        title: item.title,
        link: item.link,
        abstract: item.abstract,
        dates: JSON.stringify(item.dates ?? []),
        details: JSON.stringify(item.details ?? []),
        totalViews: item.totalViews,
        totalDownloads: item.totalDownloads,
        dataSource: 'https://putusan3.mahkamahagung.go.id/',
        sourceUniqueId: uniqueId,
      }

      await prisma.item.upsert({
        where: {
          // id: 1,
          sourceUniqueId: uniqueId,
        },
        update: {
          ...data,
        },
        create: {
          ...data
        },
      })

    }, Promise.resolve())

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
