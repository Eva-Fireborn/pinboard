import React from "react";

const Header = () => {
	return (
		<div id="header">
			<a id="logo" href="index.html">
				<img src={require('../img/tempLogo100.png')} alt="Pinboard" />
			</a>

			<nav>
				<a href="ads.html">Annonser</a>
				<a href="faq.html">Frågor och Svar</a>
				<a href="profile.html">
					<button>Login</button>
				</a>
				<a href="profile.html">
					<button class="call">Skapa Konto</button>
				</a>
				{/*
					when logged in you should have these menu (Max 5) options and sub menus:
						Annonser
						Skapa annons
						Mina Kurser
						Meddelanden
						Profil
							-> Help?
							-> Inställningar
							-> logga ut
				*/}
			</nav>
		</div>
	);
};

export default Header;
