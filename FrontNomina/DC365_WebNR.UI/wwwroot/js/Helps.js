function showhelp(caller, url, container) {

    $.ajax({
        url: url,
        type: "GET",
        async: false,
        success: function (data) {
            if (data.length > 0) {
                $(container).html('');
                $(container).append(data);

                $(".close-help").on("click", function () {                    
                    let bghelp = document.querySelector(".bg-help-section");
                    let callerid = bghelp.getAttribute("data-callerid");

                    let btn = document.querySelector(`#${callerid}`);
                    btn.classList.remove("info-show");
                    $(container).html('');
                });

                $(".see-more").on("click", function () {
                    let that = $(this)[0];
                    if (that.getAttribute("data-type") == "show") {
                        let cardhelp = document.querySelector(".card-help");
                        cardhelp.classList.remove("hidden-more");
                        that.setAttribute("data-type", "hidden");
                        that.textContent = "Ver menos";
                    }
                    else {
                        let cardhelp = document.querySelector(".card-help");
                        cardhelp.classList.add("hidden-more");
                        that.setAttribute("data-type", "show");
                        that.textContent = "Ver más";
                    }
                });
            }
        }, error: function (xhr) {
            redireccionaralLogin(xhr);
        }
    });


    let btn = document.querySelector(`#${caller.id}`);
    btn.classList.add("info-show");

    let coords = btn.getBoundingClientRect();
    let new_left = coords.right - coords.width - 398;

    let bghelp = document.querySelector(".bg-help-section");
    bghelp.setAttribute("data-callerid", caller.id);
/*    bghelp.classList.remove("collapse");*/

    let contenthelp = document.querySelector(".container-help-section");
    contenthelp.style.left = `${new_left}px`;

    let div = document.querySelector(".info-icon");
    div.style.top = `${coords.top + 1}px`;
    div.style.left = `${coords.left + 1}px`;
    div.style.position = `fixed`;

}

function showimagehelp(caller, url) {
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        success: function (data) {
            if (data.length > 0) {
                $(".bg-help-section").append(data);
            }
        }, error: function (xhr) {
            redireccionaralLogin(xhr);
        }
    });

    $("#help-image-section").on("click", function () {
        $(this).remove();
    });
}





