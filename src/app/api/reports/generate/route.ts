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
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Proxy error'
    return NextResponse.json({ error: msg }, { status: 502 })
  }
}
