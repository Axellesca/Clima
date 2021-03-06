const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e){
    e.preventDefault();
    
    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    // console.log(ciudad,pais);

    if(ciudad === ''|| pais === ''){
        mostrarError('Ambos Campos son obligatorios');
        return;
    }

    //Consultar API

    consultarAPI(ciudad,pais);
}

function mostrarError(msj){
    // console.log(msj);
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded',
        'max-w-md','mx-auto','mt-6','text-center');

        alerta.innerHTML = `
            <strong class"font-bold">Error!</strong>
            <span class="block">${msj}</span>`;

        container.appendChild(alerta);

        setTimeout(() =>{
            alerta.remove();
        },4000);
    }
}

function consultarAPI(ciudad,pais){

    const appId = '23d2ac138cd22b5ae64b587861a103d2';//API

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;//Agregar el https.

    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then( datos => {
            limpiarHTML();
            if(datos.cod === "404"){//Toma del proto de la API la funcion cod, si da 404 es un error, si da 200 lo encontrĂ³.
                mostrarError('Ciudad no encontrada');
                return;
            }

            //Imprime la Respuesta en HTML
            mostrarClima(datos);
        });
}

function mostrarClima(dato){
    const {name,main:{temp,temp_max,temp_min}} = dato;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = name;
    nombreCiudad.classList.add('font-bold','text-2xl');

    const actual = document.createElement('p');

    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold','text-6xl');

    const minTemp = document.createElement('p');

    minTemp.innerHTML = `Min:${min} &#8451;`;
    minTemp.classList.add('text-xl');

    const maxTemp = document.createElement('p');

    maxTemp.innerHTML = `Max:${max} &#8451;`;
    maxTemp.classList.add('text-xl');

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center','text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxTemp);
    resultadoDiv.appendChild(minTemp);


    resultado.appendChild(resultadoDiv);
}

function kelvinACentigrados(grado){
    return parseInt(grado - 273.15);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}