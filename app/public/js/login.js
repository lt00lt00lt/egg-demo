let login = () => {
    let username = $("#username").val();
    let password = $("#password").val();
    $.ajax({
        url:`system/login/${username}/${password}`,
        type:"GET",
        success:(res)=>{
            if(res.results.length){
                window.location.href="/index";
            }else{
                alert("登录失败，请检查用户名或密码是否错误！");
            }
        },
        error:(e)=>{
            console.log(e);
        }
    });
}