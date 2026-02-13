



async function buscarDadosGithub() {
    // Vamos usar o seu nome ou o do Diego para testar
    const username = "craian789-bit"; 

    try {
        // Link ultra conferido: com os ':' e sem o 'username' extra
        const resposta = await fetch(`https://api.github.com/users/${username}`);
        
        if (!resposta.ok) throw new Error("Usuário não encontrado");

        const dados = await resposta.json();
        
        // Atribuindo os dados aos IDs do HTML
        document.getElementById('avatar').src = dados.avatar_url;
        document.getElementById('nome').innerText = dados.name || username;
        document.getElementById('bio').innerText = dados.bio || "Sem bio disponível";
        document.getElementById('repos-count').innerText = `Repositórios: ${dados.public_repos}`;
        document.getElementById('followers').innerText = `Seguidores: ${dados.followers}`;

        console.log("Sucesso! Dados carregados.");

    } catch (erro) {
        console.error("Ops! Algo deu errado na requisição:", erro);
    }
}

async function buscarProjetos() {
    const username = "craian789-bit";
    const conteiner= document.getElementById('lista-projetos');

    try {
        const resposta = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
        const projetos = await resposta.json();

        conteiner.innerHTML = ""; // Limpa o container antes de adicionar os projetos

        projetos.forEach(projeto => {
            
            const card = `
            <div class="projeto-card">
                            <h4>${projetos.name}</h4>
                            <p>${projetos.description || "Sem descrição"}</p>
                          <a href="${projetos.html_url}" target="_blank">Ver código →</a>
                            </div>`;
            conteiner.innerHTML += card;
        });

    } catch (erro) {    console.error("Erro ao buscar projetos:", erro);
    }
}


    
// Função para carregar as partículas
function carregarParticulas() {
    tsParticles.load({
        id: "tsparticles",
        options: {
            particles: {
                number: { value: 100 },
                color: { value: "#58a6ff" },
                links: {
                    enable: true,
                    distance: 100,
                    color: "#164780",
                    opacity: 0.3
                },
                move: { enable: true, speed: 1.5 },
                size: { value: { min: 1, max: 3 } }
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" }
                }
            }
        }
    });
}



buscarDadosGithub();
buscarProjetos();
carregarParticulas();
