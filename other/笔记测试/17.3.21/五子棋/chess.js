/**
 * Created by Administrator on 2016/3/31.
 */
var chess;              //canvas对象
var downChess;          //audio对象
var CHESS_WIDTH;      //棋盘的高度
var CHESS_HEIGTH;    //棋盘的宽度
var over = false;   //表示是否有人赢了
var chessPen;
var LINE;  //一共有棋盘有多少行多少列
var LINTTOPADDIN;  //棋盘的线距离棋盘左右上下的距离
var LINE_SIZEPX;  //棋盘每条线的间隔
var isBlack = true; //用来存储下一个棋子的颜色，true为黑棋，默认为黑棋先下
var chessMap = [];  //存储棋盘的棋子，0代表当前位置没有棋子，1代表黑棋，2代表白棋
var wins = [];  //赢法数组      [x][y][k]   x y 代表棋盘上的一个点 k代表第几种赢法
var myWin = []; //我方的赢法统计数组
var comWin = [];//计算机方的赢法统计数组

var count = 0;      //代表有多少种赢法

/** wins start **/
//初始化数组
for(var x = 0; x < 15;x++){
    wins[x] = [];
    for(var y = 0; y<15;y++){
        wins[x][y] = [];
    }
}

//横排的赢法
for(var x = 0; x < 15; x++){
    for(var y = 0; y<11;y++){
        for(var k = 0; k<5;k++){
            wins[x][y+k][count] = true;
        }
        count++;
    }
}

//竖排的赢法
for(var x = 0; x < 15; x++){
    for(var y = 0; y<11;y++){
        for(var k = 0; k<5;k++){
            wins[y+k][x][count] = true;
        }
        count++;
    }
}

//正斜线的赢法
for(var x = 0; x < 11; x++){
    for(var y = 0; y<11;y++){
        for(var k = 0; k<5;k++){
            wins[x+k][y+k][count] = true;
        }
        count++;
    }
}

//反斜线的赢法
for(var x = 0; x < 11; x++){
    for(var y = 14; y>3;y--){
        for(var k = 0; k<5;k++){
            wins[x+k][y-k][count] = true;
        }
        count++;
    }
}
/** wins end **/

/** 赢法统计数组初始化开始 **/

for(var i = 0; i < count;i++){
    myWin[i] = 0;
    comWin[i] = 0;
}

/** 赢法统计数组初始化结束 **/

console.log("五子棋一共有 " + count + "种赢法");     //打印日志

window.onload = function () {
    infoStart();
}

var infoStart = function(){
    chess = document.getElementById("chess");
    downChess = document.getElementById("downChess");
    chessPen = chess.getContext("2d");
    chessPen.strokeStyle = "#B9B9B9";
    CHESS_WIDTH = chess.width;      //棋盘的高度
    CHESS_HEIGTH = chess.height;    //棋盘的宽度
    LINE = 15;  //一共有棋盘有多少行多少列
    LINTTOPADDIN = 15;  //棋盘的线距离棋盘左右上下的距离
    LINE_SIZEPX = 30;  //棋盘每条线的间隔
    drawCheckerBoard(); //初始化棋盘
    reloadBoard();      //初始化棋子
    //棋盘单击事件
    chess.onclick = function(e){
        //如果已经有人获胜，就不处理
        if(over){
            return;
        }
        //只有黑棋才能手动下棋
        if(!isBlack){
            return;
        }
        var x = Math.floor(e.offsetX / LINE_SIZEPX);
        var y = Math.floor(e.offsetY / LINE_SIZEPX);
        if(chessMap[x][y] == 0){
            drawOneChess(x, y, isBlack);
            chessMap[x][y] = 1;    //黑棋
        }else{
            return;
        }
        //遍历所有的赢法
        for(var k=0;k<count;k++){
            //如果为true说明我们在K种赢法上面胜算大了一步
            if(wins[x][y][k]){
                myWin[k]++; //我方胜算统计增加
                comWin[k] = 6;  //计算机在这种赢法就不可能赢，设置一个异常的值6
                //说明黑棋已经赢了
                if(myWin[k] == "5"){
                    window.alert("恭喜你获胜！");
                    over = true;
                }
            }
        }
        //如果还没有结束，我们让计算机下棋
        if(!over){
            isBlack = !isBlack;    //下一个棋
            computerAI();
        }
    };
}

//初始化棋子
var reloadBoard = function(){
    for(var i =0;i<LINE;i++){
        chessMap[i] = [];
        for(var j = 0;j<LINE;j++){
            chessMap[i][j] = 0;
        }
    }
}

//计算机AI下棋
var computerAI = function(){
    var myScore = [];   //用户棋盘上点的得分
    var comScore = [];  //电脑棋盘上点的得分
    var max = 0;        //保存最高的分数
    var maxX = 0,maxY = 0;       //最高分的点的坐标
    var myK = 0;    //用户下了某一个点之后，将会产生多少个符合赢得条件
    var comK = 0;   //计算机下了某一个点之后，将会产生多少个符合赢得条件
    var ruleCount = 0;

    for(var x = 0;x<15;x++){
        myScore[x] = [];
        comScore[x] = [];
        for(var y = 0;y<15;y++){
            myScore[x][y] = 0;
            comScore[x][y] = 0;
        }
    }

    for(var x =0;x<15;x++){
        for(var y=0;y<15;y++){
            //如果棋盘上这个点没有子
            if(chessMap[x][y] == 0){

                //检查是否有符合规则的棋子
                if(upAspect(x,y,0,-1,1)){
                    ruleCount++;
                }

                if(downAspect(x,y,0,-1,1)){
                    ruleCount++;
                }

                if(leftAspect(x,y,0,-1,1)){
                    ruleCount++;
                }

                if(rightAspect(x,y,0,-1,1)){
                    ruleCount++;
                }

                if(upLeftAspect(x,y,0,-1,1)){
                    ruleCount++;
                }

                if(rightDownAspect(x,y,0,-1,1)){
                    ruleCount++;
                }

                if(rightUpAspect(x,y,0,-1,1)){
                    ruleCount++;
                }

                if(leftDownAspect(x,y,0,-1,1)){
                    ruleCount++;
                }

                //规则至少要有两个成立才可以
                if(ruleCount >= 2){
                    myScore[x][y]+= 4000;
                    ruleCount = 0;
                }else{
                    ruleCount = 0;
                }

                //电脑落子
                //检查是否有符合规则的棋子
                if(upAspect(x,y,0,-1,2)){
                    ruleCount++;
                }

                if(downAspect(x,y,0,-1,2)){
                    ruleCount++;
                }

                if(leftAspect(x,y,0,-1,2)){
                    ruleCount++;
                }

                if(rightAspect(x,y,0,-1,2)){
                    ruleCount++;
                }

                if(upLeftAspect(x,y,0,-1,2)){
                    ruleCount++;
                }

                if(rightDownAspect(x,y,0,-1,2)){
                    ruleCount++;
                }

                if(rightUpAspect(x,y,0,-1,2)){
                    ruleCount++;
                }

                if(leftDownAspect(x,y,0,-1,2)){
                    ruleCount++;
                }

                //规则至少要有两个成立才可以
                if(ruleCount >= 2){
                    comScore[x][y]+= 8000;
                    ruleCount = 0;
                }else{
                    ruleCount = 0;
                }

                for(var k=0;k<count;k++){
                    if(wins[x][y][k]){
                        //判断黑棋的子，然后判断如何拦截
                        if(myWin[k] == 1){
                            myScore[x][y] += 200;
                        }else if(myWin[k] == 2){
                            myScore[x][y] += 400;
                        }else if(myWin[k] == 3){
                            myScore[x][y] += 2000;
                        }else if (myWin[k] == 4) {
                            myScore[x][y] += 10000;
                        }

                        //判断计算机棋盘子每一步的分数
                        if(comWin[k] == 1){
                            comScore[x][y] += 220;
                        }else if(comWin[k] == 2){
                            comScore[x][y] += 420
                        }else if(comWin[k] == 3){
                            comScore[x][y] += 2100
                        }else if (comWin[k] == 4) {
                            comScore[x][y] += 20000
                        }
                    }
                }

                //判断拦截用户位置的分数最高
                if(myScore[x][y] > max){
                    max = myScore[x][y];
                    maxX = x;
                    maxY = y;
                }else if(myScore[x][y] == max){
                    if(comScore[x][y] > comScore[maxX][maxY]){
                        maxX = x;
                        maxY = y;
                    }
                }

                //判断自己下哪里分数最高
                if(comScore[x][y] > max){
                    max = comScore[x][y];
                    maxX = x;
                    maxY = y;
                }else if(comScore[x][y] == max){
                    if(myScore[x][y] > myScore[maxX][maxY]){
                        maxX = x;
                        maxY = y;
                    }
                }
            }
        }
    }

    //计算机落子
    drawOneChess(maxX,maxY,false);
    //把棋盘上的一个点设置为计算机落了子
    chessMap[maxX][maxY] = 2;

    //遍历所有的赢法
    for(var k=0;k<count;k++){
        //如果为true说明我们在K种赢法上面胜算大了一步
        if(wins[maxX][maxY][k]){
            comWin[k]++; //我方胜算统计增加
            myWin[k] = 6;  //计算机在这种赢法就不可能赢，设置一个异常的值6
            //说明黑棋已经赢了
            if(comWin[k] == "5"){
                window.alert("很遗憾，你输了！");
                over = true;
            }
        }
    }
    //如果还没有结束，我们让计算机下棋
    if(!over){
        isBlack = !isBlack;    //下一个棋
    }

}

/**
    检测棋盘上一个点的上方有多少个黑子
    x = 棋子的纵坐标 0 - 14
    y = 棋子的横坐标 0 - 14
    isNull = 0 为没有棋子
    isNull = 1 为有黑棋
    isNull = 2 为有白棋
    isNull 初始化为 -1 代表到达边界
    chessType = 1 代表黑棋
    chessType = 2 代表白棋
**/
var upAspect = function(x,y,flag,isNull,chessType){

    var thisX = x;
    var thisY = y;
    //黑棋用户
    if(chessType == 1){
        for(var i = 0;i<myGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<myGain[i].length;j++){
                if(y == -1){
                    return  false;
                }
                if(chessMap[x][y] == myGain[i][j]){
                    winCount++;
                    y--;
                }
            }
            if(winCount == myGain[i].length){
                return true;
            }
        }
        return false;
    }else{

        for(var i = 0;i<comGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<comGain[i].length;j++){
                if(y == -1){
                    return  false;
                }
                if(chessMap[x][y] == comGain[i][j]){
                    winCount++;
                    y--;
                }
            }
            if(winCount == comGain[i].length){
                return true;
            }
        }
        return false;

    }

}

//检测棋盘上一个点的下方有多少个黑子
var downAspect = function(x,y,flag,isNull,chessType){

    var thisX = x;
    var thisY = y;
    //黑棋用户
    if(chessType == 1){
        for(var i = 0;i<myGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<myGain[i].length;j++){
                if(y == 15){
                    return  false;
                }
                if(chessMap[x][y] == myGain[i][j]){
                    winCount++;
                    y++;
                }
            }
            if(winCount == myGain[i].length){
                return true;
            }
        }
        return false;
    }else{

        for(var i = 0;i<comGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<comGain[i].length;j++){
                if(y == 15){
                    return  false;
                }
                if(chessMap[x][y] == comGain[i][j]){
                    winCount++;
                    y++;
                }
            }
            if(winCount == comGain[i].length){
                return true;
            }
        }
        return false;
    }

}

//检测棋盘上一个点的左方有多少个黑子
//y轴不变，x--
var leftAspect = function(x,y,flag,isNull,chessType){

    var thisX = x;
    var thisY = y;
    //黑棋用户
    if(chessType == 1){
        for(var i = 0;i<myGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<myGain[i].length;j++){
                if(x == -1){//x的本身就在左方的边界，左方不存在任何东西，直接返回
                    return  false;
                }
                if(chessMap[x][y] == myGain[i][j]){
                    winCount++;
                    x--;
                }
            }
            if(winCount == myGain[i].length){
                return true;
            }
        }
        return false;
    }else{

        for(var i = 0;i<comGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<comGain[i].length;j++){
                if(x == -1){//x的本身就在左方的边界，左方不存在任何东西，直接返回
                    return  false;
                }
                if(chessMap[x][y] == comGain[i][j]){
                    winCount++;
                    x--;
                }
            }
            if(winCount == comGain[i].length){
                return true;
            }
        }
        return false;
    }

}

//检测棋盘上一个点的右方有多少个黑子
//y轴不变，x++
var rightAspect = function(x,y,flag,isNull,chessType){

    var thisX = x;
    var thisY = y;
    //黑棋用户
    if(chessType == 1){
        for(var i = 0;i<myGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<myGain[i].length;j++){
                if(x == 15){
                    return  false;
                }
                if(chessMap[x][y] == myGain[i][j]){
                    winCount++;
                    x++;
                }
            }
            if(winCount == myGain[i].length){
                return true;
            }
        }
        return false;
    }else{

        for(var i = 0;i<comGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<comGain[i].length;j++){
                if(x == 15){
                    return  false;
                }
                if(chessMap[x][y] == comGain[i][j]){
                    winCount++;
                    x++;
                }
            }
            if(winCount == comGain[i].length){
                return true;
            }
        }
        return false;
    }

}

//检测棋盘上一个点的左上方有多少个黑子
// x--  y--
var upLeftAspect = function(x,y,flag,isNull,chessType){

    var thisX = x;
    var thisY = y;
    //黑棋用户
    if(chessType == 1){
        for(var i = 0;i<myGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<myGain[i].length;j++){
                if(x == -1 || y == -1){
                    return  false;
                }
                if(chessMap[x][y] == myGain[i][j]){
                    winCount++;
                    x--;
                    y--;
                }
            }
            if(winCount == myGain[i].length){
                return true;
            }
        }
        return false;
    }else{

        for(var i = 0;i<comGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<comGain[i].length;j++){
                if(x == -1 || y == -1){
                    return  false;
                }
                if(chessMap[x][y] == comGain[i][j]){
                    winCount++;
                    x--;
                    y--;
                }
            }
            if(winCount == comGain[i].length){
                return true;
            }
        }
        return false;
    }

}

//检测棋盘上一个点的右上方有多少个黑子
//x++ y--
var rightUpAspect = function(x,y,flag,isNull,chessType){

    var thisX = x;
    var thisY = y;
    //黑棋用户
    if(chessType == 1){
        for(var i = 0;i<myGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<myGain[i].length;j++){
                if(x == 15 || y == -1){
                    return  false;
                }
                if(chessMap[x][y] == myGain[i][j]){
                    winCount++;
                    x++;
                    y--;
                }
            }
            if(winCount == myGain[i].length){
                return true;
            }
        }
        return false;
    }else{

        for(var i = 0;i<comGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<comGain[i].length;j++){
                if(x == 15 || y == -1){
                    return  false;
                }
                if(chessMap[x][y] == comGain[i][j]){
                    winCount++;
                    x++;
                    y--;
                }
            }
            if(winCount == comGain[i].length){
                return true;
            }
        }
        return false;
    }

}

//检测棋盘上一个点的左下方有多少个黑子
//x-- y++
var leftDownAspect = function(x,y,flag,isNull,chessType){

    var thisX = x;
    var thisY = y;
    //黑棋用户
    if(chessType == 1){
        for(var i = 0;i<myGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<myGain[i].length;j++){
                if(x == -1 || y == 15){
                    return  false;
                }
                if(chessMap[x][y] == myGain[i][j]){
                    winCount++;
                    x--;
                    y++;
                }
            }
            if(winCount == myGain[i].length){
                return true;
            }
        }
        return false;
    }else{

        for(var i = 0;i<comGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<comGain[i].length;j++){
                if(x == -1 || y == 15){
                    return  false;
                }
                if(chessMap[x][y] == comGain[i][j]){
                    winCount++;
                    x--;
                    y++;
                }
            }
            if(winCount == comGain[i].length){
                return true;
            }
        }
        return false;
    }

}

//检测棋盘上一个点的右下方有多少个黑子
//x++ y++
var rightDownAspect = function(x,y,flag,isNull,chessType){
    var thisX = x;
    var thisY = y;
    //黑棋用户
    if(chessType == 1){
        for(var i = 0;i<myGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<myGain[i].length;j++){
                if(x == 15 || y == 15){
                    return  false;
                }
                if(chessMap[x][y] == myGain[i][j]){
                    winCount++;
                    x++;
                    y++;
                }
            }
            if(winCount == myGain[i].length){
                return true;
            }
        }
        return false;
    }else{

        for(var i = 0;i<comGain.length;i++){
            x = thisX;
            y = thisY;
            var winCount = 0;
            for(var j = 0;j<comGain[i].length;j++){
                if(x == 15 || y == 15){
                    return  false;
                }
                if(chessMap[x][y] == comGain[i][j]){
                    winCount++;
                    x++;
                    y++;
                }
            }
            if(winCount == comGain[i].length){
                return true;
            }
        }
        return false;
    }
}

//绘制棋盘
var drawCheckerBoard = function () {
    for (var i = 0; i < LINE; i++) {
        chessPen.beginPath();
        chessPen.moveTo(LINTTOPADDIN + i * LINE_SIZEPX, 0 + LINE);
        chessPen.lineTo(LINTTOPADDIN + i * LINE_SIZEPX, CHESS_HEIGTH - LINE);
        chessPen.stroke();

        chessPen.beginPath();
        chessPen.moveTo(0 + LINTTOPADDIN, LINTTOPADDIN + i * LINE_SIZEPX);
        chessPen.lineTo(CHESS_WIDTH - LINTTOPADDIN, LINTTOPADDIN + i * LINE_SIZEPX);
        chessPen.stroke();
    }
};

//绘制棋子
var drawOneChess = function (x, y, isBlack) {
    // alert(x + "::" + y);
    downChess.load();       //每次单击重新载入音频
    downChess.play();       //单击播放音频
    chessPen.beginPath();
    chessPen.arc(LINTTOPADDIN + x * LINE_SIZEPX, LINTTOPADDIN + y * LINE_SIZEPX, 13, 0, 2 * Math.PI);
    chessPen.closePath();
    var gradient = chessPen.createRadialGradient(LINTTOPADDIN + x * LINE_SIZEPX + 2, LINTTOPADDIN + y * LINE_SIZEPX - 2, 13, LINTTOPADDIN + x * LINE_SIZEPX + 2, LINTTOPADDIN + y * LINE_SIZEPX - 2, 0);
    if(isBlack){
        gradient.addColorStop(0,"#0A0A0A");
        gradient.addColorStop(1,"#636766");
    }else{
        gradient.addColorStop(0,"#D1D1D1");
        gradient.addColorStop(1,"#F9F9F9");
    }
    chessPen.fillStyle = gradient;
    chessPen.fill();
};
