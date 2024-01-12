import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/*
https://nextjs.org/docs/app/building-your-application/routing/route-handlers

https://nextjs.org/docs/app/api-reference/functions/next-request
https://nextjs.org/docs/app/api-reference/functions/next-response

Statuscodes:
https://de.wikipedia.org/wiki/HTTP-Statuscode
*/

/*
Aufruf der URL /api/clear-cache?secret=123&path=/(default)/blog
leert den Cache für die Inhalte, die dem path-Parameter entsprechenden
entsprechen. Die URL kann manuell aufgerufen
werden, in den meisten CMS-Systemen kann man aber auch angeben,
dass die URL bei jedem Speichervorgang, also bei jeder Änderung
von Inhalte automatisch aufgerufen wird.
Achtung: path muss dem Pfad im Dateisystem ab dem app-Ordner
angeben oder der URL ab der Domain entsprechen:
"/(default)/blog" oder "/blog"
"/shop/[id]" oder "/shop/123"

https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
https://nextjs.org/docs/app/api-reference/functions/revalidatePath

Alternativ könnte man auch einen oder mehrere fetch-Aufrufe mit einem
tag, also einem Schlagwort versehen, und dann mit revalidateTag
löschen.
https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
https://nextjs.org/docs/app/api-reference/functions/revalidateTag
*/
export function GET(request: NextRequest) {
	// const secret = request.nextUrl.searchParams.get('secret');
	const path = request.nextUrl.searchParams.get('path');

	// if (secret !== process.env.CACHE_SECRET) {
	//  return NextResponse.json({ message: 'Wrong secret' }, { status: 401 });
	// }

	if (!path) {
		return NextResponse.json({ message: 'Missing path' }, { status: 400 });
	}

	revalidatePath(path);

	return NextResponse.json({
		message: `Cache for path ${path} cleared`,
		now: new Date().toTimeString(),
	});
}
