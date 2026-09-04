// ======================================
// DETECTA SE O FOCO VEIO DA TECLA TAB
// ======================================

let tabPressionado = false;

document.addEventListener("keydown", function (event) {

    if (event.key === "Tab") {
        tabPressionado = true;
    }

});


// ======================================
// FALA O ELEMENTO FOCADO
// ======================================

document.addEventListener("focusin", function (event) {

    if (!tabPressionado) return;

    tabPressionado = false;

    speechSynthesis.cancel();

    const elemento = event.target;
    const tabIndexAtual = elemento.tabIndex;

    let texto = "";

    switch (elemento.tagName) {

        case "H1":
        case "H2":
        case "H3":
            texto = "Título. " + elemento.innerText;
            break;

        case "P":
            texto = "Texto. " + elemento.innerText;
            break;

        case "FOOTER":
            texto = "Rodapé da página. " + elemento.innerText;
            break;

        case "FIGCAPTION":
            texto = "Texto da imagem. " + elemento.innerText;
            break;

        case "IMG":
            texto = "Imagem. " + (
                elemento.alt || "Imagem sem descrição."
            );
            break;

        case "BUTTON":
            texto = "Botão. " + elemento.innerText;
            break;

        case "DIV":

            if (tabIndexAtual === 23) {
                texto = "Leitor de Libras.";
            }

            break;

        case "A":
            texto = "Link. " + elemento.innerText;
            break;

        case "INPUT":

            const label = document.querySelector(
                "label[for='" + elemento.id + "']"
            );

            if (label) {
                texto = "Campo " + label.innerText;
            } else {
                texto = "Campo de texto.";
            }

            break;
    }

    if (texto !== "") {

        const fala = new SpeechSynthesisUtterance(texto);

        fala.lang = "pt-BR";
        fala.rate = 1;
        fala.pitch = 1;
        fala.volume = 1;

        speechSynthesis.speak(fala);
    }

});


// ==========================================
// AUMENTAR O TAMANHO DA FONTE
// ==========================================

let tamanho = 18;

const botaoFonteMais = document.getElementById("fonteMais");

if (botaoFonteMais) {

    botaoFonteMais.addEventListener("click", function () {

        tamanho += 2;

        document.body.style.fontSize = tamanho + "px";

    });

}


// ==========================================
// DIMINUIR O TAMANHO DA FONTE
// ==========================================

const botaoFonteMenos = document.getElementById("fonteMenos");

if (botaoFonteMenos) {

    botaoFonteMenos.addEventListener("click", function () {

        // Impede que a fonte fique pequena demais
        if (tamanho > 10) {
            tamanho -= 2;
        }

        document.body.style.fontSize = tamanho + "px";

    });

}


// ==========================================
// ATIVAR / DESATIVAR ALTO CONTRASTE
// ==========================================

const botaoContraste = document.getElementById("contraste");

if (botaoContraste) {

    botaoContraste.addEventListener("click", function () {

        document.body.classList.toggle("altoContraste");

    });

}


// ==========================================
// ATIVAR / DESATIVAR MODO ESCURO
// ==========================================

const botaoEscuro = document.getElementById("escuro");

if (botaoEscuro) {

    botaoEscuro.addEventListener("click", function () {

        document.body.classList.toggle("dark");

    });

}


// ==========================================
// LEITURA COMPLETA DA PÁGINA
// ==========================================

function lerPagina() {

    speechSynthesis.cancel();

    const elementos = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, footer, button, img, a"
    );

    let textoCompleto = "";

    elementos.forEach(function (elemento) {

        let texto = "";
        let tipo = "";

        switch (elemento.tagName) {

            case "H1":
                tipo = "Título principal. ";
                texto = elemento.innerText;
                break;

            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "H6":
                tipo = "Título. ";
                texto = elemento.innerText;
                break;

            case "P":
                tipo = "Parágrafo. ";
                texto = elemento.innerText;
                break;

            case "BUTTON":
                tipo = "Botão. ";
                texto = elemento.innerText;
                break;

            case "FOOTER":
                tipo = "Rodapé da página. ";
                texto = elemento.innerText;
                break;

            case "IMG":
                tipo = "Imagem. ";
                texto = elemento.alt || "Imagem sem descrição.";
                break;

            case "A":
                tipo = "Link. ";
                texto = elemento.innerText;
                break;

            default:
                texto = elemento.innerText;
                tipo = "Elemento. ";
                break;
        }

        if (texto && texto.trim() !== "") {

            textoCompleto += tipo + texto.trim() + ". ";

        }

    });


    if (textoCompleto.trim() === "") {
        return;
    }


    const fala = new SpeechSynthesisUtterance(textoCompleto);

    fala.lang = "pt-BR";
    fala.rate = 1;
    fala.pitch = 1;
    fala.volume = 1;

    speechSynthesis.speak(fala);

}


// ==========================================
// PARAR LEITURA
// ==========================================

function pararLeitura() {

    speechSynthesis.cancel();

}


// ==========================================
// TROCAR IMAGEM / CONTEÚDO DO FLASHCARD
// ==========================================

function trocarImagem(escolha, event) {

    // Permite somente clique ou tecla Enter
    if (
        event &&
        event.type !== "click" &&
        event.key !== "Enter"
    ) {
        return;
    }


    // ======================================
    // LOCALIZA OS ELEMENTOS
    // ======================================

    const imagemNova = document.getElementById("imagemPrincipal");
    const textoPrincipal = document.getElementById("textoprincipal");
    const texto = document.getElementById("texto");
    const descreveFigura = document.getElementById("descrevefigura");


    // ======================================
    // VERIFICA SE OS ELEMENTOS EXISTEM
    // ======================================

    if (
        !imagemNova ||
        !textoPrincipal ||
        !texto ||
        !descreveFigura
    ) {
        console.error(
            "Erro: um ou mais elementos do flashcard não foram encontrados."
        );

        return;
    }


    // ======================================
    // VARIÁVEIS
    // ======================================

    let urlNova = "";
    let textoTitulo = "";
    let textoDescricao = "";
    let textoFigura = "";


    // ======================================
    // ESCOLHA DO FLASHCARD
    // ======================================

    switch (String(escolha)) {

        case "1":

            urlNova = "heliocentrico.webp";

            textoTitulo = "O que são modelos cosmológicos?";

            textoDescricao =
                "Modelos cosmológicos são descrições matemáticas e teóricas que explicam a origem, a estrutura, a evolução e o destino do universo. Eles funcionam como mapas em grande escala baseados em leis físicas, como a Teoria da Relatividade Geral de Einstein, para entender o comportamento do cosmos desde o Big Bang.";

            textoFigura =
                "Imagem do modelo heliocêntrico.";

            break;


        case "2":

            urlNova = "claudio-ptolomeu.webp";

            textoTitulo =
                "Sobre Cláudio Ptolomeu.";

            textoDescricao =
                "Ptolomeu se propôs a aperfeiçoar as teorias de Hiparco de Niceia, matemático e astrônomo grego que viveu durante o século II antes de Cristo. Durante anos de observações, cálculos e estudos, escreveu os 13 volumes da obra mestra da astronomia da Antiguidade, Composição Matemática.";

            textoFigura =
                "Imagem de Cláudio Ptolomeu.";

            break;


        case "3":

            urlNova = "geocentrismo(1).webp";

            textoTitulo =
                "O modelo do geocentrismo.";

            textoDescricao =
                "Ptolomeu definiu a obra como uma tentativa de completa exposição do sistema geocêntrico, que situava a Terra no centro do universo. Girando em torno dela estavam a Lua, Mercúrio, Vênus, o Sol, Marte, Júpiter, Saturno e as estrelas.";

            textoFigura =
                "Imagem do modelo geocêntrico.";

            break;


        case "4":

            urlNova = "coper.jpeg";

            textoTitulo =
                "Sobre Nicolau Copérnico.";

            textoDescricao =
                "Nicolau Copérnico, cujo nome em polonês é Mikołaj Kopernik, era filho do comerciante Nicolau Copérnico e de Barbara Watzenrode, que também era de uma importante família de comerciantes, segundo informações do museu polonês. Como o Museu indica, o jovem estudou na Academia de Cracóvia, na Polônia, onde adquiriu um amplo conhecimento das ciências humanas e uma grande paixão pelo estudo da astronomia. Ele também foi educado na Itália, onde estudou direito e medicina e obteve um doutorado em direito canônico em 1503.";

            textoFigura =
                "Imagem de Nicolau Copérnico.";

            break;


        case "5":

            urlNova = "helio.jpeg";

            textoTitulo =
                "O modelo do héliocentrismo.";

            textoDescricao =
                "Na época de Copérnico, a maioria das pessoas acreditava na teoria do astrônomo grego Cláudio Ptolomeu, que mais de mil anos antes havia dito que a Terra era o centro do Universo e que o planeta permanecia imóvel, como explica a NASA. De acordo com a agência norte-americana, Copérnico achava que a teoria de Ptolomeu estava incorreta. Assim, em algum momento entre 1507 e 1515, ele divulgou pela primeira vez os princípios de sua teoria heliocêntrica. O astrônomo propôs que a Terra e os demais planetas giravam em torno do Sol e que, além de orbitar anualmente em torno do Sol, a Terra girava uma vez por dia em seu próprio eixo. Ele também argumentou que mudanças lentas de longo prazo na direção do eixo da Terra explicavam a precessão dos equinócios, informa a Britannica.";

            textoFigura =
                "Imagem do modelo heliocêntrico.";

            break;


        default:

            urlNova = "heliocentrico.webp";

            textoTitulo =
                "O que é esta página?";

            textoDescricao =
                "Olá. Esta página foi criada como parte de um trabalho do projeto IFA, criado pela colaboração de seis alunos da turma do Segundo E: Anna Luiza, Eduardo, Felipe, João Henrique, Nathally e Samuel da Silva. Clique em qualquer flashcard para observar cada parte do projeto relacionado a modelos cosmológicos.";

            textoFigura =
                "Figura 1. Pessoa utilizando computador com tecnologia assistiva.";

            break;
    }


    // ======================================
    // ATUALIZA OS ELEMENTOS
    // ======================================

    imagemNova.src = urlNova;

    textoPrincipal.innerText = textoTitulo;

    texto.innerText = textoDescricao;

    descreveFigura.innerText = textoFigura;


    // ======================================
    // LÊ O FLASHCARD
    // ======================================

    lerCartao(
        textoTitulo,
        textoDescricao,
        textoFigura
    );


    // ======================================
    // COLOCA O FOCO NO TÍTULO
    // ======================================

    textoPrincipal.setAttribute("tabindex", "-1");

    textoPrincipal.focus();

}


// ==========================================
// LEITURA DOS ELEMENTOS DO FLASHCARD
// ==========================================

function lerCartao(texto1, texto2, texto3) {

    speechSynthesis.cancel();

    const textoCompleto =
        texto1 + ". " +
        texto2 + ". " +
        texto3 + ".";


    const fala = new SpeechSynthesisUtterance(textoCompleto);

    fala.lang = "pt-BR";
    fala.rate = 1;
    fala.pitch = 1;
    fala.volume = 1;

    speechSynthesis.speak(fala);

}
