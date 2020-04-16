class star {
    
    constructor(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.chose = random < 0.5 ? 1 : -1;
        this.zvel = this.chose < 0 ?  random(-10,0) : random(0,10);
        this.xvel = this.chose < 0 ? random(0,10) : random(-10,0) ;
        this.yvel = this.chose < 0 ?  random(-4,2)*-3 : random(-2,4)*3 ;
        this.initial_increase = 2;
    }

    update()
    {
        this.z = this.z+this.zvel;
        this.x = this.x-this.xvel;
        this.y = this.y-this.yvel;
        
    }

    grow()
    {
        this.z = this.z+this.zvel/15;
        this.x = this.x-this.xvel/15;
        this.y = this.y-this.yvel/15;
        
    }
    
    show()
    {
        fill(255);
        stroke(255);
        var sx = map(this.x/this.z , 0, 1,0,windowWidth);
        var sy = map(this.y/this.z , 0, 1,0,windowHeight);
        console.log(sx,sy)
        rotateX(PI/2);
        ellipse(sx,sy,8,8);
    }
}