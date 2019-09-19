import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import AdsView from './ads/AdsView';
import PinboardView from './pinboard/PinboardView';
import CreateAdd from './createAdd/createAdd';
import FrogorOchSvar from './fos/faq';
import ProfileView from './profile/ProfileView';
import MsgView from './msg/MsgView';


const ContentRouting = ({isLoggedIn}) => {
	const [routes] = useState([
		{ exact: true, path: "/", component: PinboardView },
		{ exact: false, path: "/home", component: PinboardView },
		{ exact: false, path: "/annonser", component: AdsView },
		{ exact: false, path: "/skapaannons", component: CreateAdd },
		{ exact: false, path: "/frågorochsvar", component: FrogorOchSvar },
		{ exact: false, path: "/profil", component: ProfileView },
		{ exact: false, path: "/meddelanden", component: MsgView }
	]);

	const Routes = routes.map((route, index) => (
		<Route
			key={index}
			exact={route.exact}
			path={route.path}
			render={
				({ match }) => (
					<route.component match={match} isLoggedIn={isLoggedIn} />
				)}
		/>
	));

	return <Switch>{Routes}</Switch>;
};

export default ContentRouting;
