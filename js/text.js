// Váriavel global para ser acessada em multiplas funções
let receberCheck = '';

// Função para obter o valor do checkbox
async function obterValorCheckbox() {
    
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/checkbox-value')
        .then((response) => response.json())
        .then((data) => {
          console.log('Resposta do servidor recebida:', data);
          const checkBoxValue = data.checkBoxValue;
          receberCheck = checkBoxValue;
          resolve(checkBoxValue); // Resolva a Promessa com o valor do checkbox
        })
        .catch((error) => {
          console.error('Erro ao obter o valor do checkbox:', error);
          reject(error); // Rejeite a Promessa em caso de erro
        });
    });
}

// Função para formatação a partir dos valores da váriavel receberCheck 
function checkFunction(){
    let stringCheck = receberCheck[0] || receberCheck;
    
    let valor = '';

    switch(stringCheck) {
        case 'VALOR 1':
            valor = '.\nCaso tenha selecionado "VALOR 1", está visualizando corretamente este texto.';
            return valor;
        
        case 'VALOR 2':
            valor = '.\nCaso tenha selecionado "VALOR 2", está visualizando corretamente este texto.';
            return valor;

        case 'VALOR 3':
            valor = '.\nCaso tenha selecionado "VALOR 3", está visualizando corretamente este texto.';
            return valor;

        case 'VALOR 4':
            valor = '.\nCaso tenha selecionado "VALOR 4", está visualizando corretamente este texto.';
            return valor;
        
        case '':
            valor = '.\nCaso não tenha selecionado nenhum valor, está visualizando corretamente este texto.';
            return valor;

        default:
            console.log('Erro na condicional switch Checkbox.');
    }

}

//Funções contendo os textos das opções
class TextFunctions {
    
    static opcao1() {
        const text = `Este é o texto da opção 1, e somente pode ser visualizado caso tenha sido a sua opção escolhida${checkFunction()}`;
        return text;
    }

    static opcao2() {
        const text = `Este é o texto da opção 2, e somente pode ser visualizado caso tenha sido a sua opção escolhida${checkFunction()}`;
        return text;
    }
    
    static opcao3() {
        const text = `Este é o texto da opção 3, e somente pode ser visualizado caso tenha sido a sua opção escolhida${checkFunction()}`;
        return text;
    }
}
