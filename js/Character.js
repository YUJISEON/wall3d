function Character(info) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';

    document.querySelector('.stage').appendChild(this.mainElem);
    
    this.mainElem.style.left = info.xPos  + '%';
    this.scrollState = false; // 스크롤 중인지, 아닌지
    this.init();
}

// Character.prototype.xxxx = function() {
// };

// prototype 재정의
// this 이벤트 핸들러 안에서 this가 가르키는건 window
// window 전역객체 mainElem 존재하지 않음 >> self = this;
Character.prototype = {
    constructor: Character,
    init : function () {
        const self = this;
        
        window.addEventListener('scroll', ()=>{
            clearTimeout(self.scrollState);

            if(!self.scrollState) {
                self.mainElem.classList.add('running');
                console.log("running 클래스 붙었음");
            }

            // setTimeout을 통해 self.scrollState 값이 생성됨
            // 값이 있다는건 결국 true로 인지 - 마지막만 실행
            self.scrollState = setTimeout(function(){                
                this.scrollState = false;
                self.mainElem.classList.remove('running');
                console.log("setTimeout 실행");
            }, 500);
            console.log(self.scrollState);
        });
    }
};