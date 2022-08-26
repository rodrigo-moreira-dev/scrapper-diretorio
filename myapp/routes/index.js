var express = require("express");
var router = express.Router();
let fs = require("fs");
let ch = require("compute-histogram");
let ss = require("simple-statistics");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", async (req, res, next) => {
  let directory = `C:\\Windows\\System32`;
  fs.readdir(directory, (err, files) => {
    if (err) console.log(err);
    else {
      let directoryFiles = [];
      console.log(`\nArquivos executáveis contidos no diretório ${directory}:`);
      files.forEach((file) => {
        if (file.includes(`.exe`)) {
          var stats = fs.statSync(`${directory}\\${file}`);
          if (stats.size < 1000000) {
            directoryFiles.push(stats.size);
          }
          console.log(`Nome:`, file, `Tamanho:`, stats.size);
        }
      });
      let histogramResult = ch(directoryFiles);
      console.log("Histograma:", histogramResult);
      console.log(
        "Tamanho:",
        directoryFiles.length,
        "Média:",
        ss.mean(directoryFiles),
        "Mediana:",
        ss.median(directoryFiles)
      );
    }
  });

  res.status(200).send(`scrap realizado`);
});

module.exports = router;
