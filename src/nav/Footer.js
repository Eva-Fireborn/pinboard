import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
	return (
		<footer>
			<ul>
				<li>
					<h4>Hjälp vid köp</h4>
				</li>
				<li>
					<Link to='/frågorochsvar/hjälp-vid-köp/Betalning'>Betalning</Link>
				</li>
				<li>
					<Link to='/frågorochsvar/hjälp-vid-köp/Anmäl-störande-annons'>Anmäl störande annons</Link>
				</li>
			</ul>
			<ul>
				<li>
					<h4>Kundservice</h4>
				</li>
				<li>
					<Link to='/frågorochsvar/kundservice/Anvädarvillkor'>Användarvillkor</Link>
				</li>
				<li>
					<Link to='/frågorochsvar/kundservice/Kundsäkerhet'>Kundsäkerhet</Link>
				</li>
				<li>
					<Link to='/frågorochsvar'>Frågor och svar</Link>
				</li>
			</ul>
			<ul>
				<li>
					<h4>Kontakta oss</h4>
				</li>
				<li>
					<a href="mailto:info@pinboard.com">info@pinboard.com</a>
				</li>
				<li>
					<a href="https://www.instagram.com/" target="blank" rel="noopener"><FontAwesomeIcon icon={faInstagram} className="socialMediaButtons" /></a>
					<a href="https://www.facebook.com/" target="blank" rel="noopener"><FontAwesomeIcon icon={faFacebookSquare} className="socialMediaButtons"/></a>
					<a href="https://twitter.com/" target="blank" rel="noopener"><FontAwesomeIcon icon={faTwitter} className="socialMediaButtons"/></a>
					<a href="https://www.linkedin.com/" target="blank" rel="noopener"><FontAwesomeIcon icon={faLinkedin} className="socialMediaButtons" /></a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
