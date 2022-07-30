const pokemonName = document.querySelector('.pokemon__name'); // selecionar o elemento com a classe .pokemon__name
const pokemonNumber = document.querySelector('.pokemon__number'); // selecionar o elemento com a classe .pokemon__number
const pokemonImage = document.querySelector('.pokemon__image'); // selecionar o elemento com a classe .pokemon__image
const form = document.querySelector('.form'); // selecionar o elemento com a classe .form 
const input = document.querySelector('.input__search'); // selecionar o elemento com a classe .input__search
const buttonPrev = document.querySelector('.btn-prev'); // selecionar o elemento com a classe .btn-prev
const buttonNext = document.querySelector('.btn-next'); // selecionar o elemento com a classe .btn-next

let searchPokemon = 1; // iniciar com o pokémon #1 carregado

const fetchPokemon = async (pokemon) => { // função assíncrona para buscar o pokémon
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // fetch para buscar o pokémon na API

  if (response.status === 200) { // SE o pokémon existir
    const data = await response.json(); // transformar o json em objeto
    return data; // retornar o objeto
  }
}

const renderPokemon = async (pokemon) => { // função assíncrona para renderizar o pokémon

  pokemonName.innerHTML = 'Carregando...'; // setar o innerHTML "padrão" do nome do pokémon
  pokemonNumber.innerHTML = ''; // setar o innerHTML ""padrão" do número do pokémon

  const data = await fetchPokemon(pokemon); // esperar pela Promise para buscar o pokémon

  if (data) { // SE o pokémon existir
    pokemonImage.style.display = 'block'; // mostrar a imagem do pokémon
    pokemonName.innerHTML = data.name; // setar o innerHTML do nome do pokémon
    pokemonNumber.innerHTML = data.id; // setar o innerHTML do número do pokémon
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // setar o src da imagem do pokémon
    input.value = ''; // setar o valor do input para ""
    searchPokemon = data.id; // setar o valor do searchPokemon para o número do pokémon
  } else { // SE o pokémon não existir
    pokemonImage.style.display = 'none'; // esconder a imagem do pokémon
    pokemonName.innerHTML = 'Não encontrado... :('; // setar o innerHTML do nome do pokémon para "Não encontrado..."
    pokemonNumber.innerHTML = ''; // setar o innerHTML do número do pokémon para ""
  }
}

form.addEventListener('submit', (event) => { // evento para o submit do form
  event.preventDefault(); // preventDefault para não recarregar a página
  renderPokemon(input.value.toLowerCase()); // chamar a função renderPokemon com o valor do input com o método toLowerCase para não dar erro no fetch
});

buttonPrev.addEventListener('click', () => { // evento para o click do botão prev
  if (searchPokemon > 1) { // SE o searchPokemon for maior que 1
    searchPokemon -= 1; // decrementar o searchPokemon
    renderPokemon(searchPokemon); // chamar a função renderPokemon com o searchPokemon decrementado
  }
});

buttonNext.addEventListener('click', () => { // evento para o click do botão next
  searchPokemon += 1; // incrementar o searchPokemon
  renderPokemon(searchPokemon);  // chamar a função renderPokemon com o searchPokemon incrementado
}); 

renderPokemon(searchPokemon); // chamar a função renderPokemon com o searchPokemon inicial
