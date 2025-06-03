const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const serviceCenters = [
  {
    name: "SAMTEK",
    city: "chile",
    address: "Nueva Tajamar 481, Torre Sur, Oficina 1601. Las Condes (265.2km)",
    products: "Notebook, Desktop PC, All-in-one PCs, Eee Pad, Eee"
  }
];

app.post('/nearest', (req, res) => {
  const city = req.body.city;
  if (!city) {
    return res.status(400).send({ error: "Please send a city name" });
  }

  const found = serviceCenters.find(sc => sc.city.toLowerCase() === city.toLowerCase());

  if (found) {
    res.send({ nearest: found });
  } else {
    res.status(404).send({ error: "No service center found for that city" });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
