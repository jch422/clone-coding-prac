(() => {
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값 합
    let currentScene = 0; // 현재 활성화 된 scroll-section

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            hieghtNum: 5, // ex) 5 => 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
            },
        },
        {
            // 1
            type: 'normal',
            hieghtNum: 5, // ex) 5 => 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            },
        },
        {
            // 2
            type: 'sticky',
            hieghtNum: 5, // ex) 5 => 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
            },
        },
        {
            // 3
            type: 'sticky',
            hieghtNum: 5, // ex) 5 => 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            },
        },
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight =
                sceneInfo[i].hieghtNum * window.innerHeight; // window. => 생략가능
            sceneInfo[
                i
            ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }
        if (yOffset >= 0 && yOffset < prevScrollHeight) {
            currentScene--;
        }
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset; // window.pageYOffset => 현재 스크롤 위치
        scrollLoop();
    });

    setLayout();
})();
