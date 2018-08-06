/**
 * @define:  将图片顺时针旋转90度
 * @param1:  原始图片的地址，URL或base64编码
 * @param2:  图片旋转完成后的回掉函数，其参数为旋转后图片的base64编码
 * @return:  无（有回掉函数）
 */
// 测试demo
// <img id="test">
// var imgNode = document.getElementById('test');
// rotateImage('e.png', function (imgBase64) {
//     imgNode.src = imgBase64;
// });

function rotateImage(imgSrc, callback) {
    var c = document.createElement('canvas');
    var d = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var cdx = d.getContext('2d');
    var img = new Image();
    if(!imgSrc) return;
    img.src = imgSrc;
    img.onload = function () {
        var imgWidth = img.width;
        var imgHeight = img.height;
        c.height = c.width = (imgWidth >= imgHeight) ? imgWidth : imgHeight;
        if(imgWidth >= imgHeight){ // 长条形(含正方形)
            ctx.translate(imgWidth / 2, imgWidth / 2);
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(img, -imgWidth / 2, imgWidth / 2 - imgHeight, imgWidth, imgHeight);
            d.width = imgHeight;
            d.height = imgWidth;
        }else{ // 竖条形
            ctx.translate(imgHeight / 2, imgHeight / 2);
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(img, -imgHeight / 2, -imgHeight / 2, imgWidth, imgHeight);
            d.width = imgHeight;
            d.height = imgWidth;
        }
        cdx.drawImage(c, 0, 0, imgHeight, imgWidth, 0, 0, imgHeight, imgWidth);
        if(typeof callback === "function"){
            callback(d.toDataURL('image/png'));
        }
    }
}