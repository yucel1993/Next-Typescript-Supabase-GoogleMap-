'use server';

import { supabaseBackend } from '@/lib/subaseClient';
import { z } from 'zod';

import { zfd } from 'zod-form-data';

type FormState =
	| {
			message: string;
	  }
	| {
			error: string;
	  };

const schema = zfd.formData({
	email: z.string().email().max(20),
	name: zfd.text(z.string().max(20).optional()),
	action: zfd
		.text()
		.refine((value) => ['subscribe', 'unsubscribe'].includes(value)),
	terms: z.literal('on'),
});

//* Check this const action = formData.get("action")
export async function handleNewsletterSubmit(
	prevState: FormState,
	formData: FormData
) {
	console.log(formData);
	const { name, email, action, terms } = schema.parse(formData);

	if (action === 'subscribe') {
		const { error } = await supabaseBackend
			.from('Newsletter')
			.insert({ name, email });
		if (error) {
			console.log(error.details);
			return {
				error: error.details,
			};
		}
	} else if (action === 'unsubscribe') {
		const { error } = await supabaseBackend
			.from('Newsletter')
			.delete()
			.eq('email', email);
	}

	return {
		message: 'success',
	};
}
