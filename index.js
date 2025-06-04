const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const normalize = str =>
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').trim();

const serviceCenters = [
  {
    name: "SAMTEK",
    region: "Región Metropolitana",
    address: "Nueva Tajamar 481, Torre Sur, Oficina 1601. Las Condes (265.2km)",
    products: "Notebook, Desktop PC, All-in-one PCs, Eee Pad, Eee PC, Chromebox, Eee Book, Commercial NB, ZenPad, Gaming NB, Gaming DT, GAMING HANDHELDS",
    map: "🗺️ Mapa: (imagen a ser añadida más adelante)"
  }
];

app.post('/nearest', (req, res) => {
  const rawInput = req.body.region || "";
  const regionInput = normalize(rawInput);

  console.log("🔍 Received region:", rawInput);
  console.log("🧼 Normalized region:", regionInput);

  const match = serviceCenters.find(sc => {
    const normalizedRegion = normalize(sc.region);
    console.log("🧾 Comparing with:", normalizedRegion);
    return normalizedRegion === regionInput;
  });

  if (match) {
    res.send(match); // ✅ Flattened response
  } else {
    console.log("❌ No match found for region:", regionInput);
    res.status(404).send({ error: "No service center found for that region." });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});