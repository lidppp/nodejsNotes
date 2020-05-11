$(".btn").click(function () {
    var load = layer.load(2, {
        shade: [0.5, '#fff'] //0.1透明度的白色背景
    })
    var dataArr = $("form").serializeArray()
    var newObj = {}
    var flag = 2
    var vim = { name: "名字", word: "留言内容" }
    for (var i = 0, len = dataArr.length; i < len; i++) {
        console.log(dataArr[i].value)
        if (!dataArr[i].value) {
            layer.close(load)
            flag = i
            break
        }
        newObj[dataArr[i].name] = dataArr[i].value
    }
    if (flag !== 2) {
        layer.msg(`${vim[dataArr[flag].name]}不能为空`, {
            time: 2000
        })
        console.log(i)
        return
    }
    $.ajax({
        type: "post",
        url: "/api/creatitem",
        data: { ...newObj, time: formatDate() },
        success: function () {
            layer.close(load)
            layer.msg("添加成功", {
                time: 2000
            }, function () {
                window.location.href = "/";
            })
        },
        error: function () {
            layer.close(load)
            layer.msg("添加失败,请稍候再试", {
                time: 2000
            })
        }
    })
})

function formatDate() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}
