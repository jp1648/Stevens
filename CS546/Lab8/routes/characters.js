//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import { Router } from "express";
const router = Router();
import {
  searchCharacterByName,
  searchCharacterById,
} from "../data/characters.js";

router.route("/").get(async (req, res) => {
  const title = "Marvel Character Finder";
  res.render("home", { pageTitle: title, pageTitle: title });
});

router.route("/searchmarvelcharacters").post(async (req, res) => {
  const charName = req.body.searchCharacterByName;

  if (!charName) {
    return res.status(400).render("error", {
      body: "Error: The search content cannot be empty. Please try again.",
    });
  }
  if (charName.trim() === "") {
    return res.status(400).render("error", {
      body: "Error: The search content cannot be empty. Please try again.",
    });
  }

  try {
    const searchRes = await searchCharacterByName(charName);
    res.render("characterSearchResults", {
      pageTitle: "Marvel Characters Found",
      searchTerm: charName,
      searchRes: searchRes,
    });
  } catch (error) {
    if (typeof error === "string" && error === "Encountered a server error") {
      return res.status(500).render("error", { body: error });
    } else if (typeof error === "string" && error.startsWith("Error")) {
      return res.status(400).render("error", { body: error });
    } else if (typeof error === "string" && error === "No results found") {
      return res.status(404).render("characterSearchResults", {
        paragraphContent: "We're sorry, but no results were found for",
        searchTerm: charName,
      });
    } else {
      return res.status(400).render("error", { body: "Unknown error occured" });
    }
  }
});

router.route("/marvelcharacter/:id").get(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).render("error", {
      body: "Error: The ID content cannot be empty. Please try again.",
    });
  } //will result in 404 error anyway

  if (parseInt(id) != id) {
    return res
      .status(400)
      .render("error", { body: "ID must be string representation of int" });
  }

  if (id.trim() === "") {
    return res.status(400).render("error", {
      body: "Error: The ID content cannot be empty. Please try again.",
    });
  } // will result in 404 error anyway

  try {
    const searchRes = await searchCharacterById(id);
    const { name, thumbnail, description, comics } = searchRes[0];
    res.render("characterById", {
      pageTitle: name,
      image: thumbnail + "/portrait_uncanny.jpg",
      description: description,
      comics: comics,
    });
  } catch (error) {
    if (
      error.response.data.code === 404 ||
      error.response.data.status === "We couldn't find that character"
    ) {
      return res.status(404).render("error", {
        body: `${error.response.data.code}:${error.response.data.status}`,
      });
    } else if (
      typeof error === "string" &&
      error === "Encountered a server error"
    ) {
      return res.status(500).render("error", { body: error });
    } else if (typeof error === "string" && error.startsWith("Error")) {
      return res.status(400).render("error", { body: error });
    } else if (typeof error === "string" && error === "No results found") {
      return res.status(404).render("error", {
        body: error,
      });
    } else {
      return res.status(400).render("error", { body: "Unknown error occured" });
    }
  }
});

export default router;
// need name, thumbnail.path, description, comics
