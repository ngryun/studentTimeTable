// 학생 시간표 HTML 템플릿 생성기 (정규식 오류 수정 버전)

// 테마별 컬러 팔레트 정의
const themes = {
    'classic-blue': {
        primary: '#0F4C81',
        primaryLight: '#2E86AB',
        accent: '#4A90A4',
        background: '#F7FAFC',
        cardBg: '#FFFFFF',
        headerBg: '#0F4C81',
        headerText: '#FFFFFF'
    },
    'living-coral': {
        primary: '#FF6F61',
        primaryLight: '#FF8A80',
        accent: '#FFB3BA',
        background: '#FFF8F7',
        cardBg: '#FFFFFF',
        headerBg: '#FF6F61',
        headerText: '#FFFFFF'
    },
    'ultra-violet': {
        primary: '#6B5B95',
        primaryLight: '#8E7DBE',
        accent: '#B19CD9',
        background: '#F8F7FB',
        cardBg: '#FFFFFF',
        headerBg: '#6B5B95',
        headerText: '#FFFFFF'
    },
    'greenery': {
        primary: '#88B04B',
        primaryLight: '#A8CC8C',
        accent: '#C8D4B8',
        background: '#F7FAF4',
        cardBg: '#FFFFFF',
        headerBg: '#88B04B',
        headerText: '#FFFFFF'
    },
    'marsala': {
        primary: '#955251',
        primaryLight: '#B87071',
        accent: '#D4A5A5',
        background: '#FAF7F7',
        cardBg: '#FFFFFF',
        headerBg: '#955251',
        headerText: '#FFFFFF'
    },
    'serenity': {
        primary: '#92A8D1',
        primaryLight: '#B8CAE6',
        accent: '#D1E2F7',
        background: '#F7FAFC',
        cardBg: '#FFFFFF',
        headerBg: '#92A8D1',
        headerText: '#FFFFFF'
    }
};

// CSS 스타일 생성 함수
function generateTimetableCSS(selectedTheme = 'serenity') {
    const currentTheme = themes[selectedTheme] || themes['serenity'];
    
    return `
        :root { 
            --primary-color: ${currentTheme.primary}; 
            --primary-light: ${currentTheme.primaryLight}; 
            --accent-color: ${currentTheme.accent};
            --background-color: ${currentTheme.background}; 
            --card-background: ${currentTheme.cardBg}; 
            --header-bg: ${currentTheme.headerBg};
            --header-text: ${currentTheme.headerText};
            --text-color: #2D3748; 
            --subtle-text: #718096; 
            --border-color: #E2E8F0; 
        }
        body { 
            font-family: 'Noto Sans KR', sans-serif; 
            margin: 0; 
            padding: 20px; 
            background-color: var(--background-color); 
            color: var(--text-color); 
        }
        #app-container { 
            max-width: 1200px; 
            margin: 20px auto; 
            background-color: var(--card-background); 
            padding: 40px; 
            border-radius: 16px; 
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); 
        }
        h1 { 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            text-align: center; 
            font-size: 2em; 
            margin-bottom: 30px;
        }
        .title-icon { 
            height: 2.5em; 
            margin-right: 15px; 
            border-radius: 8px; 
            max-width: 150px; 
            object-fit: contain; 
        }

        /* 탭 네비게이션 스타일 */
        .tab-navigation {
            display: flex;
            gap: 0;
            margin-bottom: 30px;
            background: var(--accent-color);
            border-radius: 12px;
            padding: 6px;
            overflow-x: auto;
        }
        .tab-button {
            flex: 1;
            padding: 12px 20px;
            border: none;
            background: transparent;
            color: var(--text-color);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 500;
            font-size: 15px;
            white-space: nowrap;
        }
        .tab-button.active {
            background: var(--card-background);
            color: var(--primary-color);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .tab-button:hover:not(.active) {
            background: rgba(255,255,255,0.5);
        }

        /* 검색 섹션 스타일 */
        #search-section { 
            background: var(--accent-color); 
            padding: 25px; 
            border-radius: 12px; 
            margin-bottom: 30px; 
        }
        .search-container { 
            position: relative; 
            max-width: 500px; 
            margin: 0 auto; 
        }
        #search-input { 
            width: 100%; 
            padding: 15px 20px 15px 50px; 
            border: 1px solid var(--border-color); 
            border-radius: 12px; 
            font-size: 16px; 
            box-sizing: border-box; 
        }
        .search-icon { 
            position: absolute; 
            left: 18px; 
            top: 50%; 
            transform: translateY(-50%); 
            color: var(--subtle-text); 
        }
        .autocomplete-dropdown { 
            position: absolute; 
            top: calc(100% + 5px); 
            left: 0; 
            right: 0; 
            background: white; 
            border: 1px solid var(--border-color); 
            border-radius: 12px; 
            max-height: 200px; 
            overflow-y: auto; 
            z-index: 1000; 
            display: none; 
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); 
        }
        .autocomplete-item { 
            padding: 12px 20px; 
            cursor: pointer; 
            border-bottom: 1px solid #f1f1f1; 
        }
        .autocomplete-item:hover, .autocomplete-item.selected { 
            background-color: var(--primary-light); 
            color: white; 
        }
        .favorites-section { 
            margin-top: 20px; 
            text-align: center; 
        }
        .favorites-title { 
            font-size: 14px; 
            color: var(--subtle-text); 
            margin-bottom: 12px; 
        }
        .favorite-chips { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 10px; 
            justify-content: center; 
        }
        .favorite-chip { 
            background: var(--card-background); 
            padding: 8px 14px; 
            border-radius: 20px; 
            font-size: 14px; 
            cursor: pointer; 
            border: none; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
        }

        /* 시간표 헤더 스타일 */
        .schedule-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 20px; 
        }
        .schedule-info h2 { 
            margin: 0; 
            font-size: 1.8em; 
        }
        .action-btn { 
            display: inline-flex; 
            align-items: center; 
            gap: 8px; 
            padding: 8px 16px; 
            border: 1px solid var(--border-color); 
            background: white; 
            border-radius: 8px; 
            cursor: pointer; 
        }
        .action-btn.favorited { 
            background: #FFC107; 
            color: white; 
        }

        /* 테이블 스타일 */
        table { 
            width: 100%; 
            border-collapse: separate; 
            border-spacing: 0; 
            font-size: 15px; 
            table-layout: fixed; 
        }
        th, td { 
            border-bottom: 1px solid var(--border-color); 
            text-align: center; 
            vertical-align: middle; 
        }
        td { 
            height: 80px; 
            padding: 8px 4px; 
            line-height: 1.5; 
        }
        thead th { 
            background: var(--header-bg); 
            color: var(--header-text); 
            font-weight: 600; 
            padding: 15px; 
            border-bottom: 2px solid var(--primary-color);
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        thead th:first-child { 
            border-top-left-radius: 8px; 
        }
        thead th:last-child { 
            border-top-right-radius: 8px; 
        }
        tbody td { 
            border-right: 1px solid var(--border-color); 
        }
        tbody tr td:first-child { 
            border-left: 1px solid var(--border-color); 
            font-weight: 500;
        }
        tbody tr:first-child td { 
            border-top: 1px solid var(--border-color); 
        }

        /* 빈 상태 스타일 */
        .empty-state { 
            text-align: center; 
            padding: 80px 20px; 
        }
        .empty-state-icon { 
            font-size: 5em; 
            margin-bottom: 20px; 
            opacity: 0.5; 
        }

        /* 셀 내용 스타일링 */
        td .subject-name {
            font-weight: 600;
            font-size: 1em;
            color: var(--text-color);
            margin-bottom: 4px;
        }
        td .details {
            margin-top: 6px;
            line-height: 1.4;
        }
        .location-chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            background: linear-gradient(135deg, var(--accent-color), var(--primary-light));
            color: var(--text-color);
            border-radius: 16px;
            font-size: 11px;
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .teacher-name {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: var(--subtle-text);
            font-weight: 500;
            padding: 2px 6px;
            background: rgba(0,0,0,0.05);
            border-radius: 12px;
        }
        .location-chip::before { 
            content: '🏫'; 
            font-size: 10px; 
        }

        /* 새로운 조회 모드 전용 스타일 */
        .class-schedule-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .student-card {
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .student-card h4 {
            margin: 0 0 10px 0;
            color: var(--primary-color);
            font-size: 1.1em;
        }
        .period-info {
            font-size: 13px;
            margin: 5px 0;
            padding: 5px 8px;
            background: var(--accent-color);
            border-radius: 4px;
        }

        .usage-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            background: var(--accent-color);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: var(--primary-color);
        }
        .stat-label {
            font-size: 14px;
            color: var(--subtle-text);
            margin-top: 5px;
        }

        /* 반응형 스타일 */
        @media (max-width: 768px) {
            body { padding: 10px; }
            #app-container { padding: 20px; margin: 10px auto; border-radius: 12px; }
            h1 { font-size: 1.5em; margin-bottom: 20px; flex-direction: column; gap: 10px; }
            .title-icon { margin-right: 0; margin-bottom: 5px; height: 2em; max-width: 120px; }
            .tab-navigation { flex-direction: column; }
            .tab-button { flex: none; }
            #search-section { padding: 20px 15px; margin-bottom: 20px; }
            .search-container { max-width: 100%; }
            #search-input { width: 100%; padding: 12px 15px 12px 45px; font-size: 16px; border-radius: 8px; box-sizing: border-box; }
            .search-icon { left: 15px; }
            .favorite-chips { gap: 8px; justify-content: flex-start; flex-wrap: wrap; }
            .favorite-chip { padding: 6px 12px; font-size: 13px; white-space: nowrap; }
            .schedule-header { flex-direction: column; gap: 15px; align-items: flex-start; margin-bottom: 15px; }
            .schedule-info h2 { font-size: 1.4em; text-align: center; width: 100%; }
            .action-btn { flex: 1; min-width: 120px; padding: 10px 12px; font-size: 14px; justify-content: center; }
            table { font-size: 12px; }
            td { height: 70px; line-height: 1.4; }
            .table-container { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            th:first-child, td:first-child { position: sticky; left: 0; background: var(--card-background); z-index: 1; box-shadow: 2px 0 4px rgba(0,0,0,0.05); min-width: 50px; }
            thead th:first-child { background: var(--header-bg); color: var(--header-text); }
            .empty-state { padding: 60px 20px; }
            .empty-state-icon { font-size: 3em; }
            .empty-state h3 { font-size: 1.2em; margin-top: 15px; }
            .class-schedule-grid { grid-template-columns: 1fr; }
            .usage-stats { grid-template-columns: repeat(2, 1fr); }
        }

        /* 인쇄 스타일 - 최소한으로 줄여서 웹 스타일을 그대로 유지 */
        @media print {
            /* 인쇄에 불필요한 요소만 숨기기 */
            #search-section, .schedule-actions, .title-icon, .tab-navigation { display: none !important; }
            
            /* 페이지 레이아웃만 조정 */
            body { 
                background: white !important; 
                padding: 0 !important; 
                margin: 0 !important; 
                -webkit-print-color-adjust: exact !important;
            }
            #app-container { 
                box-shadow: none !important; 
                padding: 15px !important; 
                margin: 0 !important; 
                max-width: 100% !important; 
                background-color: white !important;
            }
            
            /* 제목 크기만 인쇄용으로 조정 */
            h1 { font-size: 16pt !important; }
            .schedule-info h2 { font-size: 14pt !important; }
            
            /* 모든 색상이 인쇄되도록 보장 */
            * { 
                -webkit-print-color-adjust: exact !important; 
                color-adjust: exact !important;
            }
            
            /* 반별 탭 인쇄 시 - 페이지 나누기만 적용 */
            .student-print-page {
                page-break-before: always !important;
                page-break-after: auto !important;
                page-break-inside: avoid !important;
                margin-bottom: 20px !important;
            }
            
            .student-print-page:first-child {
                page-break-before: auto !important;
            }
            
            /* 포켓사이즈 모드 - 2행 2열 4개 시간표 */
            body.pocket-size .class-schedule-print-container {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                grid-template-rows: repeat(2, auto) !important;
                grid-gap: 2mm !important;
                width: 100% !important;
                max-width: 200mm !important;
                height: auto !important;
                max-height: 270mm !important;
                margin: 0 auto !important;
                padding: 3mm !important;
                box-sizing: border-box !important;
                page-break-inside: avoid !important;
                page-break-after: always !important;
            }
            
            body.pocket-size .class-schedule-print-container:last-child {
                page-break-after: auto !important;
            }
            
            body.pocket-size .pocket-page-break {
                page-break-before: always !important;
            }
            
            body.pocket-size .student-print-page {
                width: 100% !important;
                height: auto !important;
                max-height: 100mm !important;
                display: block !important;
                margin: 0 !important;
                padding: 1mm !important;
                border: 0.5px solid #666 !important;
                page-break-inside: avoid !important;
                page-break-before: auto !important;
                page-break-after: auto !important;
                box-sizing: border-box !important;
                overflow: hidden !important;
            }
            
            body.pocket-size .student-print-page h3 {
                font-size: 7pt !important;
                margin: 0 0 1mm 0 !important;
                padding: 0.5mm 0 !important;
                text-align: center !important;
                border-bottom: 0.5px solid #999 !important;
            }
            
            body.pocket-size .student-print-page table {
                font-size: 5pt !important;
                width: 100% !important;
                margin: 0 !important;
                table-layout: fixed !important;
            }
            
            body.pocket-size .student-print-page th,
            body.pocket-size .student-print-page td {
                padding: 0.5mm !important;
                height: 10mm !important;
                font-size: 6pt !important;
                line-height: 1.1 !important;
                border: 0.3px solid #999 !important;
                overflow: hidden !important;
            }
            
            body.pocket-size .student-print-page th {
                height: 7mm !important;
                font-size: 6pt !important;
                font-weight: bold !important;
            }
            
            body.pocket-size .subject-name {
                font-size: 5.5pt !important;
                margin-bottom: 0.3mm !important;
                font-weight: bold !important;
                line-height: 1 !important;
            }
            
            body.pocket-size .details {
                margin-top: 0.3mm !important;
                line-height: 1 !important;
            }
            
            body.pocket-size .location-chip,
            body.pocket-size .teacher-name {
                font-size: 4.5pt !important;
                padding: 0px 1px !important;
                display: inline !important;
                background: rgba(0,0,0,0.1) !important;
                border-radius: 1px !important;
            }
            
            body.pocket-size .location-chip::before {
                content: '' !important;
            }
            
            /* 포켓사이즈 모드에서 헤더 숨기기 */
            body.pocket-size .schedule-header {
                display: none !important;
            }
            
            /* 인쇄 시 상단 제목 숨기기 */
            body.pocket-size h1 {
                display: none !important;
            }
        }
    `;
}

// JavaScript 코드 생성 함수 - 주간시간표 데이터 포함
function generateTimetableJS(dataJsonString, enabledFeatures, weeklyData) {
    // 디버깅: enabledFeatures 검증 및 기본값 설정
    if (!enabledFeatures || typeof enabledFeatures !== 'object') {
        console.warn('⚠️ enabledFeatures가 올바르지 않습니다. 기본값을 사용합니다.');
        enabledFeatures = { student: true, class: true, classroom: true, teacher: true };
    }
    
    // 각 기능이 명시적으로 false가 아닌 경우 true로 설정 (안전장치)
    const safeEnabledFeatures = {
        student: enabledFeatures.student !== false,
        class: enabledFeatures.class !== false,
        classroom: enabledFeatures.classroom !== false,
        teacher: enabledFeatures.teacher !== false
    };
    
    console.log('🔧 Safe features applied:', safeEnabledFeatures);
    
    return `
        // 디버깅: 생성된 JavaScript에서 features 확인
        console.log('🎯 Templates received features:', ${JSON.stringify(safeEnabledFeatures)});
        
        const allStudents = ${dataJsonString};
        console.log('학생 데이터 (첫 5개):', allStudents.slice(0, 5));
        const enabledFeatures = ${JSON.stringify(safeEnabledFeatures)};
        const weeklyScheduleData = ${weeklyData ? JSON.stringify(weeklyData) : 'null'};
        console.log('주간시간표 데이터:', weeklyScheduleData ? '로드됨' : '없음');
        
        // 정규식 패턴들을 미리 정의 (템플릿 리터럴 오류 방지)
        const regexPatterns = {
            locationChip: new RegExp('<span class="location-chip">([^<]+)</span>', 'g'),
            subjectName: new RegExp('<div class="subject-name">([^<]+)</div>', 'g'),
            teacherName: new RegExp('<span class="teacher-name">([^<]+)</span>', 'g')
        };
        
        // 추가 디버깅
        console.log('📊 Final enabledFeatures in runtime:', enabledFeatures);
        console.log('✅ Available features check:', {
            student: enabledFeatures.student,
            class: enabledFeatures.class,
            classroom: enabledFeatures.classroom,
            teacher: enabledFeatures.teacher
        });
        
        // 데이터 전처리
        allStudents.forEach((student, index) => {
            // uniqueId가 없으면 생성
            if (!student.uniqueId) {
                student.uniqueId = student.name + '||' + student.homeroom + '||' + student.number;
            }
        });

        // 각종 데이터 추출
        const classData = extractClassData(allStudents);
        const classroomData = extractClassroomData(allStudents);
        const teacherData = weeklyScheduleData ? extractTeacherDataFromWeekly(weeklyScheduleData) : extractTeacherData(allStudents);

        let favorites = JSON.parse(localStorage.getItem('favStudents') || '[]');
        let filteredData = []; 
        let selectedIndex = -1;
        let currentMode = ''; // 초기값은 빈 문자열로, setupTabs에서 설정됨

        const scheduleContainer = document.getElementById('schedule-container');
        

        function init() {
            console.log('🚀 Initializing timetable system...');
            console.log('📊 Features check at init:', enabledFeatures);
            
            // DOM이 준비될 때까지 기다림
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    console.log('📄 DOM loaded, starting setup...');
                    performInit();
                });
            } else {
                console.log('📄 DOM already loaded, starting setup...');
                performInit();
            }
        }
        
        function performInit() {
            try {
                setupTabs();
                updateSearchSection();
                showEmptyState();
                console.log('✅ Initialization completed successfully');
            } catch (error) {
                console.error('❌ Initialization failed:', error);
                // 오류 발생시 기본 탭이라도 보여주기
                const tabNavigation = document.querySelector('.tab-navigation');
                if (tabNavigation) {
                    tabNavigation.innerHTML = '' +
                        '<button class="tab-button active" data-mode="student">🧑‍🎓 학생별</button>' +
                        '<button class="tab-button" data-mode="class">🏫 반별</button>' +
                        '<button class="tab-button" data-mode="classroom">🚪 교실별</button>' +
                        '<button class="tab-button" data-mode="teacher">👨‍🏫 선생님별</button>';
                    currentMode = 'student';  
                    setupBasicEventListeners();
                }
            }
        }
        
        function setupBasicEventListeners() {
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentMode = btn.dataset.mode;
                    updateSearchSection();
                    showEmptyState();
                });
            });
        }

        function setupTabs() {
            const tabsHtml = [];
            const availableModes = [];
            
            console.log('🏗️ Setting up tabs with features:', enabledFeatures); // 디버깅용
            
            // enabledFeatures가 없거나 모든 기능이 비활성화된 경우 기본값 설정
            const safeFeatures = enabledFeatures || {};
            const hasAnyFeature = safeFeatures.student || safeFeatures.class || safeFeatures.classroom || safeFeatures.teacher;
            
            if (!hasAnyFeature) {
                console.warn('❌ No features enabled, using defaults');
                // 기본적으로 모든 기능 활성화
                safeFeatures.student = true;
                safeFeatures.class = true;
                safeFeatures.classroom = true;
                safeFeatures.teacher = true;
            }
            
            if (safeFeatures.student) {
                availableModes.push('student');
                tabsHtml.push('<button class="tab-button" data-mode="student">🧑‍🎓 학생별</button>');
                console.log('✅ Student tab added');
            }
            if (safeFeatures.class) {
                availableModes.push('class');
                tabsHtml.push('<button class="tab-button" data-mode="class">🏫 반별</button>');
                console.log('✅ Class tab added');
            }
            if (safeFeatures.classroom) {
                availableModes.push('classroom');
                tabsHtml.push('<button class="tab-button" data-mode="classroom">🚪 교실별</button>');
                console.log('✅ Classroom tab added');
            }
            if (safeFeatures.teacher) {
                availableModes.push('teacher');
                tabsHtml.push('<button class="tab-button" data-mode="teacher">👨‍🏫 선생님별</button>');
                console.log('✅ Teacher tab added');
            }
            
            const tabNavigation = document.querySelector('.tab-navigation');
            
            if (availableModes.length === 0) {
                // 이 경우는 이제 발생하지 않아야 함
                console.error('❌ No features enabled after safety check!');
                tabNavigation.innerHTML = '<div style="text-align: center; padding: 20px; color: #999;">선택된 조회 기능이 없습니다.</div>';
                return;
            }
            
            // 첫 번째 사용 가능한 모드를 기본값으로 설정
            currentMode = availableModes[0];
            console.log('🎯 Current mode set to:', currentMode); // 디버깅용
            
            tabNavigation.innerHTML = tabsHtml.join('');
            console.log('📋 Generated tabs:', tabsHtml.length);
            
            // 첫 번째 탭을 활성화
            const firstTab = document.querySelector('.tab-button');
            if (firstTab) {
                firstTab.classList.add('active');
                console.log('🎯 First tab activated:', firstTab.dataset.mode);
            }
            
            // 탭 클릭 이벤트
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.addEventListener('click', () => {
                    console.log('🖱️ Tab clicked:', btn.dataset.mode);
                    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentMode = btn.dataset.mode;
                    updateSearchSection();
                    showEmptyState();
                });
            });
        }

        function setupEventListeners() {
            const searchInput = document.getElementById('search-input');
            const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
            
            if (!searchInput || !autocompleteDropdown) return; // 학생별 탭이 아닌 경우
            
            searchInput.addEventListener('input', e => {
                const query = e.target.value.trim().toLowerCase();
                if (query === '') {
                    filteredData = [];
                    hideDropdown();
                    return;
                }
                
                // 학생별 탭에서만 검색 기능 사용
                if (currentMode === 'student') {
                    filteredData = allStudents.filter(student => {
                        const name = student.name ? student.name.toLowerCase() : '';
                        const homeroom = student.homeroom || '';
                        const number = student.number || '';
                        const studentNumber = number ? String(number) : '';
                        
                        return name.includes(query) || 
                               (homeroom + '-' + number).includes(query) ||
                               studentNumber.includes(query) ||
                               (studentNumber.length <= 5 ? studentNumber.padStart(5, '0') : studentNumber).includes(query);
                    });
                    updateAutocomplete();
                }
            });

            searchInput.addEventListener('keydown', e => {
                const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
                if (!items.length) return;
                switch(e.key) {
                    case 'ArrowDown': e.preventDefault(); selectedIndex = (selectedIndex + 1) % items.length; break;
                    case 'ArrowUp': e.preventDefault(); selectedIndex = (selectedIndex - 1 + items.length) % items.length; break;
                    case 'Enter': e.preventDefault(); 
                        if (selectedIndex >= 0 && items[selectedIndex]) { 
                            items[selectedIndex].click(); 
                        } else if (filteredData.length > 0) { 
                            selectItem(filteredData[0].uniqueId); 
                        } 
                        return;
                    case 'Escape': hideDropdown(); return;
                }
                items.forEach((item, index) => item.classList.toggle('selected', index === selectedIndex));
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) hideDropdown();
            });
        }

        function updateSearchSection() {
            const searchSection = document.getElementById('search-section');
            
            if (currentMode === 'student') {
                // 학생별 탭: 검색창 + 즐겨찾기
                searchSection.innerHTML = '' +
                    '<div class="search-container">' +
                        '<div class="search-icon">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<circle cx="11" cy="11" r="8"></circle>' +
                                '<line x1="21" y1="21" x2="16.65" y2="16.65"></line>' +
                            '</svg>' +
                        '</div>' +
                        '<input type="text" id="search-input" placeholder="학생 이름 또는 학번을 입력하세요...">' +
                        '<div class="autocomplete-dropdown" id="autocomplete-dropdown"></div>' +
                    '</div>' +
                    '<div class="favorites-section">' +
                        '<div class="favorites-title">자주 찾는 학생</div>' +
                        '<div class="favorite-chips" id="favorite-chips"></div>' +
                    '</div>';
            } else if (currentMode === 'class') {
                // 반별 탭: 반 목록
                const classList = Object.keys(classData).sort();
                const classButtons = classList.map(cls => 
                    '<button class="favorite-chip" onclick="selectItem(\\'' + cls + '\\');">' + cls + '반</button>'
                ).join('');
                searchSection.innerHTML = '' +
                    '<div class="favorites-section">' +
                        '<div class="favorites-title">반 선택</div>' +
                        '<div class="favorite-chips">' + classButtons + '</div>' +
                    '</div>';
            } else if (currentMode === 'classroom') {
                // 교실별 탭: 교실 목록
                const classroomList = Object.keys(classroomData).sort();
                const classroomButtons = classroomList.map(room => 
                    '<button class="favorite-chip" onclick="selectItem(\\'' + room + '\\');">' + room + '</button>'
                ).join('');
                searchSection.innerHTML = '' +
                    '<div class="favorites-section">' +
                        '<div class="favorites-title">교실 선택</div>' +
                        '<div class="favorite-chips">' + classroomButtons + '</div>' +
                    '</div>';
            } else if (currentMode === 'teacher') {
                // 선생님별 탭: 선생님 목록
                const teacherList = Object.keys(teacherData).sort();
                const teacherButtons = teacherList.map(teacher => 
                    '<button class="favorite-chip" onclick="selectItem(\\'' + teacher + '\\');">' + teacher + ' 선생님</button>'
                ).join('');
                searchSection.innerHTML = '' +
                    '<div class="favorites-section">' +
                        '<div class="favorites-title">선생님 선택</div>' +
                        '<div class="favorite-chips">' + teacherButtons + '</div>' +
                    '</div>';
            }
            
            // 학생별 탭에서만 이벤트 리스너 재설정
            if (currentMode === 'student') {
                setupEventListeners();
                updateFavoriteChips();
            }
        }

        function clearSearch() {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = '';
            }
            filteredData = [];
            hideDropdown();
        }

        function updateAutocomplete() {
            const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
            if (filteredData.length === 0 || !autocompleteDropdown) { 
                hideDropdown(); 
                return; 
            }
            
            const icons = {student: '🧑‍🎓', class: '🏫', classroom: '🚪', teacher: '👨‍🏫'};
            
            autocompleteDropdown.innerHTML = filteredData.map(item => {
                const icon = icons[item.type || 'student'];
                let displayName = '';
                
                if (item.type === 'student' || !item.type) {
                    // 이름(학번) 형식으로 표시 - 학년+반+번호
                    const name = item.name || '이름없음';
                    const homeroom = item.homeroom || '';
                    const number = item.number || '';
                    
                    displayName = name;
                    
                    // 학번 생성: 학년+반+번호
                    if (homeroom && number && String(number).trim() !== '') {
                        const parts = homeroom.split('-');
                        if (parts.length === 2) {
                            const grade = parts[0]; // 학년
                            const classNum = parts[1].padStart(2, '0'); // 반 (2자리)
                            const studentNum = String(number).trim().padStart(2, '0'); // 번호 (2자리)
                            const studentId = grade + classNum + studentNum; // 예: 20506
                            displayName = name + ' (' + studentId + ')';
                        }
                    }
                } else {
                    displayName = item.name || '이름없음';
                }
                
                return '<div class="autocomplete-item" onclick="selectItem(\\'' + (item.uniqueId || '') + '\\')">' + icon + ' ' + displayName + '</div>';
            }).join('');
            showDropdown();
        }

        function selectItem(uniqueId) {
            switch(currentMode) {
                case 'student':
                    const student = allStudents.find(s => s.uniqueId === uniqueId);
                    if (student) {
                        const searchInput = document.getElementById('search-input');
                        if (searchInput) searchInput.value = student.name;
                        hideDropdown();
                        displayStudentSchedule(uniqueId);
                    }
                    break;
                case 'class':
                    // 반별 탭에서는 검색창이 없으므로 바로 표시
                    displayClassSchedule(uniqueId);
                    break;
                case 'classroom':
                    // 교실별 탭에서는 검색창이 없으므로 바로 표시  
                    displayClassroomSchedule(uniqueId);
                    break;
                case 'teacher':
                    // 선생님별 탭에서는 검색창이 없으므로 바로 표시
                    displayTeacherSchedule(uniqueId);
                    break;
            }
        }

        function displayStudentSchedule(uniqueId) {
            const student = allStudents.find(s => s.uniqueId === uniqueId);
            if (!student) { showEmptyState(); return; }
            
            const isFavorite = favorites.includes(uniqueId);
            const days = ['월', '화', '수', '목', '금'];
            const { maxPeriods, periodCounts } = student;
            
            // 학번 표시 준비 - 학년+반+번호 형식으로 변경
            const homeroom = student.homeroom || '';
            const number = student.number ? String(student.number) : '';
            let studentId = '';
            
            if (homeroom && number) {
                // homeroom이 "2-5" 형식인 경우
                const parts = homeroom.split('-');
                if (parts.length === 2) {
                    const grade = parts[0]; // 학년
                    const classNum = parts[1].padStart(2, '0'); // 반 (2자리)
                    const studentNum = number.padStart(2, '0'); // 번호 (2자리)
                    studentId = grade + classNum + studentNum; // 예: 20506
                }
            }
            
            const displayName = studentId ? student.name + ' (' + studentId + ')' : student.name;
            
            let tableHTML = '<div class="schedule-header">' +
                    '<div class="schedule-info">' +
                        '<h2>' + displayName + '</h2>' +
                    '</div>' +
                    '<div class="schedule-actions">' +
                        '<button class="action-btn ' + (isFavorite ? 'favorited' : '') + '" onclick="toggleFavorite(\\'' + uniqueId + '\\');">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="' + (isFavorite ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2">' +
                                '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>' +
                            '</svg> ' +
                            (isFavorite ? '즐겨찾기됨' : '즐겨찾기') +
                        '</button>' +
                        '<button class="action-btn" onclick="window.print()">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<polyline points="6 9 6 2 18 2 18 9"></polyline>' +
                                '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2 2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>' +
                                '<rect x="6" y="14" width="12" height="8"></rect>' +
                            '</svg> ' +
                            '인쇄' +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="table-container">' +
                    '<table>' +
                        '<thead>' +
                            '<tr><th>교시</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th></tr>' +
                        '</thead>' +
                        '<tbody>';
            
            for (let i = 0; i < maxPeriods; i++) {
                tableHTML += '<tr><td>' + (i + 1) + '</td>';
                days.forEach((day, dayIndex) => {
                    if (i < (periodCounts[dayIndex] || 0)) {
                        const cellContent = student.schedule[day][i] || '';
                        tableHTML += '<td>' + cellContent + '</td>';
                    } else {
                        tableHTML += '<td style="background-color: #f8f9fa;"></td>';
                    }
                });
                tableHTML += '</tr>';
            }
            
            tableHTML += '</tbody></table></div>';
            scheduleContainer.innerHTML = tableHTML;
        }

        function displayClassSchedule(classId) {
            const students = classData[classId] || [];
            if (students.length === 0) { showEmptyState(); return; }
            
            const days = ['월', '화', '수', '목', '금'];
            const maxPeriods = Math.max(...students.map(s => s.maxPeriods));
            
            let html = '<div class="schedule-header">' +
                    '<div class="schedule-info">' +
                        '<h2>' + classId + '반 시간표 <small>(총 ' + students.length + '명)</small></h2>' +
                    '</div>' +
                    '<div class="schedule-actions">' +
                        '<button class="action-btn" id="pocket-toggle" onclick="togglePocketSize()" style="margin-right: 10px;">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<rect x="2" y="6" width="20" height="8" rx="2"></rect>' +
                                '<path d="M6 12h12"></path>' +
                            '</svg> ' +
                            '포켓사이즈' +
                        '</button>' +
                        '<button class="action-btn" onclick="window.print()">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<polyline points="6 9 6 2 18 2 18 9"></polyline>' +
                                '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2 2h16a2 2 0 0 1-2 2h-2"></path>' +
                                '<rect x="6" y="14" width="12" height="8"></rect>' +
                            '</svg> ' +
                            '인쇄' +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="class-schedule-print-container" id="class-container">';
            
            // 각 학생별로 완전한 페이지 생성
            students.forEach((student, index) => {
                // 포켓사이즈 모드에서는 4개씩 그룹으로 페이지 나누기
                if (index > 0 && index % 4 === 0) {
                    html += '</div><div class="class-schedule-print-container pocket-page-break">';
                }
                // 학번 생성: 학년+반+번호
                const homeroom = student.homeroom || '';
                const number = student.number || '';
                let studentId = '';
                
                if (homeroom && number) {
                    const parts = homeroom.split('-');
                    if (parts.length === 2) {
                        const grade = parts[0]; // 학년
                        const classNum = parts[1].padStart(2, '0'); // 반 (2자리)
                        const studentNum = String(number).padStart(2, '0'); // 번호 (2자리)
                        studentId = grade + classNum + studentNum; // 예: 20506
                    }
                }
                
                const displayName = studentId ? student.name + ' (' + studentId + ')' : student.name;
                
                html += '<div class="student-print-page">' +
                        '<h3>' + displayName + '</h3>' +
                        '<div class="table-container">' +
                            '<table>' +
                                '<thead>' +
                                    '<tr><th>교시</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th></tr>' +
                                '</thead>' +
                                '<tbody>';
                
                // 교시별 행 생성
                for (let i = 0; i < maxPeriods; i++) {
                    html += '<tr><td>' + (i + 1) + '</td>';
                    days.forEach((day, dayIndex) => {
                        if (i < (student.periodCounts[dayIndex] || 0)) {
                            const cellContent = student.schedule[day][i] || '';
                            html += '<td>' + cellContent + '</td>';
                        } else {
                            html += '<td style="background-color: #f8f9fa;"></td>';
                        }
                    });
                    html += '</tr>';
                }
                
                html += '</tbody></table></div></div>';
            });
            
            html += '</div>'; // class-schedule-print-container 닫기
            scheduleContainer.innerHTML = html;
        }

        function displayClassroomSchedule(classroomId) {
            const scheduleData = classroomData[classroomId] || {};
            const days = ['월', '화', '수', '목', '금'];
            const maxPeriods = 7; // 기본값
            
            let html = '<div class="schedule-header">' +
                    '<div class="schedule-info">' +
                        '<h2>' + classroomId + ' 교실 사용 현황</h2>' +
                    '</div>' +
                    '<div class="schedule-actions">' +
                        '<button class="action-btn" onclick="window.print()">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<polyline points="6 9 6 2 18 2 18 9"></polyline>' +
                                '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2 2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>' +
                                '<rect x="6" y="14" width="12" height="8"></rect>' +
                            '</svg> ' +
                            '인쇄' +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="table-container">' +
                    '<table>' +
                        '<thead>' +
                            '<tr><th>교시</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th></tr>' +
                        '</thead>' +
                        '<tbody>';
            
            for (let i = 0; i < maxPeriods; i++) {
                html += '<tr><td>' + (i + 1) + '</td>';
                days.forEach(day => {
                    const periodKey = day + (i + 1);
                    const usageInfo = scheduleData[periodKey] || [];
                    
                    if (usageInfo.length > 0) {
                        const content = usageInfo.map((info, infoIndex) => {
                            const studentListId = 'students-' + classroomId + '-' + periodKey + '-' + infoIndex;
                            return '<div class="subject-name">' + info.subject + '</div>' +
                                   '<div class="details">' +
                                       '<span class="teacher-name">' + info.teacher + '</span><br>' +
                                       '<button class="favorite-chip" style="font-size: 11px; padding: 4px 8px; margin-top: 4px;" onclick="toggleStudentList(\\'' + studentListId + '\\')">학생목록</button>' +
                                       '<div id="' + studentListId + '" style="display: none; margin-top: 4px; font-size: 11px; color: #666;">' + info.students.join(', ') + '</div>' +
                                   '</div>';
                        }).join('<hr style="margin: 8px 0; border: 1px solid #eee;">');
                        html += '<td>' + content + '</td>';
                    } else {
                        html += '<td style="background-color: #f8f9fa; color: #999;">비어있음</td>';
                    }
                });
                html += '</tr>';
            }
            
            html += '</tbody></table></div>';
            scheduleContainer.innerHTML = html;
        }

        function displayTeacherSchedule(teacherId) {
            const scheduleData = teacherData[teacherId] || {};
            const days = ['월', '화', '수', '목', '금'];
            const maxPeriods = 7; // 기본값
            
            let html = '<div class="schedule-header">' +
                    '<div class="schedule-info">' +
                        '<h2>' + teacherId + ' 선생님 시간표</h2>' +
                    '</div>' +
                    '<div class="schedule-actions">' +
                        '<button class="action-btn" onclick="window.print()">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<polyline points="6 9 6 2 18 2 18 9"></polyline>' +
                                '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2 2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>' +
                                '<rect x="6" y="14" width="12" height="8"></rect>' +
                            '</svg> ' +
                            '인쇄' +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="table-container">' +
                    '<table>' +
                        '<thead>' +
                            '<tr><th>교시</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th></tr>' +
                        '</thead>' +
                        '<tbody>';
            
            for (let i = 0; i < maxPeriods; i++) {
                html += '<tr><td>' + (i + 1) + '</td>';
                days.forEach(day => {
                    const periodKey = day + (i + 1);
                    const classInfo = scheduleData[periodKey] || [];
                    
                    if (classInfo.length > 0) {
                        const content = classInfo.map(info => 
                            '<div class="subject-name">' + info.subject + '</div>' +
                             '<div class="details">' +
                                 '<span class="location-chip">' + info.classroom + '</span><br>' +
                                 '<small>' + info.students.join(', ') + '</small>' +
                             '</div>'
                        ).join('<hr style="margin: 8px 0; border: 1px solid #eee;">');
                        html += '<td>' + content + '</td>';
                    } else {
                        html += '<td style="background-color: #f8f9fa; color: #999;">공강</td>';
                    }
                });
                html += '</tr>';
            }
            
            html += '</tbody></table></div>';
            scheduleContainer.innerHTML = html;
        }

        // 주간시간표에서 교실별 데이터 추출
        function extractClassroomDataFromWeekly(weeklyData) {
            console.log('[WEEKLY] Extracting classroom data from weekly schedule');
            const classroomData = {};
            
            if (!weeklyData || !Array.isArray(weeklyData)) {
                console.log('[WEEKLY] No valid weekly data');
                return classroomData;
            }
            
            // 주간시간표 파싱 로직은 파일 형식에 따라 다름
            // 여기서는 기본적인 구조를 가정
            weeklyData.forEach((row, rowIndex) => {
                if (!row || !Array.isArray(row)) return;
                
                // 각 행을 분석하여 교실, 시간, 과목, 선생님 정보 추출
                // 실제 구현은 주간시간표 파일의 구체적인 형식에 따라 달라질 수 있음
                console.log('[WEEKLY] Processing row:', rowIndex, row.slice(0, 10));
            });
            
            return classroomData;
        }
        
        // 주간시간표에서 선생님별 데이터 추출  
        function extractTeacherDataFromWeekly(weeklyData) {
            console.log('[WEEKLY] Extracting teacher data from weekly schedule');
            const teacherSchedules = {};
            
            if (!weeklyData || !Array.isArray(weeklyData)) {
                console.log('[WEEKLY] No valid weekly data');
                return teacherSchedules;
            }
            
            // 주간시간표 파싱 - forTeacherTimetable.html과 동일한 로직
            const teachers = parseWeeklyTimetable(weeklyData);
            
            // 선생님별 시간표를 교실별 탭에서 사용할 수 있는 형식으로 변환
            teachers.forEach(teacher => {
                const days = ['월', '화', '수', '목', '금'];
                days.forEach(day => {
                    if (teacher.schedule && teacher.schedule[day]) {
                        teacher.schedule[day].forEach((subject, periodIndex) => {
                            if (subject && subject.trim() !== '') {
                                const periodKey = day + (periodIndex + 1);
                                
                                if (!teacherSchedules[teacher.name]) {
                                    teacherSchedules[teacher.name] = {};
                                }
                                if (!teacherSchedules[teacher.name][periodKey]) {
                                    teacherSchedules[teacher.name][periodKey] = [];
                                }
                                
                                // 교실과 과목 분리
                                let classroom = '';
                                let subjectName = subject;
                                const match = subject.match(/^(\S+)\s+(.+)$/);
                                if (match) {
                                    classroom = match[1];
                                    subjectName = match[2];
                                }
                                
                                teacherSchedules[teacher.name][periodKey].push({
                                    subject: subjectName,
                                    classroom: classroom,
                                    students: [] // 주간시간표에는 학생 정보가 없음
                                });
                            }
                        });
                    }
                });
            });
            
            return teacherSchedules;
        }
        
        // 주간시간표 파싱 함수 (forTeacherTimetable.html에서 가져옴)
        function parseWeeklyTimetable(data) {
            // 양식 유형 자동 감지
            const formatType = detectTimetableFormat(data);
            
            if (formatType === 'formatB') {
                return parseTimetableFormatB(data);
            } else {
                return parseTimetableFormatA(data);
            }
        }
        
        function detectTimetableFormat(data) {
            if (data.length >= 4) {
                const row3 = data[2] || [];
                const row4 = data[3] || [];
                
                if (row3.includes('번호') && row3.includes('교사') && 
                    (row3.includes('월') || row3.includes('화'))) {
                    return 'formatB';
                }
            }
            return 'formatA';
        }
        
        function parseTimetableFormatA(data) {
            const teachers = [];
            
            let periodStructure = null;
            if (data.length > 0 && data[0].length > 1) {
                const totalCells = data[0].length - 1;
                periodStructure = calculatePeriodStructure(totalCells);
            }
            
            if (!periodStructure) {
                periodStructure = {
                    periodCounts: [7, 7, 7, 6, 6],
                    maxPeriods: 7
                };
            }
            
            data.forEach(row => {
                if (!row[0]) return;
                
                const teacherName = row[0].replace(/\(\d+\)/, '').trim();
                const scheduleData = row.slice(1);
                
                const schedule = {};
                let currentIndex = 0;
                const daysInOrder = ['월', '화', '수', '목', '금'];
                
                for (let i = 0; i < daysInOrder.length && i < periodStructure.periodCounts.length; i++) {
                    const day = daysInOrder[i];
                    const count = periodStructure.periodCounts[i];
                    schedule[day] = scheduleData.slice(currentIndex, currentIndex + count).map(cell => cell || '');
                    currentIndex += count;
                }
                
                teachers.push({ 
                    name: teacherName, 
                    schedule: schedule,
                    maxPeriods: periodStructure.maxPeriods,
                    periodCounts: periodStructure.periodCounts
                });
            });
            return teachers;
        }
        
        function calculatePeriodStructure(totalCells) {
            const commonPatterns = [
                [7, 7, 7, 6, 6], // 33교시 - 가장 일반적
                [6, 6, 6, 6, 6], // 30교시
                [7, 7, 7, 7, 7], // 35교시  
                [8, 8, 8, 6, 6], // 36교시
                [8, 8, 8, 7, 7], // 38교시
                [8, 8, 8, 8, 8], // 40교시
                [5, 5, 5, 5, 5], // 25교시 - 초등학교 등
                [6, 6, 6, 5, 5], // 28교시
                [7, 7, 7, 5, 5]  // 31교시
            ];
            
            for (const pattern of commonPatterns) {
                const sum = pattern.reduce((a, b) => a + b, 0);
                if (sum === totalCells) {
                    return {
                        periodCounts: pattern,
                        maxPeriods: Math.max(...pattern)
                    };
                }
            }
            
            if (totalCells % 5 === 0) {
                const periodsPerDay = totalCells / 5;
                return {
                    periodCounts: [periodsPerDay, periodsPerDay, periodsPerDay, periodsPerDay, periodsPerDay],
                    maxPeriods: periodsPerDay
                };
            }
            
            return {
                periodCounts: [7, 7, 7, 6, 6],
                maxPeriods: 7
            };
        }

        // 데이터 추출 함수들 - 정규식 문제 해결
        function extractClassData(students) {
            const classData = {};
            students.forEach(student => {
                if (!classData[student.homeroom]) {
                    classData[student.homeroom] = [];
                }
                classData[student.homeroom].push(student);
            });
            return classData;
        }

        function extractClassroomData(students) {
            const classroomData = {};
            const days = ['월', '화', '수', '목', '금'];
            
            console.log('[DEBUG] Extracting classroom data from', students.length, 'students');
            
            students.forEach(student => {
                days.forEach(day => {
                    for (let i = 0; i < student.maxPeriods; i++) {
                        const content = student.schedule[day][i];
                        if (content) {
                            console.log('[PROCESS] Processing ' + student.name + ' - ' + day + (i+1) + ': "' + content + '"');
                            
                            let classroom = '';
                            let subject = '';
                            let teacher = '';
                            
                            // HTML 태그가 있는 선택과목 처리
                            if (content.includes('<div class="subject-name">')) {
                                // 교실 정보 추출
                                const locationStart = content.indexOf('<span class="location-chip">');
                                const locationEnd = content.indexOf('</span>', locationStart);
                                if (locationStart !== -1 && locationEnd !== -1) {
                                    classroom = content.substring(locationStart + 28, locationEnd);
                                }
                                
                                // 과목 정보 추출
                                const subjectStart = content.indexOf('<div class="subject-name">');
                                const subjectEnd = content.indexOf('</div>', subjectStart);
                                if (subjectStart !== -1 && subjectEnd !== -1) {
                                    subject = content.substring(subjectStart + 26, subjectEnd);
                                }
                                
                                // 교사 정보 추출
                                const teacherStart = content.indexOf('<span class="teacher-name">');
                                const teacherEnd = content.indexOf('</span>', teacherStart);
                                if (teacherStart !== -1 && teacherEnd !== -1) {
                                    teacher = content.substring(teacherStart + 27, teacherEnd);
                                }
                            } else {
                                // HTML 태그가 없는 고정수업 처리 (일반 텍스트)
                                const plainText = content.trim();
                                if (plainText && plainText !== '' && plainText !== '자습' && plainText !== '공강') {
                                    subject = plainText;
                                    // 고정수업의 경우 반별 교실 사용
                                    // 2-1 형식을 201 형식으로 변환
                                    if (student.homeroom && student.homeroom.includes('-')) {
                                        const parts = student.homeroom.split('-');
                                        if (parts.length === 2) {
                                            classroom = parts[0] + parts[1].padStart(2, '0'); // 예: 2-1 → 201, 2-5 → 205
                                        } else {
                                            classroom = student.homeroom;
                                        }
                                    } else {
                                        classroom = student.homeroom || '미정';
                                    }
                                    teacher = '담임'; // 기본값
                                    console.log('[FIXED] Fixed class found: ' + subject + ' in ' + classroom + ' for ' + student.name);
                                }
                            }
                            
                            if (classroom && subject) {
                                const periodKey = day + (i + 1);
                                
                                if (!classroomData[classroom]) {
                                    classroomData[classroom] = {};
                                }
                                if (!classroomData[classroom][periodKey]) {
                                    classroomData[classroom][periodKey] = [];
                                }
                                
                                // 중복 체크
                                const existing = classroomData[classroom][periodKey].find(
                                    item => item.subject === subject && item.teacher === teacher
                                );
                                
                                if (existing) {
                                    existing.students.push(student.name);
                                } else {
                                    classroomData[classroom][periodKey].push({
                                        subject: subject,
                                        teacher: teacher,
                                        students: [student.name]
                                    });
                                }
                            }
                        }
                    }
                });
            });
            
            return classroomData;
        }

        function extractTeacherData(students) {
            const teacherData = {};
            const days = ['월', '화', '수', '목', '금'];
            
            students.forEach(student => {
                days.forEach(day => {
                    for (let i = 0; i < student.maxPeriods; i++) {
                        const content = student.schedule[day][i];
                        if (content) {
                            let classroom = '';
                            let subject = '';
                            let teacher = '';
                            
                            // 교실 정보 추출
                            const locationStart = content.indexOf('<span class="location-chip">');
                            const locationEnd = content.indexOf('</span>', locationStart);
                            if (locationStart !== -1 && locationEnd !== -1) {
                                classroom = content.substring(locationStart + 28, locationEnd);
                            }
                            
                            // 과목 정보 추출
                            const subjectStart = content.indexOf('<div class="subject-name">');
                            const subjectEnd = content.indexOf('</div>', subjectStart);
                            if (subjectStart !== -1 && subjectEnd !== -1) {
                                subject = content.substring(subjectStart + 26, subjectEnd);
                            }
                            
                            // 교사 정보 추출
                            const teacherStart = content.indexOf('<span class="teacher-name">');
                            const teacherEnd = content.indexOf('</span>', teacherStart);
                            if (teacherStart !== -1 && teacherEnd !== -1) {
                                teacher = content.substring(teacherStart + 27, teacherEnd);
                            }
                            
                            if (teacher && subject) {
                                const periodKey = day + (i + 1);
                                
                                if (!teacherData[teacher]) {
                                    teacherData[teacher] = {};
                                }
                                if (!teacherData[teacher][periodKey]) {
                                    teacherData[teacher][periodKey] = [];
                                }
                                
                                // 중복 체크
                                const existing = teacherData[teacher][periodKey].find(
                                    item => item.subject === subject && item.classroom === classroom
                                );
                                
                                if (existing) {
                                    existing.students.push(student.name);
                                } else {
                                    teacherData[teacher][periodKey].push({
                                        subject: subject,
                                        classroom: classroom,
                                        students: [student.name]
                                    });
                                }
                            }
                        }
                    }
                });
            });
            
            return teacherData;
        }

        function toggleFavorite(uniqueId) {
            const index = favorites.indexOf(uniqueId);
            if (index > -1) favorites.splice(index, 1);
            else favorites.push(uniqueId);
            localStorage.setItem('favStudents', JSON.stringify(favorites));
            updateFavoriteChips();
            if(document.querySelector('.schedule-info h2')) displayStudentSchedule(uniqueId);
        }

        function updateFavoriteChips() {
            const container = document.getElementById('favorite-chips');
            if (favorites.length === 0) { 
                container.innerHTML = '<span style="color: var(--subtle-text); font-size: 13px;">즐겨찾기한 학생이 없습니다</span>'; 
                return; 
            }
            container.innerHTML = favorites.map(uniqueId => {
                const student = allStudents.find(s => s.uniqueId === uniqueId);
                if (!student) return '';
                
                const homeroom = student.homeroom || '';
                const number = student.number || '';
                
                // 이름(학번) 형식으로 표시 - 학년+반+번호
                let displayText = student.name;
                if (homeroom && number && String(number).trim() !== '') {
                    const parts = homeroom.split('-');
                    if (parts.length === 2) {
                        const grade = parts[0]; // 학년
                        const classNum = parts[1].padStart(2, '0'); // 반 (2자리)
                        const studentNum = String(number).trim().padStart(2, '0'); // 번호 (2자리)
                        const studentId = grade + classNum + studentNum; // 예: 20506
                        displayText = student.name + ' (' + studentId + ')';
                    }
                }
                
                return '<button class="favorite-chip" onclick="selectItem(\\'' + uniqueId + '\\')">' + displayText + '</button>';
            }).join('');
        }
        
        function showDropdown() { 
            const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
            if (filteredData.length > 0 && autocompleteDropdown) {
                autocompleteDropdown.style.display = 'block'; 
            }
        }
        function hideDropdown() { 
            const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
            if (autocompleteDropdown) {
                autocompleteDropdown.style.display = 'none'; 
            }
            selectedIndex = -1; 
        }
        function toggleStudentList(studentListId) {
            const element = document.getElementById(studentListId);
            if (element) {
                if (element.style.display === 'none') {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            }
        }

        function togglePocketSize() {
            const body = document.body;
            const toggleBtn = document.getElementById('pocket-toggle');
            
            if (body.classList.contains('pocket-size')) {
                // 포켓사이즈 해제
                body.classList.remove('pocket-size');
                toggleBtn.style.background = '';
                toggleBtn.style.color = '';
                toggleBtn.innerHTML = '' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<rect x="2" y="6" width="20" height="8" rx="2"></rect>' +
                        '<path d="M6 12h12"></path>' +
                    '</svg> ' +
                    '포켓사이즈';
            } else {
                // 포켓사이즈 활성화
                body.classList.add('pocket-size');
                toggleBtn.style.background = 'var(--primary-color)';
                toggleBtn.style.color = 'white';
                toggleBtn.innerHTML = '' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">' +
                        '<rect x="2" y="6" width="20" height="8" rx="2"></rect>' +
                        '<path d="M6 12h12"></path>' +
                    '</svg> ' +
                    '포켓사이즈 ON';
            }
        }

        function showEmptyState() { 
            const emptyStates = {
                student: '<div class="empty-state"><div class="empty-state-icon">🧑‍🎓</div><h3>학생 이름을 검색하세요</h3></div>',
                class: '<div class="empty-state"><div class="empty-state-icon">🏫</div><h3>반을 선택하세요</h3></div>',
                classroom: '<div class="empty-state"><div class="empty-state-icon">🚪</div><h3>교실을 선택하세요</h3></div>',
                teacher: '<div class="empty-state"><div class="empty-state-icon">👨‍🏫</div><h3>선생님을 선택하세요</h3></div>'
            };
            scheduleContainer.innerHTML = emptyStates[currentMode] || '<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>선택하세요</h3></div>'; 
        }

        // 초기화 실행
        init();
    `;
}

// 메인 HTML 템플릿 생성 함수 - 주간시간표 데이터 추가
function getHtmlTemplate(dataJsonString, pageTitle, iconBase64, selectedTheme = 'serenity', enabledFeatures = {student: true, class: true, classroom: true, teacher: true}, weeklyData = null) {
    // 디버깅: 매개변수 검증
    console.log('Template received parameters:', {
        dataLength: dataJsonString?.length || 0,
        pageTitle,
        hasIcon: !!iconBase64,
        selectedTheme,
        enabledFeatures,
        hasWeeklyData: !!weeklyData
    });
    
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        ${generateTimetableCSS(selectedTheme)}
    </style>
</head>
<body>
    <div id="app-container">
        <h1>
            ${iconBase64 ? `<img src="${iconBase64}" alt="logo" class="title-icon">` : '📅'}
            <span>${pageTitle}</span>
        </h1>
        
        <div class="tab-navigation">
            <!-- 탭은 JavaScript에서 동적으로 생성됩니다 -->
        </div>
        
        <div id="search-section">
            <!-- 검색/선택 영역은 JavaScript에서 동적으로 생성됩니다 -->
        </div>
        
        <div id="schedule-container"></div>
    </div>
    
    <script>
        ${generateTimetableJS(dataJsonString, enabledFeatures, weeklyData)}
    </script>
</body>
</html>`;
}

// 외부에서 사용할 수 있도록 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getHtmlTemplate, themes };
} else if (typeof window !== 'undefined') {
    window.StudentTimetableTemplate = { getHtmlTemplate, themes };
}
