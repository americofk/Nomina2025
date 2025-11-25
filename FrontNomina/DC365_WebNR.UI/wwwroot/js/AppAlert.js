Node.prototype.addChild = function (element) {
    this.appendChild(element);
    return this;
};

var timeout;
function windows_message(text, type, functions, nameButtons = { Ok: "Aceptar", Cancel: "Cancelar" }) {
    let types = {
        error: {
            icon: "/Images/IconAlert/error.png",//"error.png",
            text: "Error",
            action: "notification"
        },
        success: {
            icon: "/Images/IconAlert/success.png",//"success.png",
            text: "Completado",
            action: "notification"
        },
        confirm: {
            icon: "/Images/IconAlert/confirm.png",//"confirm.png",
            text: "Confirmación",
            action: "confirmation"
        }
    }

    remove_alert

    create_dom();

    function create_dom() {
        remove_alert();

        let modal = create("div", "id", "modal-alert");

        let alert_app = create("div", "class", "alert-app " + types[type].action);
        let alert_title = create("div", "class", "alert-title " + type);
        let alert_icon_text = create("div", "class", "alert-icon-text");
        let icon = create("img", "class", "icon");
        icon.setAttribute("src", types[type].icon);

        let icon_close = create("img", "class", "alert-close")
        icon_close.setAttribute("src", "/Images/IconAlert/close.png");


        let span = document.createElement("span");
        span.innerText = types[type].text;

        let alert_body = create("div", "class", "alert-body");
        let span_body = document.createElement("span");
        span_body.innerHTML = text;

        modal.addChild(alert_app.addChild(
            alert_title.addChild(
                alert_icon_text.addChild(icon).addChild(span)
            ).addChild(icon_close)
        ).addChild(
            alert_body.addChild(span_body)
        ));

        if (type == "confirm") {
            modal.setAttribute("class", "modal-alert-confirm");
            let alert_footer = create("div", "class", "alert-footer");
            let okbutton = create("div", "class", "okbutton");
            okbutton.innerText = nameButtons.Ok;

            let cancelbutton = create("div", "class", "cancelbutton");
            cancelbutton.innerText = nameButtons.Cancel; //Texto del boton cancelar

            alert_app.addChild(
                alert_footer.addChild(okbutton).addChild(cancelbutton)
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

        // opcional
        if (type == "success") {
            timeout = setTimeout(remove_alert, 3000);
        }
    }

    function remove_alert() {
        var body = document.querySelectorAll("body");
        // var remove_alert = document.querySelector(".alert-app");
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
    windows_message("Este es un mensaje.", "error");
}

function show_message_sucess() {
    windows_message("Este es un mensaje.", "success");
}

function show_message_confirm() {
    windows_message("¿Está seguro de continuar?.", "confirm", {
        onOk: function () {
            alert("Hola...");
        },
        onCancel: function () {
            alert("Adios...");
        }
    });
}