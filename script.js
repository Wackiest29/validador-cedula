document.addEventListener("DOMContentLoaded", function () {
    const cedulaInput = document.getElementById("cedulaInput");
    const validarButton = document.getElementById("validarButton");
    const resultado = document.getElementById("resultado");

    validarButton.addEventListener("click", function () {
        const cedula = cedulaInput.value.trim();

        fetch('http://localhost:3000/validar-cedula', {
            method: 'POST',  // Cambiado a POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cedula: cedula }),
        })
        .then(response => response.json())
        .then(data => {
            resultado.innerHTML = data.resultado;
            resultado.classList.add(data.resultado === 'Cédula válida' ? "valid" : "invalid");
            resultado.classList.remove(data.resultado === 'Cédula válida' ? "invalid" : "valid");
        })
        .catch(error => console.error('Error:', error));
    });
});


