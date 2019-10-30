layui.use('table', function () {
    var table = layui.table;

    $.ajax({
        url: `api/find/student`,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify([]),
        async: false,
        success: (res) => {
            table.render({
                elem: '#test'
                , data: res.results
                , page: true
                , cols: [[
                    { field: 'student_id', title: 'ID', sort: true }
                    , { field: 'student_username', title: '用户名', sort: true }
                    , { field: 'student_name', title: '姓名', sort: true }
                    , { field: 'student_sex', title: '性别', sort: true }
                    , { field: 'student_email', title: '邮箱', sort: true }
                    , { field: 'student_phone', title: '电话', sort: true }
                    , { title: '操作', toolbar: '#barDemo', width: 150 }
                ]],
            });
            //监听工具条
            table.on('tool(test)', function (obj) {
                var data = obj.data;
                if (obj.event === 'detail') {
                    layer.msg('ID：' + data.student_id + ' 的查看操作');
                } else if (obj.event === 'del') {
                    layer.confirm('真的删除行么', function (index) {
                        obj.del();
                        layer.close(index);
                    });
                } else if (obj.event === 'edit') {
                    layer.alert('编辑行：<br>' + JSON.stringify(data))
                }
            });

            $('.demoTable .layui-btn').on('click', function () {
                var type = $(this).data('type');
                active[type] ? active[type].call(this) : '';
            });
        },
        error: (e) => {
            console.log(e);
        }
    })


});
