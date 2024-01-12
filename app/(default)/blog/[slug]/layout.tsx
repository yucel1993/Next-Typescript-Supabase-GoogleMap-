import Link from 'next/link';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<div>{children}</div>
			<Link href="/blog">Zuruk zum Post</Link>
		</div>
	);
};

export default layout;
