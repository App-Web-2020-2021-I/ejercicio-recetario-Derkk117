$(document).ready(function() {
    $("#alertaIngrediente").hide();

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
            $("#alertaIngrediente").show(250);
            return;
        } else {
            $("#alertaIngrediente").hide(200);
            let html = `<li class="list-group-item">${ingrediente}</li>`;

            $("#lista-ingredientes").append(html);
            $("#ingrediente").val("");
        }
    });

    $("#form-receta").submit(function(e) {
        e.preventDefault();

        /*let nombre = $("#nombre").val();
        let categoria = $("#categoria option:selected")[0].text;
        let imagen = $("#imagen").val();

        let receta = {
            nombre: nombre,
            categoria: categoria,
            imagen: imagen,
        };

        console.log(receta);*/
    });
});