import { NextRequest } from "next/server";
import { prisma } from '@/server/db/client'

const itemMapper = (item: any) => {
  return {
    ...item,
    dates: item.dates ? JSON.parse(item.dates) : [],
    details: item.details ? JSON.parse(item.details) : [],
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const searchQuery = searchParams.get('s')

  if (searchQuery) {
    const items = await prisma.item.findMany({
      orderBy: {
        _relevance: {
          fields: ['title', 'abstract'],
          search: searchQuery,
          sort: 'asc',
        },
      },
      where: {
        OR: [
          {
            title: {
              search: searchQuery,
            },
          },
          {
            abstract: {
              search: searchQuery,
            },
          },
          {
            dates: {
              contains: searchQuery,
            },
          },
          {
            details: {
              contains: searchQuery,
            },
          },
        ],
      },
    })

    return Response.json({
      data: items.map(itemMapper),
    })
  } else {
    const items = await prisma.item.findMany({
      take: 20,
    })

    return Response.json({
      data: items.map(itemMapper),
    })
  }
}
