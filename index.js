import { IfcAPI } from "web-ifc/web-ifc-api";

// console.log(IfcAPI);
console.log("hola caracola y otros pulpos del lugar!");

// Instanciamos la API ifc y la iniciamos
const ifcApi = new IfcAPI();
ifcApi.Init();

// Funcionalidad de input file para el botón "open file"

const button = document.getElementById('button-open-file');
const input_file = document.getElementById('input-element');

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
    // console.log(IfcData);
    // guardamos en memoria de IFC.js los datos del ifc
    const modelID = ifcApi.OpenModel(IfcData);
    // accedemos a los datos de esos elementos y los mostramos en consola
    const allItems = ifcApi.GetAllLines(modelID);
    //mostramos un vector con todos los IDs de los objetos seleccionados
    console.log(allItems);

}

// mostramos los elemntos creados en la consola
// console.log(button);
// console.log(input_file);