(function(){
    // 문서 전체 높이 - 눈에 보이는 화면 높이 = 스크롤바 높이 
    // >> 스크롤하는 영역 -> 비율로 정해서 house의 translateZ 값을 정함
    // document.body.offsetHeight - window.innerHeight

    const stageElem = document.querySelector(".stage");
    const houseElem = document.querySelector(".house");
    const barElem = document.querySelector(".progress-bar");
    const mousePos = { x: 0, y : 0};
    let maxScrollValue;

    resizeHandler();

    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
        console.log("maxScrollValue : " + maxScrollValue);
    }

    window.addEventListener('scroll', ()=>{
        console.log("window.pageYOffset : " + window.pageYOffset);
        console.log("scrollPer : " + window.pageYOffset / maxScrollValue);

        let scrollPer = window.pageYOffset / maxScrollValue;
        let zMove = scrollPer * 970;
        let standZ = -490;

        // house translateZ
        houseElem.style.transform = 'translateZ('+ (zMove + standZ) +'vw)';
        // progress bar
        barElem.style.width = (scrollPer * 100) + "%"
       
    })
    
    window.addEventListener('resize', resizeHandler)

    window.addEventListener('mousemove', (e)=>{
        // console.log("mousemove : " + e.clientX + " / " + e.clientY);
        // 가운데는 브라우저 폭과 높이의 절반값이기 때문에 회전 계산이 어려움
        // >> 우리만의 계산 방식으로 가운데 0, 상하좌우에서는 1로 바꿔줘서 각도로 사용
        
        // x(-1 ~ +1), y(+1 ~ -1) 마우스 상하좌우값 계산식
        // 전체 윈도우의 폭 . 현재 마우스의 위치 대비 비율 계산

        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        console.log(mousePos);
        stageElem.style.transform  = 'rotateX(' + (mousePos.y*5) + 'deg) rotateY('+ (mousePos.x*5) +'deg)' 
    })
})();