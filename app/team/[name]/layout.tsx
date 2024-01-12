import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	description: 'Unser tolles Team',
};

type Props = {
	children: ReactNode;
};
export default function layout({ children }: Props) {
	return (
		<main className="default-layout">
			{/* <div style={{ fontSize: '3rem' }}>👫🧑‍🤝‍🧑</div> */}
			{children}
			<div>
				<strong>This is last layout</strong>
			</div>
		</main>
	);
}
