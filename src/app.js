
var HelloWorldLayer = cc.Layer.extend({
    mabeles: [],
	nave:null,
	size:null,
	random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	moverNave: function(location, event){
		cc.log("Mover nave");
		var  juego = event.getCurrentTarget();
		var ubicacion = location.getLocation();
		juego.nave.setPosition(ubicacion.x,ubicacion.y);

	},
	matar: function(location, event){
		var ubicacion = location.getLocation();
		var juego = event.getCurrentTarget();
		for(var mabel of juego.mabeles){
			var cuadro = mabel.getBoundingBox();
			if(cc.rectContainsPoint(cuadro,ubicacion)){
				mabel.setVisible(false);
			}
			
		}
		return true;
		
	},
	creaMabel: function(){
		
		var mabel = new cc.Sprite(res.mabel_png);
		mabel.setScale(0.4,0.4);
        mabel.setPosition(this.random(1,480), this.size.height );
        this.addChild(mabel, 1);
		var moveto = cc.moveTo(this.random(1,9), this.nave.getPositionX(), this.nave.getPositionY());
		mabel.runAction(moveto);
		this.mabeles.push(mabel);		
		
	},
    ctor:function () {
        this._super();
        var size = cc.winSize;
		this.size = size;		
		this.nave = new cc.Sprite(res.nave_png);
		this.nave.setPosition(size.width/2 , size.height * 0.10);
		//this.nave.setScale(0.3,0.3);
		this.addChild(this.nave);
		this.schedule(this.creaMabel,3);
		
		//Inicializando eventos
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.matar,
			onTouchMoved: this.moverNave
			
		}, this);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

