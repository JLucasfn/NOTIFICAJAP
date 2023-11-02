const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function criarPDF(valorNum, nome, select, callback) {
  const dataAtual = new Date();
  const options = { month: 'long', year: 'numeric', day: 'numeric' };
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);

  //Para o modelo A4 usamos esse tamanho
  const doc = new PDFDocument({
    size: [595.28, 841.89],
  });

  //Define o caminho e o nome do arquivo de saída para o PDF
  const filePath = path.join(__dirname, '..', 'notificacoes', `Valor ${valorNum} - escolhido.pdf`);
  
  //Cria um fluxo de gravação para o arquivo PDF
  const outputStream = fs.createWriteStream(filePath);

  //Conecta o fluxo de gravação ao documento PDF
  doc.pipe(outputStream);

  //Define o caminho para a imagem do cabeçalho
  const imageCab = path.join(__dirname, '..', '..', 'img', 'cabecalho.jpg');
  //Insere a imagem da cabeçalho no documento PDF
  doc.image(imageCab, {
    fit: [595, doc.page.width],
    align: 'center',
    valign: 'top',
    x: 15,
    y: 0
  });

  //Define o caminho para a imagem da assinatura
  const imageAss = path.join(__dirname, '..', '..', 'img', 'assinatura.jpg');
  //Insere a imagem da assinatura no documento PDF
  doc.image(imageAss, {
    fit: [300, doc.page.width],
    align: 'center',
    valign: 'center',
    x: 150,
    y: 100
  });

  //Define o caminho para a imagem do rodapé
  const imageRod = path.join(__dirname, '..', '..', 'img', 'rodape.jpg');
  //Insere a imagem do rodapé no documento PDF
  doc.image(imageRod, {
    fit: [595, doc.page.width],
    align: 'center',
    valign: 'bottom',
    x: 30,
    y: 250
  });

  //Carregar a fonte Calibri (primeira é a fonte normal e a segunda é com negrito)
  doc.registerFont('Calibri', path.join(__dirname, '..', '..', 'fonts', 'Calibri.ttf'));
  doc.registerFont('CALIBRIB', path.join(__dirname, '..', '..', 'fonts', 'CALIBRIB.TTF'));
  doc.font('CALIBRIB').fontSize(12);
  
  //Texto padrão para o modelo
  doc.text('\nNOTIFICAÇÃO GENÉRICA', {
    align: 'center'
  });

  //Texto onde ficará as informações do formulário
  doc.text(`
    \n\nVALOR NÚMERICO: ${valorNum}
    \nNOME: ${nome}`);

  //Início do parágrafo onde receberá o modelo do texto  
  doc.font('Calibri').fontSize(11);
  doc.text(`\nPrezado(a) Senhor(a),`);

  doc.text(`De acordo com o formulário preenchido, a opção solicitada foi: ${select}`, {
    align: 'justify',
    indent: 30
  });

  doc.text(`\nFortaleza, ${dataFormatada}.`, {
    align: 'right'
  });

  doc.text(`\n\nAtenciosamente,`)
  
  //Finaliza o documento PDF e conclui a solicitação HTTP no servidor
  doc.end();

  //Callback para retornar o caminho do arquivo PDF gerado
  outputStream.on('finish', () => {
    callback(null, filePath);
  });
}

//Exporta a função criarPDF para ser acessada no código do servidor
module.exports = { criarPDF };
