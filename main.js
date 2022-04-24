const pokedex = document.getElementById("pokedex");
let contadorId = 0;

const capturar = () => {
    const pokeSolicitado = (prompt("Introduzca el nombre del pokemon")).toLowerCase();

    //Realizamos la request 
    const fetchData = async (pokeSolicitado) => {
        const pokemomObtenido = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeSolicitado}`)
            .then(res => res.json())
            .then(res => res)
            .catch(error => Swal.fire({
                type: 'warning',
                title: 'Lo sentimos',
                text: 'No se ha encontrado pokemon :C'
            }));

        //Asignamos variables a los valores obtenidos y deseados del fetch
        const nombre = (pokemomObtenido.name).toUpperCase();
        const tipo1 = pokemomObtenido.types[0].type.name;
        const cantTipos = (pokemomObtenido.types).length;

        //Generamos Articulo
        contadorId++;
        const elementoNuevo = document.createElement("article");
        elementoNuevo.id = contadorId;
        pokedex.appendChild(elementoNuevo)

        //Generamos trash icon con Font Awesome y asignamos la funcion de borrarCarta()
        elementoNuevo.innerHTML = `<i class="fa-solid fa-trash" onclick="borrarCarta(${contadorId})"></i>`;
        pokedex.appendChild(elementoNuevo);

        //Añadimos Imagen de Pokemon al articulo al articulo
        const imgPokemon = document.createElement("img");
        imgPokemon.src = (pokemomObtenido.sprites.other.dream_world.front_default);
        imgPokemon.alt = nombre;
        elementoNuevo.appendChild(imgPokemon)

        //Añadimos Nombre del Pokemon al articulo
        const nombrePokemon = document.createElement("p");
        nombrePokemon.classList.add("nombrePokemon");
        nombrePokemon.innerHTML = `<strong>${nombre}</strong>`;
        elementoNuevo.appendChild(nombrePokemon)

        //Añadimos Tipos de Pokemon al articulo
        const tipoDePokemon = document.createElement("p");
        tipoDePokemon.classList.add("tipoDePokemon")
        if (cantTipos == 1) {
            tipoDePokemon.innerHTML = `<strong>${tipo1}</strong>`;
        } else {
            const tipo2 = pokemomObtenido.types[1].type.name;
            tipoDePokemon.innerHTML = `<strong>${tipo1} / ${tipo2}</strong>`;
        }
        elementoNuevo.appendChild(tipoDePokemon)

        //Definimos clases al articulo para el tipo de color de fondo

        let colorSegunTipo = "otraClase"

        switch (tipo1) {
            case "water":
                colorSegunTipo = "water"
                break;
            case "fire":
                colorSegunTipo = "fire"
                break;
            case "grass":
                colorSegunTipo = "grass"
                break;
            case "electric":
                colorSegunTipo = "electric"
                break;
            case "normal":
                colorSegunTipo = "normal"
                break;
            case "poison":
                colorSegunTipo = "poison"
                break;
            case "ice":
                colorSegunTipo = "ice"
                break;
        }
        elementoNuevo.classList.add(`${colorSegunTipo}`);

    }
    fetchData(pokeSolicitado);
}

const borrarCarta = (idX) => {
    const borrarCard = document.getElementById(`${idX}`);
    pokedex.removeChild(borrarCard);
}


