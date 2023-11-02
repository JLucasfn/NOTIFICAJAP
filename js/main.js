// Selecionar elementos DOM de uma só vez
const gerarPDF = document.getElementById('gerar_pdf');
const valorNumerico = document.getElementById('valor_num');
const valorNome = document.getElementById('valor_nome');
const valorSelect = document.getElementById('select_text');
const valorCheckBox = document.getElementsByName('opcao_checkbox');

// Valores DOM dos spans
const alertaValorNum = document.getElementById('alerta_valor_num');
const alertaNome = document.getElementById('alerta_nome');
const alertaSelect = document.getElementById('alerta_select');
const alertaCheckbox = document.getElementById('alerta_checkbox');

// Váriaveis para receber links de requisições
const reqGerarPdf = 'http://localhost:4000/gerar-pdf';
const reqCheckBox = 'http://localhost:4000/set-checkbox-value';

// Armazenar os valores selecionados no checkbox
function obterOpcaoCheckBox(){
    let listaCheckBox = [];

    for(let i=0;i < valorCheckBox.length;i++){
      if(valorCheckBox[i].checked){
        listaCheckBox.push(valorCheckBox[i].value);
    }}

    return listaCheckBox;
}

// Função para validar o formulário
function validarFormulario() {
    let formularioValido = true;
  
    // Valida o campo "Valor númerico" e verifica se o mesmo está recebendo somente valores numéricos
    if (valorNumerico.value.trim() === '' || isNaN(valorNumerico.value)) {
      formularioValido = false;
      switch (isNaN(valorNumerico.value)) {
        case false:
          alertaValorNum.textContent = 'Por favor, preencha o campo acima.';
          break;
  
        case true:
          alertaValorNum.textContent = 'Por favor, preencha o campo acima somente com valores numéricos.';
          break;
  
        default:
          console.log('Erro na condicional switch isNaN');
      }
    } else {
      alertaValorNum.textContent = '';
    }
  
    // Validar o campo "Nome"
    if (valorNome.value.trim() === '') {
      alertaNome.textContent = 'Por favor, preencha o campo acima.';
      formularioValido = false;
    } else {
      alertaNome.textContent = '';
    }
  
    // Validar o campo "Selecione a opção de texto"
    if (valorSelect.value === '') {
      alertaSelect.textContent = 'Por favor, selecione uma opção de texto.';
      formularioValido = false;
    } else {
      alertaSelect.textContent = '';
    }
  
    // Validar o campo "Checkbox" para que só envie um único valor
    if (obterOpcaoCheckBox().length > 1) {
      alertaCheckbox.textContent = 'Por favor, selecione apenas uma opção.';
      formularioValido = false;
    } else {
      alertaCheckbox.textContent = '';
    }
  
    return formularioValido;
}

// Função para gerar o PDF no cliente
function gerarPDFCliente() {
    // Validar o formulário antes de gerar o PDF
    if (!validarFormulario()) {
      return;
    }
  
    const nome = valorNome.value.trim().toUpperCase();
    const valorNum = parseInt(valorNumerico.value);
    const tipo = valorSelect.value.trim();
    let select = '';

    switch (tipo) {
        case 'opcao1':
            select = TextFunctions.opcao1();
            break;
            
        case 'opcao2':
            select = TextFunctions.opcao2();
            break;

        case 'opcao3':
            select = TextFunctions.opcao3();
            break;

        default:
            console.log('Erro na condicional switch lei.');
        }

    // Função para gerar o PDF no servidor
    function enviarDadosServer(valorNum, nome, select) {
        // Dados a serem enviados no corpo da requisição
        const data = {
            valorNum: valorNum,
            nome: nome,
            select: select,
        };

        // Configuração da requisição
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        };

        // Realiza a requisição do "gerar-pdf" para o servidor
        fetch(reqGerarPdf, options)
        .then(response => {
            if (response.ok) {
            return response.blob();
            } else {
            throw new Error('Erro ao gerar o PDF');
            }
        })
        .then(blob => {
            // Cria um objeto URL para o blob
            const url = URL.createObjectURL(blob);

            // Cria um link para iniciar o download
            const a = document.createElement('a');
            a.href = url;
            a.download = `Valor ${valorNum} - escolhido.pdf`;
            a.style.display = 'none';
            a.click();

            // Libera o objeto URL
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Erro ao gerar o PDF:', error);
        });
    }

    // Chama a função para gerar o PDF no servidor
    enviarDadosServer(valorNum, nome, select);

    // Limpar o valor dos inputs após o clique
    valorNome.value = '';
    valorNumerico.value = '';
    valorSelect.value = '';
    for (let i = 0; i < valorCheckBox.length; i++) {
    valorCheckBox[i].checked = false;
    }
}

// Função para definir o valor do checkbox no servidor
async function setCheckBoxValue(value) {
    try {
      const response = await fetch(reqCheckBox, {
        method: 'POST', // Usar o método POST para definir o valor
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkBoxValue: value }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao definir o valor do checkbox no servidor.');
      }
    } catch (error) {
      console.error('Erro ao definir o valor do checkbox no servidor:', error);
    }
  }
  
  // Função para atualizar o valor do checkbox e enviar para o servidor
  function atualizarCheckboxEEnviar() {
    let checkBoxValue = obterOpcaoCheckBox();
    setCheckBoxValue(checkBoxValue);
  }
  
  // Adicione um ouvinte de evento "change" no checkbox
  for (let i = 0; i < valorCheckBox.length; i++) {
    valorCheckBox[i].addEventListener('change', atualizarCheckboxEEnviar);
  }
  
  // Função para gerar o PDF quando o botão "Gerar PDF" é clicado
  async function gerarPDFAction() {
    try {
       await obterValorCheckbox(); // Aguarda a conclusão da função obterValorCheckbox
       gerarPDFCliente(); 
      } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    }
  }
  
  // Adicionar ouvinte para o evento "click" do botão "Gerar PDF"
  gerarPDF.addEventListener('click', gerarPDFAction);
  
  // Adicionar ouvinte para o evento "keydown" (tecla pressionada) no documento
  document.addEventListener('keydown', (event) => {
    // Verificar se a tecla pressionada é o "Enter"
    if (event.key === 'Enter') {
      // Chamar a função para gerar o PDF
      gerarPDFAction();
    }
  });
