import { NextResponse } from 'next/server'

import { type File } from '@/lib/model'

const fileList: File[] = [{ id: '1', name: 'test' }]

export async function GET() {
  return Response.json(fileList)
}

export async function POST(request: Request) {
  const newFile = await request.json()

  fileList.push(newFile)

  return NextResponse.json(newFile)
}
