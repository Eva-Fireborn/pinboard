import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Faq from "./Faq";
import Hjalpvidkop from "./Hjalpvidkop";
import Kundservice from "./Kundservice";

const HelpPage = () => {
    const [firstVisibility, setFirstVisibility] = useState(false);
    const [secondVisibility, setSecondVisibility] = useState(false);
    return (
        <div id="wrapper">
            <Router>
                <aside className="ads">
                    <div>
                        <ul>
                            <li>
                                <Link to="/frågorochsvar/hjälp-vid-köp">
                                    <h4
                                        onClick={() =>
                                            setFirstVisibility(!firstVisibility)
                                        }
                                    >
                                        Hjälp vid köp
                                    </h4>
                                </Link>
                                {firstVisibility ? (
                                    <ul>
                                        <li>
                                            <Link to="/frågorochsvar/hjälp-vid-köp/Betalning">
                                                Betalning
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/frågorochsvar/hjälp-vid-köp/Anmäl-störande-annons">
                                                Anmäl störande annons
                                            </Link>
                                        </li>
                                    </ul>
                                ) : null}
                            </li>
                            <li>
                                <Link to="/frågorochsvar/kundservice">
                                    <h4
                                        onClick={() =>
                                            setSecondVisibility(
                                                !secondVisibility
                                            )
                                        }
                                    >
                                        Kundservice
                                    </h4>
                                </Link>
                                {secondVisibility ? (
                                    <ul>
                                        <li>
                                            <Link to="/frågorochsvar/kundservice/Anvädarvillkor">
                                                Anvädarvillkor
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/frågorochsvar/kundservice/Kundsäkerhet">
                                                Kundsäkerhet
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/frågorochsvar/kundservice/Faq">
                                                Frågor och svar
                                            </Link>
                                        </li>
                                    </ul>
                                ) : null}
                            </li>
                            <li>
                                <Link to="/frågorochsvar"><h4>FAQ</h4></Link>
                            </li>
                        </ul>
                    </div>
                </aside>
                <main className="tipsContainer ads">
                    <Route exact path="/frågorochsvar" component={Faq} />
                    <Route
                        path="/frågorochsvar/hjälp-vid-köp"
                        component={Hjalpvidkop}
                    />
                    <Route
                        path="/frågorochsvar/kundservice"
                        component={Kundservice}
                    />
                </main>
            </Router>
        </div>
    );
};

export default HelpPage;
