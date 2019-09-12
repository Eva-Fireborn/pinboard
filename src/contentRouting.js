import React, {useState} from "react";
import {Switch, Route} from "react-router-dom";

import AdsView from './ads/AdsView';
import PinboardView from './pinboard/PinboardView';
import CreateAdd from './createAdd/createAdd';
import FrogorOchSvar from './fos/faq';
import Signin from './login/signin';
import ProfileView from './profile/ProfileView';


const ContentRouting = () => {
    const [routes] = useState([
        {exact: true, path: "/", component: PinboardView },
        {exact: false, path: "/home", component: PinboardView },
        {exact: false, path: "/annonser", component: AdsView},
        {exact: false, path: "/skapaannons", component: CreateAdd},
        {exact: false, path: "/frågorochsvar", component: FrogorOchSvar},
        {exact: false, path: "/skapakonto", component: Signin},
        {exact: false, path: "/profil", component: ProfileView}
    ]);

    const Routes = routes.map((route, index) => (
        <Route
            key={index}
            exact={route.exact}
            path={route.path}
            render={
                ({match}) => (
                <route.component match={match} />
            )}
        />
    ));

    return <Switch>{Routes}</Switch>;
};

export default ContentRouting;
