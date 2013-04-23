function bindEvent(element, event, handler) {
    if(element.addEventListener) {
        element.addEventListener(event, handler, false);
    } else if(element.attachEvent) {
        element.attachEvent('on' + event, function() {
            handler(window.event);
        });
    } else {
        element['on' + event] = function(e) {
            handler(e || window.event);
        }
    }
}

var Konami = function(target, preventMovement) {
    this.target = target;
    this.preventMovement = preventMovement || false;
    this.lastKeys = [];
    this.code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];

    bindEvent(document.body, 'keydown', (function(e) {
        while(this.lastKeys.length < (this.code.length - 1)) {
            this.lastKeys.unshift(0);
        }
        while(this.lastKeys.length >= this.code.length) {
            this.lastKeys.shift();
        }
        this.lastKeys.push(e.keyCode);

        if(!((this.lastKeys < this.code) || (this.lastKeys > this.code))) {  // cheap and nasty way of doing equality for flat arrays
            if(typeof this.target === 'function') {
                this.target();
            } else {
                window.location.href = this.target;
            }

            // insert filler code to prevent repetitive keys (ex. "desudesu") firing more often that intended
            this.lastKeys.push(0);
            this.lastKeys.shift();
        }

        if(this.preventMovement) {
            if((e.keyCode >= 37) && (e.keyCode <= 40)) {
                if(e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }
        }
    }).bind(this));
}
