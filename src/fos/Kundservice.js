import React from "react";
import { Route } from "react-router-dom";
import Kundsakerhet from "./Kundsakerhet";
import Faq from "./Faq";
import Anvandarvillkor from "./Anvandarvillkor";

const Kundservice = () => {
    return (
        <div>
            {/* <aside className="ads">
                <ul>
                    <li>
                        <Link to="/frågorochsvar/kundservice/Anvädarvillkor">Anvädarvillkor</Link>
                    </li>
                    <li>
                        <Link to="/frågorochsvar/kundservice/Kundsäkerhet">Kundsäkerhet</Link>
                    </li>
                    <li>
                        <Link to="/frågorochsvar/kundservice/Faq">Frågor och svar</Link>
                    </li>
                </ul>
            </aside> */}
            <Route
                path={`/frågorochsvar/kundservice/Anvädarvillkor`}
                component={Anvandarvillkor}
            />
            <Route
                path={`/frågorochsvar/kundservice/Kundsäkerhet`}
                component={Kundsakerhet}
            />
            <Route path={`/frågorochsvar/kundservice/Faq`} component={Faq} />
        </div>
    );
};

export default Kundservice;
