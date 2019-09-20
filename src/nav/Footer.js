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
					<Link to='/'>info@pinboard.com</Link>
				</li>
				<li>
					<Link to='/'><FontAwesomeIcon icon={faInstagram} className="socialMediaButtons" /></Link>
					<Link to='/'><FontAwesomeIcon icon={faFacebookSquare} className="socialMediaButtons"/></Link>
					<Link to='/'><FontAwesomeIcon icon={faTwitter} className="socialMediaButtons"/></Link>
					<Link to='/'><FontAwesomeIcon icon={faLinkedin} className="socialMediaButtons" /></Link>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
