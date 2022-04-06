var express = require("express");
var path = require('path');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

app.get("/getdata", (req, res, next) => {
    let data = [
        {
            title: "dhl",
            correct: "/dhl/dhl-clean.png",
            fake: "/dhl/dhl-phish.png"
        },
        {
            title: "dropbox",
            correct: "/dropbox/dropbox-clean.png",
            fake: "/dropbox/dropbox-phish.png"
        },
        {
            title: "instagram",
            correct: "/instagram/instagram-clean.png",
            fake: "/instagram/instagram-phish.png"
        },
        {
            title: "linkedin",
            correct: "/linkedin/linkedin-clean.png",
            fake: "/linkedin/linkedin-phish.png"
        },
        {
            title: "match",
            correct: "/match/match-clean.png",
            fake: "/match/match-phish.png"
        },
        {
            title: "microsoft",
            correct: "/microsoft/microsoft-clean.png",
            fake: "/microsoft/microsoft-phish.png"
        },
        {
            title: "netflix",
            correct: "/netflix/netflix-clean.png",
            fake: "/netflix/netflix-phish.png"
        },
        {
            title: "paypal",
            correct: "/paypal/paypal-clean.png",
            fake: "/paypal/paypal-phish.png"
        },
        {
            title: "uber",
            correct: "/uber/uber-clean.png",
            fake: "/uber/uber-phish.png"
        },
        {
            title: "wellsfargo",
            correct: "/wellsfargo/wellsfargo-clean.png",
            fake: "/wellsfargo/wellsfargo-phish.png"
        }
    ];
    const suffleData = data.sort((a, b) => 0.5 - Math.random());
    res.json(suffleData);
});


app.get("/signin", (req, res, next) => {
    
});

app.get("/signup", (req, res, next) => {
    
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});