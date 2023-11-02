const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { criarPDF } = require(path.join(__dirname, '..', 'js', 'gerarPdf', 'pdf.js'));
let checkBoxValue = '';

app.use(express.json());

// Configurar cabeçalhos para permitir solicitações de qualquer origem (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rota para gerar PDF
app.post('/gerar-pdf', (req, res) => {
  try {
    const data = req.body;
    const valorNum = data.valorNum;
    const nome = data.nome;
    const select = data.select;

    criarPDF(valorNum, nome, select, (_err, filePath) => {
      try {
        fs.readFile(filePath, (_err, data) => {
          try {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=Valor ${valorNum} - escolhido.pdf`);
            res.status(200).end(data);
          } catch (err) {
            res.status(500).send('Erro ao ler o arquivo PDF');
          } 
        });
      } catch (err) {
        res.status(500).send('Erro ao gerar o arquivo PDF');
      } 
    });
  } catch (error) {
    res.status(400).send('Erro ao processar os dados enviados.');
  }
});

app.post('/set-checkbox-value', async (req, res) => {
  try {
    const data = req.body;
    checkBoxValue = data.checkBoxValue;

    res.status(200).send('Valor do checkbox definido com sucesso.');
  } catch (error) {
    res.status(400).send('Erro ao definir o valor do checkbox.');
  }
});

// Receber o valor do checkbox informado pelo cliente
app.get('/checkbox-value', (req, res) => {
  try {
    if (checkBoxValue == ''){
      console.log('\nNão houve envio de valores ao servidor.');
    } else {
      console.log('\nO valor enviado pelo servidor foi: ' + checkBoxValue + '.');
    }
    
    res.status(200).json({ checkBoxValue });
    checkBoxValue = '';
  } catch (error) {
    res.status(400).send('Erro ao processar os dados enviados.');
  }
});

// Rota para servir o arquivo text.js
app.get('/text.js', (req, res) => {
  const filePath = path.join(__dirname, '..', 'js', 'text.js');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    } else {
      res.setHeader('Content-Type', 'text/javascript');
      res.status(200).end(data);
    }
  });
});

// Define a porta em que o servidor irá escutar
const port = 4000;

// Inicia o servidor e aguarda por conexões
app.listen(port, () => {
  console.log(`Servidor operando em http://localhost:${port}\nNão feche esta aba.`);
});
