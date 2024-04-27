//import axios, md5
import axios from "axios";
import md5 from "blueimp-md5"; //you will need to install this module;
const publickey = "5e41a2237f64b7b47e524864d6985171";
const privatekey = "0faa422b4bf4c4fc89aad1926c3b0cf9e5428420";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param

  name = name.trim();

  const url =
    baseUrl +
    "?nameStartsWith=" +
    name +
    "&ts=" +
    ts +
    "&apikey=" +
    publickey +
    "&hash=" +
    hash +
    "&limit=15";

  const { data } = await axios.get(url);

  if (Object.keys(data).length < 1) {
    throw "Encountered a server error";
  }

  if (data.code !== 200 || data.status !== "Ok") {
    throw `Error ${data.code}: ${data.status}`;
  }

  const res = data.data.results;

  if (res.length < 1) {
    throw "No results found";
  }

  const chars = res.map((character) => ({
    id: character.id,
    name: character.name,
  }));

  return chars;
};

export const searchCharacterById = async (id) => {
  id = id.trim();

  const url =
    baseUrl + "/" + id + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash; //lookover with prof

  const { data } = await axios.get(url);

  if (Object.keys(data).length < 1) {
    throw "Encountered a server error";
  }

  if (data.code !== 200 || data.status !== "Ok") {
    throw `Error ${data.code}: ${data.status}`;
  }

  let res = data.data.results;

  if (res.length < 1) {
    throw "No results found";
  }

  res = res.map((item) => ({
    name: item.name,
    thumbnail: item.thumbnail.path,
    description: item.description,
    comics: item.comics.items,
  }));

  return res;
};
