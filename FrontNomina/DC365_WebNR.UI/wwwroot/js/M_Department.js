/**
 * @file M_Department.ts
 * @description Módulo de gestión de departamentos. Permite crear, editar,
 *              eliminar y listar departamentos de la organización.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Departamentos
 */
variables: {
    var page = 1;
    var isBusy = false;
    var option;
    var isempty = false;
}
const fn = {
    //funcion abrir nuevo usuario
    funtionNewDepartment: function (_opcion) {
        if (_opcion == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
        }
        else {
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
        }
    },
    //moredata :function (_maxscroll: number) {
    //    page++;
    //    isBusy = true;
    //    if (!isempty) {
    //        $.ajax({
    //            url: "/departamentosactivos/FilterOrMoreData?_PageNumber=" + page,
    //            type: "GET",
    //            async: true,
    //            success: function (data) {
    //                if (data != "") {
    //                    $(".tbody-Table-Department").children().last().after(data);
    //                    $("#content-scroll").scrollTop(_maxscroll);
    //                }
    //                else {
    //                    isempty = true;
    //                }
    //                isBusy = false;
    //            }, error: function (xhr) {
    //                redireccionaralLogin(xhr);
    //            }
    //        });
    //    }
    //},
    helpercreatetable: function (dataTable, properties, classCheck, nameHeader, prefix) {
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
    },
    SettingNewAndEdit: function (type) {
        if (type == "Edit") {
            option = 2;
            $('.TituloFormularios').text('Editar departamento');
            $('.Showid').removeClass('collapse');
        }
        else {
            option = 1;
            $('.TituloFormularios').text('Nuevo departamento');
            $('.Showid').addClass('collapse');
            let form = document.getElementById("createAndEditDepartment");
            form.reset();
        }
    }
};
escuchadores: {
    //cerrar nuevo departamento
    $('.OpCloseform').on('click', function () {
        $('.Showid').addClass('collapse');
        fn.funtionNewDepartment("close");
    });
    //Crear nueva departamento
    $('.NewDepartment').on('click', function () {
        fn.SettingNewAndEdit("New");
        fn.funtionNewDepartment("open");
    });
    //save departamento
    $("#createAndEditDepartment").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $.ajax({
                url: "/departamentosactivos/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data) {
                    $('.progreso').modal('hide');
                    if (data.Type == "error") {
                        FormatErrors(data);
                    }
                    else {
                        windows_message(data.Message, data.Type, {});
                        $.get(location.href)
                            .done(function (r) {
                            var newDom = $(r);
                            $('.tblDepartment').replaceWith($('.tblDepartment', newDom));
                        });
                        //let form = document.getElementById("createAndEditDepartment") as HTMLFormElement;
                        //form.reset();
                        fn.funtionNewDepartment("close");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    //funcion para editar departamento
    $('.EditDepartment').on('click', function () {
        let _id;
        var contador = 0;
        $(".selectDepartment[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".DepartmentIdtbl").html().trim();
            }
        });
        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un registro!", "info");
        }
        else {
            $.ajax({
                url: "/departamentosactivos/getbyid",
                type: "GET",
                data: {
                    Id: _id
                },
                async: true,
                success: function (data) {
                    $('.progreso').modal('hide');
                    if (data != null) {
                        AutomaticBinding(data, "#createAndEditDepartment");
                        fn.SettingNewAndEdit("Edit");
                        fn.funtionNewDepartment("open");
                    }
                    else {
                        windows_message("Error buscando datos", "error");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    //eliminar departamento
    $("#deleteDepartment").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDepartment[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "ListIdDepartment");
                    input.attr("class", "ListIdDepartment");
                    input.val($(this).parent().parent().find(".DepartmentIdtbl").html().trim());
                    $(".deleteDepartment").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar al menos un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los departamentos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/departamentosactivos/eliminar",
                            type: "POST",
                            data: $("#deleteDepartment").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                    $(".ListIdDepartment").remove();
                                }
                                else {
                                    $(".ListIdDepartment").remove();
                                    $.get(location.href)
                                        .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblDepartment').replaceWith($('.tblDepartment', newDom));
                                    });
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectDepartment[type=checkbox]").prop('checked', false);
                        $(".ListIdDepartment").remove();
                    }
                });
            }
        }
    });
    //Proceso de detección del movimiento del scroll para aplicar la paginación
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblDepartment").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "departamentosactivos", ".tbody-Table-Department");
            }
        }
    });
    //dehabilitar departamento departamento
    $('#DisebleDepartment').on('click', function () {
        if (!$(this).is(":checked")) {
            var ListId = [];
            var contador = false;
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
                $("#DisebleDepartment").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar los departamentos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/departamentosactivos/actualizarestatus",
                            type: "POST",
                            data: $("#updateStatusDepartment").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".DepartmentId").remove();
                                if (data.Type == "error") {
                                    var _errors = "";
                                    data.Errors.forEach(function (x) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                }
                                else {
                                    $.get(location.href)
                                        .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblDepartment').replaceWith($('.tblDepartment', newDom));
                                    });
                                    windows_message(data.Message, data.Type);
                                    $("#DisebleDepartment").prop('checked', true);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectDepartment[type=checkbox]").prop('checked', false);
                        $("#DisebleDepartment").prop('checked', true);
                        $(".DepartmentId").remove();
                    }
                });
            }
        }
    });
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilterMask').val() != "") {
            Datafilter(".tbody-Table-Department", "/departamentosactivos/FilterOrMoreData");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Department", "/departamentosactivos/FilterOrMoreData");
        }
    });
    // Habilitar doble clic en filas para editar
    enableRowDoubleClick('.tbody-Table-Department', '.DepartmentIdtbl', '/departamentosactivos/getbyid', function (data) {
        AutomaticBinding(data, "#createAndEditDepartment");
        fn.SettingNewAndEdit("Edit");
        fn.funtionNewDepartment("open");
    }, 'Id');
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9EZXBhcnRtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvTV9EZXBhcnRtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQUNSLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNiLElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQztJQUM1QixJQUFJLE1BQWMsQ0FBQztJQUNuQixJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7QUFDakMsQ0FBQztBQUVELE1BQU0sRUFBRSxHQUFHO0lBQ1AsNkJBQTZCO0lBQzdCLG9CQUFvQixFQUFFLFVBQVUsT0FBTztRQUNuQyxJQUFJLE9BQU8sSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUVwQixDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsQ0FBQzthQUFNLENBQUM7WUFDSixDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBMkM7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LENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBRVAsQ0FBQztRQUNMLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztJQUVILENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQzVCLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7WUFDbkMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLHdDQUF3QyxDQUFDLENBQUM7UUFDcEYsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ25DLElBQUksT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ2hCLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1FBRXBGLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILDRDQUE0QztJQUM1QyxvQkFBb0IsQ0FDaEIseUJBQXlCLEVBQ3pCLGtCQUFrQixFQUNsQiwrQkFBK0IsRUFDL0IsVUFBVSxJQUFpQjtRQUN2QixnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUMsRUFDRCxJQUFJLENBQ1AsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgTV9EZXBhcnRtZW50LnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlIGdlc3Rpw7NuIGRlIGRlcGFydGFtZW50b3MuIFBlcm1pdGUgY3JlYXIsIGVkaXRhcixcclxuICogICAgICAgICAgICAgIGVsaW1pbmFyIHkgbGlzdGFyIGRlcGFydGFtZW50b3MgZGUgbGEgb3JnYW5pemFjacOzbi5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgRGVwYXJ0YW1lbnRvc1xyXG4gKi9cclxuXHJcbnZhcmlhYmxlczoge1xyXG4gICAgdmFyIHBhZ2UgPSAxO1xyXG4gICAgdmFyIGlzQnVzeTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdmFyIG9wdGlvbjogbnVtYmVyO1xyXG4gICAgdmFyIGlzZW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxufVxyXG5cclxuY29uc3QgZm4gPSB7XHJcbiAgICAvL2Z1bmNpb24gYWJyaXIgbnVldm8gdXN1YXJpb1xyXG4gICAgZnVudGlvbk5ld0RlcGFydG1lbnQgOmZ1bmN0aW9uIChfb3BjaW9uKSB7XHJcbiAgICAgICAgaWYgKF9vcGNpb24gPT0gXCJvcGVuXCIpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL21vcmVkYXRhIDpmdW5jdGlvbiAoX21heHNjcm9sbDogbnVtYmVyKSB7XHJcbiAgICAvLyAgICBwYWdlKys7XHJcbiAgICAvLyAgICBpc0J1c3kgPSB0cnVlO1xyXG4gICAgLy8gICAgaWYgKCFpc2VtcHR5KSB7XHJcbiAgICAvLyAgICAgICAgJC5hamF4KHtcclxuICAgIC8vICAgICAgICAgICAgdXJsOiBcIi9kZXBhcnRhbWVudG9zYWN0aXZvcy9GaWx0ZXJPck1vcmVEYXRhP19QYWdlTnVtYmVyPVwiICsgcGFnZSxcclxuICAgIC8vICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgIC8vICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBcIlwiKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICQoXCIudGJvZHktVGFibGUtRGVwYXJ0bWVudFwiKS5jaGlsZHJlbigpLmxhc3QoKS5hZnRlcihkYXRhKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbFRvcChfbWF4c2Nyb2xsKTtcclxuICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGlzZW1wdHkgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgLy8gICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgIFxyXG4gICAgLy99LFxyXG5cclxuICAgIGhlbHBlcmNyZWF0ZXRhYmxlIDpmdW5jdGlvbiAoZGF0YVRhYmxlLCBwcm9wZXJ0aWVzLCBjbGFzc0NoZWNrLCBuYW1lSGVhZGVyLCBwcmVmaXgpIHtcclxuICAgICAgICB2YXIgZmlsYXMgPSBkYXRhVGFibGUubGVuZ3RoO1xyXG4gICAgICAgIHZhciBhbGxuZXdDb2x1bW4gPSBcIlwiO1xyXG4gICAgICAgIHZhciBhbGxuZXdSb3cgPSBcIlwiO1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsYXM7IGkrKykge1xyXG4gICAgICAgICAgICBhbGxuZXdSb3cgKz0gXCI8dHIgY2xhc3M9J3Jvdy1hcHAnPlwiO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAvL3ZhciBpZGNoZWNrID0gXCJjaGVjay10YWJsZS1cIiArIGluZGV4O1xyXG4gICAgICAgICAgICB2YXIgaWRjaGVjayA9IGAke3ByZWZpeH1jaGVjay10YWJsZS0ke2luZGV4fWA7XHJcbiAgICAgICAgICAgIHZhciBjb2x1bW5DaGVjayA9IFwiPHRkIGNsYXNzPSdjZWxsLWFwcCBjaGVjay1jZWxsLWFwcCc+PGlucHV0IGlkPVwiICsgaWRjaGVjayArIFwiIHR5cGU9J2NoZWNrYm94JyBjbGFzcz0nY2hlY2stdGFibGUtYXBwIFwiICsgY2xhc3NDaGVjayArIFwiJz5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxsYWJlbCBmb3I9XCIgKyBpZGNoZWNrICsgXCIgY2xhc3M9J2xhYmVsLWNlbGwnPjwvbGFiZWw+PC90ZD5cIjtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcHJvcGVydGllcy5sZW5ndGg7IGorKykge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBuZXdDb2x1bW4gPSBcIjx0ZCBjbGFzcz0nY2VsbC1hcHAgY2VsbC1wcmluY2lwYWwgXCIgKyBwcmVmaXggKyBwcm9wZXJ0aWVzW2pdICsgXCInIGRhdGEtdGl0bGU9J1wiICsgbmFtZUhlYWRlcltqXSArIFwiJz5cIiArIGRhdGFUYWJsZVtpXVtwcm9wZXJ0aWVzW2pdXSArIFwiPC90ZD5cIjtcclxuICAgICAgICAgICAgICAgIGFsbG5ld0NvbHVtbiArPSBuZXdDb2x1bW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFsbG5ld1JvdyArPSBjb2x1bW5DaGVjayArIGFsbG5ld0NvbHVtbiArIFwiPC90cj5cIjtcclxuICAgICAgICAgICAgYWxsbmV3Q29sdW1uID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxuZXdSb3c7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldHRpbmdOZXdBbmRFZGl0IDpmdW5jdGlvbiAodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJFZGl0XCIpIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgJCgnLlRpdHVsb0Zvcm11bGFyaW9zJykudGV4dCgnRWRpdGFyIGRlcGFydGFtZW50bycpO1xyXG4gICAgICAgICAgICAkKCcuU2hvd2lkJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb24gPSAxO1xyXG4gICAgICAgICAgICAkKCcuVGl0dWxvRm9ybXVsYXJpb3MnKS50ZXh0KCdOdWV2byBkZXBhcnRhbWVudG8nKTtcclxuICAgICAgICAgICAgJCgnLlNob3dpZCcpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZUFuZEVkaXREZXBhcnRtZW50XCIpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAvL2NlcnJhciBudWV2byBkZXBhcnRhbWVudG9cclxuICAgICQoJy5PcENsb3NlZm9ybScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgZm4uZnVudGlvbk5ld0RlcGFydG1lbnQoXCJjbG9zZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ3JlYXIgbnVldmEgZGVwYXJ0YW1lbnRvXHJcbiAgICAkKCcuTmV3RGVwYXJ0bWVudCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHsgICAgICAgIFxyXG4gICAgICAgIGZuLlNldHRpbmdOZXdBbmRFZGl0KFwiTmV3XCIpO1xyXG4gICAgICAgIGZuLmZ1bnRpb25OZXdEZXBhcnRtZW50KFwib3BlblwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vc2F2ZSBkZXBhcnRhbWVudG9cclxuICAgICQoXCIjY3JlYXRlQW5kRWRpdERlcGFydG1lbnRcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL2RlcGFydGFtZW50b3NhY3Rpdm9zL2d1YXJkYXJcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSArIGAmb3BlcmFjaW9uPSR7b3B0aW9ufWAsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YmxEZXBhcnRtZW50JykucmVwbGFjZVdpdGgoJCgnLnRibERlcGFydG1lbnQnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGVBbmRFZGl0RGVwYXJ0bWVudFwiKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5mdW50aW9uTmV3RGVwYXJ0bWVudChcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9mdW5jaW9uIHBhcmEgZWRpdGFyIGRlcGFydGFtZW50b1xyXG4gICAgJCgnLkVkaXREZXBhcnRtZW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBfaWQ6IHN0cmluZztcclxuICAgICAgICB2YXIgY29udGFkb3IgPSAwO1xyXG4gICAgICAgICQoXCIuc2VsZWN0RGVwYXJ0bWVudFt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIF9pZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5EZXBhcnRtZW50SWR0YmxcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT09IDApIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9kZXBhcnRhbWVudG9zYWN0aXZvcy9nZXRieWlkXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJZDogX2lkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogSURlcGFydG1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNjcmVhdGVBbmRFZGl0RGVwYXJ0bWVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2V0dGluZ05ld0FuZEVkaXQoXCJFZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5mdW50aW9uTmV3RGVwYXJ0bWVudChcIm9wZW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRXJyb3IgYnVzY2FuZG8gZGF0b3NcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vZWxpbWluYXIgZGVwYXJ0YW1lbnRvXHJcbiAgICAkKFwiI2RlbGV0ZURlcGFydG1lbnRcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3REZXBhcnRtZW50W3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiTGlzdElkRGVwYXJ0bWVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJMaXN0SWREZXBhcnRtZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRGVwYXJ0bWVudElkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZGVsZXRlRGVwYXJ0bWVudFwiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgYWwgbWVub3MgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyBkZXBhcnRhbWVudG9zIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvZGVwYXJ0YW1lbnRvc2FjdGl2b3MvZWxpbWluYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNkZWxldGVEZXBhcnRtZW50XCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkxpc3RJZERlcGFydG1lbnRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5MaXN0SWREZXBhcnRtZW50XCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRGVwYXJ0bWVudCcpLnJlcGxhY2VXaXRoKCQoJy50YmxEZXBhcnRtZW50JywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0RGVwYXJ0bWVudFt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkxpc3RJZERlcGFydG1lbnRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1Byb2Nlc28gZGUgZGV0ZWNjacOzbiBkZWwgbW92aW1pZW50byBkZWwgc2Nyb2xsIHBhcmEgYXBsaWNhciBsYSBwYWdpbmFjacOzblxyXG4gICAgJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50c2Nyb2xsID0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgbGV0IG1heHNjcm9sbCA9ICQoXCIudGJsRGVwYXJ0bWVudFwiKS5vdXRlckhlaWdodCh0cnVlKSAtICQoXCIjY29udGVudC1zY3JvbGxcIikub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRzY3JvbGwgPT0gTWF0aC5yb3VuZChtYXhzY3JvbGwpKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBtb3JlZGF0YShtYXhzY3JvbGwsIFwiZGVwYXJ0YW1lbnRvc2FjdGl2b3NcIixcIi50Ym9keS1UYWJsZS1EZXBhcnRtZW50XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9kZWhhYmlsaXRhciBkZXBhcnRhbWVudG8gZGVwYXJ0YW1lbnRvXHJcbiAgICAkKCcjRGlzZWJsZURlcGFydG1lbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgdmFyIExpc3RJZCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0RGVwYXJ0bWVudFt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIkRlcGFydG1lbnRJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJEZXBhcnRtZW50SWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5EZXBhcnRtZW50SWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi51cGRhdGVTdGF0dXNEZXBhcnRtZW50XCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjRGlzZWJsZURlcGFydG1lbnRcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBpbmhhYmlsaXRhciBsb3MgZGVwYXJ0YW1lbnRvcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9kZXBhcnRhbWVudG9zYWN0aXZvcy9hY3R1YWxpemFyZXN0YXR1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI3VwZGF0ZVN0YXR1c0RlcGFydG1lbnRcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkRlcGFydG1lbnRJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibERlcGFydG1lbnQnKS5yZXBsYWNlV2l0aCgkKCcudGJsRGVwYXJ0bWVudCcsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGlzZWJsZURlcGFydG1lbnRcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3REZXBhcnRtZW50W3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGlzZWJsZURlcGFydG1lbnRcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkRlcGFydG1lbnRJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLm9wdGlvbkZpbHRlcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb3B0aW9uRmlsdGVyRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgaWYgKCQoJy50ZXh0RmlsdGVyTWFzaycpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1EZXBhcnRtZW50XCIsIFwiL2RlcGFydGFtZW50b3NhY3Rpdm9zL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRleHRGaWx0ZXJNYXNrJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtRGVwYXJ0bWVudFwiLCBcIi9kZXBhcnRhbWVudG9zYWN0aXZvcy9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYWJpbGl0YXIgZG9ibGUgY2xpYyBlbiBmaWxhcyBwYXJhIGVkaXRhclxyXG4gICAgZW5hYmxlUm93RG91YmxlQ2xpY2soXHJcbiAgICAgICAgJy50Ym9keS1UYWJsZS1EZXBhcnRtZW50JyxcclxuICAgICAgICAnLkRlcGFydG1lbnRJZHRibCcsXHJcbiAgICAgICAgJy9kZXBhcnRhbWVudG9zYWN0aXZvcy9nZXRieWlkJyxcclxuICAgICAgICBmdW5jdGlvbiAoZGF0YTogSURlcGFydG1lbnQpIHtcclxuICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNjcmVhdGVBbmRFZGl0RGVwYXJ0bWVudFwiKTtcclxuICAgICAgICAgICAgZm4uU2V0dGluZ05ld0FuZEVkaXQoXCJFZGl0XCIpO1xyXG4gICAgICAgICAgICBmbi5mdW50aW9uTmV3RGVwYXJ0bWVudChcIm9wZW5cIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnSWQnXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgeyB9Il19