canvas

var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');

ctx.beginPath();//重新规划一条路径

ctx.moveTo(x,y);//起点，x,y坐标点
ctx.lineTo(x,y);//终点
...
...

ctx.closePath();//会自动将不封闭的路径连成封闭的形状

ctx.lineWidth=3;
ctx.strokeStyle="#eee";

ctx.stroke();//绘制路径

ctx.fillStyle="#fff";
ctx.fill();//填充形状，会自动将不封闭的路径连成封闭的形状

cxt.arc(x,y,r,sAngle,eAngle,counterclockwise);
//坐标，半径，圆弧开始位置，结束位置（顺时针）,可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。

ctx.Rect(x,y,width,height);//矩形路径
ctx.fillRect(x,y,width,height);//绘制额矩形并填充，x,y坐标，width,height宽高
ctx.strokeRect(x,y,width,height);//绘制矩形路径

线条的属性：lineCap  butt(默认值)、round(圆角)、square(方角)
ctx.lineCap='round'  线段的开始和结束时应用lineCap，而线段间的连接处仍是尖角。

lineJoin 线条相交时的样式  miter尖角(默认)[miterLimit尖角最大距离，默认10] bevel平角 round圆角

clearRect(x,y,width,height);//清空给定矩形内的指定像素，坐标，宽高

translate(x,y);位移变换
rotate(deg);旋转//里面是弧度制
scale(sx,sy);缩放
变换是叠加的
所以应将所有变换放在
save()和restore()中。
其中缩放会有副作用：
1、如果有lineWidth，宽度也会缩放
2、如果起始点不是0,0，起始点也会缩放
