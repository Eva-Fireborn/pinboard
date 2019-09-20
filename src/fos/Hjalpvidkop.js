import React from "react";
import { Route } from "react-router-dom";
import Betalning from "./Betalning";
import Disturbing from "./Disturbing";

const Hjalpvidkop = () => {
    return (
        <div>
            {/* <aside className="ads">
                <ul>
                    <li>
                        <Link to="/frågorochsvar/hjälp-vid-köp/Betalning">Betalning</Link>
                    </li>
                    <li>
                        <Link to="/frågorochsvar/hjälp-vid-köp/Anmäl-störande-annons">
                            Anmäl störande annons
                        </Link>
                    </li>
                </ul>
           </aside> */}
            <Route
                path={`/frågorochsvar/hjälp-vid-köp/Betalning`}
                component={Betalning}
            />
            <Route
                path={`/frågorochsvar/hjälp-vid-köp/Anmäl-störande-annons`}
                component={Disturbing}
            />
        </div>
    );
};

export default Hjalpvidkop;
