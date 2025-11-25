
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/NotifyChangeCompany").build();

connection.on("NotifyChange", (id) => {
    let cpny = $(".idcompany-active").val().toString();
    if (cpny != id) {
        if (window.location.href.includes("ErrorKeyLicense")) {

            window.location.href = "/Dashboard/Principal";
        } else {
            location.reload();
        }
    }


    //window.location.href = "/Dashboard/Principal";
});

connection.start().catch(err => console.error(err.toString()));

function SendNotification(companyid) {
    connection.invoke("NotifyChange", companyid).catch(err => console.error(err.toString()));
}

