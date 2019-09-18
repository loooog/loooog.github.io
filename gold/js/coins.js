(function(w) {
	var Coin = function(image){
		this.scale = Math.random() * 0.6 + 0.4;
		this.isget = false;
		this.init = function(){
			this.shape = new createjs.Bitmap(image);
			this.shape.x = Math.random() * (C_W - image.width - COIN_X) + COIN_X;
			this.shape.y = 0;
			this.shape.setTransform(this.shape.x, 0, this.scale, this.scale);
			this.shape.visible = true;
			stage.addChild(this.shape);
		}
		this.init();
		this.update = function(){
			if(this.isget){
				this.scale = this.scale + (1 - this.scale) * 0.1;
				this.shape.setTransform(
					this.shape.x + (COIN_X - this.shape.x) * 0.1,
					this.shape.y + (COIN_Y - this.shape.y) * 0.1,
					this.scale,
					this.scale
				);

				if(Math.abs(this.shape.x - COIN_X) < 0.5 && Math.abs(this.shape.y - COIN_Y) < 0.5){
					this.isget = false;
					this.shape.visible = false;
					this.shape.setTransform(
						COIN_X,
						COIN_Y,
						1,
						1
					);
				}

			}else{
				this.shape.y += SPEED;
				if(this.shape.y > C_H) {this.shape.visible = false;}
			}
		}

		this.size = function(){
			return {
				w: image.width * this.scale,
				h: image.height * this.scale
			}
		}
	}

	w.createCoin = function(image){
		return new Coin(image);
	}

})(window)