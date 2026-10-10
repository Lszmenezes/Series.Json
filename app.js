const listaSeries = document.getElementById("listaSeries");
const btnCarregar = document.getElementById("btnCarregar");
const botoesGenero = document.querySelectorAll(".btn-genero");

btnCarregar.addEventListener("click", carregarSeries);

botoesGenero.forEach((botao) => {
    botao.addEventListener("click", () => {
        botoesGenero.forEach((b) => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        carregarSeries();
    });
});

async function carregarSeries() {
    try {
        

        const resposta = await fetch("series.json");

      
        const dados = await resposta.json();
        let series = dados.series;

        const genero = document.querySelector(".ativo").dataset.genero;

        series = series.filter((serie) => {
            return genero === "Todos" || serie.genero === genero;
        });

        mostrarSeries(series);
    } catch (erro) {
        listaSeries.innerHTML = `Erro: ${erro.message}`;
    }
}

function mostrarSeries(lista) {
    listaSeries.innerHTML = "";

    lista.forEach((serie) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${serie.imagem}" alt="${serie.titulo}">
            <h3>${serie.titulo}</h3>
            <p><strong>Ano:</strong> ${serie.ano}</p>
            <p><strong>Gênero:</strong> ${serie.genero}</p>
            <p><strong>Temporadas:</strong> ${serie.temporadas}</p>
        `;

        listaSeries.appendChild(card);
    });
}