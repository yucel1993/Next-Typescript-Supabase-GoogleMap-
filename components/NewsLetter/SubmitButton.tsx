'use client';

import { useFormStatus } from 'react-dom';

/*
Für die Verwendung von useFormStatus() muss die Komponente
innerhalb eines <form> Elements liegen und eine eigenständige
Client-Komponente sein.
https://react.dev/reference/react-dom/hooks/useFormStatus */

type Props = {
	readyText?: string;
	pendingText?: string;
};

export default function SubmitButton({
	readyText = 'Absenden',
	pendingText = 'Warten…',
}: Props) {
	const { pending } = useFormStatus();
	return (
		<button type="submit" disabled={pending}>
			{pending ? pendingText : readyText}
		</button>
	);
}
