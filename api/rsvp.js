import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      phoneNumber,
      numberOfGuests,
      attendingHuppaCocktail,
      attendingCelebration,
    } = req.body;

    if (!name || !phoneNumber) {
      return res
        .status(400)
        .json({ error: "Name and phone number are required" });
    }

    // normalize "yes"/"no" → "Yes"/"No" to match Notion select option names
    const normalizeYesNo = (val) => {
      if (!val) return undefined;
      const lower = String(val).toLowerCase();
      if (lower === "yes") return "Yes";
      if (lower === "no") return "No";
      return undefined; // if something unexpected comes in
    };

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [
            {
              text: { content: name },
            },
          ],
        },
        "Phone Number": {
          phone_number: phoneNumber,
        },
        "Number of Guests": {
          number:
            typeof numberOfGuests === "number"
              ? numberOfGuests
              : Number(numberOfGuests || 0),
        },
        "Attending Huppa & Cocktail": normalizeYesNo(attendingHuppaCocktail)
          ? {
              select: { name: normalizeYesNo(attendingHuppaCocktail) },
            }
          : undefined,
        "Attending Celebration": normalizeYesNo(attendingCelebration)
          ? {
              select: { name: normalizeYesNo(attendingCelebration) },
            }
          : undefined,
      },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error saving RSVP:", err);
    return res.status(500).json({ error: "Failed to save RSVP" });
  }
}