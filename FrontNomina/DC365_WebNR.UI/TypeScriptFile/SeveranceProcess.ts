/**
 * @file SeveranceProcess.ts
 * @description Módulo de Prestaciones Laborales (Severance Process).
 *              Permite gestionar procesos de cálculo de prestaciones laborales
 *              incluyendo preaviso, cesantía, vacaciones y salario de navidad.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module PrestacionesLaborales
 */

variables: {
    var option: number;
}

//Funciones
const fn = {
    /**
     * Navega a la vista para crear nuevo proceso (sin crear en BD)
     */
    CreateNew: function () {
        window.location.href = "/prestacioneslaborales/nuevo";
    },

    /**
     * Abre la vista de edición del proceso
     */
    OpenProcess: function (_id: string) {
        window.location.href = `/prestacioneslaborales/${_id}`;
    },

    /**
     * Refresca la tabla principal con los datos actualizados
     */
    RefreshTable: function () {
        $.get(location.href)
            .done(function (r) {
                var newDom = $(r);
                $('.tbody-Table-SeveranceProcess').replaceWith($('.tbody-Table-SeveranceProcess', newDom));
                fn.ReapplyRowEvents();
            });
    },

    /**
     * Reaplicar eventos a las filas después de refrescar
     */
    ReapplyRowEvents: function () {
        $('.tbody-Table-SeveranceProcess .row-app').addClass('row-clickable');
    },

    /**
     * Obtiene el ID del proceso seleccionado
     */
    GetSelectedId: function (): string | null {
        let _id: string = null;
        var contador = 0;

        $(".selectSeveranceProcess[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".SeveranceProcessIdTbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
            return null;
        } else if (contador > 1) {
            windows_message("¡Debe seleccionar solo un registro!", "info");
            return null;
        }

        return _id;
    }
}

// Event Listeners
escuchadores: {
    // Nuevo proceso de prestaciones - navega a nueva página
    $(".NewSeveranceProcess").on("click", function () {
        fn.CreateNew();
    });

    // Editar proceso de prestaciones - navega a la vista del proceso
    $(".EditSeveranceProcess").on("click", function () {
        let _id = fn.GetSelectedId();
        if (_id) {
            fn.OpenProcess(_id);
        }
    });

    // Eliminar proceso de prestaciones
    $("#DeleteSeveranceProcess").submit(function (e) {
        e.preventDefault();

        var contador: boolean = false;
        var hasCalculated: boolean = false;

        $(".selectSeveranceProcess[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador = true;
                let input = $(document.createElement('input'));
                let status = $(this).parent().parent().find(".StatusTbl").html().trim();
                input.attr("name", "ids");
                input.attr("class", "listid_severanceprocess");
                input.val($(this).parent().parent().find(".SeveranceProcessIdTbl").html().trim());

                if (status == "Calculado" || status == "Cerrado") {
                    hasCalculated = true;
                }
                $("#DeleteSeveranceProcess").append(input);
            }
        });

        if (!contador) {
            windows_message("¡Debe seleccionar un registro!", "error");
        } else {
            if (hasCalculated) {
                windows_message("¡No se pueden eliminar procesos en estado Calculado o Cerrado!", "error");
                $(".listid_severanceprocess").remove();
            } else {
                windows_message("¿Desea eliminar los procesos de prestaciones seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/prestacioneslaborales/eliminar",
                            type: "POST",
                            data: $("#DeleteSeveranceProcess").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".listid_severanceprocess").remove();
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                } else {
                                    windows_message(data.Message, data.Type);
                                    fn.RefreshTable();
                                }
                            },
                            error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectSeveranceProcess[type=checkbox]").prop('checked', false);
                        $(".listid_severanceprocess").remove();
                    }
                });
            }
        }
    });

    // Filtro de búsqueda
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-SeveranceProcess", "/prestacioneslaborales/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-SeveranceProcess", "/prestacioneslaborales/FilterOrMoreData");
        }
    });

    // Paginación con scroll infinito
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblSeveranceProcess").outerHeight(true) - $("#content-scroll").outerHeight(true);

        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "prestacioneslaborales", ".tbody-Table-SeveranceProcess");
            }
        }
    });

    // Doble clic para abrir proceso - navega a la vista del proceso
    $(document).on('dblclick', '.tbody-Table-SeveranceProcess .row-app', function (e) {
        if ($(e.target).is('input[type="checkbox"]') || $(e.target).is('label')) {
            return;
        }
        const rowId = $(this).find('.SeveranceProcessIdTbl').text().trim();
        if (!rowId) { return; }
        fn.OpenProcess(rowId);
    });

    // Aplicar estilo clickable a las filas
    $('.tbody-Table-SeveranceProcess .row-app').addClass('row-clickable');

    // Inicializar modal de auditoría
    initAuditListPage('.selectSeveranceProcess', '.SeveranceProcessIdTbl', '/prestacioneslaborales/getbyid', 'Id');
}

export { }
