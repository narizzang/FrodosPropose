window.onload = function init()
{
    var startBtn = document.getElementById("startBtn");
    var restartBtn = document.getElementById("restartBtn");

    startBtn.onclick = start;
    restartBtn.onclick = restart;

    document.addEventListener("mousemove", mouseMoveHandler, false);

    canvas = document.getElementById("gameCanvas");
    canvas2 = document.getElementById("infoCanvas");
    canvas3 = document.getElementById("ruleCanvas");
    context = canvas.getContext("2d");
    context2 = canvas2.getContext("2d");
    context3 = canvas3.getContext("2d");
    context3.drawImage(rule, 0, 0);

    var ballSize = 10;//공의크기
    var panHeight = 10;
    var panWidth = 100;
    var panX = (canvas.width-panWidth)/2;
    var panSpeed = 10; //판 설정

    var x = canvas.width/2;
    var y = canvas.height - (panHeight*3);
    var dx = 4;//x축 변화속도
    var dy = -3;//y축 변화속도

    var brickRow = 8;
    var brickCol = 8;
    var brickWidth = 80;
    var brickHeight = 20;
    var brickPadding = 5;
    var brickTop = 10;
    var brickLeft = 12;//벽돌설정

    var lives = 3;//목숨
    var item = [];
    var ringI = 0;
    var brick = [];

    for (var i=0; i<4; i++)
    {
        item[i] = false;
    }

    for(var i=0; i<brickCol; i++)
    {
        brick[i] = [];
        for(var j=0; j<brickRow; j++)
        {
            brick[i][j] = { x: 0, y: 0, status: 1 };
        }
    }

    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft - 280;
        if(relativeX > 0 && relativeX < canvas.width)
        {
            panX = relativeX - panWidth/2;
        }
    }

    function brickDetect()
    {
        for(var i=0; i<brickCol; i++)
        {
            for(var j=0; j<brickRow; j++)
            {
                var b = brick[i][j];
                if(b.status > 0)
                {
                    if(x > b.x && x < b.x+brickWidth && y > b.y - ballSize && y < b.y+brickHeight + ballSize)
                    {
                        dy = -dy;
                        b.status = 0;
                    }
                    if (item[0]==true&&item[1]==true&&item[2]==true&&item[3]==true) 
                    {
                        for(var i=0; i<brickCol; i++)
                        {
                            brickRow = 4;
                            brick[i] = [];
                            for(var j=0; j<brickRow; j++)
                            {
                                brick[i][j] = { x: 0, y: 0, status: 1 };
                            }
                        }
                        lives = 3;
                        for (var i=0; i<4; i++)
                        {
                            item[i] = false;
                        }
                        ringI = 1;
                        x = canvas.width/2;
                        y = canvas.height - (panHeight*3);
                        if (dy > 0)
                            dy = -dy;
                        alert("모든 물건을 획득했으니 반지를 찾으러 가자!");
                        stop();
                        start();
                    }
                    if (ringI == 2)
                    {
                        stop2();
                        startBtn.style.display = "none";
                        document.getElementById("happyEnd").style.display = "block";
                        document.getElementById("gameEnd").style.display = "block";
                    }
                }
            }
        }
    }//벽돌 충돌 확인

    function ballInit()
    {
        ball = document.getElementById("ball");
        context.drawImage(ball, x-10, y-10, 20, 20);
    }//공 생성
    function panInit()
    {
        context.beginPath();
        context.rect(panX, canvas.height-panHeight, panWidth, panHeight);
        context.fillStyle = "#5E5E5E";
        context.fill();
        context.closePath();
    }//판때기 생성
    function brickInit()
    {
        for(var i=0; i<brickCol; i++)
        {
            for(var j=0; j<brickRow; j++)
            {
                if(brick[i][j].status == 1)
                {
                    var brickX = (i*(brickWidth+brickPadding))+brickLeft;
                    var brickY = (j*(brickHeight+brickPadding))+brickTop;
                    brick[i][j].x = brickX;
                    brick[i][j].y = brickY;
                    context.beginPath();
                    context.rect(brickX, brickY, brickWidth, brickHeight);
                    context.fillStyle = "#FFFFFF";
                    context.fill();
                    context.closePath();
                }
            }
        }
    }//벽돌 생성
    var tmpX; var tmpY;
    function itemInit()
    {
        if(ringI==0)
        {
            if (brick[5][6].status == 1)
            {
                tmpX = brick[5][6].x;
                tmpY = brick[5][6].y;
                context.drawImage(def, tmpX+25, tmpY-5, 28, 28);
            }
            else
            {
                document.getElementById("perfume").src = "perfume.png";
                item[0] = true;
            }
            if (brick[3][1].status == 1)
            {
                tmpX = brick[3][1].x;
                tmpY = brick[3][1].y;
                context.drawImage(def, tmpX+25, tmpY-5, 28, 28);
            }
            else
            {
                document.getElementById("purse").src = "purse.png";
                item[1] = true;
            }
            if (brick[6][0].status == 1)
            {
                tmpX = brick[6][0].x;
                tmpY = brick[6][0].y;
                context.drawImage(def, tmpX+25, tmpY-5, 28, 28);
            }
            else
            {
                document.getElementById("flower").src = "flower.png";
                item[2] = true;
            }
            if (brick[1][3].status == 1)
            {
                tmpX = brick[1][3].x;
                tmpY = brick[1][3].y;
                context.drawImage(def, tmpX+25, tmpY-5, 28, 28);
            }
            else
            {
                document.getElementById("shoe").src = "shoe.png";
                item[3] = true;
            }
        }
        else if(ringI==1)
        {
            if (brick[4][0].status == 1)
            {
                tmpX = brick[4][0].x;
                tmpY = brick[4][0].y;
                context.drawImage(ring, tmpX+10, tmpY-10, 60, 35);
            }
            else
                ringI = 2;

        }       
    }

    function controlSpeed()
    {
        var count = 0;
        for (var i=0; i<4; i++)
        {
            if (item[i] == true)
            {
                count++;
            }
        }
        if (count ==1 || count==2)
        {
            document.getElementById("prodoImg").src = "prodo2.png"
            document.getElementById("neoImg").src = "neo1.png"
            if (dx > 0)
                dx = 5;
            else
                dx = -5;
            if (dy > 0)
                dy = 4;
            else
                dy = -4;
        }        
        else if (count == 3)
        {
            document.getElementById("prodoImg").src = "prodo3.png"
            document.getElementById("neoImg").src = "neo4.png"
            if (dx > 0)
                dx = 6;
            else
                dx = -6;
            if (dy > 0)
                dy = 5;
            else
                dy = -5;
        }
        else if (count == 4) {
            if (dx > 0)
                dx = 8;
            else
                dx = -8;
            if (dy > 0)
                dy = -7;
            else
                dy = 7;
        }
    }

    function lifeInit()
    {
        switch(lives)
        {
            case 3:
            context2.drawImage(img1, canvas.width-90, 0);
            break;
            case 2:
            context2.drawImage(img2, canvas.width-90, 0);
            break;
            case 1:
            context2.drawImage(img3, canvas.width-90, 0);
            break;
        }
    }//목숨

    function draw()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(background, 0,0);
        brickInit();
        ballInit();
        panInit();
        lifeInit();
        itemInit();
        controlSpeed();
        brickDetect();
        
        if(x + dx > canvas.width-ballSize || x + dx < ballSize) {
            dx = -dx;
        } //벽 충돌
        if(y + dy < ballSize) {
            dy = -dy;
        } //천장 충돌
        if (y + dy > canvas.height-ballSize-panHeight) {
            if(x > panX && x < panX + panWidth)   //판 위치에 있다면
                dy = -dy; 
        }
        if (y + dy > canvas.height-ballSize)
        {
             lives--;
                if(!lives)
                {
                    document.getElementById("gameOver").style.display = "block";
                    document.getElementById("prodoImg").src = "prodo4.png";
                    document.getElementById("neoImg").src = "neo3.png";
                    restartBtn.style.display = "block";
                    stop();
                }
                else
                {  //다시시작
                    x = canvas.width/2;
                    y = canvas.height-(panHeight*3);
                    dy = -dy;
                }
        }
        x += dx;
        y += dy;
    }
    var tmp; var tmp2;
    function start()
    {
        startBtn.style.display = "none";
        var section = document.getElementsByClassName("item");
        document.getElementById("neoImg").style.display = "block";
        document.getElementById("prodoImg").style.display = "block";
        document.getElementById("title").style.display = "block";
        for(var i = 0; i < section.length; i++ ){
            section.item(i).style.display = "block";
        }

        document.getElementById("gameCanvas").style.display = "block";
        tmp = setInterval(draw, 20);
    }

    function stop()
    {
        clearInterval(tmp);
    }

    function stop2() {
        sleep(50);
        clearInterval(tmp);
    }

    function restart() {
        document.location.reload();
    }

}
function sleep(delay)
{
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}