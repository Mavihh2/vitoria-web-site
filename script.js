const cabecalho =
    document.getElementById("cabecalho");

const barraProgresso =
    document.getElementById("barra-progresso");

const botaoMenu =
    document.getElementById("botao-menu");

const menu =
    document.getElementById("menu");

const voltarTopo =
    document.getElementById("voltar-topo");


// Cabeçalho, progresso e botão de voltar ao topo
window.addEventListener("scroll", function () {

    cabecalho.classList.toggle(
        "rolagem",
        window.scrollY > 35
    );


    voltarTopo.classList.toggle(
        "visivel",
        window.scrollY > 600
    );


    const alturaDocumento =
        document.documentElement.scrollHeight
        - window.innerHeight;


    const percentual =
        alturaDocumento > 0
            ? (window.scrollY / alturaDocumento) * 100
            : 0;


    barraProgresso.style.width =
        `${percentual}%`;

});


// Voltar ao topo
voltarTopo.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// Menu mobile
botaoMenu.addEventListener("click", function () {

    const estaAberto =
        menu.classList.toggle("aberto");


    botaoMenu.classList.toggle(
        "aberto",
        estaAberto
    );


    document.body.classList.toggle(
        "bloqueado",
        estaAberto
    );


    botaoMenu.setAttribute(
        "aria-expanded",
        estaAberto
    );

});


document.querySelectorAll(".menu a").forEach(
    function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("aberto");

            botaoMenu.classList.remove("aberto");

            document.body.classList.remove(
                "bloqueado"
            );

            botaoMenu.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    }
);


// Animações ao rolar
const elementosAnimados =
    document.querySelectorAll(".animar");


const observador =
    new IntersectionObserver(

        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add(
                        "aparecer"
                    );


                    observador.unobserve(
                        entrada.target
                    );

                }

            });

        },

        {
            threshold: 0.13
        }

    );


elementosAnimados.forEach(function (elemento) {

    observador.observe(elemento);

});


// Perguntas frequentes
const perguntas =
    document.querySelectorAll(".pergunta");


perguntas.forEach(function (pergunta) {

    const botao =
        pergunta.querySelector("button");


    botao.addEventListener("click", function () {

        const estaAtiva =
            pergunta.classList.contains("ativa");


        perguntas.forEach(function (item) {

            item.classList.remove("ativa");

        });


        if (!estaAtiva) {

            pergunta.classList.add("ativa");

        }

    });

});


// Formulário
const formulario =
    document.getElementById("formulario");

const areaAvulsos =
    document.getElementById("area-avulsos");

const opcoesSolucao =
    document.querySelectorAll(
        'input[name="solucao"]'
    );


// Mostrar serviços avulsos
function atualizarAreaAvulsos() {

    const solucao =
        document.querySelector(
            'input[name="solucao"]:checked'
        ).value;


    areaAvulsos.classList.toggle(
        "escondido",
        solucao !== "Serviços Avulsos"
    );

}


opcoesSolucao.forEach(function (opcao) {

    opcao.addEventListener(
        "change",
        atualizarAreaAvulsos
    );

});


atualizarAreaAvulsos();


// Máscara de telefone
const telefone =
    document.getElementById("telefone");


telefone.addEventListener("input", function () {

    let numero =
        telefone.value
            .replace(/\D/g, "")
            .slice(0, 11);


    if (numero.length > 10) {

        numero = numero.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );

    } else if (numero.length > 6) {

        numero = numero.replace(
            /^(\d{2})(\d{4})(\d{0,4})$/,
            "($1) $2-$3"
        );

    } else if (numero.length > 2) {

        numero = numero.replace(
            /^(\d{2})(\d+)/,
            "($1) $2"
        );

    } else if (numero.length > 0) {

        numero = numero.replace(
            /^(\d{0,2})/,
            "($1"
        );

    }


    telefone.value = numero;

});


// Seleção rápida de pacotes
const botoesPacote =
    document.querySelectorAll(".escolher-pacote");


botoesPacote.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const pacote =
            botao.dataset.pacote;


        const opcao =
            Array.from(opcoesSolucao)
                .find(function (item) {

                    return item.value === pacote;

                });


        if (opcao) {

            opcao.checked = true;

            atualizarAreaAvulsos();

        }


        document
            .getElementById("orcamento")
            .scrollIntoView({
                behavior: "smooth"
            });


        mostrarNotificacao(
            `${pacote} selecionado no formulário.`
        );

    });

});


// Seleção rápida de serviços avulsos
const botoesServico =
    document.querySelectorAll(
        ".selecionar-servico"
    );


botoesServico.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const servico =
            botao.dataset.servico;


        const opcaoAvulsos =
            Array.from(opcoesSolucao)
                .find(function (item) {

                    return item.value
                        === "Serviços Avulsos";

                });


        opcaoAvulsos.checked = true;

        atualizarAreaAvulsos();


        const checkbox =
            Array.from(
                document.querySelectorAll(
                    'input[name="servico-avulso"]'
                )
            )
            .find(function (item) {

                return item.value === servico;

            });


        if (checkbox) {

            checkbox.checked = true;

        }


        document
            .getElementById("orcamento")
            .scrollIntoView({
                behavior: "smooth"
            });


        mostrarNotificacao(
            `${servico} selecionado no formulário.`
        );

    });

});


// Notificação
const notificacao =
    document.getElementById("notificacao");

const notificacaoTexto =
    document.getElementById("notificacao-texto");

let tempoNotificacao;


function mostrarNotificacao(texto) {

    clearTimeout(tempoNotificacao);


    notificacaoTexto.textContent =
        texto;


    notificacao.classList.add("mostrar");


    tempoNotificacao =
        setTimeout(function () {

            notificacao.classList.remove(
                "mostrar"
            );

        }, 3000);

}


// Envio do formulário para o WhatsApp
formulario.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const nome =
            document
                .getElementById("nome")
                .value
                .trim();


        const numeroTelefone =
            document
                .getElementById("telefone")
                .value
                .trim();


        const empresa =
            document
                .getElementById("empresa")
                .value
                .trim();


        const segmento =
            document
                .getElementById("segmento")
                .value;


        const instagram =
            document
                .getElementById("instagram")
                .value
                .trim();


        const cidade =
            document
                .getElementById("cidade")
                .value
                .trim();


        const solucao =
            document.querySelector(
                'input[name="solucao"]:checked'
            ).value;


        const situacao =
            document
                .getElementById("situacao")
                .value;


        const necessidade =
            document
                .getElementById("necessidade")
                .value
                .trim();


        const referencia =
            document
                .getElementById("referencia")
                .value
                .trim();


        const origem =
            document
                .getElementById("origem")
                .value;


        const aceite =
            document
                .getElementById("aceite")
                .checked;


        const servicosAvulsos =
            Array.from(
                document.querySelectorAll(
                    'input[name="servico-avulso"]:checked'
                )
            )
            .map(function (item) {

                return item.value;

            });


        if (
            !nome
            || !numeroTelefone
            || !empresa
            || !segmento
            || !cidade
            || !situacao
            || !necessidade
        ) {

            alert(
                "Preencha todos os campos obrigatórios."
            );

            return;

        }


        if (!aceite) {

            alert(
                "Confirme a autorização para contato."
            );

            return;

        }


        if (
            solucao === "Serviços Avulsos"
            && servicosAvulsos.length === 0
        ) {

            alert(
                "Selecione pelo menos um serviço avulso."
            );

            return;

        }


        let mensagemServicos = "";


        if (solucao === "Serviços Avulsos") {

            mensagemServicos =
                `\nServiços selecionados: `
                + servicosAvulsos.join(", ");

        }


        const mensagem =
            `Olá, Vitória! Gostaria de solicitar um orçamento para minha empresa.` +

            `\n\n*INFORMAÇÕES DO CLIENTE*` +

            `\nNome: ${nome}` +

            `\nWhatsApp: ${numeroTelefone}` +

            `\nEmpresa: ${empresa}` +

            `\nSegmento: ${segmento}` +

            `\nCidade/Estado: ${cidade}` +

            `\nInstagram: ${instagram || "Não informado"}` +

            `\n\n*SOLUÇÃO DE INTERESSE*` +

            `\nOpção escolhida: ${solucao}` +

            mensagemServicos +

            `\n\n*SITUAÇÃO ATUAL DA EMPRESA*` +

            `\n${situacao}` +

            `\n\n*NECESSIDADE E OBJETIVOS*` +

            `\n${necessidade}` +

            `\n\n*REFERÊNCIAS OU IDEIAS*` +

            `\n${referencia || "Não informadas"}` +

            `\n\n*COMO CONHECEU A VITÓRIA WEB*` +

            `\n${origem}` +

            `\n\nAguardo seu retorno para conversarmos sobre o projeto.`;


        const linkWhatsApp =
            "https://wa.me/5521996144335?text="
            + encodeURIComponent(mensagem);


        window.open(
            linkWhatsApp,
            "_blank"
        );

    }
);


// Ano automático
document.getElementById("ano").textContent =
    new Date().getFullYear();


// Caso JavaScript esteja desativado, evita conteúdo invisível
window.addEventListener("load", function () {

    setTimeout(function () {

        document
            .querySelectorAll(
                ".animar:not(.aparecer)"
            )
            .forEach(function (elemento) {

                const posicao =
                    elemento.getBoundingClientRect();


                if (
                    posicao.top
                    > window.innerHeight
                ) {

                    elemento.classList.add(
                        "aparecer"
                    );

                }

            });

    }, 300);

});