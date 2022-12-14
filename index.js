const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

const apiKey = process.env.API_KEY;

app.get("/comics", async (req, res) => {
  // limit | between 1 and 100
  // skip | number of results to ignore
  // title | search a comic by title
  const limit = req.query.limit || 100;
  const skip = req.query.skip || 0;
  const title = req.query.title || "";

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&limit=${limit}&skip=${skip}&title=${title}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/comics/:characterId", async (req, res) => {
  // characterId characters mongoDB id PARAMS
  const { characterId } = req.params;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/characters", async (req, res) => {
  // limit | between 1 and 100
  // skip | number of results to ignore
  // name | search a comic by name
  const limit = req.query.limit || 100;
  const skip = req.query.skip || 0;
  const name = req.query.name || "";

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&limit=${limit}&skip=${skip}&name=${name}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/character/:characterId", async (req, res) => {
  // characterId characters mongoDB id PARAMS
  const { characterId } = req.params;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${apiKey}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.listen(process.env.PORT || 4000, (req, res) => {
  console.log("Server up");
});
