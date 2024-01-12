import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { CiTwitter } from 'react-icons/ci';

const time = new Date().getFullYear();

const Footer = () => {
	return (
		<div className="footer">
			<h2>All the Best</h2>
			<FaFacebook />
			<CiTwitter />
			<h4>{time}</h4>
		</div>
	);
};

export default Footer;
