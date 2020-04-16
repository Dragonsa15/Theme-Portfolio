
var cols;
var rows;
var scl = 20;
var terrain;
var w;
var h;
var flying = 0;
var increaseFactor = 1;
var Stars;

function setup() {
    canvas = createCanvas(windowWidth,windowHeight,WEBGL);
    canvas.style('z-index','-1');
    canvas.position(0,0);
    w = windowWidth ;
    h = windowHeight;
    
    cols = floor((windowWidth + w)/scl);
    rows = floor((windowHeight + h)/scl);
    terrain = new Array(cols);
    Stars = new Array(100);
    for(var i = 0; i < cols; i++) {
        terrain[i] = new Array(rows);
    }
    for(var i = 0; i < Stars.length; i++) {
        Stars[i] = new star(windowWidth/2 + w/2 + 50,windowHeight/2 + h/2 - 600,windowWidth);
    }
}

var flag = false;

function mousePressed() {
    flag = true;
}


var count = 0;
var offset = 0;
    
var angle = 0;
function draw() {
    
    flying -= 0.02;
    
    if(flag)  {
        increaseFactor *= 1.002;
    }

    var yoff = 0;
    yoff = flying * increaseFactor;
    if(abs(yoff) > 40 && !flag)
    {
        flying = 0;
        console.log('hello')
    }
    
    for(var y = 0; y < rows; y++) {            
        var xoff = 0;
        for(var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff,yoff) ,0,1,-100,100);
            xoff += 0.1;
        }
        yoff+=0.1;
    }
    
    background(0);
    stroke('rgba(100%,100%,100%,0.2)');
    noFill();
    rotateX(PI/3);

    
    translate((-windowWidth - w)/2,(-windowHeight - h)/2);
    
    for(var y = offset; y < rows; y++) {            
        beginShape(TRIANGLE_STRIP);
        for(var x = 0; x < cols; x++) {
            vertex(x*scl,y*scl,terrain[x][y]);
            //vertex(x*scl,(y+1)*scl,terrain[x][y]);
            //vertex((x+1)*scl,(y)*scl,terrain[x][y]);
        }
        endShape();
       //line(0,y*scl,cols*scl,y*scl)
    }
    
    
   
    if(abs(yoff) > 101)
    {
        console.log('yay');
        offset += 1;
    }
    if(abs(yoff) > 81 + rows)
    {
        for(var i=0;i<Stars.length;i++)
        {
            Stars[i].update();
            Stars[i].show();
            if(Stars[i].z < 1)
            {
                Stars.splice(i,1);
                i--;
            }    
            
        }
        if(Stars.length < 20)
        {
            Stars = new Array();
        }
    }
        
}
