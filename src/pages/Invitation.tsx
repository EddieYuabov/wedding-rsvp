import React, { useState, useEffect, useRef } from "react"
import "./Invitation.css"
import RsvpForm from "./RsvpForm"

const Invitation: React.FC = () => {
    const [isActive, setIsActive] = useState(false)
    const [showRsvpForm, setShowRsvpForm] = useState(false)
    const [isInView, setIsInView] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true)
                        // Stop observing once it's in view
                        if (sectionRef.current) {
                            observer.unobserve(sectionRef.current)
                        }
                    }
                })
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px',
            }
        )

        // Small delay to ensure page is loaded
        const timeoutId = setTimeout(() => {
            if (sectionRef.current) {
                observer.observe(sectionRef.current)
            }
        }, 100)

        return () => {
            clearTimeout(timeoutId)
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    return (
        <>
            <div className="section_invitation" ref={sectionRef}>
                <div
                    className={
                        "envelope_wrapper" +
                        (isActive ? " isActive" : "") +
                        (isInView ? " inView" : "")
                    }
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
