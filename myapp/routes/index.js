var express = require("express");
var router = express.Router();
let fs = require("fs");
let ch = require("compute-histogram");
let ss = require("simple-statistics");
let histogram = require("ascii-histogram");

// Função monta objeto a ser utilizado pela lib 'ascii-histogram'
function getHistogramObject(array) {
  let histogramObject = {};
  // binSize é o valor dos intervalos do histograma
  let binSize = biggestArchiveSize / array.length;
  // primeiro intervalo começa em 0
  let currentBin = 0;
  array.forEach((pair) => {
    histogramObject[
      `${Math.trunc(currentBin / 1024)}KB - ${Math.trunc(
        (currentBin + binSize) / 1024
      )}KB`
    ] = pair[1];
    // adiciona valor binSize para gerar próximo intervalo
    currentBin += binSize;
  });

  // conserta erro visual da lib
  Object.keys(histogramObject).forEach((key) => {
    if (histogramObject[key] === 0) {
      histogramObject[key] = 1;
    }
  });
  return histogramObject;
}

// Função dá tamanho da palavra
function giveBlockSize(directoryFiles) {
  let media = ss.mean(directoryFiles);
  let tamanhoBloco = 2;
  while (tamanhoBloco <= media) {
    tamanhoBloco *= 2;
  }
  return tamanhoBloco;
}

var biggestArchiveSize = 0;

// Função dá tamanho do maior executável
function setNewBiggestSize(number) {
  if (number > biggestArchiveSize) {
    biggestArchiveSize = number;
  }
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", async (req, res, next) => {
  // define tamanho máximo (um arquivo muito grande bagunça e inutiliza histograma)
  let maxFileSize = 1000000;
  // diretório escolhido
  let directory = `C:\\Windows\\System32`;
  fs.readdir(directory, (err, files) => {
    if (err) console.log(err);
    else {
      let directoryFiles = [];
      console.log(`\nArquivos executáveis contidos no diretório ${directory}:`);
      // Laço percorre arquivos diretório
      files.forEach((file) => {
        // considerando somente arquivos executáveis
        if (file.includes(`.exe`)) {
          var stats = fs.statSync(`${directory}\\${file}`);
          // restrição tamanho máximo (um arquivo muito grande bagunça e inutiliza histograma)
          if (stats.size < maxFileSize) {
            directoryFiles.push(stats.size);
            setNewBiggestSize(stats.size);
          }
          console.log(`Nome:`, file, `Tamanho:`, stats.size);
        }
      });
      let histogramResult = ch(directoryFiles);
      console.log("\n\n");
      console.log(
        histogram(getHistogramObject(histogramResult), {
          bar: "=",
          width: 40,
        })
      );
      console.log(
        "Quantidade arquivos diretório:",
        `${directoryFiles.length}\n`,
        "Média tamanho arquivos:",
        `${Math.trunc(ss.mean(directoryFiles) / 1024)}KB\n`,
        "Mediana tamanho arquivos:",
        `${Math.trunc(ss.median(directoryFiles) / 1024)}KB\n`,
        "Maior tamanho de arquivo:",
        `${Math.trunc(biggestArchiveSize / 1024)}KB\n`,
        "Tamanho bloco:",
        `${Math.trunc(giveBlockSize(directoryFiles) / 1024)}KB\n`
      );
    }
  });

  res.status(200).send(`scrap realizado`);
});

module.exports = router;
