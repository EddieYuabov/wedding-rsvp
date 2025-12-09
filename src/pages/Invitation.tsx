import React, { useState } from "react"
import "./Invitation.css"
import RsvpForm from "./RsvpForm"

const Invitation: React.FC = () => {
    const [isActive, setIsActive] = useState(false)
    const [showRsvpForm, setShowRsvpForm] = useState(false)

    return (
        <>
            <div className="section_invitation">
                <div
                    className={"envelope_wrapper" + (isActive ? " isActive" : "")}
                    onClick={() => setIsActive(true)}
                >
                    <div className="front">
                        <img src="./images/envelope_back.png" />
                        {!isActive ? <h1 className="open_me">Open me!</h1> : null}
                    </div>
                    <div className="back">
                        <img
                            src="./images/envelope_front_with_interior.png"
                            className="envelope_front interior"
                        />
                        <img src="./images/invitation_to_wedding.png" className="invitation" />
                        <img
                            src="./images/envelope_front.png"
                            className="envelope_front exterior"
                        />
                        <div className="flap_wrapper">
                            <img
                                src="./images/envelope_flap_interior.png"
                                className="flap_interior"
                            />
                            <img
                                src="./images/envelope_flap_exterior.png"
                                className="flap_exterior"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="rsvp_button_container">
                <button className="rsvp_button" onClick={() => setShowRsvpForm(true)}>
                    RSVP
                </button>
            </div>
            {showRsvpForm && <RsvpForm onClose={() => setShowRsvpForm(false)} />}
        </>
    )
}

export default Invitation
