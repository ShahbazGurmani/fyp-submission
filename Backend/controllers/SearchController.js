import Salon from "../models/createSalonModel.js";

export const search = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    // Perform a case-insensitive search across salon fields, services, and stylists
    const results = await Salon.find({
      $or: [
        // Match salon name
        { name: { $regex: query, $options: "i" } },
        
        // Match location
        { location: { $regex: query, $options: "i" } },

        // Match service type name
        { "services.type": { $regex: query, $options: "i" } },

        // Match service option name
        { "services.options.name": { $regex: query, $options: "i" } },

        // Match stylist name
        { "stylists.name": { $regex: query, $options: "i" } },
      ],
    });

    // Return the found results
    res.json(results);
  } catch (error) {
    console.error("Error searching for salons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

