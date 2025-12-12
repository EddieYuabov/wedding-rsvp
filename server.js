import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log(
  "SERVICE_ROLE_KEY present?",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Supabase client (service role key must ONLY be used on the backend)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.post("/api/rsvp", async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      numberOfGuests,
      attendingHuppaCocktail,
      attendingCelebration,
      additionalInformation,
    } = req.body;

    console.log("RSVP body:", req.body);

    if (!name || !phoneNumber) {
      return res
        .status(400)
        .json({ error: "Name and phone number are required" });
    }

    const { data, error } = await supabase.from("rsvps").insert([
      {
        name,
        phone_number: phoneNumber,
        number_of_guests: numberOfGuests,
        attending_huppa_cocktail: attendingHuppaCocktail,
        attending_celebration: attendingCelebration,
        additional_information: additionalInformation || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to save RSVP" });
    }

    console.log("Inserted RSVP:", data);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Unexpected error handling RSVP:", err);
    return res.status(500).json({ error: "Failed to save RSVP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});