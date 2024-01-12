'use client';

import React from 'react';
type Prop = {
	children: React.ReactNode;
	slot?: React.ReactNode;
};

const ClientComponent = ({ children, slot }: Prop) => {
	return (
		<>
			<h1>ClientComponent</h1>

			<div>{children}</div>
			<div>{slot}</div>
		</>
	);
};

export default ClientComponent;
