import React from "react";

const Anvandarvillkor = () => {
    return (
        <div className="info">
            <h1>Användarvillkor</h1>
            <p>
                I egenskap av användare förstår och accepterar du att du är
                ansvarig för att följa alla eventuella lagar, regler,
                förordningar och skattemässiga skyldigheter som gäller för
                användande av Pinboard. I samband med att du använder
                webbplatsen och därmed associerat innehåll accepterar du att du
                inte kommer att:{" "}
            </p>
            <ul>
                <li>
                    Använda tjänsten för kommersiella eller andra syften som
                    inte uttryckligen tillåts enligt våra villkor
                </li>
                <li>
                    Kopiera, lagra eller på annat sätt tillskansa dig tillgång
                    till den information som finns på Pinboards site för ändamål
                    som inte uttryckligen tillåts enligt våra villkor{" "}
                </li>
                <li>
                    Använda mail och chattfunktioner för oönskad kommersiell
                    e-post (”spam”) eller reklam som inte har med tjenster att
                    göra
                </li>
                <li>
                    Systematiskt hämta data eller annat innehåll från vår site
                    för att skapa eller sammanställa databas, katalog eller
                    liknande oavsett i vilket syfte detta görs
                </li>
            </ul>
            <p>
                Det är förbehållet Pinboard att utan vidare förklaring temporärt
                eller permanent stänga av enskilda användare från tjänsten.
                Exempel på sådant som kan utgöra grund för avstängning är brott
                mot någon av avtalspunkterna i våra användaravtal eller upprepad
                underlåtenhet att svara i kommunikationen med Pinboard
            </p>
        </div>
    );
};

export default Anvandarvillkor;
