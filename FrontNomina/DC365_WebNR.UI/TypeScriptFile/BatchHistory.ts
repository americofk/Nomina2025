/**
 * @file BatchHistory.ts
 * @description Módulo de historial de lotes de procesamiento. Permite visualizar
 *              y gestionar el historial de procesos batch ejecutados.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module HistorialLotes
 */

$(".NewBatch").on("click", function () {
    $('.contenedor-newBatch').removeClass("collapse");
});

$(".btncancelar-process-batch").on("click", function () {
    $('.contenedor-newBatch').addClass("collapse");
});

$(".download-template").on("click", function () {
    window.location.href = `historiallotes/DownloadFile?typeEntity=${$('.typeEntity').val().toString()}`;
});

$(".form-file").on("change", function () {
    $('.form-file-01').val($(this).val().toString());
});

//save
$("#Form-batchHistori").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        
        let originalform: HTMLFormElement;
        originalform = document.querySelector(".form-file");
        
        if (originalform.files != null) {
            let originalform: HTMLFormElement;
            originalform = document.querySelector("#Form-batchHistori");
            let dataform = new FormData(originalform);
            dataform.append("_entity", $('.typeEntity').val().toString());
            dataform.append("_optionSeparator", $('.SeparatorOption').val().toString());
            $.ajax({
                url: "/historiallotes/guardar",
                type: "POST",
                data: dataform,
                contentType: false,
                processData: false,
                async: true,
                success: function (data: ResponseUI) {
                    
                    $('.progreso').modal('hide');
                    $('.contenedor-newBatch').addClass("collapse");
                    if (data.Type == "error") {
                        FormatErrors(data);
                      
                    } else {
                        windows_message(data.Message, data.Type);
                        $.get(location.href)
                            .done(function (r) {
                                var newDom = $(r);
                                $('.tblbatch').replaceWith($('.tblbatch', newDom));
                                $(".id-batch-info").on("click", function () {
                                    let that = $(this)[0];
                                    showhelp(that, "/historiallotes/InfoProcess", ".cont-batch-info");

                                    //$(".card-help > p").text($(this).parent().parent().find('.data-info-batch').html().trim());
                                    $(".card-help > p").html(splitMessage($(this).parent().parent().find('.data-info-batch').html().trim()));

                                });
                            });

                          //location.reload();
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
        
    }
});

//eliminar
$("#DeleteHistory").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectHistory[type=checkbox]").each(function () {

            if ($(this).is(":checked")) {
                contador = true
                let input = $(document.createElement('input'));
                input.attr("name", "processid");
                input.attr("class", "processid");
                input.val($(this).parent().parent().find(".HistoryIdIdTbl").html().trim());
                $("#DeleteHistory").append(input);
            }

        });

        if (!contador) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else {
            windows_message("¿Desea eliminar los códigos de procesos seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({
                        url: "/historiallotes/eliminar",
                        type: "POST",
                        data: $("#DeleteHistory").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".processid").remove();
                            if (data.Type == "error") {
                                var _errors: string = "";
                                data.Errors.forEach(function (x: string) {
                                    _errors += `${x}<br>`;
                                });
                                windows_message(_errors, data.Type);
                            } else {

                                $.get(location.href)
                                    .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblbatch').replaceWith($('.tblbatch', newDom));
                                        //Código para mostrar la ayuda
                                        $(".id-batch-info").on("click", function () {
                                            let that = $(this)[0];
                                            showhelp(that, "/historiallotes/InfoProcess", ".cont-batch-info");
                                            $(".card-help > p").html(splitMessage($(this).parent().parent().find('.data-info-batch').html().trim()));

                                        });
                                    });
                                
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }

                    });
                },
                onCancel: function () {
                    $(".selectHistory[type=checkbox]").prop('checked', false);
                    $(".processid").remove();

                }
            });//, {Ok: "Si", Cancel: "No"}

        }
    }
});

//Código para mostrar la ayuda
$(".id-batch-info").on("click", function () {
    let that = $(this)[0];
    showhelp(that, "/historiallotes/InfoProcess", ".cont-batch-info");

    $(".card-help > p").html(splitMessage($(this).parent().parent().find('.data-info-batch').html().trim()));
});

//paginacion
$("#content-scroll").scroll(function () {
    let currentscroll = $("#content-scroll").scrollTop();

    let maxscroll = $(".tblbatch").outerHeight(true) - $("#content-scroll").outerHeight(true);
    if (currentscroll == Math.round(maxscroll)) {
        if (!isBusy) {
            moredata(maxscroll, "historiallotes", ".tbody-Table-History");


        }
    }
});


function splitMessage(message:string):string {
    let arrayMessage = message.split('|');
    let htmlMessage: string = "";

    arrayMessage.forEach((m) => {
        htmlMessage = htmlMessage + m + "<br><br>"
    });

    return htmlMessage;
}