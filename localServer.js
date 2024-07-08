const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 4000; // Local proxy server port
const vmServerUrl = "http://34.23.212.219:3000"; // URL of the VM server

app.use(cors());
app.use(bodyParser.json());

// Proxy endpoint for /detect
app.post("/detect", async (req, res) => {
  try {
    console.log("detecting...");
    // console.log("req.body = ", req.body);
    const response = await axios.post(`${vmServerUrl}/detect`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("detecting response = ", response);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error communicating with VM server" });
  }
});

// Proxy endpoint for /cluster
app.post("/cluster", async (req, res) => {
  try {
    const response = await axios.post(`${vmServerUrl}/cluster`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error communicating with VM server" });
  }
});

// Proxy endpoint for /abstract
app.post("/abstract", async (req, res) => {
  try {
    const response = await axios.post(`${vmServerUrl}/abstract`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error communicating with VM server" });
  }
});

app.get("/openaiapikey", async (req, res) => {
  try {
    const response = await axios.get(`${vmServerUrl}/openaiapikey`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error communicating with VM server" });
  }
});

app.get("/", async (req, res) => {
  try {
    console.log("GET 4000");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error communicating with VM server" });
  }
});

app.listen(port, () => {
  console.log(`Local proxy server running at http://localhost:${port}`);
});
