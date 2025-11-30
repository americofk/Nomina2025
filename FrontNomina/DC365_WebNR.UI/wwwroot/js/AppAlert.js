Node.prototype.addChild = function (element) {
    this.appendChild(element);
    return this;
};

var timeout;
function windows_message(text, type, functions, nameButtons = { Ok: "Aceptar", Cancel: "Cancelar" }) {
    let types = {
        error: {
            icon: "/Images/IconAlert/confirm.png",
            text: "Error",
            action: "notification",
            bodyIcon: "icon-error"
        },
        success: {
            icon: "/Images/IconAlert/confirm.png",
            text: "Completado",
            action: "notification",
            bodyIcon: "icon-success"
        },
        confirm: {
            icon: "/Images/IconAlert/confirm.png",
            text: "Alerta",
            action: "confirmation",
            bodyIcon: "icon-confirm"
        }
    }

    create_dom();

    function create_dom() {
        remove_alert();

        let modal = create("div", "id", "modal-alert");

        let alert_app = create("div", "class", "alert-app " + types[type].action);
        let alert_title = create("div", "class", "alert-title");
        let alert_icon_text = create("div", "class", "alert-icon-text");
        let icon = create("i", "class", "fa fa-info-circle icon");
        let title_text = document.createElement("span");
        title_text.innerText = types[type].text;
        title_text.className = "alert-title-text";

        let icon_close = create("i", "class", "fa fa-times alert-close");

        // Nuevo body con icono de tipo
        let alert_body = create("div", "class", "alert-body");
        let alert_type_icon = create("div", "class", "alert-type-icon " + types[type].bodyIcon);
        let alert_message = create("div", "class", "alert-message");
        let span_body = document.createElement("span");
        span_body.innerHTML = text;

        modal.addChild(alert_app.addChild(
            alert_title.addChild(
                alert_icon_text.addChild(icon).addChild(title_text)
            ).addChild(icon_close)
        ).addChild(
            alert_body.addChild(alert_type_icon).addChild(alert_message.addChild(span_body))
        ));

        if (type == "confirm") {
            modal.setAttribute("class", "modal-alert-confirm");
            let alert_footer = create("div", "class", "alert-footer");
            let okbutton = create("div", "class", "okbutton");
            okbutton.innerText = nameButtons.Ok;

            let cancelbutton = create("div", "class", "cancelbutton");
            cancelbutton.innerText = nameButtons.Cancel;

            alert_app.addChild(
                alert_footer.addChild(cancelbutton).addChild(okbutton)
            )

            okbutton.addEventListener("click", () => {
                if (functions.onOk != undefined) {
                    functions.onOk();
                };
                remove_alert();
            }, false);

            cancelbutton.addEventListener("click", function () {
                if (functions.onCancel != undefined) {
                    functions.onCancel();
                };
                remove_alert();
            }, false);
        }

        var body = document.querySelectorAll("body");
        body[0].appendChild(modal);

        let btn_close = document.querySelector(".alert-close");
        btn_close.addEventListener("click", remove_alert, false);

        // Auto cerrar success despues de 3 segundos
        if (type == "success") {
            timeout = setTimeout(remove_alert, 3000);
        }
        // Auto cerrar error despues de 10 segundos
        if (type == "error") {
            timeout = setTimeout(remove_alert, 10000);
        }
    }

    function remove_alert() {
        var body = document.querySelectorAll("body");
        var remove_alert = document.querySelector("#modal-alert")
        if (remove_alert != null) {
            body[0].removeChild(remove_alert);
            window.clearTimeout(timeout);
        }
    }
}

function create(type, atttype, attvalue) {
    var element = document.createElement(type);
    element.setAttribute(atttype, attvalue);

    return element;
}

// funciones de prueba
function show_message_error() {
    windows_message("Este es un mensaje de error.", "error");
}

function show_message_sucess() {
    windows_message("Operacion completada exitosamente.", "success");
}

function show_message_confirm() {
    windows_message("¿Esta seguro de continuar con esta accion?", "confirm", {
        onOk: function () {
            alert("Confirmado");
        },
        onCancel: function () {
            alert("Cancelado");
        }
    });
}
