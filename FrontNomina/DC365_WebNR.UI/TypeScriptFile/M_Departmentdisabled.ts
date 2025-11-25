variables: {
    var page = 1;
    var isBusy: boolean = false;
    var isempty: boolean = false;
}


const fn = {
    moredatadepartmentDisabled :function (_maxscroll: number) {

        page++;
        isBusy = true;
        $.get("/departamentoinactivos/moredata?pagenumber=" + page,
            function (data) {

                if (data != "") {

                    var allproperties = Object.getOwnPropertyNames(data[0]);
                    var nameHeader = ["ID Departamento", "Nombre del Departamento", "Trabajadores",
                        "Fecha inicial", "Fecha final", "Descripción"];

                    var newColumns = fn.helpercreatetabledepartmentDisabled(data, allproperties, "class", nameHeader, "");
                    console.log(newColumns);
                    $(".tbodyTableOne").children().last().after(newColumns);
                    $("#content-scroll").scrollTop(_maxscroll);
                }
                isBusy = false;
            });
    },

    helpercreatetabledepartmentDisabled: function (dataTable, properties, classCheck, nameHeader, prefix) {
        var filas = dataTable.length;
        var allnewColumn = "";
        var allnewRow = "";
        var index = 0;

        for (var i = 0; i < filas; i++) {
            allnewRow += "<tr class='row-app'>";
            index++;
            //var idcheck = "check-table-" + index;
            var idcheck = `${prefix}check-table-${index}`;
            var columnCheck = "<td class='cell-app check-cell-app'><input id=" + idcheck + " type='checkbox' class='check-table-app " + classCheck + "'>" +
                "<label for=" + idcheck + " class='label-cell'></label></td>";

            for (var j = 0; j < properties.length; j++) {

                var newColumn = "<td class='cell-app cell-principal " + prefix + properties[j] + "' data-title='" + nameHeader[j] + "'>" + dataTable[i][properties[j]] + "</td>";
                allnewColumn += newColumn;
            }

            allnewRow += columnCheck + allnewColumn + "</tr>";
            allnewColumn = "";
        }

        return allnewRow;
    }
}

escuchadores: {
    //eliminar departamento
    $("#deleDPDisable").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDepartment[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "ListIdDepartmentDisabled");
                    input.attr("class", "ListIdDepartmentDisabled");
                    input.val($(this).parent().parent().find(".DepartmentIdtbl").html().trim());
                    $(".deleteDepartmentDisabled").append(input);
                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los departamentos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/departamentosinactivos/eliminar",
                            type: "POST",
                            data: $("#deleDPDisable").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                    $(".ListIdDepartmentDisabled").remove();
                                } else {
                                    $.get(location.href)
                                        .done(function (r) {
                                            var newDom = $(r);
                                            $('.tblDepartmentDisabled').replaceWith($('.tblDepartmentDisabled', newDom));
                                        });
                                    $(".ListIdDepartmentDisabled").remove();
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectDepartment[type=checkbox]").prop('checked', false);
                        $(".ListIdDepartmentDisabled").remove();
                    }
                });
            }
        }
    });


    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblDepartmentDisabled").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
              /*  fn.moredatadepartmentDisabled(maxscroll);*/
                moredata(maxscroll, "departamentosinactivos", ".tbody-Table-Department-Disabled");

            }
        }
    });


    //dehabilitar departamento departamento
    $('#EnabledDepartment').on('click', function () {
        if ($(this).is(":checked")) {

            var ListId = [];
            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDepartment[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "DepartmentId");
                    input.attr("class", "DepartmentId");
                    input.val($(this).parent().parent().find(".DepartmentIdtbl").html().trim());
                    $(".updateStatusDepartment").append(input);

                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#EnabledDepartment").prop('checked', false);
            }
            else {
                windows_message("¿Desea habilitar el departamento?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                           
                            url: "/departamentosinactivos/actualizarestatus",
                            type: "POST",
                            data: $("#updateStatusDepartment").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".DepartmentId").remove();
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                } else {
                                    $.get(location.href)
                                        .done(function (r) {
                                            var newDom = $(r);
                                            $('.tblDepartmentDisabled').replaceWith($('.tblDepartmentDisabled', newDom));
                                        });
                                    $("#EnabledDepartment").prop('checked', false);
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectDepartment[type=checkbox]").prop('checked', false);
                        $("#EnabledDepartment").prop('checked', false);
                        $(".DepartmentId").remove();
                    }
                });
            }
        }
    });


    //cerrar departamentos inhabilitados
    $('.Cerrar-DepartmentDisabled').on('click', function () {
        window.location.href = "/departamentosactivos";
    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);

        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Department-Disabled", "/departamentosinactivos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Department-Disabled", "/departamentosinactivos/FilterOrMoreData");

        }
    });
}


export { }