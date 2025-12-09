import React, { useState } from "react"
import axios from "axios"
import "./RsvpForm.css"

interface RsvpFormData {
    name: string
    phoneNumber: string
    numberOfGuests: number
    attendingHuppaCocktail: string
    attendingCelebration: string
}

interface RsvpFormProps {
    onClose?: () => void
}

const RsvpForm: React.FC<RsvpFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<RsvpFormData>({
        name: "",
        phoneNumber: "",
        numberOfGuests: 1,
        attendingHuppaCocktail: "yes",
        attendingCelebration: "yes",
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "numberOfGuests" ? parseInt(value, 10) : value,
        }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        console.log(formData)

        // await axios
        //     .post(
        //         "/api/rsvp",
        //         JSON.stringify(formData),
        //         { headers: { "Content-Type": "application/json" } }
        //     )
        //     .then((response) => {
        //         console.log("Success")
        //         if (onClose) onClose()
        //     })
        //     .catch((error) => {
        //         console.log("Error creating page: " + error.message)
        //     })

        console.log(formData)
        if (onClose) onClose()
    }

    return (
        <div className="rsvp_form_container" onClick={onClose}>
            <div id="rsvp_form" onClick={(e) => e.stopPropagation()}>
                {onClose && (
                    <button
                        type="button"
                        className="close_button"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                )}
                <h2>Are you coming?</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />

                    <label htmlFor="numberOfGuests">Number of Guests:</label>
                    <select
                        id="numberOfGuests"
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                    >
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>

                    <div className="radio_group">
                        <label>Attending huppa & cocktail:</label>
                        <div className="radio_options">
                            <label>
                                <input
                                    type="radio"
                                    name="attendingHuppaCocktail"
                                    value="yes"
                                    checked={formData.attendingHuppaCocktail === "yes"}
                                    onChange={handleChange}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="attendingHuppaCocktail"
                                    value="no"
                                    checked={formData.attendingHuppaCocktail === "no"}
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </div>
                    </div>

                    <div className="radio_group">
                        <label>Attending party:</label>
                        <div className="radio_options">
                            <label>
                                <input
                                    type="radio"
                                    name="attendingCelebration"
                                    value="yes"
                                    checked={formData.attendingCelebration === "yes"}
                                    onChange={handleChange}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="attendingCelebration"
                                    value="no"
                                    checked={formData.attendingCelebration === "no"}
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RsvpForm
