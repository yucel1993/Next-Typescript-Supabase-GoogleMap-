'use client';

import { handleNewsletterSubmit } from '@/lib/newslletter.action';
import { useFormState } from 'react-dom';

export default function NewsletterForm() {
	const [formState, formAction] = useFormState(handleNewsletterSubmit, {
		message: '',
	});

	return (
		<form className="newsletter-form" action={formAction}>
			<div className="newsletter-form__input-wrapper">
				<label htmlFor="email">E-Mail</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					autoComplete="email"
				/>
			</div>
			<div className="newsletter-form__input-wrapper subscribe-only">
				<label htmlFor="name">Name (optional)</label>
				<input type="text" id="name" name="name" autoComplete="name" />
			</div>
			<div className="newsletter-form__mode">
				<label>
					<input type="radio" name="action" value="subscribe" defaultChecked />{' '}
					Eintragen
				</label>
				<label>
					<input type="radio" name="action" value="unsubscribe" /> Austragen
				</label>
			</div>
			<label className="subscribe-only">
				<input type="checkbox" name="terms" value="on" required /> Ich stimmte
				den Datenschutzbedingungen zu
			</label>
			<button type="submit">Absenden</button>
			<div aria-live="polite" className="newsletter-form__message">
				<p>{formState.message}</p>
			</div>
		</form>
	);
}

// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute
