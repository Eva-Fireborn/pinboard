import React from "react";

const ReviewAd = ({ values, onClose }) => {
    let val = JSON.parse(values);

    return (
        <div className="dialogBackground">
            <div className="dialogWindow">
                <button className="dialogExitButton" onClick={onClose}>
                    X
                </button>
                <div>
                    <div><span>Annons typ:</span> {val.addType}</div>
                    <div><span>Rubrik:</span> {val.header}</div>
                    <div><span>Kategori:</span> {val.category}</div>
                    <div><span>Beskrivning:</span> {val.description}</div>
                    <div><span>Särskild önskemål:</span> {val.specialRequirements}</div>
                    <div><span>Stad:</span> {val.city}</div>
                    <div><span>Gatuadress:</span> {val.street}</div>
                    <div><span>Postnummer:</span> {val.zip}</div>
                    <div><span>Pris:</span> {val.price}</div>
                </div>
            </div>
        </div>
    );
};

export default ReviewAd;
