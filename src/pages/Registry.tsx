import React, { useState } from "react"
import "./Registry.css"

const Registry: React.FC = () => {
    return (
        <div className="section_details reverse">
            <div className="section_content">
                <div className="text_content">
                    <h1>Registry...</h1>
                    <p>
                        Thank you for your thoughts and support! We're excited
                        to celebrate with you soon.
                    </p>
                    <p>
                        Our registry is currently being updated. Please check
                        back later for more details!
                    </p>
                </div>
                <img
                    src="./images/edward_and_dina.jpg"
                    className="registry_image"
                />
                {/* <img src="./images/registry.png" className="registry_image"/> */}
            </div>
        </div>
    )
}

export default Registry
