import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import AdsView from './ads/AdsView';
import PinboardView from './pinboard/PinboardView';
import CreateAdd from './createAdd/CreateAdd';
import ProfileView from './profile/ProfileView';
import MsgView from './msg/MsgView';
import HelpPage from "./fos/HelpPage";
import Error404 from "./Error404";



const ContentRouting = ({ isLoggedIn, logOff }) => {
	const [routes] = useState([
		{ exact: true, path: "/", component: PinboardView },
		{ exact: false, path: "/home", component: PinboardView },
		{ exact: false, path: "/annonser", component: AdsView },
		{ exact: false, path: "/skapaannons", component: CreateAdd },
		{ exact: true, path: "/frågorochsvar", component: HelpPage },
		{ exact: true, path: "/profil/:userID", component: ProfileView },
		{ exact: false, path: "/meddelanden", component: MsgView },
		{ exact: false, path: "/frågorochsvar/hjälp-vid-köp/Betalning", component: HelpPage },
		{ exact: false, path: "/frågorochsvar/hjälp-vid-köp/Anmäl-störande-annons", component: HelpPage },
		{ exact: false, path: "/frågorochsvar/kundservice/Anvädarvillkor", component: HelpPage },
		{ exact: false, path: "/frågorochsvar/kundservice/Kundsäkerhet", component: HelpPage },
	]);

	const Routes = routes.map((route, index) => (
		<Route
			key={index}
			exact={route.exact}
			path={route.path}
			render={
				({ match }) => (
					<route.component match={match} isLoggedIn={isLoggedIn} logOff={logOff} />
				)}
		/>
	));

	return <Switch>{Routes}<Route component={Error404} /></Switch>;
};

export default ContentRouting;
