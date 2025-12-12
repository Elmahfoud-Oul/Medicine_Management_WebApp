import React from 'react';
import HeaderCss from "./HeaderCss.css";
import { Bell } from 'lucide-react';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0&icon_names=waving_hand" />

export default function Header({UserName}) {
    const HandlerNotif = () => {
        alert("Medicine aspro / 11:50Am /  Confirm?")
    }
    return (
    <>
            <div className="headnav">
                <h1 className="greet">Dear<span className='UserName'>{UserName}</span> </h1>
                <button className="NotifBtn" onClick={HandlerNotif}>
                    <Bell size={20} color="#666" />
                </button>
            </div>
    </>
    )
}