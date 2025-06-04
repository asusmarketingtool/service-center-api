const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const serviceCenters = [
  {
    name: "SAMTEK",
    region: "Región Metropolitana",
    comuna: "Las Condes",
    address: "Nueva Tajamar 481, Torre Sur, Oficina 1601. Las Condes (265.2km)",
    products: "Notebook, Desktop PC, All-in-one PCs, Eee Pad, Eee PC, Chromebox, Eee Book, Commercial NB, ZenPad, Gaming NB, Gaming DT, GAMING HANDHELDS",
    map: "🗺️ Mapa: (imagen a ser añadida más adelante)" // Placeholder
  }
];

app.post('/nearest', (req, res) => {
  const comuna = req.body.comuna?.toLowerCase();

  if (!comuna) {
    return res.status(400).send({ error: "Comuna is required." });
  }

  const match = serviceCenters.find(sc => sc.comuna.toLowerCase() === comuna);

  if (match) {
    res.send({ center: match });
  } else {
    res.status(404).send({ error: "No service center found for that comuna." });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});