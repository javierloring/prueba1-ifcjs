// importamos la API IFC.js y los tipos con los que vayamos a trabajar p.e. IFCWALL, IFCWALLSTANDARDCASE
import {
    IfcAPI,
    IFCWALL,
    IFCWALLSTANDARDCASE
} from "web-ifc/web-ifc-api";

// console.log(IfcAPI);
console.log("hola caracola y otros pulpos del lugar!");

// Instanciamos la API ifc y la iniciamos
const ifcApi = new IfcAPI();
ifcApi.Init();

// Funcionalidad de input file para el botón "open file"
// obtenemos elementos del documento

const button = document.getElementById('button-open-file');
const input_file = document.getElementById('input-element');
const resultContainer = document.getElementById('content');

// Registramos el evento click para el botón de forma que la pulsarlo 
// se clique el input file
button.onclick = () => {
    input_file.click();
}
input_file.onchange = (changed) => {
    // console.log(changed);
    const reader = new FileReader();
    // pasamos el resultado de la lectura a la funcion loadIfc
    reader.onload = () => loadIfc(reader.result);
    // leemos el archivo cargado en el input file
    reader.readAsText(changed.target.files[0]);
}

function loadIfc(IfcData) {
    // muestra la lectura del archivo ifc
    // console.log(IfcData);
    // guardamos en memoria de IFC.js los datos del ifc, nuestro modelo de datos del ifc.
    const modelID = ifcApi.OpenModel(IfcData);
    // accedemos a los datos de esos elementos y los mostramos en consola
    const allItems = ifcApi.GetAllLines(modelID);
    //mostramos un vector con todos los IDs de los objetos seleccionados
    console.log(allItems);
    // mostramos los muros contenidos en el ifc, previa importación de la constante IFCWALL 
    // o IFWALLSTANDARDCASE
    const walls = ifcApi.GetLineIDsWithType(modelID, IFCWALLSTANDARDCASE);
    // const walls = ifcApi.GetLineIDsWithType(modelID, IFCWALL);
    const size_walls = walls.size();
    const size = allItems.size();
    console.log('Este objeto contiene ' + size + ' elementos.');
    console.log('Este objeto contiene ' + size_walls + ' muros.');
    // mostramos los items mediante una iteracón
    if (size != 0 || size_walls != 0) {
        for (let i = 0; i < size_walls; i++) {
            // elegimos cada elemento muro y obtenemos sus propiedades y las mostramos en consola
            const wall = walls.get(i);
            const wallProps = ifcApi.GetLine(modelID, wall);
            console.log(wallProps);
        }
        // for (let i = 0; i < size_walls; i++) {
        //     // console.log(allItems.get(i));
        //     console.log(walls.get(i));
        // }
    }
    // elegimos el primer elemento y lo mostramos por pantalla, no por consola
    const firstWall = walls.get(0);
    const wallProps = ifcApi.GetLine(modelID, firstWall);
    const result = JSON.stringify(wallProps, undefined, 2);
    resultContainer.textContent = result;

}

// mostramos los elemntos creados en la consola
// console.log(button);
// console.log(input_file);