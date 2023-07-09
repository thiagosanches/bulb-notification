const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json())

app.post('/blink', async function (req, res) {
    const { RGB } = req.body;
    console.log(req.body);
    const arrayRGB = RGB.split(",");

    await axios.post("http://192.168.0.206/json", { on: false });
    await new Promise(resolve => setTimeout(resolve, 200));

    await axios.post("http://192.168.0.206/json", {
        seg: [{ col: [arrayRGB], fx: 2, sx: 255, ix: 100 }]
    });
    await new Promise(resolve => setTimeout(resolve, 200));

    await axios.post("http://192.168.0.206/json", { on: true, bri: 255 });
    await new Promise(resolve => setTimeout(resolve, 200));
    await axios.post("http://192.168.0.206/json", { on: false });

    res.end('Message has been sent!');
});

app.listen(3003);
