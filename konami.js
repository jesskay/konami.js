(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        define('konami', [], factory);
    } else {
        root.Konami = factory();
    }
})(this, function() {
    var bindEvent = function(element, event, handler) {
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

    var konami = function(target, preventMovement) {
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

    konami.prototype.codeFromAlphaNumString = function(codeString) {
        var oldCode = this.code;
        this.code = [];

        for(var i = 0; i < codeString.length; i++) {
            if(((codeString.charCodeAt(i) >= 65) && (codeString.charCodeAt(i) <= 90)) || ((codeString.charCodeAt(i) >= 48) && (codeString.charCodeAt(i) <= 57))) {
            this.code.push(codeString.charCodeAt(i));  // push code as is if A-Z | 0-9
            } else if((codeString.charCodeAt(i) >= 97) && (codeString.charCodeAt(i) <= 122)) {
                this.code.push(codeString.charCodeAt(i) - 32);  // push code - 32 if a-z
            } else {
                this.code = oldCode;  // restore code and...
                return false;  // ...fail if none of the above
            }
        }

        return true;
    }

    return konami;
});

