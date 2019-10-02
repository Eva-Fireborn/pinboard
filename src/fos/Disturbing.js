import React from "react";

const Disturbing = () => {
    return (
        <div className="info">
            <h1>Anmäl störande annons</h1>
            <form>
                <div>
                    <label htmlFor="link">Länk till annonsen: </label>
                    <input type="text" name="link"/>
                </div>
                <div>
                    <label htmlFor="name">Ditt namn: </label>
                    <input type="text" name="name"/>
                </div>
                <div>
                    <label htmlFor="email">Din epostadress: </label>
                    <input type="text" name="email"/>
                </div>
                <div>
                    <label htmlFor="message">Meddelande: </label>
                    <textarea rows="4"  type="text" name="message"/>
                </div>
                <p>Vi kontaktar dig vid behov.</p>
            </form>
            <button>Skicka</button>
        </div>
    );
};

export default Disturbing;
