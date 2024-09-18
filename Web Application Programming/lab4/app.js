import { create, getAll, get, remove, rename } from "./data/products.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

const db = await dbConnection();
await db.dropDatabase();

let prod1Id = undefined;
let prod2Id = undefined;
let prod3Id = undefined;

//create prod 1
try {
  const newProduct = {
    productName: "Xbox Series X",
    productDescription:
      "The Xbox Series X is Microsoft's latest gaming console, offering powerful performance and stunning graphics. With its custom AMD Zen 2 CPU and RDNA 2 GPU architecture, the Series X delivers smooth gameplay at up to 120 frames per second in 4K resolution. Its ultra-fast SSD storage reduces load times, while features like Quick Resume let you switch between multiple games seamlessly. The Xbox Series X also supports ray tracing for realistic lighting and reflections, and it's backward compatible with thousands of Xbox One, Xbox 360, and original Xbox games.",
    modelNumber: "XBX-00001",
    price: 499.99,
    manufacturer: "Microsoft",
    manufacturerWebsite: "http://www.xboxs.com",
    keywords: ["Gaming", "Xbox", "Console", "Video Games", "Microsoft"],
    categories: ["Electronics", "Gaming Consoles", "Video Game Consoles"],
    dateReleased: "11/10/2020",
    discontinued: false,
  };
  const prod1 = await create(...Object.values(newProduct));
  prod1Id = prod1._id;
} catch (e) {
  console.log(e);
}

//log prod1
try {
  const prod1 = await get(prod1Id.toString());
  console.log(prod1);
} catch (e) {
  console.log(e);
}

//create prod2

try {
  const newProduct = {
    productName: "Nintendo Wii",
    productDescription:
      "The Nintendo Wii revolutionized gaming with its innovative motion controls and family-friendly games. With its unique Wii Remote controller, players can swing, point, and gesture to interact with games in new ways. The Wii offers a wide range of games for players of all ages, from classic Nintendo franchises like Mario and Zelda to fitness and party games. Its compact design and affordable price make it a popular choice for families and casual gamers.",
    modelNumber: "RVL-001",
    price: 199.99,
    manufacturer: "Nintendo",
    manufacturerWebsite: "http://www.nintendo.com",
    keywords: ["Gaming", "Nintendo", "Console", "Family", "Motion Controls"],
    categories: ["Electronics", "Gaming Consoles", "Video Game Consoles"],
    dateReleased: "11/19/2006",
    discontinued: true,
  };
  const prod2 = await create(...Object.values(newProduct));
  prod2Id = prod2._id;
} catch (e) {
  console.log(e);
}

//log all products

try {
  const allProd = await getAll();
  console.log(allProd);
} catch (e) {
  console.log(e);
}

//create product3
try {
  const newProduct = {
    productName: "PlayStation Portable",
    productDescription:
      "The PlayStation Portable (PSP) is a handheld gaming console developed by Sony. It features a vibrant LCD screen, powerful graphics capabilities, and a library of exciting games. With its compact design and portability, the PSP allows gamers to enjoy their favorite games on the go. It also supports multimedia features such as music, videos, and photos, making it a versatile entertainment device.",
    modelNumber: "PSP-3000",
    price: 149.99,
    manufacturer: "Sony",
    manufacturerWebsite: "http://www.playstation.com",
    keywords: [
      "Gaming",
      "PlayStation",
      "Portable",
      "Handheld",
      "Entertainment",
    ],
    categories: ["Electronics", "Gaming Consoles", "Handheld Consoles"],
    dateReleased: "10/01/2008",
    discontinued: true,
  };
  const prod3 = await create(...Object.values(newProduct));
  prod3Id = prod3._id;
} catch (e) {
  console.log(e);
}

//log prod3
try {
  const prod3 = await get(prod3Id.toString());
  console.log(prod3);
} catch (e) {
  console.log(e);
}

//change prod1 name

try {
  let id = prod1Id.toString();
  const newProdName = await rename(id, "Xbox Newest Generation");
} catch (e) {
  console.log(e);
}

//log prod 1 with new name
try {
  const prod1 = await get(prod1Id.toString());
  console.log(prod1);
} catch (e) {
  console.log(e);
}

//remove prod 2

try {
  let id = prod2Id.toString();
  const removeProd = await remove(id);
  console.log(removeProd);
} catch (e) {
  console.log(e);
}

//query all products

try {
  const allProd = await getAll();
  console.log(allProd);
} catch (e) {
  console.log(e);
}

/////errors///////

///create new prod w bad params to throw error
try {
  const newProduct = {
    productName: "     ",
    productDescription:
      "The Xbox Series X is Microsoft's latest gaming console, offering powerful performance and stunning graphics. With its custom AMD Zen 2 CPU and RDNA 2 GPU architecture, the Series X delivers smooth gameplay at up to 120 frames per second in 4K resolution. Its ultra-fast SSD storage reduces load times, while features like Quick Resume let you switch between multiple games seamlessly. The Xbox Series X also supports ray tracing for realistic lighting and reflections, and it's backward compatible with thousands of Xbox One, Xbox 360, and original Xbox games.",
    modelNumber: "XBX-00001",
    price: 499.99,
    manufacturer: "Microsoft",
    manufacturerWebsite: "http://www.xboxs.com",
    keywords: ["Gaming", "Xbox", "Console", "Video Games", "Microsoft"],
    categories: ["Electronics", "Gaming Consoles", "Video Game Consoles"],
    dateReleased: "11/10/2020",
    discontinued: false,
  };
  const prod1 = await create(...Object.values(newProduct));
  prod1Id = prod1._id;
  console.log(prod1);
} catch (e) {
  console.log(`Invalid Product Creation Failed Successfully: ${e}`);
}

//create new prod w bad params to throw error

try {
  const newProduct = {
    productName: "Newest console",
    productDescription:
      "The Xbox Series X is Microsoft's latest gaming console, offering powerful performance and stunning graphics. With its custom AMD Zen 2 CPU and RDNA 2 GPU architecture, the Series X delivers smooth gameplay at up to 120 frames per second in 4K resolution. Its ultra-fast SSD storage reduces load times, while features like Quick Resume let you switch between multiple games seamlessly. The Xbox Series X also supports ray tracing for realistic lighting and reflections, and it's backward compatible with thousands of Xbox One, Xbox 360, and original Xbox games.",
    modelNumber: "XBX-00001",
    price: 499.999,
    manufacturer: "Microsoft",
    manufacturerWebsite: "http://www.xboxs.com",
    keywords: ["Gaming", "Xbox", "Console", "Video Games", "Microsoft"],
    categories: ["Electronics", "Gaming Consoles", "Video Game Consoles"],
    dateReleased: "11/10/2020",
    discontinued: false,
  };
  const prod1 = await create(...Object.values(newProduct));
  prod1Id = prod1._id;
  console.log(prod1);
} catch (e) {
  console.log(`Invalid Product Creation Failed Successfully: ${e}`);
}

// remove invalid product to throw error

try {
  let id = "65f69e1cd72aec808354a789";
  const removeProd = await remove(id);
} catch (e) {
  console.log(`Invalid Product Removal Failed Successfully: ${e}`);
}

//rename with invalid id

try {
  let id = "65f69e1cd72aec808354n789";
  const renameProd = await rename(id, "This is going to fail");
} catch (e) {
  console.log(`Invalid Product Renaming Failed Successfully: ${e}`);
}

//rename with invalid name

try {
  let id = prod1Id;
  const renameProd = await rename(id, "      ");
} catch (e) {
  console.log(`Invalid Product Renaming Failed Successfully: ${e}`);
}

//try for invalid id get

try {
  let id = "65f69e1cd72aec808354n789";
  const find = await get(id);
} catch (e) {
  console.log(`Invalid Product Getting Failed Successfully: ${e}`);
}

await closeConnection();
