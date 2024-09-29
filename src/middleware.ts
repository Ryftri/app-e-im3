import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    try {
        const response = await fetch('https://rehan.niznet.my.id/auth/get-me', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'authorization': `Bearer ${req.cookies.get('refreshToken')?.value}`,
            }
        })

        if (response.status !== 200) return NextResponse.redirect(new URL('/', req.url));

        return NextResponse.next();
    } catch (error: any) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/guru/:path*', '/siswa/:path*'],
}