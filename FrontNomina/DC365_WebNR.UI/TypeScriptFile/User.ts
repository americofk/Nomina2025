

variables: {
    var defaultimage: string = "/Images/Dashboard/default_perfil.png";
    var option: number;
}

//Arreglo de funciones
const fn = {
    //Configurar elementos del dom al editar o crear nuevo
    EditAndNewSettings: function (option) {
        if (option == "edit") {
            $('.setiartitulo').text("Editar usuario");
            $("#Alias").attr("readonly", "readonly");
            $("#Email").attr("readonly", "readonly");
            /*            $("#Email").prop('disabled', true);*/
            $('.Contempresa').removeClass('collapse');
            $('.contImputDatosPersonalesFoto').removeClass('collapse');
            fn.funtionNewAndEditUsers("open");
        }
        else {
            $('.setiartitulo').text("Nuevo usuario");
            $("#Alias").removeAttr("readonly");
            $("#Email").removeAttr("readonly");
            $('.contImputDatosPersonalesFoto').addClass('collapse');
            $('.Contempresa').addClass('collapse');
            fn.funtionNewAndEditUsers("open");

        }
    },

    //funcion abrir nuevo usuario
    funtionNewAndEditUsers: function (_opcion) {
        if (_opcion == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');

        } else {
            $('.contendorRolandCompaies').addClass('collapse');
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
        }
    },

    //Limpia el formulario de guardar y editar
    ClearImput: function () {
        let form: HTMLFormElement;
        form = document.getElementById("CreateAndEditUser") as HTMLFormElement;
        form.reset();
    },

    ////funtion crear y editar usuarios
    //CreateAndEditUsers: function () {

    //},

    //FuntionModelUsers: function () {
    //    let ElevationType: string = "2";
    //    let _CompanyDefaultId: string;
    //    if ($('.CompanyDefaultId').val() == null)
    //        _CompanyDefaultId = "";
    //    else
    //        _CompanyDefaultId = $('.CompanyDefaultId').val().toString();

    //    if ($(".ElevationType").is(":checked")) {
    //        ElevationType = "0";
    //    }
    //    var ModelUser: IUsers =
    //    {
    //        Name: $('.Name').val().toString(),
    //        Alias: $('.Alias').val().toString(),
    //        Email: $('.Email').val().toString(),
    //        FormatCodeId: $('.FormatCodeId').val().toString(),
    //        ElevationType: ElevationType,
    //        CompanyDefaultId: _CompanyDefaultId
    //    };

    //    return ModelUser;
    //},

    SearchRoltoUsers: function () {
        $.ajax({
            url: "/usuarios/BuscarRolUsuario",
            type: "GET",
            data: {
                Alias: $('#Alias').val().toString()
            },
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $("#AllTableRol").html('');
                    $("#AllTableRol").append(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    SearchCompanytoUsers: function () {
        $.ajax({
            url: "/usuarios/BuscarEmpresasUsuario",
            type: "GET",
            data: {
                Alias: $('#Alias').val().toString()
            },
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $("#AllTableCompany").html('');
                    $("#AllTableCompany").append(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    SearchCompaniesDropDownList: function (_id: string) {
        $.ajax({
            url: "/usuarios/BuscarListaEmpresa",
            type: "GET",
            data: {
                Alias: _id
            },
            async: false,

            success: function (data) {
                $(".CompanyDefaultId").html('');
                if (data.length > 0) {
                    var option = $(document.createElement('option'));
                    option.text("Seleccione...");
                    option.val("");
                    $(".CompanyDefaultId").append(option);

                    $(data).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.CompanyName);
                        option.val(this.companyId);
                        $(".CompanyDefaultId").append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });
    },

    SearchImageUser: function (_alias: string) {
        $.ajax({
            url: "/usuarios/descargarimagen",
            type: "GET",
            data: {
                Alias: _alias
            },
            async: true,
            success: function (data: ResponseUI) {
                if (data.Message != "") {
                    $("#FotoperfilDP").attr("src", data.Message);
                }
                else {
                    $("#FotoperfilDP").attr("src", defaultimage);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }

}


escuchadores: {
    //Crear nuevo usuario
    $('.NewUser').on('click', function () {
        option = 1;
        $("#FotoperfilDP").attr("src", defaultimage);
        fn.ClearImput();
        fn.EditAndNewSettings("new");
    });

    //Editar usuario
    $(".EditUsers").on("click", function () {
        let id: string;
        let contador: number = 0;

        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectUsers[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                if (contador == 2) {
                    windows_message("¡Debe seleccionar un solo registro!", "error");
                    return false;
                }

                id = $(this).parent().parent().find(".Aliastbl").html().trim();
            }
        });

        if (contador != 2) {
            if (contador == 0) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {

                $.ajax({
                    url: `/usuarios/${id}`,
                    type: "GET",
                    async: true,
                    success: function (data: IUsers) {
                        $('.progreso').modal('hide');

                        if (data != null) {
                            option = 2;

                            fn.SearchCompaniesDropDownList(data.Alias);
                            fn.SearchImageUser(data.Alias);
                            fn.EditAndNewSettings("edit");

                            AutomaticBinding(data, "#CreateAndEditUser");

                            if (!data.ElevationTypeBool) {
                                //$('#ElevationType').prop("checked", true);
                                $('.contendorRolandCompaies').removeClass('collapse');
                                fn.SearchRoltoUsers();
                                fn.SearchCompanytoUsers();
                            }
                            else {
                                //$('#ElevationType').prop("checked", false);
                                $('.contendorRolandCompaies').addClass('collapse');
                            }

                        } else {
                            windows_message("No se encontró el usuario", "error");
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
    });

    $('.OpCloseform').on('click', function () {
        fn.funtionNewAndEditUsers("close");
    });

    $('#CreateAndEditUser').submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();

            $('.progreso').modal({ backdrop: 'static', keyboard: false });
            $.ajax({
                url: "/usuarios/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data: ResponseUI) {
                    $('.progreso').modal('hide');
                    if (data.Type == "error") {
                        FormatErrors(data);
                    } else {
                        option = 2;
                        fn.EditAndNewSettings("edit");

                        if (!$('.ElevationType').is(":checked")) {
                            $('.contendorRolandCompaies').removeClass('collapse');
                            fn.SearchRoltoUsers();
                            fn.SearchCompanytoUsers();
                        } else {
                            $('.contendorRolandCompaies').addClass('collapse');
                        }
                        $.get(location.href)
                            .done(function (r) {
                                var newDom = $(r);
                                $('.tblUser').replaceWith($('.tblUser', newDom));
                            });
                        windows_message(data.Message, data.Type);
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });

    // mostrar modal de todas las empresas
    $('.ShowModCompanies').on('click', function () {
        $.ajax({
            url: "/usuarios/modalempresas",
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".ModCompanies").html('');
                    $(".ModCompanies").append(data);

                    //*****************Form****************************
                    //guardar empresas de usuario
                    $('#SaveUserCompanyForm').submit(function (e) {
                        e.preventDefault();
                        let contador: number = 0;
                        // Recorremos todos los checkbox para contar los que estan seleccionados
                        $(".selectOptionCompanies[type=checkbox]").each(function () {
                            if ($(this).is(":checked")) {

                                let input = $(document.createElement('input'));
                                input.attr("name", `companies[${contador}].companyId`);
                                input.attr("class", "automatic_input_emp");
                                input.val($(this).parent().parent().find(".companyIdtbl").html().trim());
                                $("#SaveUserCompanyForm").append(input);

                                input = $(document.createElement('input'));
                                input.attr("name", `companies[${contador}].Alias`);
                                input.attr("class", "automatic_input_emp");
                                input.val($("#Alias").val().toString());
                                $("#SaveUserCompanyForm").append(input);

                                contador++;
                            }
                        });

                        if (!contador) {
                            windows_message("¡Debe seleccionar al menos un registro!", "error");
                        }
                        else {
                            $.ajax({
                                url: "/usuarios/guardarEmpresas",
                                type: "POST",
                                data: $("#SaveUserCompanyForm").serialize(),
                                async: true,
                                success: function (data: ResponseUI) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        $(".automatic_input_emp").remove();
                                    } else {
                                        fn.SearchCompanytoUsers();
                                        fn.SearchCompaniesDropDownList($("#Alias").val().toString());
                                        $('.ModCompanies').modal("hide")
                                        $('.selectOptionCompanies').prop('checked', false);
                                        windows_message(data.Message, data.Type);
                                        $(".automatic_input_emp").remove();
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        }
                    });


                   
                        $(".BuscartblCompanies").keyup(function () {
                            var _this = this;
                            // Show only matching TR, hide rest of them
                            $.each($(".tblCompanie tbody tr"), function () {
                                if ($(this).text().toLowerCase().indexOf($(_this).val().toString().toLowerCase()) === -1)
                                    $(this).hide();
                                else
                                    $(this).show();
                            });
                        });


                    //select all companies
                    $("#check-table-AsigCust").on("click", function () {
                        if ($(this).is(":checked")) {
                            $(".selectOptionCompanies[type=checkbox]").prop('checked', true);
                        } else {
                            $(".selectOptionCompanies[type=checkbox]").prop('checked', false);

                        }
                    });

                  
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });

        $('.ModCompanies').modal('show');
    });

    // mostrar modal de todos las opciones del menu
    $('.showRoles').on('click', function () {
        $.ajax({
            url: "/usuarios/modalroles",
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".ModAsigRoles").html('');
                    $(".ModAsigRoles").append(data);

                    //Opción para alternar entre los roles de ver, editar y eliminar, según se marquen
                    //**********************************************
                    $('.clickCheckver').on('click', function () {
                        let estado = $(this).find(".idCheckver").is(":checked");
                        if (estado) {
                            $(this).parent().parent().find(".idCheckeditar").prop('checked', !estado)
                            $(this).parent().parent().find(".idCheckeliminar").prop('checked', !estado)
                        }
                    });

                    $('.clickCheckeditar').on('click', function () {
                        let estado = $(this).find(".idCheckeditar").is(":checked");
                        if (estado) {
                            $(this).parent().parent().find(".idCheckver").prop('checked', !estado)
                            $(this).parent().parent().find(".idCheckeliminar").prop('checked', !estado)
                        }

                    });

                    $('.clickCheckeliminar').on('click', function () {
                        let estado = $(this).find(".idCheckeliminar").is(":checked");
                        if (estado) {
                            $(this).parent().parent().find(".idCheckver").prop('checked', !estado)
                            $(this).parent().parent().find(".idCheckeditar").prop('checked', !estado)
                        }
                    });
                    //*************************************************

                    //*****************Form****************************
                    //guardar roles de usuario
                    $('#SaveUserRolForm').submit(function (e) {
                        e.preventDefault();
                        let contador: number = 0;
                        // Recorremos todos los checkbox para contar los que estan seleccionados
                        $(".selectAsigRol[type=checkbox]").each(function () {
                            if ($(this).is(":checked")) {

                                let input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].MenuId`);
                                input.attr("class", "automatic_input");
                                input.val($(this).parent().parent().find(".MenuIdtblrol").html().trim());
                                $("#SaveUserRolForm").append(input);


                                input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].Alias`);
                                input.attr("class", "automatic_input");
                                input.val($('#Alias').val().toString());
                                $("#SaveUserRolForm").append(input);


                                input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].PrivilegeView`);
                                input.attr("class", "automatic_input");
                                input.attr("type", "checkbox");
                                $("#SaveUserRolForm").append(input);
                                input.prop("checked", $(this).parent().parent().find(".idCheckver").is(":checked"));
                                input.val(($(this).parent().parent().find(".idCheckver").is(":checked")).toString());


                                input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].PrivilegeEdit`);
                                input.attr("class", "automatic_input");
                                input.attr("type", "checkbox");
                                $("#SaveUserRolForm").append(input);
                                input.prop("checked", $(this).parent().parent().find(".idCheckeditar").is(":checked"));
                                input.val(($(this).parent().parent().find(".idCheckeditar").is(":checked")).toString());


                                input = $(document.createElement('input'));
                                input.attr("type", "checkbox");
                                input.attr("name", `roles[${contador}].PrivilegeDelete`);
                                input.attr("class", "automatic_input");
                                $("#SaveUserRolForm").append(input);
                                //input.prop("checked", $(this).parent().parent().find(".idCheckeliminar").is(":checked"));
                                input.prop("checked", $(this).parent().parent().find(".idCheckeliminar").is(":checked"));
                                input.val(($(this).parent().parent().find(".idCheckeliminar").is(":checked")).toString());

                                contador++;
                            }

                        });

                        if (contador == 0) {
                            windows_message("¡Debe seleccionar al menos un registro!", "error");
                        }
                        else {
                            $.ajax({
                                url: "/usuarios/guardarRol",
                                type: "POST",
                                data: $(this).serialize(),
                                async: true,
                                success: function (data: ResponseUI) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        $(".automatic_input").remove();
                                    } else {
                                        windows_message(data.Message, data.Type);
                                        fn.SearchRoltoUsers();
                                        $('.ModAsigRoles').modal("hide");
                                        /*$(".tbodyTableMenu").load(location.href + " .tbodyTableMenu>*", "");*/

                                        $(".automatic_input").remove();
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        }
                    });

                    $(".Buscartblroles").keyup(function () {
                        var _this = this;
                        // Show only matching TR, hide rest of them
                        $.each($(".tblroles-para-asignar tbody tr"), function () {
                            if ($(this).text().toLowerCase().indexOf($(_this).val().toString().toLowerCase()) === -1)
                                $(this).hide();
                            else
                                $(this).show();
                        });
                    });

                    //select all rols
                    $(".selectOptionCompaniesAll").on("click", function () {
                        if ($(this).is(":checked")) {
                            $(".selectAsigRol[type=checkbox]").prop('checked', true);
                        } else {
                            $(".selectAsigRol[type=checkbox]").prop('checked', false);

                        }
                    });
                    
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
        $('.ModAsigRoles').modal('show');
    });

    $("#Name").change(function (e) {
        $(this).val(Firtscapitalletter($(this).val().toString()));
    });

    $("#Email").change(function (e) {
        $(this).val(Mayuscula($(this).val().toString()));
    });

    $("#Alias").change(function (e) {
        $(this).val(Mayuscula($(this).val().toString()));
    });


    //*****************Form Delete****************************
    //Eliminar roles asignados a un usuario
    $('#DeleteUserRolForm').submit(function (e) {
        e.preventDefault();
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selecRolAsignados[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                let input = $(document.createElement('input'));
                input.attr("name", `roles`);
                input.attr("class", "automatic_input_del");
                input.val($(this).parent().parent().find(".MenuIdAssignedtbl").html().trim());
                $("#DeleteUserRolForm").append(input);

                contador = true;
            }
        });

        if (!contador) {
            windows_message("¡Debe seleccionar al menos un registro!", "error");
        }
        else {
            windows_message("¿Desea eliminar roles asignadas?", "confirm", {
                onOk: function () {
                    $(".AliasForRole").val($('#Alias').val().toString());
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/usuarios/eliminarRolesAsignadas",
                        type: "POST",
                        data: $("#DeleteUserRolForm").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            } else {
                                fn.SearchRoltoUsers();
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                    $(".automatic_input_del").remove();
                },
                onCancel: function () {
                    $(".selecRolAsignados[type=checkbox]").prop('checked', false);
                    $(".automatic_input_del").remove();
                }
            });            
        }
    });


    //*****************Form Delete****************************
    //Eliminar empresas asignada a un  usuario
    $('#DeleteUserCompanyForm').submit(function (e) {
        e.preventDefault();
        let contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectCompaniesAssigned[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                let input = $(document.createElement('input'));
                input.attr("name", `companies`);
                input.attr("class", "automatic_input_del_emp");
                input.val($(this).parent().parent().find(".companyIdAsigtbl").html().trim());
                $("#DeleteUserCompanyForm").append(input);

                contador = true;
            }
        });

        if (!contador) {
            windows_message("¡Debe seleccionar un Registro!", "error");
        }
        else {
            windows_message("¿Desea eliminar empresas asignadas?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $(".AliasForCompany").val($('#Alias').val().toString());
                    $.ajax({
                        url: "/usuarios/eliminarEmpresasAsignadas",
                        type: "POST",
                        data: $("#DeleteUserCompanyForm").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            } else {
                                fn.SearchCompanytoUsers();
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                    $(".automatic_input_del_emp").remove();
                },
                onCancel: function () {
                    $(".selectCompaniesAssigned[type=checkbox]").prop('checked', false);
                    $(".automatic_input_del_emp").remove();
                }
            });
        }
    });


    //cargar imagen de usuario
    $(".Image").change(function (e) {
        let _dato = this as HTMLInputElement;
        if ($('#Alias').val() == null) {
            windows_message("El usuario debe tener un alias", "error");
        }
        else {
            if (_dato.files != null) {
                let originalform: HTMLFormElement;
                originalform = document.querySelector("#save-userimages-form");

                let dataform = new FormData(originalform);
                dataform.append("Alias", $('#Alias').val().toString());

                $.ajax({
                    url: "/usuarios/cargarimagen",
                    type: "POST",
                    data: dataform,
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function (data: ResponseUI) {
                        if (data.Type == "error") {
                            FormatErrors(data);
                            $('.progreso').modal('hide');
                        } else {
                            $("#FotoperfilDP").attr("src", data.Message);
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
    });


    $("#toggle-rol").click(function () {
        let value = $(this).attr("data-value").toString();
        if (value == "1") {
            $(this).attr("data-value", "2");
            $(this).removeClass("fa-angle-up");
            $(this).addClass("fa-angle-down");
            $("#rol-container-toggle").addClass("collapse");
        }
        else {
            $(this).attr("data-value", "1");
            $(this).addClass("fa-angle-up");
            $(this).removeClass("fa-angle-down");
            $("#rol-container-toggle").removeClass("collapse");
        }
    });

    $("#toggle-company").click(function () {
        let value = $(this).attr("data-value").toString();
        if (value == "1") {
            $(this).attr("data-value", "2");
            $(this).removeClass("fa-angle-up");
            $(this).addClass("fa-angle-down");
            $("#companies-container-toggle").addClass("collapse");
        }
        else {
            $(this).attr("data-value", "1");
            $(this).addClass("fa-angle-up");
            $(this).removeClass("fa-angle-down");
            $("#companies-container-toggle").removeClass("collapse");
        }
    });


    //eliminar usuario
    $("#DeleteUser").submit(function (e) {
        e.preventDefault();
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectUsers[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador = true;
                let input = $(document.createElement('input'));
                input.attr("name", `users`);
                input.attr("class", "automatic_input_user");
                input.val($(this).parent().parent().find(".Aliastbl").html().trim());
                $("#DeleteUser").append(input);
            }
        });

        if (!contador) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else {
            windows_message("¿Desea eliminar usuarios seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({
                        url: "/usuarios/eliminar",
                        type: "POST",
                        data: $("#DeleteUser").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            } else {
                                $.get(location.href)
                                    .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblUser').replaceWith($('.tblUser', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                    $(".automatic_input_user").remove();
                },
                onCancel: function () {
                    $(".selectUsers[type=checkbox]").prop('checked', false);
                    $(".automatic_input_user").remove();
                }
            });
        }
    });

    //Código para mostrar la ayuda
    $("#id-help-user").on("click", function () {
        let that = $(this)[0];
        showhelp(that, "/usuarios/ayuda", ".help-user");
    });


    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-user", "/usuarios/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-user", "/usuarios/FilterOrMoreData");

        }
    });

    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblUser").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "usuarios", ".tbody-Table-user");

            }
        }
    });
}




















