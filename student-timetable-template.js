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
function generateTimetableJS(dataJsonString, enabledFeatures, weeklyData, weeklyFormat) {
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
        const weeklyFormat = '${weeklyFormat || 'formatA'}';
        console.log('주간시간표 데이터:', weeklyScheduleData ? '로드됨' : '없음');
        console.log('주간시간표 포맷:', weeklyFormat);
        
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
        
        // 교실별 데이터: 1단계 주간시간표의 고정수업을 기본으로 하고, 2단계 선택과목으로 보완
        let classroomData = {};
        if (weeklyScheduleData) {
            // 1단계: 주간시간표에서 고정수업의 교실별 데이터 추출 (fixedSchedules 방식과 동일)
            const fixedSchedules = processWeeklyDataForFixedSchedules(weeklyScheduleData, weeklyFormat);
            classroomData = extractClassroomDataFromFixedSchedules(fixedSchedules);
            console.log('[CLASSROOM] Fixed schedules classroom data extracted:', Object.keys(classroomData).length, 'classrooms');
            
            // 2단계: 선택과목 정보를 교실별로 추가
            addElectiveSubjectsToClassrooms(classroomData, allStudents);
            console.log('[CLASSROOM] Added elective subjects');
        } else {
            // 주간시간표가 없으면 학생 데이터만 사용
            classroomData = extractClassroomData(allStudents);
        }
        
        // 선생님별 데이터: 1단계 주간시간표의 고정수업을 기본으로 하고, 2단계 선택과목으로 보완
        let teacherData = {};
        if (weeklyScheduleData) {
            // 1단계: 주간시간표에서 고정수업의 선생님별 데이터 추출
            const fixedSchedules = processWeeklyDataForFixedSchedules(weeklyScheduleData, weeklyFormat);
            teacherData = extractTeacherDataFromFixedSchedules(fixedSchedules);
            console.log('[TEACHER] Fixed schedules teacher data extracted:', Object.keys(teacherData).length, 'teachers');
            
            // 2단계: 선택과목 정보를 선생님별로 추가
            addElectiveSubjectsToTeachers(teacherData, allStudents);
            console.log('[TEACHER] Added elective subjects');
        } else {
            // 주간시간표가 없으면 학생 데이터만 사용
            teacherData = extractTeacherData(allStudents);
        }

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
                // 선생님별 탭: 검색창 + 즐겨찾기 (학생별 탭과 동일한 구조)
                searchSection.innerHTML = '' +
                    '<div class="search-container">' +
                        '<div class="search-icon">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<circle cx="11" cy="11" r="8"></circle>' +
                                '<line x1="21" y1="21" x2="16.65" y2="16.65"></line>' +
                            '</svg>' +
                        '</div>' +
                        '<input type="text" id="search-input" placeholder="선생님 이름을 입력하세요...">' +
                        '<div class="autocomplete-dropdown" id="autocomplete-dropdown"></div>' +
                    '</div>' +
                    '<div class="favorites-section">' +
                        '<div class="favorites-title">자주 찾는 선생님</div>' +
                        '<div class="favorite-chips" id="favorite-chips"></div>' +
                    '</div>';
            }
            
            // 검색창이 있는 탭에서 이벤트 리스너 재설정
            if (currentMode === 'student') {
                setupEventListeners();
                updateFavoriteChips();
            } else if (currentMode === 'teacher') {
                setupTeacherEventListeners();
                updateTeacherFavoriteChips();
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
                        // 선택수업과 고정수업이 겹치는 경우 선택수업만 표시
                        let filteredInfo = usageInfo;
                        const hasElectives = usageInfo.some(info => info.students && info.students.length > 0);
                        const hasFixed = usageInfo.some(info => info.homeroom && (!info.students || info.students.length === 0));
                        
                        // 선택수업이 있으면 고정수업은 제외
                        if (hasElectives && hasFixed) {
                            filteredInfo = usageInfo.filter(info => info.students && info.students.length > 0);
                        }
                        
                        const content = filteredInfo.map((info, infoIndex) => {
                            const studentListId = 'students-' + classroomId + '-' + periodKey + '-' + infoIndex;
                            const hasStudents = info.students && info.students.length > 0;
                            
                            let detailsHtml = '<div class="details">' +
                                            '<span class="teacher-name">' + info.teacher + '</span>';
                            
                            // 학생이 있는 경우에만 학생목록 버튼 표시
                            if (hasStudents) {
                                detailsHtml += '<br><button class="favorite-chip" style="font-size: 11px; padding: 4px 8px; margin-top: 4px;" onclick="toggleStudentList(\\'' + studentListId + '\\')">학생목록</button>' +
                                             '<div id="' + studentListId + '" style="display: none; margin-top: 4px; font-size: 11px; color: #666;">' + info.students.join(', ') + '</div>';
                            }
                            
                            detailsHtml += '</div>';
                            
                            return '<div class="subject-name">' + info.subject + '</div>' + detailsHtml;
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
            
            const isFavorite = teacherFavorites.includes(teacherId);
            
            let html = '<div class="schedule-header">' +
                    '<div class="schedule-info">' +
                        '<h2>' + teacherId + ' 선생님 시간표</h2>' +
                    '</div>' +
                    '<div class="schedule-actions">' +
                        '<button class="action-btn ' + (isFavorite ? 'favorited' : '') + '" onclick="toggleTeacherFavorite(\\'' + teacherId + '\\');">' +
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
                html += '<tr><td>' + (i + 1) + '</td>';
                days.forEach(day => {
                    const periodKey = day + (i + 1);
                    const classInfo = scheduleData[periodKey] || [];
                    
                    if (classInfo.length > 0) {
                        // 선택수업과 고정수업이 겹치는 경우 선택수업만 표시
                        let filteredInfo = classInfo;
                        const hasElectives = classInfo.some(info => info.students && info.students.length > 0);
                        const hasFixed = classInfo.some(info => info.homeroom && (!info.students || info.students.length === 0));
                        
                        // 선택수업이 있으면 고정수업은 제외
                        if (hasElectives && hasFixed) {
                            filteredInfo = classInfo.filter(info => info.students && info.students.length > 0);
                        }
                        
                        const content = filteredInfo.map((info, infoIndex) => {
                            const studentListId = 'teacher-students-' + teacherId + '-' + periodKey + '-' + infoIndex;
                            const hasStudents = info.students && info.students.length > 0;
                            
                            let detailsHtml = '<div class="details">' +
                                            '<span class="location-chip">' + info.classroom + '</span>';
                            
                            // 학생이 있는 경우에만 학생목록 표시
                            if (hasStudents) {
                                detailsHtml += '<br><button class="favorite-chip" style="font-size: 11px; padding: 4px 8px; margin-top: 4px;" onclick="toggleStudentList(\\'' + studentListId + '\\')">학생목록</button>' +
                                             '<div id="' + studentListId + '" style="display: none; margin-top: 4px; font-size: 11px; color: #666;">' + info.students.join(', ') + '</div>';
                            }
                            
                            detailsHtml += '</div>';
                            
                            return '<div class="subject-name">' + info.subject + '</div>' + detailsHtml;
                        }).join('<hr style="margin: 8px 0; border: 1px solid #eee;">');
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

        // 과목명과 교사명 분리 함수
        function parseSubjectAndTeacher(rawString) {
            if (!rawString) return { subject: '', teacher: '' };
            
            const patterns = [
                /^(.+?)\\((.+?)\\)$/, // 과목명(교사명)
                /^(.+?)\\s+([가-힣]{2,4})$/, // 과목명 교사명 (한글 2-4자)
                /^(.+)$/ // 과목명만
            ];
            
            for (const pattern of patterns) {
                const match = rawString.match(pattern);
                if (match) {
                    if (match.length === 3) {
                        let teacherName = match[2].trim();
                        teacherName = normalizeTeacherName(teacherName);
                        return { subject: match[1].trim(), teacher: teacherName };
                    } else {
                        return { subject: match[1].trim(), teacher: '' };
                    }
                }
            }
            
            return { subject: rawString.trim(), teacher: '' };
        }

        // 주간시간표에서 고정수업 데이터 처리 (index.html의 processAllData와 동일한 방식)
        function processWeeklyDataForFixedSchedules(weeklyData, weeklyFormat) {
            console.log('[FIXED] Processing weekly data for fixed schedules');
            const fixedSchedules = {};
            const daysInOrder = ['월', '화', '수', '목', '금'];
            let periodStructure, maxPeriods;

            if (weeklyFormat === 'formatB') {
                // 압핀 양식 처리
                const dayHeaders = weeklyData[2] || [];
                const periodHeaders = weeklyData[3] || [];
                
                let dayRanges = {};
                let currentDay = '';
                for (let i = 1; i < dayHeaders.length; i++) {
                    if (dayHeaders[i] && ['월', '화', '수', '목', '금'].includes(dayHeaders[i])) {
                        currentDay = dayHeaders[i];
                        if (!dayRanges[currentDay]) dayRanges[currentDay] = [];
                    }
                    if (currentDay && periodHeaders[i]) {
                        dayRanges[currentDay].push({ period: periodHeaders[i], column: i });
                    }
                }
                
                const periodCounts = daysInOrder.map(day => dayRanges[day] ? dayRanges[day].length : 0);
                maxPeriods = Math.max(...periodCounts, 0);
                periodStructure = { periodCounts, maxPeriods };

                // 교사 정보 수집
                const teacherInfo = {};
                for (let i = 0; i < weeklyData.length; i++) {
                    const row = weeklyData[i];
                    if (!row || !row[0]) continue;
                    
                    const classMatch = String(row[0]).match(/^(\\d)-(\\d+)$/);
                    if (classMatch) {
                        const homeroom = classMatch[1] + '-' + classMatch[2];
                        teacherInfo[homeroom] = {};
                        
                        daysInOrder.forEach(day => {
                            if (!dayRanges[day]) return;
                            teacherInfo[homeroom][day] = {};
                            
                            dayRanges[day].forEach(periodInfo => {
                                const cellValue = row[periodInfo.column];
                                if (cellValue) {
                                    const periodIndex = parseInt(periodInfo.period, 10);
                                    const teacherMatch = String(cellValue).match(/([가-힣]{2,4})$/);
                                    if (teacherMatch) {
                                        teacherInfo[homeroom][day][periodIndex] = teacherMatch[1];
                                    }
                                }
                            });
                        });
                    }
                }

                // 과목과 교실 정보 처리
                for (let i = 4; i < weeklyData.length; i += 2) {
                    const subjectRow = weeklyData[i];
                    const locationRow = weeklyData[i + 1];

                    if (!subjectRow || !locationRow) continue;
                    if (locationRow[0] !== '' && locationRow[0] !== null && locationRow[0] !== undefined) continue;
                    
                    daysInOrder.forEach(day => {
                        if (!dayRanges[day]) return;
                        dayRanges[day].forEach(periodInfo => {
                            const subject = subjectRow[periodInfo.column];
                            const location = locationRow[periodInfo.column];

                            if (subject && location) {
                                const periodIndex = parseInt(periodInfo.period, 10);
                                
                                if (/^\\d+-\\d+$/.test(String(location).trim())) {
                                    const homeroom = String(location).trim();
                                    if (!fixedSchedules[homeroom]) {
                                        fixedSchedules[homeroom] = { schedule: {} };
                                        daysInOrder.forEach(d => { 
                                            fixedSchedules[homeroom].schedule[d] = Array(maxPeriods).fill(null); 
                                        });
                                    }
                                    
                                    if (periodIndex >= 1) {
                                        const arrayIndex = periodIndex - 1;
                                        const teacherName = teacherInfo[homeroom] && 
                                                           teacherInfo[homeroom][day] && 
                                                           teacherInfo[homeroom][day][periodIndex] || '';
                                        
                                        const subjectName = String(subject).trim();
                                        
                                        fixedSchedules[homeroom].schedule[day][arrayIndex] = { 
                                            subject: subjectName, 
                                            teacher: teacherName,
                                            location: ''
                                        };
                                    }
                                }
                            }
                        });
                    });
                }
                
                // 교실 정보 보완
                for (let i = 4; i < weeklyData.length; i += 2) {
                    const subjectRow = weeklyData[i];
                    const locationRow = weeklyData[i + 1];

                    if (!subjectRow || !locationRow) continue;
                    if (locationRow[0] !== '' && locationRow[0] !== null && locationRow[0] !== undefined) continue;
                    
                    daysInOrder.forEach(day => {
                        if (!dayRanges[day]) return;
                        dayRanges[day].forEach(periodInfo => {
                            const subject = subjectRow[periodInfo.column];
                            const location = locationRow[periodInfo.column];

                            if (subject && location && !/^\\d+-\\d+$/.test(String(location).trim())) {
                                const classroomName = String(location).trim();
                                const subjectName = String(subject).trim();
                                const periodIndex = parseInt(periodInfo.period, 10);
                                
                                Object.keys(fixedSchedules).forEach(homeroom => {
                                    const arrayIndex = periodIndex - 1;
                                    if (arrayIndex >= 0 && fixedSchedules[homeroom].schedule[day][arrayIndex]) {
                                        const schedule = fixedSchedules[homeroom].schedule[day][arrayIndex];
                                        if (schedule && schedule.subject === subjectName) {
                                            schedule.location = classroomName;
                                        }
                                    }
                                });
                            }
                        });
                    });
                }
                
            } else {
                // formatA (컴시간 양식) 처리
                const totalCells = weeklyData.length > 0 && weeklyData[0].length > 1 ? weeklyData[0].length - 1 : 33;
                periodStructure = calculatePeriodStructure(totalCells);
                maxPeriods = periodStructure.maxPeriods;

                weeklyData.forEach(row => {
                    const teacherName = row[0] ? String(row[0]).trim().replace(/\(\d+\)$/, '') : '';
                    const scheduleData = row.slice(1);
                    let currentIndex = 0;
                    
                    for (let i = 0; i < daysInOrder.length; i++) {
                        const day = daysInOrder[i];
                        const count = periodStructure.periodCounts[i] || 0;
                        const daySchedule = scheduleData.slice(currentIndex, currentIndex + count);
                        
                        daySchedule.forEach((cell, periodIndex) => {
                            if (cell) {
                                const cellStr = String(cell);
                                if (/^\\d{3}\\s/.test(cellStr)) {
                                    const classIdentifier = cellStr.substring(0, 3);
                                    const grade = classIdentifier.charAt(0);
                                    const classNum = classIdentifier.substring(1).replace(/^0/, '');
                                    const homeroom = grade + '-' + classNum;
                                    
                                    if (!fixedSchedules[homeroom]) {
                                        fixedSchedules[homeroom] = { schedule: {} };
                                        daysInOrder.forEach(d => { 
                                            fixedSchedules[homeroom].schedule[d] = Array(maxPeriods).fill(null); 
                                        });
                                    }
                                    
                                    const remainingText = cellStr.substring(4).trim();
                                    
                                    let classroom = '';
                                    let subjectAndTeacher = remainingText;
                                    
                                    const classroomPatterns = [
                                        /^(\\d+\\w*)\\s+(.+)$/,
                                        /^(\\w+실\\d*)\\s+(.+)$/,
                                        /^(\\w+교실\\d*)\\s+(.+)$/,
                                        /^([A-Za-z]\\d*)\\s+(.+)$/,
                                        /^(\\w+관\\d*)\\s+(.+)$/
                                    ];
                                    
                                    for (const pattern of classroomPatterns) {
                                        const match = remainingText.match(pattern);
                                        if (match) {
                                            classroom = match[1];
                                            subjectAndTeacher = match[2];
                                            break;
                                        }
                                    }
                                    
                                    const parsedInfo = parseSubjectAndTeacher(subjectAndTeacher);
                                    const finalTeacherName = parsedInfo.teacher || teacherName;
                                    
                                    fixedSchedules[homeroom].schedule[day][periodIndex] = { 
                                        subject: parsedInfo.subject, 
                                        teacher: finalTeacherName,
                                        location: classroom
                                    };
                                }
                            }
                        });
                        currentIndex += count;
                    }
                });
            }
            
            console.log('[FIXED] Fixed schedules created for', Object.keys(fixedSchedules).length, 'homerooms');
            return fixedSchedules;
        }

        // 주간시간표 포맷 감지 함수
        function detectWeeklyFormat(weeklyData) {
            if (!weeklyData || weeklyData.length < 4) return 'formatA';
            
            const row3 = weeklyData[2] || [];
            if (row3.includes('월') || row3.includes('화') || row3.includes('수')) {
                return 'formatB';
            }
            return 'formatA';
        }

        // 고정수업 데이터에서 교실별 데이터 추출
        function extractClassroomDataFromFixedSchedules(fixedSchedules) {
            console.log('[EXTRACT] Extracting classroom data from fixed schedules');
            const classroomData = {};
            const daysInOrder = ['월', '화', '수', '목', '금'];
            
            Object.keys(fixedSchedules).forEach(homeroom => {
                const homeroomSchedule = fixedSchedules[homeroom].schedule;
                
                daysInOrder.forEach(day => {
                    if (!homeroomSchedule[day]) return;
                    
                    homeroomSchedule[day].forEach((subjectInfo, periodIndex) => {
                        if (!subjectInfo) return;
                        
                        let classroom = '';
                        
                        // 교실 정보 결정
                        if (subjectInfo.location) {
                            // location이 있으면 그것을 교실로 사용
                            classroom = subjectInfo.location;
                        } else {
                            // location이 없으면 homeroom을 교실로 사용 (고정수업의 경우)
                            classroom = homeroom;
                        }
                        
                        const normalizedClassroom = normalizeClassroomName(classroom);
                        const periodKey = day + (periodIndex + 1);
                        
                        if (!classroomData[normalizedClassroom]) {
                            classroomData[normalizedClassroom] = {};
                        }
                        if (!classroomData[normalizedClassroom][periodKey]) {
                            classroomData[normalizedClassroom][periodKey] = [];
                        }
                        
                        // 해당 반의 모든 학생들을 찾아서 추가 (나중에 addElectiveSubjectsToClassrooms에서 추가됨)
                        classroomData[normalizedClassroom][periodKey].push({
                            subject: subjectInfo.subject,
                            teacher: subjectInfo.teacher,
                            students: [], // 여기서는 빈 배열, 나중에 학생 정보 추가
                            homeroom: homeroom // 어느 반의 고정수업인지 기록
                        });
                        
                        console.log('[EXTRACT] Added fixed class:', subjectInfo.subject, 'in', normalizedClassroom, 'for', homeroom);
                    });
                });
            });
            
            console.log('[EXTRACT] Classroom data extracted:', Object.keys(classroomData));
            return classroomData;
        }

        // 선택과목을 교실별 데이터에 추가
        function addElectiveSubjectsToClassrooms(classroomData, allStudents) {
            console.log('[ELECTIVE] Adding elective subjects to classrooms');
            const daysInOrder = ['월', '화', '수', '목', '금'];
            
            // 1. 고정수업에 학생 정보 추가
            allStudents.forEach(student => {
                daysInOrder.forEach(day => {
                    for (let i = 0; i < student.maxPeriods; i++) {
                        const content = student.schedule[day][i];
                        
                        // 고정수업인지 확인 (HTML 태그가 없는 경우)
                        if (content && !content.includes('<div class="subject-name">')) {
                            const subject = content.trim();
                            if (subject && subject !== '자습' && subject !== '공강') {
                                // 해당 학생의 homeroom 교실에서 해당 시간의 고정수업 찾기
                                const normalizedHomeroom = normalizeClassroomName(student.homeroom);
                                const periodKey = day + (i + 1);
                                
                                if (classroomData[normalizedHomeroom] && classroomData[normalizedHomeroom][periodKey]) {
                                    const classInfo = classroomData[normalizedHomeroom][periodKey].find(
                                        item => item.subject === subject && item.homeroom === student.homeroom
                                    );
                                    if (classInfo && !classInfo.students.includes(student.name)) {
                                        classInfo.students.push(student.name);
                                    }
                                }
                            }
                        }
                        
                        // 선택과목인지 확인 (HTML 태그가 있는 경우)
                        else if (content && content.includes('<div class="subject-name">')) {
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
                            
                            if (classroom && subject) {
                                const normalizedClassroom = normalizeClassroomName(classroom);
                                const periodKey = day + (i + 1);
                                
                                if (!classroomData[normalizedClassroom]) {
                                    classroomData[normalizedClassroom] = {};
                                }
                                if (!classroomData[normalizedClassroom][periodKey]) {
                                    classroomData[normalizedClassroom][periodKey] = [];
                                }
                                
                                // 같은 과목과 교사의 수업 찾기
                                let existingClass = classroomData[normalizedClassroom][periodKey].find(
                                    item => item.subject === subject && item.teacher === teacher
                                );
                                
                                if (existingClass) {
                                    // 기존 수업에 학생 추가
                                    if (!existingClass.students.includes(student.name)) {
                                        existingClass.students.push(student.name);
                                    }
                                } else {
                                    // 새 선택과목 수업 추가
                                    classroomData[normalizedClassroom][periodKey].push({
                                        subject: subject,
                                        teacher: teacher,
                                        students: [student.name]
                                    });
                                    console.log('[ELECTIVE] Added elective class:', subject, 'in', normalizedClassroom);
                                }
                            }
                        }
                    }
                });
            });
            
            console.log('[ELECTIVE] Final classroom data:', Object.keys(classroomData));
        }

        // 고정수업 데이터에서 선생님별 데이터 추출
        function extractTeacherDataFromFixedSchedules(fixedSchedules) {
            console.log('[TEACHER_EXTRACT] Extracting teacher data from fixed schedules');
            const teacherData = {};
            const daysInOrder = ['월', '화', '수', '목', '금'];
            
            Object.keys(fixedSchedules).forEach(homeroom => {
                const homeroomSchedule = fixedSchedules[homeroom].schedule;
                
                daysInOrder.forEach(day => {
                    if (!homeroomSchedule[day]) return;
                    
                    homeroomSchedule[day].forEach((subjectInfo, periodIndex) => {
                        if (!subjectInfo || !subjectInfo.teacher) return;
                        
                        const teacher = normalizeTeacherName(subjectInfo.teacher);
                        const periodKey = day + (periodIndex + 1);
                        
                        if (!teacherData[teacher]) {
                            teacherData[teacher] = {};
                        }
                        if (!teacherData[teacher][periodKey]) {
                            teacherData[teacher][periodKey] = [];
                        }
                        
                        // 교실 정보 결정
                        let classroom = '';
                        if (subjectInfo.location) {
                            classroom = subjectInfo.location;
                        } else {
                            classroom = homeroom;
                        }
                        
                        teacherData[teacher][periodKey].push({
                            subject: subjectInfo.subject,
                            classroom: classroom,
                            students: [], // 여기서는 빈 배열, 나중에 학생 정보 추가
                            homeroom: homeroom // 어느 반의 고정수업인지 기록
                        });
                        
                        console.log('[TEACHER_EXTRACT] Added fixed class:', subjectInfo.subject, 'for teacher', teacher, 'in', classroom);
                    });
                });
            });
            
            console.log('[TEACHER_EXTRACT] Teacher data extracted:', Object.keys(teacherData));
            return teacherData;
        }

        // 선택과목을 선생님별 데이터에 추가
        function addElectiveSubjectsToTeachers(teacherData, allStudents) {
            console.log('[TEACHER_ELECTIVE] Adding elective subjects to teachers');
            const daysInOrder = ['월', '화', '수', '목', '금'];
            
            // 1. 고정수업에 학생 정보 추가
            allStudents.forEach(student => {
                daysInOrder.forEach(day => {
                    for (let i = 0; i < student.maxPeriods; i++) {
                        const content = student.schedule[day][i];
                        
                        // 고정수업인지 확인 (HTML 태그가 없는 경우)
                        if (content && !content.includes('<div class="subject-name">')) {
                            const subject = content.trim();
                            if (subject && subject !== '자습' && subject !== '공강') {
                                const periodKey = day + (i + 1);
                                
                                // 모든 선생님의 해당 시간을 찾아서 학생 추가
                                Object.keys(teacherData).forEach(teacher => {
                                    if (teacherData[teacher][periodKey]) {
                                        const classInfo = teacherData[teacher][periodKey].find(
                                            item => item.subject === subject && item.homeroom === student.homeroom
                                        );
                                        if (classInfo && !classInfo.students.includes(student.name)) {
                                            classInfo.students.push(student.name);
                                        }
                                    }
                                });
                            }
                        }
                        
                        // 선택과목인지 확인 (HTML 태그가 있는 경우)
                        else if (content && content.includes('<div class="subject-name">')) {
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
                                const normalizedTeacher = normalizeTeacherName(teacher);
                                const periodKey = day + (i + 1);
                                
                                if (!teacherData[normalizedTeacher]) {
                                    teacherData[normalizedTeacher] = {};
                                }
                                if (!teacherData[normalizedTeacher][periodKey]) {
                                    teacherData[normalizedTeacher][periodKey] = [];
                                }
                                
                                // 같은 과목과 교실의 수업 찾기
                                let existingClass = teacherData[normalizedTeacher][periodKey].find(
                                    item => item.subject === subject && item.classroom === classroom
                                );
                                
                                if (existingClass) {
                                    // 기존 수업에 학생 추가
                                    if (!existingClass.students.includes(student.name)) {
                                        existingClass.students.push(student.name);
                                    }
                                } else {
                                    // 새 선택과목 수업 추가
                                    teacherData[normalizedTeacher][periodKey].push({
                                        subject: subject,
                                        classroom: classroom,
                                        students: [student.name]
                                    });
                                    console.log('[TEACHER_ELECTIVE] Added elective class:', subject, 'for teacher', normalizedTeacher, 'in', classroom);
                                }
                            }
                        }
                    }
                });
            });
            
            console.log('[TEACHER_ELECTIVE] Final teacher data:', Object.keys(teacherData));
        }

        // 교실별 데이터 병합 함수
        function mergeClassroomData(weeklyClassroomData, studentClassroomData) {
            console.log('[MERGE] Starting to merge classroom data');
            console.log('[MERGE] Weekly classrooms:', Object.keys(weeklyClassroomData));
            console.log('[MERGE] Student classrooms:', Object.keys(studentClassroomData));
            
            // 학생 데이터의 교실별 정보를 주간시간표 데이터와 병합
            Object.keys(studentClassroomData).forEach(classroom => {
                const normalizedClassroom = normalizeClassroomName(classroom);
                console.log('[MERGE] Processing classroom:', classroom, '→', normalizedClassroom);
                
                if (!weeklyClassroomData[normalizedClassroom]) {
                    weeklyClassroomData[normalizedClassroom] = {};
                    console.log('[MERGE] Created new classroom entry:', normalizedClassroom);
                }
                
                Object.keys(studentClassroomData[classroom]).forEach(periodKey => {
                    if (!weeklyClassroomData[normalizedClassroom][periodKey]) {
                        weeklyClassroomData[normalizedClassroom][periodKey] = [];
                    }
                    
                    // 학생 정보를 기존 수업에 추가하거나 새로운 수업 정보 생성
                    const studentPeriodData = studentClassroomData[classroom][periodKey];
                    studentPeriodData.forEach(studentInfo => {
                        // 같은 과목과 교사를 찾아서 학생을 추가
                        const existingClass = weeklyClassroomData[normalizedClassroom][periodKey].find(
                            item => item.subject === studentInfo.subject && item.teacher === studentInfo.teacher
                        );
                        
                        if (existingClass) {
                            // 기존 수업에 학생 추가
                            existingClass.students.push(...studentInfo.students);
                            console.log('[MERGE] Added students to existing class:', studentInfo.subject, 'in', normalizedClassroom);
                        } else {
                            // 새로운 수업 정보 추가
                            weeklyClassroomData[normalizedClassroom][periodKey].push({
                                subject: studentInfo.subject,
                                teacher: studentInfo.teacher,
                                students: [...studentInfo.students]
                            });
                            console.log('[MERGE] Added new class:', studentInfo.subject, 'in', normalizedClassroom);
                        }
                    });
                });
            });
            
            console.log('[MERGE] Final merged classrooms:', Object.keys(weeklyClassroomData));
        }

        // 교사명 정규화 함수 (괄호와 숫자 제거)
        function normalizeTeacherName(teacher) {
            if (!teacher) return '';
            
            // 교사명(숫자) 형태에서 괄호와 숫자 제거
            return String(teacher).trim().replace(/\\(\\d+\\)$/, '');
        }

        // 교실명 정규화 함수
        function normalizeClassroomName(classroom) {
            if (!classroom) return '';
            
            const classroomStr = String(classroom).trim();
            
            // 2-1, 3-5 형태를 201, 305 형태로 변환
            const dashPattern = /^(\\d+)-(\\d+)$/;
            const dashMatch = classroomStr.match(dashPattern);
            if (dashMatch) {
                const grade = dashMatch[1];
                const classNum = dashMatch[2].padStart(2, '0');
                return grade + classNum;
            }
            
            // 201, 305 형태는 그대로 유지
            const numberPattern = /^\\d{3}$/;
            if (numberPattern.test(classroomStr)) {
                return classroomStr;
            }
            
            // 기타 교실명 (과학실, 음악실 등)은 그대로 반환
            return classroomStr;
        }

        // 주간시간표에서 교실별 데이터 추출
        function extractClassroomDataFromWeekly(weeklyData, weeklyFormat) {
            console.log('[WEEKLY] Extracting classroom data from weekly schedule');
            console.log('[WEEKLY] weeklyFormat:', weeklyFormat);
            console.log('[WEEKLY] weeklyData length:', weeklyData ? weeklyData.length : 'null');
            if (weeklyData && weeklyData.length > 0) {
                console.log('[WEEKLY] First few rows:', weeklyData.slice(0, 5));
            }
            
            const classroomData = {};
            
            if (!weeklyData || !Array.isArray(weeklyData)) {
                console.log('[WEEKLY] No valid weekly data');
                return classroomData;
            }
            
            const daysInOrder = ['월', '화', '수', '목', '금'];
            
            if (weeklyFormat === 'formatB') {
                // 압핀 양식 처리
                const dayHeaders = weeklyData[2] || [];
                const periodHeaders = weeklyData[3] || [];
                
                // 열별 요일/교시 매핑
                const columnMap = {};
                let currentDay = '';
                for (let i = 1; i < dayHeaders.length; i++) {
                    if (dayHeaders[i] && daysInOrder.includes(dayHeaders[i])) {
                        currentDay = dayHeaders[i];
                    }
                    if (currentDay && periodHeaders[i]) {
                        columnMap[i] = { day: currentDay, period: parseInt(periodHeaders[i], 10) };
                    }
                }
                
                // 과목과 교실 정보 추출
                console.log('[WEEKLY formatB] Processing', weeklyData.length, 'rows');
                for (let i = 4; i < weeklyData.length; i += 2) {
                    const subjectRow = weeklyData[i];
                    const locationRow = weeklyData[i + 1];
                    
                    if (!subjectRow || !locationRow) continue;
                    if (locationRow[0] !== '' && locationRow[0] !== null) continue;
                    
                    console.log('[WEEKLY formatB] Processing subject row:', i, subjectRow.slice(0, 10));
                    console.log('[WEEKLY formatB] Processing location row:', i+1, locationRow.slice(0, 10));
                    
                    for (let col = 1; col < subjectRow.length; col++) {
                        const subject = subjectRow[col];
                        const location = locationRow[col];
                        const timeInfo = columnMap[col];
                        
                        if (subject && location && timeInfo) {
                            console.log('[WEEKLY formatB] Found class:', subject, 'in', location, 'at', timeInfo.day + timeInfo.period);
                            
                            const normalizedClassroom = normalizeClassroomName(location);
                            if (normalizedClassroom) {
                                const periodKey = timeInfo.day + timeInfo.period;
                                
                                if (!classroomData[normalizedClassroom]) {
                                    classroomData[normalizedClassroom] = {};
                                }
                                if (!classroomData[normalizedClassroom][periodKey]) {
                                    classroomData[normalizedClassroom][periodKey] = [];
                                }
                                
                                // 교사 정보 추출 (과목 문자열에서)
                                let teacher = '';
                                const teacherMatch = String(subject).match(/([가-힣]{2,4})$/);
                                if (teacherMatch) {
                                    teacher = teacherMatch[1];
                                }
                                
                                const subjectName = String(subject).replace(/\\s*[가-힣]{2,4}$/, '').trim();
                                
                                // 중복 체크
                                const existing = classroomData[normalizedClassroom][periodKey].find(
                                    item => item.subject === subjectName && item.teacher === teacher
                                );
                                
                                if (!existing) {
                                    classroomData[normalizedClassroom][periodKey].push({
                                        subject: subjectName,
                                        teacher: teacher,
                                        students: [] // 주간시간표에서는 학생 정보가 없음
                                    });
                                    console.log('[WEEKLY formatB] Added classroom:', normalizedClassroom, 'subject:', subjectName, 'teacher:', teacher);
                                }
                            }
                        }
                    }
                }
            } else {
                // formatA (컴시간 양식) 처리
                const totalCells = weeklyData.length > 0 && weeklyData[0].length > 1 ? weeklyData[0].length - 1 : 33;
                const periodStructure = calculatePeriodStructure(totalCells);
                console.log('[WEEKLY formatA] Period structure:', periodStructure);
                
                weeklyData.forEach((row, rowIndex) => {
                    if (!row || !Array.isArray(row)) return;
                    
                    const teacherName = row[0] ? String(row[0]).trim().replace(/\(\d+\)$/, '') : '';
                    const scheduleData = row.slice(1);
                    let currentIndex = 0;
                    
                    console.log('[WEEKLY formatA] Processing row', rowIndex, 'teacher:', teacherName);
                    
                    for (let i = 0; i < daysInOrder.length; i++) {
                        const day = daysInOrder[i];
                        const count = periodStructure.periodCounts[i] || 0;
                        const daySchedule = scheduleData.slice(currentIndex, currentIndex + count);
                        
                        daySchedule.forEach((cell, periodIndex) => {
                            if (cell) {
                                const cellStr = String(cell);
                                console.log('[WEEKLY formatA] Cell content:', cellStr);
                                
                                // 컴시간 양식: "201 301 수학 홍길동" 형태
                                if (/^\\d{3}\\s/.test(cellStr)) {
                                    const remainingText = cellStr.substring(4).trim(); // "301 수학 홍길동"
                                    
                                    // 교실 정보 추출 (첫 번째 단어가 교실)
                                    let classroom = '';
                                    let subjectAndTeacher = remainingText;
                                    
                                    const classroomPatterns = [
                                        /^(\d+\w*)\s+(.+)$/, // "301 수학 홍길동"
                                        /^(\w+실\d*)\s+(.+)$/, // "과학실 물리 김선생"
                                        /^(\w+교실\d*)\s+(.+)$/, // "음악교실 음악 이선생"
                                        /^([A-Za-z]\d*)\s+(.+)$/, // "A101 영어 박선생"
                                        /^(\w+관\d*)\s+(.+)$/ // "체육관 체육 최선생"
                                    ];
                                    
                                    for (const pattern of classroomPatterns) {
                                        const match = remainingText.match(pattern);
                                        if (match) {
                                            classroom = match[1];
                                            subjectAndTeacher = match[2];
                                            break;
                                        }
                                    }
                                    
                                    if (classroom) {
                                        const normalizedClassroom = normalizeClassroomName(classroom);
                                        const periodKey = day + (periodIndex + 1);
                                        
                                        if (!classroomData[normalizedClassroom]) {
                                            classroomData[normalizedClassroom] = {};
                                        }
                                        if (!classroomData[normalizedClassroom][periodKey]) {
                                            classroomData[normalizedClassroom][periodKey] = [];
                                        }
                                        
                                        // 과목과 교사 정보 분리
                                        const parsedInfo = parseSubjectAndTeacher(subjectAndTeacher);
                                        
                                        // 중복 체크
                                        const existing = classroomData[normalizedClassroom][periodKey].find(
                                            item => item.subject === parsedInfo.subject && item.teacher === parsedInfo.teacher
                                        );
                                        
                                        if (!existing) {
                                            classroomData[normalizedClassroom][periodKey].push({
                                                subject: parsedInfo.subject,
                                                teacher: parsedInfo.teacher,
                                                students: [] // 주간시간표에서는 학생 정보가 없음
                                            });
                                            console.log('[WEEKLY formatA] Added classroom:', normalizedClassroom, 'subject:', parsedInfo.subject, 'teacher:', parsedInfo.teacher);
                                        }
                                    } else {
                                        console.log('[WEEKLY formatA] No classroom found in:', remainingText);
                                    }
                                }
                            }
                        });
                        currentIndex += count;
                    }
                });
            }
            
            console.log('[WEEKLY] Final classroom data:', Object.keys(classroomData));
            console.log('[WEEKLY] Total classrooms found:', Object.keys(classroomData).length);
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
                                    const rawClassroom = content.substring(locationStart + 28, locationEnd);
                                    classroom = normalizeClassroomName(rawClassroom);
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
                                    // 고정수업의 경우 반별 교실 사용 (정규화 적용)
                                    classroom = normalizeClassroomName(student.homeroom);
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
        // 선생님별 탭용 이벤트 리스너 설정
        function setupTeacherEventListeners() {
            const searchInput = document.getElementById('search-input');
            const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
            let selectedIndex = -1;
            let filteredTeachers = [];
            
            if (!searchInput || !autocompleteDropdown) return;
            
            function hideDropdown() {
                autocompleteDropdown.style.display = 'none';
                selectedIndex = -1;
            }
            
            function updateAutocomplete() {
                if (filteredTeachers.length === 0) { 
                    hideDropdown(); 
                    return; 
                }
                
                autocompleteDropdown.innerHTML = filteredTeachers.map((teacher, index) => 
                    '<div class="autocomplete-item' + (index === selectedIndex ? ' selected' : '') + '" onclick="selectTeacher(\\'' + teacher + '\\');">' + 
                    '👨‍🏫 ' + teacher + ' 선생님' +
                    '</div>'
                ).join('');
                autocompleteDropdown.style.display = 'block';
            }
            
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase().trim();
                selectedIndex = -1;
                
                if (query.length === 0) {
                    filteredTeachers = [];
                    hideDropdown();
                    return;
                }
                
                // 선생님 목록에서 검색
                const teacherList = Object.keys(teacherData);
                filteredTeachers = teacherList.filter(teacher => 
                    teacher.toLowerCase().includes(query)
                ).slice(0, 10); // 최대 10개만 표시
                
                updateAutocomplete();
            });
            
            searchInput.addEventListener('keydown', function(e) {
                const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
                if (!items.length) return;
                
                switch(e.key) {
                    case 'ArrowDown': 
                        e.preventDefault(); 
                        selectedIndex = (selectedIndex + 1) % items.length; 
                        break;
                    case 'ArrowUp': 
                        e.preventDefault(); 
                        selectedIndex = (selectedIndex - 1 + items.length) % items.length; 
                        break;
                    case 'Enter': 
                        e.preventDefault(); 
                        if (selectedIndex >= 0 && items[selectedIndex]) { 
                            items[selectedIndex].click(); 
                        } else if (filteredTeachers.length > 0) { 
                            selectTeacher(filteredTeachers[0]); 
                        } 
                        return;
                    case 'Escape': 
                        hideDropdown(); 
                        return;
                }
                items.forEach((item, index) => item.classList.toggle('selected', index === selectedIndex));
            });
            
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) hideDropdown();
            });
        }
        
        function selectTeacher(teacherName) {
            clearTeacherSearch();
            displayTeacherSchedule(teacherName);
        }
        
        function clearTeacherSearch() {
            const searchInput = document.getElementById('search-input');
            const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
            if (searchInput) searchInput.value = '';
            if (autocompleteDropdown) autocompleteDropdown.style.display = 'none';
        }
        
        // 선생님 즐겨찾기 관리
        let teacherFavorites = JSON.parse(localStorage.getItem('favTeachers') || '[]');
        
        function toggleTeacherFavorite(teacherName) {
            const index = teacherFavorites.indexOf(teacherName);
            if (index > -1) {
                // 이미 즐겨찾기에 있으면 제거
                teacherFavorites.splice(index, 1);
            } else {
                // 즐겨찾기에 없으면 추가 (맨 앞에)
                teacherFavorites.unshift(teacherName);
                if (teacherFavorites.length > 10) {
                    teacherFavorites = teacherFavorites.slice(0, 10);
                }
            }
            localStorage.setItem('favTeachers', JSON.stringify(teacherFavorites));
            updateTeacherFavoriteChips();
            // 현재 표시된 선생님이면 화면 새로고침
            displayTeacherSchedule(teacherName);
        }
        
        function addToTeacherFavorites(teacherName) {
            if (!teacherFavorites.includes(teacherName)) {
                teacherFavorites.unshift(teacherName);
                if (teacherFavorites.length > 10) {
                    teacherFavorites = teacherFavorites.slice(0, 10);
                }
                localStorage.setItem('favTeachers', JSON.stringify(teacherFavorites));
            }
        }
        
        function updateTeacherFavoriteChips() {
            const favoriteChipsContainer = document.getElementById('favorite-chips');
            if (!favoriteChipsContainer) return;
            
            favoriteChipsContainer.innerHTML = teacherFavorites.map(teacher => 
                '<button class="favorite-chip" onclick="selectTeacher(\\'' + teacher + '\\');">' + 
                teacher + ' 선생님' +
                '</button>'
            ).join('');
        }

        init();
    `;
}

// 메인 HTML 템플릿 생성 함수 - 주간시간표 데이터 추가
function getHtmlTemplate(dataJsonString, pageTitle, iconBase64, selectedTheme = 'serenity', enabledFeatures = {student: true, class: true, classroom: true, teacher: true}, weeklyData = null, weeklyFormat = 'formatA') {
    // 디버깅: 매개변수 검증
    console.log('Template received parameters:', {
        dataLength: dataJsonString?.length || 0,
        pageTitle,
        hasIcon: !!iconBase64,
        selectedTheme,
        enabledFeatures,
        hasWeeklyData: !!weeklyData,
        weeklyFormat
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
        ${generateTimetableJS(dataJsonString, enabledFeatures, weeklyData, weeklyFormat)}
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
