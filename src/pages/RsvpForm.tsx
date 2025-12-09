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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const payload = {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          numberOfGuests: formData.numberOfGuests,
          attendingHuppaCocktail: formData.attendingHuppaCocktail, // "yes" | "no"
          attendingCelebration: formData.attendingCelebration,     // "yes" | "no"
        };
      
        try {
          const res = await fetch("/api/rsvp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
      
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            alert(`Error: ${data.error || "Failed to submit"}`);
            return;
          }
      
          alert("RSVP submitted! Thank you ❤️");
      
          // Optional: clear and/or close form
          setFormData({
            name: "",
            phoneNumber: "",
            numberOfGuests: 1,
            attendingHuppaCocktail: "yes",
            attendingCelebration: "yes",
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

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RsvpForm
