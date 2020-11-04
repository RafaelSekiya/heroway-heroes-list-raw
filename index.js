
// Encontre o seu super herói preferido. (FIND) - OK
// Filtre apenas os heróis com a primeira letra do seu nome. (FILTER) - OK
// Com o resultado da operação anterior, mapeie apenas os heróis pelo nome. (MAP) - OK
// Conte quantos heróis da Marvel e da DC existem na lista. (REDUCE) - Not OK


run();

// Função para filtrar os heróis que começam com primeira letra do meu nome, que é R de Rafael
function filterByName(heroes){
    return (heroes.name[0] === 'r' || heroes.name[0] === 'R');

    /* As duas formas dão no mesmo, porém a primeira é mais enxuta
    if( heroes.name[0] === 'r' || heroes.name[0] === 'R'){
        return true;
    }else{
        return false;
    }
    */
} 

// Função para filtrar os heróis pela publisher DC Comics, não precisa mais  [Homework Atualizado]
function filterByPublisher(heroes){
    return ( heroes.biography.publisher === "DC Comics");
}

// Função para achar meu herói favorito Goku 
function findFavoriteHero(heroes){

    const myFavoriteHero = heroes.find((hero) =>{
        return (hero.name === 'Goku');
    });

    const htmlFavoriteHeroTemplate = createHeroTemplate(myFavoriteHero);  
    console.log(htmlFavoriteHeroTemplate);
    appendHeroToHTML(htmlFavoriteHeroTemplate);
}



// Função principal
async function run() { 
    const heroes = await getHeroes();
    console.log('heroes', heroes);

    // Achando meu herói favorito que é o Goku e exibindo o seu html
    findFavoriteHero(heroes);

    // Utilizando a função que filtra os heróis pela letra inicial do 'name'
    let arrayByName = heroes.filter(filterByName); 

     // Mapeando o array
    let mapeamento = arrayByName.map((hero) => {
        return (hero.name);
    });

    // Exibindo o array "mapeado"
    console.log(mapeamento);

    // exibindo o html dos heróis filtrados
    arrayByName.forEach(hero =>{
       const htmlHeroTemplate =  createHeroTemplate(hero);
       console.log(htmlHeroTemplate);
       appendHeroToHTML(htmlHeroTemplate);
    })

    //Contar quantos heróis da Marvel e da DC existem na lista com o reduce (?????????????)


}

async function getHeroes() {
    try {
        const requestResult = await fetch('https://akabab.github.io/superhero-api/api/all.json');
        const jsonResult = await requestResult.json();

       // console.log(jsonResult);
        return jsonResult
    } catch (error) {
        console.log('Erro na chamada da URL');
    }
}

function createHeroTemplate(hero) { 
    const htmlTemplate = `
    <div class="card">
        <h3>${hero.name}</h3>

        <div class="hero">
            <img src=${hero.images.sm}>

            <!-- <div class="hero-button">
            <button>Get Status</button>
            </div> -->

            <div class="hero-power-stats">
                <div class="attributes">
                    <h4>intelligence</h4>
                    <div>${hero.powerstats.intelligence}</div>
                </div>

                <div class="attributes">
                    <h4>strength</h4>
                    <div>${hero.powerstats.strength}</div>
                </div>

                <div class="attributes">
                    <h4>speed</h4>
                    <div>${hero.powerstats.speed}</div>
                </div>

                <div class="attributes">
                    <h4>durability</h4>
                    <div>${hero.powerstats.durability}</div>
                </div>

                <div class="attributes">
                    <h4>power</h4>
                    <div>${hero.powerstats.power}</div>
                </div>

                <div class="attributes">
                    <h4>combat</h4>
                    <div>${hero.powerstats.combat}</div>
                </div>
            </div>
        </div>
    </div>
    `;

    return htmlTemplate;
}

function appendHeroToHTML(heroHTML) {
    const heroesContainerElement = document.getElementById('heroesContainer');
    heroesContainerElement.insertAdjacentHTML('beforeend', heroHTML);
 }