let login = () => {
    let username = $("#username").val();
    let password = $("#password").val();
    $.ajax({
        url: `api/login/${username}/${password}`,
        type: "GET",
        success: (res) => {
            if (res.state) {
                window.location.href = "/index";
            } else {
                alert(res.msg);
            }
        },
        error: (e) => {
            console.log(e);
        }
    });
}