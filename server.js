/*
 * AUTHOR mansouri youssef
 */

const express = require("express");
const app = express();
let fs = require("fs"),
  PDFParser = require("pdf2json"),
  js2xmlparser = require("js2xmlparser");
const obj = require("./sample.json" ? "./sample.json" : "");

app.get("/", (req, res) => {
  res.send("<h1>welcome to converter pdf to json</h1>");
});
/* route pdf to json */
app.get("/pdf-to-json", (req, res) => {
  let pdfParser = new PDFParser();

  pdfParser.on("pdfParser_dataError", (errData) =>
    console.error(errData.parserError)
  );
  pdfParser.on("pdfParser_dataReady", (pdfData) => {
    fs.writeFile("./sample.json", JSON.stringify(pdfData), () => {
      console.log("Done.");
    });
  });

  pdfParser.loadPDF("./sample.pdf");
  res.send("verif DISK please operation finished");
});

/* route json to xml */
app.get("/json-to-xml", (req, res) => {
  const data = js2xmlparser.parse("data", obj);
  fs.writeFile("./sample.xml", data, () => {
    console.log("Done.");
  });
  res.send("verif DISK please operation finished");
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
