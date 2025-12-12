import React, { useState, useEffect } from "react"
import axios from "axios"
import "./RsvpForm.css"

interface RsvpFormData {
    name: string
    phoneNumber: string
    numberOfGuests: number
    attendingHuppaCocktail: string
    attendingCelebration: string
    additionalInformation: string
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
        additionalInformation: "",
    })

    useEffect(() => {
        // Scroll to top when form opens
        window.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
    }, [])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "numberOfGuests" ? parseInt(value, 10) : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const payload = {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          numberOfGuests: formData.numberOfGuests,
          attendingHuppaCocktail: formData.attendingHuppaCocktail,
          attendingCelebration: formData.attendingCelebration,
          additionalInformation: formData.additionalInformation,
        };
      
        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              
      
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                alert(`Error: ${data.error || "Failed to submit"}`);
                return;
            }
      
          alert("RSVP submitted! Thank you ❤️");
    
          setFormData({
            name: "",
            phoneNumber: "",
            numberOfGuests: 1,
            attendingHuppaCocktail: "yes",
            attendingCelebration: "yes",
            additionalInformation: "",
          });
      
          if (onClose) onClose();
        } catch (err) {
          console.error(err);
          alert("Network error. Please try again.");
        }
      };

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

                    <label htmlFor="additionalInformation">Name of Guests:</label>
                    <textarea
                        id="additionalInformation"
                        name="additionalInformation"
                        value={formData.additionalInformation}
                        onChange={handleChange}
                        rows={4}
                    />

                    <button type="submit" className="submit_button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RsvpForm
