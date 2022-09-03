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
    this.lastScrollTop = 0; // 바로 이전 스크롤 위치
    this.xPos = info.xPos;
    this.speed = info.speed; // 스피드 랜덤
    this.direction; // 방향
    this.runingState = false // 좌우 이동 중인지, 아닌지
    this.rafId;
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
        
        // 빈번하게 일어나는 scroll 이벤트에서
        // 정말 필요할 때 한번만 효율적으로 실행되도록 하는 패턴
        // 
        window.addEventListener('scroll', ()=>{
            // setTimeout -self.scrollState 취소
            clearTimeout(self.scrollState);

            // self.scrollState에 값이 들어 있을때 true로 인지하고
            // 해당 if문에 들어가지 않음 >> 처음
            // 스크롤하는 동안 self.scrollState이 true라서 실행되지 않음
            if(!self.scrollState) {
                self.mainElem.classList.add('running');
                console.log("running 클래스 붙었음");
            }

            // setTimeout을 통해 self.scrollState 값이 생성됨 (1~)
            // 값이 있다는건 결국 true로 인지 - 마지막만 실행
            // 0.5초 뒤에 실행되기 전에 scroll이 일어나고 clearTimeout가 취소해버림
            // >> 따라서 스크롤이 될때마다 취소가 되어버림, 스크롤이 멈추면 마지막턴에서 한번만 실행됨
            self.scrollState = setTimeout(function () {
                self.scrollState = false; // 스크롤 멈춘 상태
                self.mainElem.classList.remove('running');
                console.log("setTimeout 실행");
            }, 500);
            //console.log(self.scrollState);

            //console.log("lastScrollTop : " + this.lastScrollTop);
            //console.log("pageYOffset : " + pageYOffset);
            // 이전 스크롤 위치와 현재 스크롤 위치를 비교
            // ex) 스크롤을 내리면 메뉴가 사라졌다가, 올리면 메뉴가 나타나는 포털 사이트 메뉴 방식
            if( this.lastScrollTop > pageYOffset) {
                // 이전 스크롤 위치가 크다면 : 스크롤 올림
                self.mainElem.setAttribute('data-direction', 'backward');
            } else {
                // 현재 스크롤 위치가 크다면 : 스크롤 내림
                self.mainElem.setAttribute('data-direction', 'forward');
            }
            self.lastScrollTop = pageYOffset;

        });

        // https://www.toptal.com/developers/keycode 키코드 알려주는 사이트
        // keydown 초당 약 10프레임.. 느린편 
        // >> 갱신되는 부분을 requestAnimationFrame으로 대체
        window.addEventListener('keydown', (e)=>{
            // 키를 누르고 있는 동안 keydown 이벤트가 반복되는 것을 막아야 함
            if( self.runingState ) return;

            console.log("키다운"); 
            if( e.keyCode == 37) {
                // 왼쪽
                //console.log("left");
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');
                //self.run()
                self.run(self);
                self.runingState = true;
                //self.xPos -= self.speed;
                //self.mainElem.style.left = self.xPos + "%";
            } else if ( e.keyCode == 39 ) {
                // 오른쪽
                //console.log("right");
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');
                
                //self.run()
                self.run(self);
                self.runingState = true;
                //self.xPos += self.speed;
                //self.mainElem.style.left = self.xPos + "%";
            }
        });

        window.addEventListener('keyup', (e)=>{
            self.mainElem.classList.remove('running');
            cancelAnimationFrame(self.rafId);
            self.runingState = false;
        });
    },
    run: function(self) {
        //const self = this;

        

        if( self.direction == 'left') {
            self.xPos -= self.speed;
        } else if ( self.direction == 'right') {
            self.xPos += self.speed;
        }

        if (self.xPos < 2) { self.xPos = 2; }
        if (self.xPos > 88) { self.xPos = 88; }

        // this가 가르키는 요소가 바껴서 오류 발생
        // 자바스크립트는 실행되는 문맥에 따라서 this 값이 변경
        // 첫 턴에는 문제 없으나, requestAnimationFrame를 통해 다시 반복될때 window 전역 객체를 가르키는 문제
        // >> requestAnimationFrame(self.run);
        // 해결 방안 (1) 함수의 매개변수로 전달해서 this를 살리는 방법
        //           (2) bind 메서드로 this를 직접 지정하기
        // console.log(self);
        self.mainElem.style.left  = self.xPos + "%";

        self.rafId = requestAnimationFrame(function() {
            self.run(self)
        });
    }
    // run: function() {
    //     const self = this;

    //     if( self.direction == 'left') {
    //         self.xPos -= self.speed;
    //     } else if ( self.direction == 'right') {
    //         self.xPos += self.speed;
    //     }
        
    //     self.mainElem.style.left  = self.xPos + "%";

    //     self.rafId = requestAnimationFrame(
    //         self.run.bind(self)
    //     )
    // }
};
