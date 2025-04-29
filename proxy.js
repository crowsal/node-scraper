const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/scraper', async (req, res) => {
  const horseName = req.query.q;
  if (!horseName) return res.status(400).json({ error: 'At ismi gerekli.' });

  try {
    const response = await fetch('https://www.yenibeygir.com/arama?q=' + encodeURIComponent(horseName), {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();
    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: 'Veri çekilemedi: ' + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy sunucusu ${PORT} portunda çalışıyor`));
