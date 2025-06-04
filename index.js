const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Normalization function: removes accents, trims spaces, lowercase
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
  const regionInput = normalize(req.body.region || "");

  const match = serviceCenters.find(sc =>
    normalize(sc.region) === regionInput
  );

  if (match) {
    res.send({ center: match });
  } else {
    res.status(404).send({ error: "No service center found for that region." });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});