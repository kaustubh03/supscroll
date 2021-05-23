function outerWidth(el) {
    var width = el.offsetWidth;
    var style = getComputedStyle(el);

    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
}

function supscroll(node, options) {
            var defaults = {
                scrolling: true,
                amount: false // Experimental! Needs work
            };

            options = {...defaults, ...options};

            var supportsTouch = false;

            if ('ontouchstart' in window){
                supportsTouch = true;
                } else if(window.navigator.msPointerEnabled) {
                supportsTouch = true;
                } else if ('ontouchstart' in document.documentElement) {
                supportsTouch = true;
            }

            if (!supportsTouch){
                var x,left,down,newX,oldX,maxScrollLeft,am,amX,amL,leftElem,rightElem,currx,items,element,elements;
                element = node;
                if(options.amount == false) {
                    amount = outerWidth(element.querySelector('a'));
                }else{
                    amount = options.amount;
                }
                leftElem = document.createElement('span');
                leftElem.classList.add('control-left') 
                leftElem.innerHTML = '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>';
                rightElem = document.createElement('span');
                rightElem.classList.add('control-right') 
                rightElem.innerHTML = '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>';
                element.parentNode.appendChild(leftElem);
                element.parentNode.appendChild(rightElem);
                maxScrollLeft = element.scrollWidth - element.clientWidth;
                left = element.scrollLeft;
                if(maxScrollLeft === left) {
                    rightElem.style.display='none';
                } else {
                    rightElem.style.display='';
                }
                if(left == 0) {
                    leftElem.style.display='none';
                } else {
                    leftElem.style.display='';
                }

                if(options.scrolling){
                    element.addEventListener("scroll", function (event) {  
                        var oEvent = event, 
                        direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta, 
                        position = element.scrollLeft;
                        position += direction > 0 ? -amount : amount;
                        // element.scrollLeft = position;
                        event.preventDefault();
                        maxScrollLeft = element.scrollWidth - element.clientWidth;
                        left = element.scrollLeft;
                        if(maxScrollLeft == left) {
                            rightElem.classList.add('hide');
                            rightElem.classList.remove('show');
                        } else {
                            rightElem.classList.add('show');
                            rightElem.classList.remove('hide');
                        }
                        if(left == 0) {
                            leftElem.classList.add('hide');
                            leftElem.classList.remove('show');
                        } else {
                            leftElem.classList.add('show');
                            leftElem.classList.remove('hide');
                            leftElem.style.display='';
                        }

                    });
                }
                element.addEventListener("mousedown", function(e){
                    e.preventDefault();
                    down = true;
                    x = e.pageX;
                    left = element.scrollLeft;
                });
                element.addEventListener("mousemove", function(e){
                    if(down){
                        if(e.pageX != x){
                            element.classList.add("nonclick");
                            newX = e.pageX;
                            oldX = element.scrollLeft;
                            element.scrollLeft = (left-newX+x);  
                            maxScrollLeft = element.scrollWidth - element.clientWidth;
                            if(maxScrollLeft == oldX) {
                                rightElem.classList.add('hide');
                                rightElem.classList.remove('show');
                            } else {
                                rightElem.classList.add('show');
                                rightElem.classList.remove('hide');
                            }
                            if(oldX == 0) {
                                leftElem.classList.add('hide');
                                leftElem.classList.remove('show');
                            } else {
                                leftElem.classList.add('show');
                                leftElem.classList.remove('hide');
                            }
                        }
                    } else {
                        element.classList.remove("nonclick");
                    }
                });
                rightElem.addEventListener("click", function(e){
                  leftElem.classList.add('show');
                  leftElem.classList.remove('hide');
                  leftElem.style.display='';
                  items = element;
                  currx = items.scrollLeft;
                  amX = parseInt(getComputedStyle(element.parentNode, null).width.replace("px", ""))/amount; // cantidad de elementos x viewport
                  am = (amX * amount) - amount;
                  maxScrollLeft = items.scrollWidth - items.clientWidth;
                  if(currx+am >= maxScrollLeft) {
                    rightElem.classList.add('hide');
                    rightElem.classList.remove('show');
                  }
                  items.scroll({left:items.scrollLeft + am, behaviour:'smooth'});
                });
                leftElem.addEventListener("click", function(e){
                  rightElem.classList.add('show');
                  rightElem.classList.remove('hide');
                  rightElem.style.display='';
                  items = element;
                  currx = items.scrollLeft;
                  amX = parseInt(getComputedStyle(element.parentNode, null).width.replace("px", ""))/amount; // cantidad de elementos x viewport
                  am = (amX * amount) - amount;
                  if(currx-am <= 0) {
                    leftElem.classList.add('hide');
                    leftElem.classList.remove('show');
                  }
                  items.scroll({left:items.scrollLeft - am, behaviour:'smooth'});
                });
                window.onresize = function(){
                    for(var i=0; i<element.childNodes.length; i++){
                        elements = element.childNodes[i];
                        maxScrollLeft = elements.scrollWidth - elements.clientWidth;
                        left = elements.scrollLeft;
                        if(maxScrollLeft == left) {
                            rightElem.classList.add('hide');
                            rightElem.classList.remove('show');
                        } else {
                            rightElem.classList.add('show');
                            rightElem.classList.remove('hide');
                        }
                        if(left == 0) {
                            leftElem.classList.add('hide');
                            leftElem.classList.remove('show');
                        } else {
                            leftElem.classList.add('show');
                            leftElem.classList.remove('hide');
                        }   
                    }
                };
                document.addEventListener("mouseup mousedown click, .nonclick a", function(e){  //prevent clicking while moving
                  e.preventDefault();
                });
                document.addEventListener("mouseup", function(e){ //globally remove nonclicks onmouseup
                    setTimeout(function(){
                        element.classList.remove('nonclick');;
                        down=false;
                    },1);
                });
            }
        }

exports.supscroll = supscroll;