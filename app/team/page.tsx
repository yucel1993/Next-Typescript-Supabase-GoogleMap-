import Link from 'next/link';
import React from 'react';

const Team = () => {
	return (
		<div>
			<h2>Unser Mitgliedern</h2>
			<div className="category-navigation">
				<div>
					<Link href="/team/Marc">Marc Mentor</Link>
				</div>
				<div>
					<Link href="/team/Antony">Antony Mentor</Link>
				</div>
			</div>
		</div>
	);
};

export default Team;
