import react from "react";
import {ChevronRight} from "lucide-react";
import Cards from "./Cards.css";
export default function MedsCard(Meds) {
    const handleClick = () => {
    }
    return (
        <>
            <div className="MedsCard">
                <img className="MedsImg" src={Meds.image} />
                <div className="MedsContent">
                    <div className="MedsInfo">
                        <div className="MedsName">{Meds.name}</div>
                        <div className="MedsDetails">
                            <div className="MedsDosage">Dosage: {Meds.dosage}</div>
                            <div className="MedsQuantity">Quantity: {Meds.quantity}</div>
                        </div>
                    </div>
                    <div className="MedsSchedule">
                        <div className="MedsSch">Schedule: {Meds.schedule}</div>
                        <div className="MedsDuration">Duration: {Meds.duration}</div>
                    </div>
                </div>
                <button className="MedsBtn" onClick={() => {}}>
                    <ChevronRight size={15} color="white" />
                </button>
            </div>
        </>
    )
}