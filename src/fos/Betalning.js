import React from "react";

const Betalning = () => {
    return (
        <div className="info">
            <h1>Betalning</h1>
            <p>
                Alla tjänsteannonsörer har intygat att de betalar skatt, följer
                gällande lagar och föreskrifter samt utför erbjudna tjänster
                fackmässigt. Annonsörer som utför transporttjänster har även
                intygat att de innehar ett trafiktillstånd utfärdat av
                länsstyrelsen. Läs också om <a href="https://www.blocket.se/security/skatteregler.htm?ca=15" target="blank" rel="noopener">
                    skatteregler
                </a>{" "}
                vid köp av tjänster.
            </p>
            <h3>Att tänka på vid köp av tjänst</h3>
            <ul>
                <li>
                    Kontrollera att företaget är registrerat och har
                    f-skattsedel, annars riskerar du att avkrävas
                    arbetsgivaransvar vid t.ex. olyckor.
                </li>
                <li>Kontrollera att företaget har nödvändiga försäkringar.</li>
                <li>
                    Kontrollera med länsstyrelsen att transportbolaget har
                    trafiktillstånd.
                </li>
                <li>
                    Ta del av{" "}
                    <a href="https://www.hallakonsument.se/klaga-angra-eller-anmala/vad-lagen-sager/konsumenttjanstlagen/" target="blank" rel="noopener">
                        konsumenttjänstlagen
                    </a>{" "}
                    för vidare information.
                </li>
            </ul>
            <h3>Privatköp</h3>
            <p>
                Tänker du som privatperson betala ut ersättning för tjänst till
                en annan privatperson? Tänk på att du själv ofta är skyldig att
                lämna kontrolluppgifter och betala sociala avgifter om du köper
                tjänster av en privatperson. Läs <a href="https://www.skatteverket.se/infotext/artiklar/05/forenkladskd.4.d1afd3103d689ac2a80002439.html" target="blank" rel="noopener">Skatteverkets regler</a> gällande
                detta.
            </p>
            <p>
                Köper du en tjänst av en privatperson gäller andra regler än om
                du köper av en handlare. Vid ett privatköp har du inte samma
                skydd som när du köper tjänsten av ett företag. Om det uppstår
                en tvist gäller <a href="https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/koplag-1990931_sfs-1990-931" target="blank" rel="noopener">köplagen</a>.
            </p>
            <h3>Tänk på</h3>
            <ul>
                <li>Kräv f-skattsedel!</li>
                <li>
                    Kontrollera att transportbolag har trafiktillstånd och
                    nödvändiga försäkringar.
                </li>
                <li>
                    Ett felaktigt utfört svartjobb som medför skada på din
                    bostad kan påverka dina möjligheter till
                    försäkringsersättning.
                </li>
                <li>Begär alltid kvitto vid betalning för utförd tjänst.</li>
            </ul>
        </div>
    );
};

export default Betalning;
