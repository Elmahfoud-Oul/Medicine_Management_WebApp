import React from "react";
import MedsCard from "../cardsMeds/MedsCard";
import "./Section.css"; // Ensure this imports the CSS below

export function MedsSection({ Meds, onAddNew }) {

    const handlerMoreBtn = () => {
        alert("No thing else in list");
    }

    return (
        <div className="MedsSection">
            {/* This Header matches the design in the image */}
            <div className="MedsHeader">
                <div className="MedsTitle">Scheduled medicine:</div>
                <button className="MedsAddBtn" onClick={onAddNew}>
                    Add new
                </button>
            </div>

            <div className="MedsContainer">
                {Meds.map((medicine) => (
                    <MedsCard
                        key={medicine.id || Math.random()}
                        {...medicine} // Passes all medicine props (image, name, dosage, etc.)
                    />
                ))}

                {/* Optional 'See More' button inside container if needed */}
                <div style={{textAlign: 'center', marginTop: '10px'}}>
                    <button className="MoreBtn" onClick={handlerMoreBtn}>Show More</button>
                </div>
            </div>
        </div>
    )
}