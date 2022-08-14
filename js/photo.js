/*
 * @Author: your name
 * @Date: 2022-03-06 18:26:11
 * @LastEditTime: 2022-05-10 11:08:29
 * @LastEditors: Casey 814626353@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \安全帽webCode\js\request.js
 */
$(function() {
    $("#file").attr('disabled', 'disabled')
    $(".input-file").change(function(e) {
        var file = e.target.files[0]
        console.log(file)
        var fd = new FormData()
        fd.append('file', file)
        console.log(fd.get(file))
        ajax(fd)
    })
    $("#file").change(function(e) {
        var state = $("#reSubmit").attr('data-state')
        if (state == "true") {
            var file = e.target.files[0]
            console.log(file)
            var fd = new FormData()
            fd.append('file', file)
            console.log(fd)
            ajax(fd)
        } else if (state == "false") {
            alert("请先上传图片")
        } else {
            console.log("系统报错")
        }
    })
})

function ajax(data) {
    $.ajax({
        url: "http://1.12.218.211:2001/helmet/detect",
        dataType: "json",
        async: false,
        processData: false,
        contentType: false,
        data: data,
        method: "POST",
        success(res) {
            console.log(res)
            if (res.code == 20000) {
                $("#leftimage").attr("src", res.data['source:'])
                $("#rightimage").attr("src", res.data.output)
                    //隐藏左边的分享logo
                $(".tipbox").hide()
                $("#reSubmit").css('background', '#7ea1b7')
                $("#reSubmit").attr("data-state", 'true')
                $("#file").removeAttr('disabled')
            } else {
                alert(res.code)
            }
        },
        error(err) {
            console.log(err)
        }
    })
}