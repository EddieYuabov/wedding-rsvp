const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

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
};