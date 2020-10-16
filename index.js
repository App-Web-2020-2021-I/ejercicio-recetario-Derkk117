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
            let html = `<li class="list-group-item bg-dark text-white list-group-item-action">${ingrediente}</li>`;

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

        $("#alerta").hide(200);

        let receta = {
            nombre: nombre,
            categoria: categoria,
            imagen: imagen,
            ingredientes: ingredientes,
            preparacion: preparacion,
            id: Date.now()
        };

        localStorage.setItem(receta.id, JSON.stringify(receta));

        agregarReceta(receta);

        $("#nombre").val("");
        $("#categoria")[0].selectedIndex = 0;
        $("#imagen").val("");
        $("#lista-ingredientes").empty();
        $("#preparacion")[0].value = "";
    });

    function agregarReceta(data) {
        let receta = data;
        let html = `
        <div class="card d-flex" id="${receta.id}">
            <div class="card-body"><img src="${receta.imagen}" class="img-fluid" alt=""></div>
            <div class="card-footer">
                <h6 class="text-left">${receta.nombre}</h6>
                <button onclick="verMas(${receta.id})" data-toggle="modal" data-target="#Modalv1">Ver más</button>
            </div>
        </div>`;
        if (receta.categoria === "Principal") {
            $("#Principal").append(html);
        } else if (receta.categoria === "Entrada") {
            $("#Entrada").append(html);
        } else if (receta.categoria === "Postre") {
            $("#Postre").append(html);
        } else {
            showAlert("Error al agregar al recetario. Categoria no encontrada...");
        }
    }

    $("#form-receta").submit(function(e) {
        e.preventDefault();
    });
});

//SandBox 
function verMas(id) {
    let receta = JSON.parse(localStorage.getItem(id));
    $("#Modalv1Title")[0].innerText = receta.nombre;
    $("#imagenModal")[0].src = receta.imagen;
    receta.ingredientes.forEach(element => {
        let html = `
        <li class="list-group-item bg-dark text-white list-group-item-action">${element}</li>`;

        $("#ingredientesModal").append(html);
    });
    $("#preparacionModal")[0].value = receta.preparacion;
}