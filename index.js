$(document).ready(function() {
    $("#alerta").hide();

    let buttonCollapse = $("#collapse");
    let containerRecetario = $("#recetario");
    let containerAgregar = $("#Agregar");
    let separador = $("#separadorVertical");

    buttonCollapse.click(function() {
        if (containerRecetario[0].style.width === "100%") {
            containerRecetario[0].style.width = "74.5%";
            containerAgregar.show(200);
            separador.show();
        } else {
            containerAgregar.hide(400);
            separador.hide();
            containerRecetario[0].style.width = "100%";
        }
    });

    $("#agregarIngrediente").click(function() {
        let ingrediente = $("#ingrediente").val();
        if (ingrediente.trim() === "") {
            showAlert("el ingrediente no puede estar vácio.");
            return;
        } else {
            $("#alert").hide(200);
            let html = `<li class="list-group-item">${ingrediente}</li>`;

            $("#lista-ingredientes").append(html);
            $("#ingrediente").val("");
        }
    });

    function showAlert(message) {
        $("#alerta").text(message);
        $("#alerta").show(500);
    }

    $("#guardar").click(function() {
        let nombre = $("#nombre").val();
        if (nombre.trim() === "") {
            showAlert("el nombre no puede estar vácio.");
            return;
        }

        let categoria = $("#categoria option:selected")[0].text;
        if (categoria === "Seleccionar") {
            showAlert("Selecciona una categoría.");
            return;
        }

        let imagen = $("#imagen").val();
        if (imagen.trim() === "") {
            showAlert("Ingresa una ruta de imagen valida.");
            return;
        }

        let arr = document.getElementById('lista-ingredientes').getElementsByTagName('li');
        var arr2 = [].slice.call(arr);
        let ingredientes = [];

        arr2.forEach(element => {
            ingredientes.push(element.innerText);
        });
        if (ingredientes.length == 0) {
            showAlert("Se requiere al menos un ingrediente.");
            return;
        }

        let preparacion = $("#preparacion")[0].value;
        if (preparacion.trim() === "") {
            showAlert("El campo no puede estar vácio.");
            return;
        }

        let receta = {
            nombre: nombre,
            categoria: categoria,
            imagen: imagen,
            ingredientes: ingredientes,
            preparacion: preparacion,
            id: Date.now()
        };

        $("#alerta").hide(200);
        localStorage.setItem(receta.id, JSON.stringify(receta));
    });

    $("#form-receta").submit(function(e) {
        e.preventDefault();
    });
});