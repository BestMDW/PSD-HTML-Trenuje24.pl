/*************************/
/* CREATED BY MACIEJ WLOCH
/* ALL RIGHTS RESERVED
/* BESTMDW@GMAIL.COM
/*************************/
var slider = function(scrollWidth, ID, mode) {
	this.width = scrollWidth;
	this.pos = 0;
	this.ID = ID;
	this.interval = 5000;
	this.timerId = 0;
	this.timerEnabled = new Boolean(false);
	this.posItem = 'a';
	this.mode = mode == 'vertical' ? 'vertical' : 'horizontal';
	var thisObject;
	this.nextSlide = function()
	{
		var maxWidth = this.mode == 'horizontal' ? $("#" + this.ID)[0].scrollWidth-$("#" + this.ID).width() : $("#" + this.ID)[0].scrollHeight-$("#" + this.ID).height();
		if (this.pos == maxWidth) this.pos = 0;
		else if (this.pos + this.width > maxWidth) this.pos = maxWidth;
		else this.pos += this.width;
		var slide = this.pos/scrollWidth;
		if (this.mode == 'horizontal')
			$("#" + this.ID).stop().animate({ scrollLeft : this.pos }, "slow");
		else
			$("#" + this.ID).stop().animate({ scrollTop : this.pos }, "slow");
		$("#" + this.ID + "-pos " + this.posItem).removeClass("active");
		$("#" + this.ID + "-pos " + this.posItem).eq(slide).addClass("active");
		if (this.timerEnabled)
		{
			thisObject.stop();
			thisObject.start();
		}
	};
	this.prevSlide = function()
	{
		var maxWidth = this.mode == 'horizontal' ? $("#" + this.ID)[0].scrollWidth-$("#" + this.ID).width() : $("#" + this.ID)[0].scrollHeight-$("#" + this.ID).height();
		if (this.pos == 0) this.pos = maxWidth;
		else if (this.pos - this.width < 0) this.pos = 0;
		else this.pos -= this.width;
		var slide = this.pos/scrollWidth;
		if (this.mode == 'horizontal')
			$("#" + this.ID).stop().animate({ scrollLeft : this.pos }, "slow");
		else
			$("#" + this.ID).stop().animate({ scrollTop : this.pos }, "slow");
		$("#" + this.ID + "-pos " + this.posItem).removeClass("active");
		$("#" + this.ID + "-pos " + this.posItem).eq(slide).addClass("active");
		if (this.timerEnabled)
		{
			thisObject.stop();
			thisObject.start();
		}
	};
	this.getSlide = function(slide)
	{
		this.pos = (slide-1)*this.width;
		if (this.mode == 'horizontal')
			$("#" + this.ID).stop().animate({ scrollLeft : this.pos }, "slow");
		else
			$("#" + this.ID).stop().animate({ scrollTop : this.pos }, "slow");
		$("#" + this.ID + "-pos " + this.posItem).removeClass("active");
		$("#" + this.ID + "-pos " + this.posItem).eq(slide-1).addClass("active");
		if (this.timerEnabled)
		{
			thisObject.stop();
			thisObject.start();
		}
	};
	this.start = function()
	{
		this.timerEnabled = new Boolean(true);
		thisObject = this;
		if (this.timerId) clearInterval(this.timerId);
		this.timerId = setInterval(
			function()
			{
				thisObject.nextSlide();
			}, this.interval);
		$("#" + this.ID).hover(function() { thisObject.stop(); }, function() { thisObject.start(); });
	};
	this.stop = function()
	{
		this.timerEnabled = new Boolean(false);
		clearInterval(this.timerId);
	}
	this.setPosItem = function(posItem) { this.posItem = posItem; }
	this.setVertical = function() { this.mode = 'vertical'; }
}