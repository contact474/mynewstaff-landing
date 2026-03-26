import { NextRequest, NextResponse } from 'next/server'

const UPSTREAM = 'https://emin.mynewstaff.ai/api/reports/generate'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const res = await fetch(UPSTREAM, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Proxy error' }, { status: 502 })
  }
}
