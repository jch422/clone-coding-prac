(() => {
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값 합
    let currentScene = 0; // 현재 활성화 된 scroll-section
    let enterNewScene = false; // 새로운 scene이 시작된 순간 true

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            hieghtNum: 5, // ex) 5 => 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector(
                    '#scroll-section-0 .main-message.a'
                ),
                messageB: document.querySelector(
                    '#scroll-section-0 .main-message.b'
                ),
                messageC: document.querySelector(
                    '#scroll-section-0 .main-message.c'
                ),
                messageD: document.querySelector(
                    '#scroll-section-0 .main-message.d'
                ),
            },
            values: {
                messageA_opacity: { from: 0, to: 1 }, // 시작값, 끝값
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

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues({ from, to }, currentYOffset) {
        // currentYOffset => 현재 씬에서 얼마나 스크롤됐는지
        const scrollRatio =
            currentYOffset / sceneInfo[currentScene].scrollHeight;
        const rv = scrollRatio * (to - from) + from;

        return rv;
    }

    function playAnimation() {
        const { objs } = sceneInfo[currentScene];
        const { values } = sceneInfo[currentScene];
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentScene) {
            case 0:
                const { messageA_opacity } = values;
                const messageA_opacity_in = calcValues(
                    messageA_opacity,
                    currentYOffset
                );
                objs.messageA.style.opacity = messageA_opacity_in;
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (yOffset >= 0 && yOffset < prevScrollHeight) {
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (enterNewScene) return;

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset; // window.pageYOffset => 현재 스크롤 위치
        scrollLoop();
    });
    //window.addEventListener('DOMContentLoaded', setLayout); // DOM만 로드 되면 실행되기 때문에 load 보다 실행시점이 조금 더 빠르다
    window.addEventListener('load', setLayout); // 웹페이지의 이미지 등 리소스 전부 로드되고 나서 실행
    window.addEventListener('resize', setLayout);
})();
