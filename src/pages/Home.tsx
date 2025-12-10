import React from "react"
import "./Home.css"
import Invitation from "./Invitation"
import Registry from "./Registry"
import RsvpForm from "./RsvpForm"

const Home = () => {
    return (
        <div id="home">
            <div className="section_top">
                <img src="./images/edward_and_dina.jpg" className="background_main" />
                <div className="title_text">
                    {/* <h1>Ofer & Bella</h1> */}
                    {/* <h1><br/></h1> */}
                    {/* <h2>We're getting married!</h2> */}
                </div>
            </div>
            <Invitation />
            <div className="section_details">
                <div className="section_content">
                    <div className="text_content">
                        <h1>Details...</h1>
                        <p>Sands Castle</p>
                        <p>505 Franklin Ave, Franklin Square, NY 11010</p>
                        <br/>
                        <p>Monday, March 9th, 2026</p>
                        <p>5:30 PM - Ceremony</p>
                        <p>7:00 PM - Cocktail Hour</p>
                        <p>8:30 PM - Party! 🕺 💃</p>
                    </div>
                    <img src="./images/sands_castle.jpg" className="venue_image"/>
                </div>
            </div>
            {/* <Registry /> */}
        </div>
    )
}

export default Home
