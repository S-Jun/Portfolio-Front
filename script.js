// 선택된 섹션을 관리하기 위한 변수
let currentSection = 0;

// 모든 섹션을 가져오기
const sections = document.querySelectorAll('.section');

// 스크롤 중복 방지를 위한 플래그
let isScrolling = false;

// 애니메이션 진행 시간 (초)
const animationDuration = 1000;  // 1초

// 스크롤 이동 함수 (애니메이션 적용)
function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;

    isScrolling = true; // 스크롤 중 플래그 활성화

    // 애니메이션 시작 시간
    const startTime = performance.now();
    const startPos = window.scrollY;
    const targetPos = sections[index].offsetTop;

    // 애니메이션 함수 (시간에 따라 위치를 조정)
    function animateScroll(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / animationDuration, 1); // 0~1 사이로 비례

        // 처음엔 느리고, 중간엔 빨라지고, 끝에는 다시 느려지는 함수 (sin 함수 이용)
        const easeProgress = 0.5 - 0.5 * Math.cos(Math.PI * progress);  // Ease-in-out effect

        window.scrollTo(0, startPos + (targetPos - startPos) * easeProgress);

        // 애니메이션이 끝날 때까지 반복
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            isScrolling = false;  // 애니메이션 완료 후 스크롤 플래그 해제
        }
    }

    // 애니메이션 시작
    requestAnimationFrame(animateScroll);

    // 현재 섹션 업데이트
    currentSection = index;
}

// 마우스 휠 이벤트 핸들러
function handleMouseWheel(event) {
    const deltaY = event.deltaY;

    if (deltaY > 0) {
        // 아래로 스크롤
        scrollToSection(currentSection + 1);
    } else if (deltaY < 0) {
        // 위로 스크롤
        scrollToSection(currentSection - 1);
    }
}

// 마우스 휠 이벤트 연결
window.addEventListener('wheel', handleMouseWheel);

// 키보드 이벤트 핸들러 (위/아래 방향키로도 섹션 이동)
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        scrollToSection(currentSection + 1);
    } else if (event.key === 'ArrowUp') {
        scrollToSection(currentSection - 1);
    }
});


// 모든 portfolio-box 요소를 선택
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

// Intersection Observer 설정
const observerOptions = {
    root: null,  // viewport
    threshold: 0.2 // 20%가 화면에 보일 때 애니메이션 시작
};

// 콜백 함수: 교차 상태 변화가 있을 때 호출
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // 요소가 화면에 20% 이상 보일 때
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');  // 'visible' 클래스 추가하여 애니메이션 실행
        } else {
            entry.target.classList.remove('visible');  // 화면에서 벗어나면 'visible' 클래스 제거
        }
    });
};

// Intersection Observer 인스턴스 생성
const observer = new IntersectionObserver(observerCallback, observerOptions);

// 각 portfolio-box에 대해 Intersection Observer 적용
portfolioBoxes.forEach(box => {
    observer.observe(box);
});

document.querySelectorAll('.portfolio-box').forEach(function (box, index) {
    box.addEventListener('click', function () {
        // 모든 설명 이미지와 GitHub 이미지를 숨김
        document.querySelectorAll('.explain-contents').forEach(function (content) {
            content.style.display = 'none'; // 화면에서 공간 제거
            content.style.opacity = 0; // 투명화
        });

        document.querySelectorAll('#github-image1').forEach(function (githubImage) {
            githubImage.style.display = 'none'; // 화면에서 공간 제거
            githubImage.style.opacity = 0; // 투명화
        });

        document.querySelectorAll('#github-image2').forEach(function (githubImage) {
            githubImage.style.display = 'none'; // 화면에서 공간 제거
            githubImage.style.opacity = 0; // 투명화
        });


        // 클릭한 box에 맞는 설명 이미지와 GitHub 이미지 보여주기
        if (index === 0) { // 첫 번째 박스 클릭
            const searchRankImage = document.querySelector('#searchRank');
            const githubImage = document.querySelector('#github-image1');

            // 설명 이미지 나타내기
            searchRankImage.style.display = 'block';
            setTimeout(() => (searchRankImage.style.opacity = 1), 0);

            // GitHub 이미지 나타내기
            githubImage.style.display = 'block';
            setTimeout(() => (githubImage.style.opacity = 1), 0);
        } else if (index === 2) { // 세 번째 박스 클릭
            const initialGameImage = document.querySelector('#initalGame');
            const githubImage = document.querySelector('#github-image2');

            // 설명 이미지 나타내기
            initialGameImage.style.display = 'block';
            setTimeout(() => (initialGameImage.style.opacity = 1), 0);

            // GitHub 이미지 나타내기
            githubImage.style.display = 'block';
            setTimeout(() => (githubImage.style.opacity = 1), 0);
        }
    });
});