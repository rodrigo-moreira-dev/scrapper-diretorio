# scrapper-diretorio
Realiza scrapping do diretorio e dá histograma, quantidade, média e mediana dos arquivos executáveis
Foi utilizado express e as libs:
File-system ("fs") -> Nativo Node.js
Compute Histogram ("compute-histogram") -> Monta histograma
Simple Statistics ("simple-statistics") -> Só utilizado para média e mediana, poderia utilizar Math nativa do js
ASCII Histogram ("ascii-histogram") -> Monta histograma visual

Instruções
1. abra prompt comando
2. mkdir <nomeDiretorio>
3. cd nomeDiretorio
4. code . (abre vscode, mas pode usar qualquer editor)
5. abra terminal
6. puxa repositório
7. instala dependências (npm install)
8. npm start (inicia servidor, rodar código dentro da pasta myApp)
9. faz requisição POST em http://localhost:8001

No arquivo scrapper-diretorio/myapp/routes/index.js,
Escolheu-se na linha 62 o diretório `C:\\Windows\\System32`,
A função setNewBiggestSize dá tamanho do maior executável,
A função giveBlockSize dá tamanho da palavra,
A função getHistogramObject monta objeto a ser utilizado pela lib 'ascii-histogram' para construir histograma visual

Output exemplo:

     0KB - 33KB | ======================================== | 122
    33KB - 67KB | ======================================   | 116
   67KB - 100KB | ==============================           | 90
  100KB - 134KB | ===============                          | 46
  134KB - 167KB | ==========                               | 31
  167KB - 201KB | =====                                    | 16
  201KB - 234KB | ====                                     | 12
  234KB - 268KB | =====                                    | 16
  268KB - 301KB | ====                                     | 11
  301KB - 335KB | ====                                     | 11
  335KB - 368KB | =                                        | 2
  368KB - 402KB | ==                                       | 5
  402KB - 435KB | =                                        | 4
  435KB - 469KB | ===                                      | 8
  469KB - 502KB | ==                                       | 5
  502KB - 536KB | ===                                      | 8
  536KB - 569KB | =                                        | 3
  569KB - 603KB | =                                        | 2
  603KB - 637KB | ==                                       | 5
  637KB - 670KB | ==                                       | 5
  670KB - 704KB | =                                        | 3
  704KB - 737KB | =                                        | 4
  737KB - 771KB |                                          | 1
  771KB - 804KB | =                                        | 3
  804KB - 838KB | =                                        | 4
  838KB - 871KB | =                                        | 3
  871KB - 905KB | =                                        | 4
  905KB - 938KB | =                                        | 3
  938KB - 972KB | ==                                       | 6

Quantidade arquivos diretório: 548
Média tamanho arquivos: 167KB
Mediana tamanho arquivos: 82KB
Maior tamanho de arquivo: 972KB
Tamanho bloco: 256KB

Arquivos (amostra):
Nome: nmscrub.exe Tamanho: 151352
Nome: notepad.exe Tamanho: 201216
Nome: nslookup.exe Tamanho: 89600
Nome: ntoskrnl.exe Tamanho: 10849104
Nome: ntprint.exe Tamanho: 64000
Nome: nvdebugdump.exe Tamanho: 456848
Nome: nvidia-smi.exe Tamanho: 712640
Nome: nvspinfo.exe Tamanho: 292688
Nome: odbcad32.exe Tamanho: 74240
Nome: odbcconf.exe Tamanho: 27136
Nome: ofdeploy.exe Tamanho: 79872
Nome: omadmclient.exe Tamanho: 432128
Nome: omadmprc.exe Tamanho: 89600
Nome: openfiles.exe Tamanho: 75776
Nome: OpenWith.exe Tamanho: 123984
