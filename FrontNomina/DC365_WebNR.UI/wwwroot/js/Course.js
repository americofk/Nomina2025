/**
 * @file Course.ts
 * @description Módulo de gestión de cursos. Permite crear, editar,
 *              eliminar y administrar cursos de capacitación.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Cursos
 */
variables: {
    var option;
}
funciones: {
    //funcion abrir nuevo curso
    function funtionNewCourse(_opcion) {
        if (_opcion == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.optionform').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
            $('.margenFormmularios').addClass('ContenedorFormularios2');
            $('.margenFormmularios').removeClass('ContenedorFormularios-three');
        }
        else {
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
            $('.Showid').addClass('collapse');
        }
    }
    //cargar lista de select en formularios 
    function loadlists() {
        ListCourseType();
        ListClassRoom();
    }
    //Lista de tipo de cursos
    function ListCourseType() {
        if ($("#CourseTypeId")[0].children.length == 0) {
            $.ajax({
                url: "/cursos/Tiposdecursos",
                type: "Get",
                async: false,
                success: function (data) {
                    if (data.length > 0) {
                        $("#CourseTypeId").html('');
                        $(data).each(function () {
                            var option = $(document.createElement('option'));
                            option.text(this.Name);
                            option.val(this.CourseTypeId);
                            $("#CourseTypeId").append(option);
                        });
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    }
    //Lista de tipo de aulas o salones
    function ListClassRoom() {
        if ($("#ClassRoomId")[0].children.length == 0) {
            $.ajax({
                url: "/cursos/SalonesdeCursos",
                type: "Get",
                async: false,
                success: function (data) {
                    if (data.length > 0) {
                        $("#ClassRoomId").html('');
                        $(data).each(function () {
                            var option = $(document.createElement('option'));
                            option.text(this.Name);
                            option.val(this.ClassRoomId);
                            $("#ClassRoomId").append(option);
                        });
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    }
    ////funcion para editar curso
    //function EditCourse(Obj) {
    //    let id: string;
    //    var contador = 0;
    //    // Recorremos todos los checkbox para contar los que estan seleccionados
    //    $(".selectCourse[type=checkbox]").each(function () {
    //        if ($(this).is(":checked")) {
    //            contador++;
    //            id = $(this).parent().parent().find(".CourseIdtblcur").html().trim();
    //        }
    //    });
    //    if (contador === 0) {
    //        windows_message("Debe seleccionar un Registro!!", "error");
    //    }
    //    else if (contador > 1) {
    //        windows_message("Debe seleccionar un solo Registro!!", "error");
    //    } else {
    //        loadlists();
    //        var obj: Course = Obj.find(selected => selected.CourseId == id);
    //        option = 2;
    //        $('.Showid').removeClass('collapse');
    //        $('.setiartitulo').text('Editar cursos');
    //        AutomaticBinding(obj, "#createAndEditCourse");
    //        funtionNewCourse("open");
    //    }
    //}
}
escuchadores: {
    //cerrar nuevo  curso
    $('.OpCloseform').on('click', function () {
        funtionNewCourse("close");
    });
    //Crear nuevo  curso
    $('.NewCourse').on('click', function () {
        option = 1;
        let form = document.getElementById("createAndEditCourse");
        form.reset();
        $('.Showid').addClass('collapse');
        $('.setiartitulo').text('Nuevo cursos');
        /*  loadlists();*/
        funtionNewCourse("open");
    });
    // Variable para controlar si debe cerrar después de guardar
    var shouldCloseAfterSave = false;
    //save Course
    $("#createAndEditCourse").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $('.progreso').modal({ backdrop: 'static', keyboard: false });
            $.ajax({
                url: "/cursos/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data) {
                    $('.progreso').modal('hide');
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
                            $('.tblCourse').replaceWith($('.tblCourse', newDom));
                        });
                        windows_message(data.Message, data.Type);
                        if (shouldCloseAfterSave) {
                            let form = document.getElementById("createAndEditCourse");
                            form.reset();
                            funtionNewCourse("close");
                            shouldCloseAfterSave = false;
                        }
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    // Guardar y cerrar
    $('.btnSaveAndClose').on('click', function () {
        shouldCloseAfterSave = true;
        $("#createAndEditCourse").submit();
    });
    //eliminar
    $("#DeleteCourse").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectCourse[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "CourseId");
                    input.attr("class", "CourseId");
                    input.val($(this).parent().parent().find(".CourseIdtblcur").html().trim());
                    $(".DeleteCourse").append(input);
                }
            });
            if (!contador) {
                windows_message("Debe seleccionar un Registro!!", "error");
            }
            else {
                windows_message("¿Desea eliminar los cusos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/cursos/eliminar",
                            type: "POST",
                            data: $("#DeleteCourse").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".CourseId").remove();
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
                                        $('.tblCourse').replaceWith($('.tblCourse', newDom));
                                    });
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectCourse[type=checkbox]").prop('checked', false);
                        $(".CourseId").remove();
                    }
                });
            }
        }
    });
    //editar
    $('.EditCourse').on('click', function () {
        let _id;
        var contador = 0;
        $(".selectCourse[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".CourseIdtblcur").html().trim();
            }
        });
        if (contador === 0) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo Registro!", "info");
        }
        else {
            $.ajax({
                url: `/cursos/${_id}`,
                type: "GET",
                async: true,
                success: function (data) {
                    if (data != null) {
                        option = 2;
                        $('.Showid').removeClass('collapse');
                        $('.setiartitulo').text('Editar cursos');
                        AutomaticBinding(data, "#createAndEditCourse");
                        funtionNewCourse("open");
                        $('.optionform').removeClass('collapse');
                        $('.margenFormmularios').removeClass('ContenedorFormularios2');
                        $('.margenFormmularios').addClass('ContenedorFormularios-three');
                    }
                    else {
                        windows_message("No se encontró el código de curso", "error");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Course", "/cursos/FilterOrMoreData");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Course", "/cursos/FilterOrMoreData");
        }
    });
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblCourse").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "cursos", ".tbody-Table-Course");
            }
        }
    });
    // Habilitar doble clic en filas para editar
    enableRowDoubleClick('.tbody-Table-Course', '.CourseIdtblcur', '/cursos/{id}', function (data) {
        option = 2;
        $('.Showid').removeClass('collapse');
        $('.setiartitulo').text('Editar cursos');
        AutomaticBinding(data, "#createAndEditCourse");
        funtionNewCourse("open");
        $('.optionform').removeClass('collapse');
        $('.margenFormmularios').removeClass('ContenedorFormularios2');
        $('.margenFormmularios').addClass('ContenedorFormularios-three');
    });
    initAuditListPage('.selectCourse', '.CourseIdtblcur', '/cursos/getbyid', 'Id');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291cnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvQ291cnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQUNSLElBQUksTUFBYyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxTQUFTLEVBQUUsQ0FBQztJQUNSLDJCQUEyQjtJQUMzQixTQUFTLGdCQUFnQixDQUFDLE9BQU87UUFDN0IsSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFLENBQUM7WUFFcEIsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDNUQsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsV0FBVyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFFeEUsQ0FBQzthQUFNLENBQUM7WUFDSixDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV0QyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxTQUFTLFNBQVM7UUFDZCxjQUFjLEVBQUUsQ0FBQztRQUNqQixhQUFhLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQseUJBQXlCO0lBQ3pCLFNBQVMsY0FBYztRQUNuQixJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ0gsR0FBRyxFQUFFLHVCQUF1QjtnQkFDNUIsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsS0FBSyxFQUFFLEtBQUs7Z0JBRVosT0FBTyxFQUFFLFVBQVUsSUFBSTtvQkFFbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUNsQixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUNULElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDOUIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztnQkFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztvQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLENBQUM7YUFFSixDQUFDLENBQUM7UUFDUCxDQUFDO0lBRUwsQ0FBQztJQUVELGtDQUFrQztJQUNsQyxTQUFTLGFBQWE7UUFDbEIsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNILEdBQUcsRUFBRSx5QkFBeUI7Z0JBQzlCLElBQUksRUFBRSxLQUFLO2dCQUNYLEtBQUssRUFBRSxLQUFLO2dCQUVaLE9BQU8sRUFBRSxVQUFVLElBQUk7b0JBRW5CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDbEIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDVCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQzdCLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3JDLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7Z0JBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7b0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2FBRUosQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUVMLENBQUM7SUFFRCw2QkFBNkI7SUFDN0IsNEJBQTRCO0lBRTVCLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsOEVBQThFO0lBQzlFLDBEQUEwRDtJQUMxRCx1Q0FBdUM7SUFDdkMseUJBQXlCO0lBQ3pCLG1GQUFtRjtJQUVuRixXQUFXO0lBRVgsU0FBUztJQUVULDJCQUEyQjtJQUMzQixxRUFBcUU7SUFFckUsT0FBTztJQUNQLDhCQUE4QjtJQUU5QiwwRUFBMEU7SUFDMUUsY0FBYztJQUNkLHNCQUFzQjtJQUN0QiwwRUFBMEU7SUFDMUUscUJBQXFCO0lBQ3JCLCtDQUErQztJQUMvQyxtREFBbUQ7SUFFbkQsd0RBQXdEO0lBQ3hELG1DQUFtQztJQUNuQyxPQUFPO0lBRVAsR0FBRztBQUNQLENBQUM7QUFFRCxZQUFZLEVBQUUsQ0FBQztJQUNYLHFCQUFxQjtJQUNyQixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUMxQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQztJQUdILG9CQUFvQjtJQUNwQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUN4QixNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVgsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBb0IsQ0FBQztRQUM3RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFMUMsa0JBQWtCO1FBQ2hCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsNERBQTREO0lBQzVELElBQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0lBRWpDLGFBQWE7SUFDYixDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ0gsR0FBRyxFQUFFLGlCQUFpQjtnQkFDdEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxjQUFjLE1BQU0sRUFBRTtnQkFDbEQsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBZ0I7b0JBQzNCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQzt3QkFDdkIsSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO3dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQVM7NEJBQ25DLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO3dCQUMxQixDQUFDLENBQUMsQ0FBQzt3QkFDSCxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEMsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzs2QkFDZixJQUFJLENBQUMsVUFBVSxDQUFDOzRCQUNiLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ3pELENBQUMsQ0FBQyxDQUFDO3dCQUNQLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDekMsSUFBSSxvQkFBb0IsRUFBRSxDQUFDOzRCQUN2QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFvQixDQUFDOzRCQUM3RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQ2IsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzFCLG9CQUFvQixHQUFHLEtBQUssQ0FBQzt3QkFDakMsQ0FBQztvQkFDTCxDQUFDO2dCQUdMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO29CQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILG1CQUFtQjtJQUNuQixDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQzlCLG9CQUFvQixHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVU7SUFDVixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixJQUFJLFFBQVEsR0FBWSxLQUFLLENBQUM7WUFDOUIsd0VBQXdFO1lBQ3hFLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFFbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3pCLFFBQVEsR0FBRyxJQUFJLENBQUE7b0JBQ2YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUMzRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVyQyxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ1osZUFBZSxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRS9ELENBQUM7aUJBQ0ksQ0FBQztnQkFDRixlQUFlLENBQUMsMENBQTBDLEVBQUUsU0FBUyxFQUFFO29CQUNuRSxJQUFJLEVBQUU7d0JBQ0YsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7d0JBQzdELENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBRUgsR0FBRyxFQUFFLGtCQUFrQjs0QkFDdkIsSUFBSSxFQUFFLE1BQU07NEJBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLEVBQUU7NEJBQ3BDLEtBQUssRUFBRSxJQUFJOzRCQUNYLE9BQU8sRUFBRSxVQUFVLElBQWdCO2dDQUMvQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUM3QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0NBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztvQ0FDdkIsSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO29DQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQVM7d0NBQ25DLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO29DQUMxQixDQUFDLENBQUMsQ0FBQztvQ0FDSCxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDeEMsQ0FBQztxQ0FBTSxDQUFDO29DQUVKLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzt5Q0FDZixJQUFJLENBQUMsVUFBVSxDQUFDO3dDQUNiLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3Q0FDbEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0NBQ3pELENBQUMsQ0FBQyxDQUFDO29DQUNQLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDN0MsQ0FBQzs0QkFFTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQ0FDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzlCLENBQUM7eUJBRUosQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQ0QsUUFBUSxFQUFFO3dCQUNOLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ3pELENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFFNUIsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFFUCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUTtJQUNSLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBRXpCLElBQUksR0FBVyxDQUFDO1FBQ2hCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsOEJBQThCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDO2dCQUNYLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDakIsZUFBZSxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRS9ELENBQUM7YUFDSSxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNwQixlQUFlLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkUsQ0FBQzthQUFNLENBQUM7WUFDSixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUVILEdBQUcsRUFBRSxXQUFXLEdBQUcsRUFBRTtnQkFDckIsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBWTtvQkFDM0IsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ2YsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFFWCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUNyQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN6QyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQzt3QkFFL0MsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBRXpCLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3pDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3dCQUMvRCxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQztvQkFFckUsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLGVBQWUsQ0FBQyxtQ0FBbUMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDbEUsQ0FBQztnQkFFTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztvQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLENBQUM7YUFFSixDQUFDLENBQUM7UUFDUCxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7SUFFSCxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUM1QixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUMvQixVQUFVLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUNsRSxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbkMsSUFBSSxPQUFPLElBQUksRUFBRSxFQUFFLENBQUM7WUFDaEIsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFN0IsVUFBVSxDQUFDLHFCQUFxQixFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFFbEUsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3hCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXJELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNGLElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ1YsUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUV6RCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsNENBQTRDO0lBQzVDLG9CQUFvQixDQUNoQixxQkFBcUIsRUFDckIsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxVQUFVLElBQVk7UUFDbEIsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUMvQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3JFLENBQUMsQ0FDSixDQUFDO0lBRUYsaUJBQWlCLENBQUMsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25GLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgQ291cnNlLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlIGdlc3Rpw7NuIGRlIGN1cnNvcy4gUGVybWl0ZSBjcmVhciwgZWRpdGFyLFxyXG4gKiAgICAgICAgICAgICAgZWxpbWluYXIgeSBhZG1pbmlzdHJhciBjdXJzb3MgZGUgY2FwYWNpdGFjacOzbi5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgQ3Vyc29zXHJcbiAqL1xyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgb3B0aW9uOiBudW1iZXI7XHJcbn1cclxuXHJcbmZ1bmNpb25lczoge1xyXG4gICAgLy9mdW5jaW9uIGFicmlyIG51ZXZvIGN1cnNvXHJcbiAgICBmdW5jdGlvbiBmdW50aW9uTmV3Q291cnNlKF9vcGNpb24pIHtcclxuICAgICAgICBpZiAoX29wY2lvbiA9PSBcIm9wZW5cIikge1xyXG5cclxuICAgICAgICAgICAgJCgnLkNvbnRlbmVkb3JMaXN0RW50aXR5JykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250TmV3RW50eXRpJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcHRpb25mb3JtJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlRm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcubWFyZ2VuRm9ybW11bGFyaW9zJykuYWRkQ2xhc3MoJ0NvbnRlbmVkb3JGb3JtdWxhcmlvczInKTtcclxuICAgICAgICAgICAgJCgnLm1hcmdlbkZvcm1tdWxhcmlvcycpLnJlbW92ZUNsYXNzKCdDb250ZW5lZG9yRm9ybXVsYXJpb3MtdGhyZWUnKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLkNvbnRlbmVkb3JMaXN0RW50aXR5JykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250TmV3RW50eXRpJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlRm9ybScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2NhcmdhciBsaXN0YSBkZSBzZWxlY3QgZW4gZm9ybXVsYXJpb3MgXHJcbiAgICBmdW5jdGlvbiBsb2FkbGlzdHMoKSB7XHJcbiAgICAgICAgTGlzdENvdXJzZVR5cGUoKTtcclxuICAgICAgICBMaXN0Q2xhc3NSb29tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9MaXN0YSBkZSB0aXBvIGRlIGN1cnNvc1xyXG4gICAgZnVuY3Rpb24gTGlzdENvdXJzZVR5cGUoKSB7XHJcbiAgICAgICAgaWYgKCQoXCIjQ291cnNlVHlwZUlkXCIpWzBdLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL2N1cnNvcy9UaXBvc2RlY3Vyc29zXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdldFwiLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNDb3Vyc2VUeXBlSWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCh0aGlzLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkNvdXJzZVR5cGVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0NvdXJzZVR5cGVJZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL0xpc3RhIGRlIHRpcG8gZGUgYXVsYXMgbyBzYWxvbmVzXHJcbiAgICBmdW5jdGlvbiBMaXN0Q2xhc3NSb29tKCkge1xyXG4gICAgICAgIGlmICgkKFwiI0NsYXNzUm9vbUlkXCIpWzBdLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL2N1cnNvcy9TYWxvbmVzZGVDdXJzb3NcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0NsYXNzUm9vbUlkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGRhdGEpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWwodGhpcy5DbGFzc1Jvb21JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0NsYXNzUm9vbUlkXCIpLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vLy9mdW5jaW9uIHBhcmEgZWRpdGFyIGN1cnNvXHJcbiAgICAvL2Z1bmN0aW9uIEVkaXRDb3Vyc2UoT2JqKSB7XHJcblxyXG4gICAgLy8gICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAvLyAgICB2YXIgY29udGFkb3IgPSAwO1xyXG4gICAgLy8gICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAvLyAgICAkKFwiLnNlbGVjdENvdXJzZVt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAvLyAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAvLyAgICAgICAgICAgIGlkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkNvdXJzZUlkdGJsY3VyXCIpLmh0bWwoKS50cmltKCk7XHJcblxyXG4gICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAvLyAgICB9KTtcclxuXHJcbiAgICAvLyAgICBpZiAoY29udGFkb3IgPT09IDApIHtcclxuICAgIC8vICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAvLyAgICB9XHJcbiAgICAvLyAgICBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuXHJcbiAgICAvLyAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRGViZSBzZWxlY2Npb25hciB1biBzb2xvIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgbG9hZGxpc3RzKCk7XHJcbiAgICAvLyAgICAgICAgdmFyIG9iajogQ291cnNlID0gT2JqLmZpbmQoc2VsZWN0ZWQgPT4gc2VsZWN0ZWQuQ291cnNlSWQgPT0gaWQpO1xyXG4gICAgLy8gICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAvLyAgICAgICAgJCgnLlNob3dpZCcpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgLy8gICAgICAgICQoJy5zZXRpYXJ0aXR1bG8nKS50ZXh0KCdFZGl0YXIgY3Vyc29zJyk7XHJcblxyXG4gICAgLy8gICAgICAgIEF1dG9tYXRpY0JpbmRpbmcob2JqLCBcIiNjcmVhdGVBbmRFZGl0Q291cnNlXCIpO1xyXG4gICAgLy8gICAgICAgIGZ1bnRpb25OZXdDb3Vyc2UoXCJvcGVuXCIpO1xyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vfVxyXG59XHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vY2VycmFyIG51ZXZvICBjdXJzb1xyXG4gICAgJCgnLk9wQ2xvc2Vmb3JtJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bnRpb25OZXdDb3Vyc2UoXCJjbG9zZVwiKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL0NyZWFyIG51ZXZvICBjdXJzb1xyXG4gICAgJCgnLk5ld0NvdXJzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcHRpb24gPSAxO1xyXG5cclxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlQW5kRWRpdENvdXJzZVwiKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICQoJy5TaG93aWQnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAkKCcuc2V0aWFydGl0dWxvJykudGV4dCgnTnVldm8gY3Vyc29zJyk7XHJcblxyXG4gICAgICAvKiAgbG9hZGxpc3RzKCk7Ki9cclxuICAgICAgICBmdW50aW9uTmV3Q291cnNlKFwib3BlblwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFZhcmlhYmxlIHBhcmEgY29udHJvbGFyIHNpIGRlYmUgY2VycmFyIGRlc3B1w6lzIGRlIGd1YXJkYXJcclxuICAgIHZhciBzaG91bGRDbG9zZUFmdGVyU2F2ZSA9IGZhbHNlO1xyXG5cclxuICAgIC8vc2F2ZSBDb3Vyc2VcclxuICAgICQoXCIjY3JlYXRlQW5kRWRpdENvdXJzZVwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9jdXJzb3MvZ3VhcmRhclwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpICsgYCZvcGVyYWNpb249JHtvcHRpb259YCxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsQ291cnNlJykucmVwbGFjZVdpdGgoJCgnLnRibENvdXJzZScsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRDbG9zZUFmdGVyU2F2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZUFuZEVkaXRDb3Vyc2VcIikgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVudGlvbk5ld0NvdXJzZShcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBHdWFyZGFyIHkgY2VycmFyXHJcbiAgICAkKCcuYnRuU2F2ZUFuZENsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNob3VsZENsb3NlQWZ0ZXJTYXZlID0gdHJ1ZTtcclxuICAgICAgICAkKFwiI2NyZWF0ZUFuZEVkaXRDb3Vyc2VcIikuc3VibWl0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyXHJcbiAgICAkKFwiI0RlbGV0ZUNvdXJzZVwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdENvdXJzZVt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIkNvdXJzZUlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIkNvdXJzZUlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuQ291cnNlSWR0YmxjdXJcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5EZWxldGVDb3Vyc2VcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkRlYmUgc2VsZWNjaW9uYXIgdW4gUmVnaXN0cm8hIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIGN1c29zIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9jdXJzb3MvZWxpbWluYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVDb3Vyc2VcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkNvdXJzZUlkXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsQ291cnNlJykucmVwbGFjZVdpdGgoJCgnLnRibENvdXJzZScsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RDb3Vyc2VbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Db3Vyc2VJZFwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lZGl0YXJcclxuICAgICQoJy5FZGl0Q291cnNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAkKFwiLnNlbGVjdENvdXJzZVt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIF9pZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Db3Vyc2VJZHRibGN1clwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyBSZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsOiBgL2N1cnNvcy8ke19pZH1gLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IENvdXJzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5TaG93aWQnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoJ0VkaXRhciBjdXJzb3MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNjcmVhdGVBbmRFZGl0Q291cnNlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVudGlvbk5ld0NvdXJzZShcIm9wZW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcub3B0aW9uZm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubWFyZ2VuRm9ybW11bGFyaW9zJykucmVtb3ZlQ2xhc3MoJ0NvbnRlbmVkb3JGb3JtdWxhcmlvczInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLm1hcmdlbkZvcm1tdWxhcmlvcycpLmFkZENsYXNzKCdDb250ZW5lZG9yRm9ybXVsYXJpb3MtdGhyZWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiTm8gc2UgZW5jb250csOzIGVsIGPDs2RpZ28gZGUgY3Vyc29cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5vcHRpb25GaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbkZpbHRlckZ1bmN0aW9uKHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXInKS52YWwoKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtQ291cnNlXCIsIFwiL2N1cnNvcy9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICB0ZXh0RmlsdGVyTWFza0Z1bmN0aW9uKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1Db3Vyc2VcIiwgXCIvY3Vyc29zL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY3VycmVudHNjcm9sbCA9ICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIGxldCBtYXhzY3JvbGwgPSAkKFwiLnRibENvdXJzZVwiKS5vdXRlckhlaWdodCh0cnVlKSAtICQoXCIjY29udGVudC1zY3JvbGxcIikub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRzY3JvbGwgPT0gTWF0aC5yb3VuZChtYXhzY3JvbGwpKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBtb3JlZGF0YShtYXhzY3JvbGwsIFwiY3Vyc29zXCIsIFwiLnRib2R5LVRhYmxlLUNvdXJzZVwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYWJpbGl0YXIgZG9ibGUgY2xpYyBlbiBmaWxhcyBwYXJhIGVkaXRhclxyXG4gICAgZW5hYmxlUm93RG91YmxlQ2xpY2soXHJcbiAgICAgICAgJy50Ym9keS1UYWJsZS1Db3Vyc2UnLFxyXG4gICAgICAgICcuQ291cnNlSWR0YmxjdXInLFxyXG4gICAgICAgICcvY3Vyc29zL3tpZH0nLFxyXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhOiBDb3Vyc2UpIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgJCgnLlNob3dpZCcpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuc2V0aWFydGl0dWxvJykudGV4dCgnRWRpdGFyIGN1cnNvcycpO1xyXG4gICAgICAgICAgICBBdXRvbWF0aWNCaW5kaW5nKGRhdGEsIFwiI2NyZWF0ZUFuZEVkaXRDb3Vyc2VcIik7XHJcbiAgICAgICAgICAgIGZ1bnRpb25OZXdDb3Vyc2UoXCJvcGVuXCIpO1xyXG4gICAgICAgICAgICAkKCcub3B0aW9uZm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcubWFyZ2VuRm9ybW11bGFyaW9zJykucmVtb3ZlQ2xhc3MoJ0NvbnRlbmVkb3JGb3JtdWxhcmlvczInKTtcclxuICAgICAgICAgICAgJCgnLm1hcmdlbkZvcm1tdWxhcmlvcycpLmFkZENsYXNzKCdDb250ZW5lZG9yRm9ybXVsYXJpb3MtdGhyZWUnKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGluaXRBdWRpdExpc3RQYWdlKCcuc2VsZWN0Q291cnNlJywgJy5Db3Vyc2VJZHRibGN1cicsICcvY3Vyc29zL2dldGJ5aWQnLCAnSWQnKTtcclxufVxyXG5cclxuXHJcbiJdfQ==