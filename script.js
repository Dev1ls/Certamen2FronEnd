const formulario = document.getElementById("formularioEvaluacion");
const errores = document.getElementById("errores");
const resultado = document.getElementById("resultado");
const textoResultado = document.getElementById("textoResultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    errores.innerHTML = "";
    resultado.className = "oculto";

    const nombre = document.getElementById("nombre").value.trim();
    const cargo = document.getElementById("cargo").value.trim();

    if (nombre === "" || cargo === "") {
        errores.innerHTML = "Nombre y cargo son obligatorios";
        return;
    }

    let sumaPesos = 0;
    let notaFinal = 0;

    for (let i = 1; i <= 5; i++) {

        const puntaje = parseFloat(document.getElementById("puntaje" + i).value);
        const peso = parseFloat(document.getElementById("peso" + i).value);

        if (puntaje < 1 || puntaje > 10 || isNaN(puntaje)) {
            errores.innerHTML = "El puntaje del criterio " + i + " debe estar entre 1 y 10";
            return;
        }

        if (peso < 0 || peso > 100 || isNaN(peso)) {
            errores.innerHTML = "El peso del criterio " + i + " debe estar entre 0 y 100";
            return;
        }

        sumaPesos += peso;
        notaFinal += puntaje * (peso / 100);
    }

    if (sumaPesos !== 100) {
        errores.innerHTML = "Los pesos deben sumar 100% (actual: " + sumaPesos + "%)";
        return;
    }

    let categoria = "";
    let claseColor = "";

    if (notaFinal >= 9) {
        categoria = "Excelente";
        claseColor = "excelente";
    }
    else if (notaFinal >= 7) {
        categoria = "Bueno";
        claseColor = "bueno";
    }
    else if (notaFinal >= 5) {
        categoria = "Regular";
        claseColor = "regular";
    }
    else {
        categoria = "Insuficiente";
        claseColor = "insuficiente";
    }

    resultado.className = claseColor;

    textoResultado.innerHTML =
        "Colaborador: <strong>" + nombre + "</strong><br>" +
        "Cargo: <strong>" + cargo + "</strong><br>" +
        "Nota final: <strong>" + notaFinal.toFixed(2) + "</strong><br>" +
        "Categoria: <strong>" + categoria + "</strong>";

});