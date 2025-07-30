// 학생 시간표 HTML 템플릿 생성기

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
            max-width: 1100px; 
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
        }
        .title-icon { 
            height: 2.5em; 
            margin-right: 15px; 
            border-radius: 8px; 
            max-width: 150px; 
            object-fit: contain; 
        }
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

        /* 반응형 스타일 */
        @media (max-width: 768px) {
            body { padding: 10px; }
            #app-container { padding: 20px; margin: 10px auto; border-radius: 12px; }
            h1 { font-size: 1.5em; margin-bottom: 20px; flex-direction: column; gap: 10px; }
            .title-icon { margin-right: 0; margin-bottom: 5px; height: 2em; max-width: 120px; }
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
        }

        /* 인쇄 스타일 */
        @media print {
            body { background: white; padding: 0; margin: 0; }
            #app-container { box-shadow: none; padding: 15px; margin: 0; max-width: 100%; }
            #search-section, .schedule-actions, .title-icon { display: none; }
            h1 { font-size: 14pt; }
            .schedule-info h2 { font-size: 12pt; }
            table { font-size: 9pt; }
            thead th { background: var(--header-bg) !important; color: var(--header-text) !important; -webkit-print-color-adjust: exact; }
            td { height: auto; padding: 6px 4px;}
            .location-chip, .teacher-name { font-size: 8pt; padding: 2px 5px; -webkit-print-color-adjust: exact; }
        }
    `;
}

// JavaScript 코드 생성 함수
function generateTimetableJS(dataJsonString) {
    return `
        const allStudents = ${dataJsonString};
        allStudents.forEach((student, index) => {
            student.uniqueId = student.name + '||' + student.homeroom;
        });

        let favorites = JSON.parse(localStorage.getItem('favStudents') || '[]');
        let filteredData = []; 
        let selectedIndex = -1;

        const searchInput = document.getElementById('search-input');
        const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
        const scheduleContainer = document.getElementById('schedule-container');

        function init() {
            setupEventListeners();
            updateFavoriteChips();
            showEmptyState();
        }

        function setupEventListeners() {
            searchInput.addEventListener('input', e => {
                const query = e.target.value.trim().toLowerCase();
                if (query === '') {
                    filteredData = [];
                    hideDropdown();
                    return;
                }
                filteredData = allStudents.filter(student => student.name.toLowerCase().includes(query));
                updateAutocomplete();
            });

            searchInput.addEventListener('keydown', e => {
                const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
                if (!items.length) return;
                switch(e.key) {
                    case 'ArrowDown': e.preventDefault(); selectedIndex = (selectedIndex + 1) % items.length; break;
                    case 'ArrowUp': e.preventDefault(); selectedIndex = (selectedIndex - 1 + items.length) % items.length; break;
                    case 'Enter': e.preventDefault(); if (selectedIndex >= 0 && items[selectedIndex]) { items[selectedIndex].click(); } else if (filteredData.length > 0) { selectItem(filteredData[0].uniqueId); } return;
                    case 'Escape': hideDropdown(); return;
                }
                items.forEach((item, index) => item.classList.toggle('selected', index === selectedIndex));
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) hideDropdown();
            });
        }

        function updateAutocomplete() {
            if (filteredData.length === 0) { hideDropdown(); return; }
            autocompleteDropdown.innerHTML = filteredData.map(item => \`<div class="autocomplete-item" onclick="selectItem('\${item.uniqueId}')">🧑‍🎓 \${item.name} (\${item.homeroom})</div>\`).join('');
            showDropdown();
        }

        function selectItem(uniqueId) {
            const student = allStudents.find(s => s.uniqueId === uniqueId);
            if (!student) return;
            searchInput.value = student.name;
            hideDropdown();
            displaySchedule(uniqueId);
        }

        function displaySchedule(uniqueId) {
            const student = allStudents.find(s => s.uniqueId === uniqueId);
            if (!student) { showEmptyState(); return; }
            const isFavorite = favorites.includes(uniqueId);
            const days = ['월', '화', '수', '목', '금'];
            const { maxPeriods, periodCounts } = student;
            let tableHTML = \`<div class="schedule-header"><div class="schedule-info"><h2>\${student.name} <small>(\${student.homeroom})</small></h2></div><div class="schedule-actions"><button class="action-btn \${isFavorite ? 'favorited' : ''}" onclick="toggleFavorite('\${uniqueId}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="\${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> \${isFavorite ? '즐겨찾기됨' : '즐겨찾기'}</button><button class="action-btn" onclick="window.print()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg> 인쇄</button></div></div><div class="table-container"><table><thead><tr><th>교시</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th></tr></thead><tbody>\`;
            for (let i = 0; i < maxPeriods; i++) {
                tableHTML += \`<tr><td>\${i + 1}</td>\`;
                days.forEach((day, dayIndex) => {
                    if (i < (periodCounts[dayIndex] || 0)) {
                        const cellContent = student.schedule[day][i] || '';
                        tableHTML += \`<td>\${cellContent}</td>\`;
                    } else {
                        tableHTML += \`<td style="background-color: #f8f9fa;"></td>\`;
                    }
                });
                tableHTML += '</tr>';
            }
            tableHTML += '</tbody></table></div>';
            scheduleContainer.innerHTML = tableHTML;
        }

        function toggleFavorite(uniqueId) {
            const index = favorites.indexOf(uniqueId);
            if (index > -1) favorites.splice(index, 1);
            else favorites.push(uniqueId);
            localStorage.setItem('favStudents', JSON.stringify(favorites));
            updateFavoriteChips();
            if(document.querySelector('.schedule-info h2')) displaySchedule(uniqueId);
        }

        function updateFavoriteChips() {
            const container = document.getElementById('favorite-chips');
            if (favorites.length === 0) { container.innerHTML = \`<span style="color: var(--subtle-text); font-size: 13px;">...</span>\`; return; }
            container.innerHTML = favorites.map(uniqueId => {
                const student = allStudents.find(s => s.uniqueId === uniqueId);
                if (!student) return '';
                return \`<button class="favorite-chip" onclick="selectItem('\${uniqueId}')">\${student.name} (\${student.homeroom.replace('-', '학년')})</button>\`
            }).join('');
        }
        
        function showDropdown() { if (filteredData.length > 0) autocompleteDropdown.style.display = 'block'; }
        function hideDropdown() { autocompleteDropdown.style.display = 'none'; selectedIndex = -1; }
        function showEmptyState() { scheduleContainer.innerHTML = \`<div class="empty-state"><div class="empty-state-icon">🧑‍🎓</div><h3>학생 이름을 검색하세요</h3></div>\`; }

        init();
    `;
}

// 메인 HTML 템플릿 생성 함수
function getHtmlTemplate(dataJsonString, pageTitle, iconBase64, selectedTheme = 'serenity') {
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
        <div id="search-section">
            <div class="search-container">
                <div class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input type="text" id="search-input" placeholder="학생 이름을 입력하세요...">
                <div class="autocomplete-dropdown" id="autocomplete-dropdown"></div>
            </div>
            <div class="favorites-section">
                <div class="favorites-title">자주 찾는 학생</div>
                <div class="favorite-chips" id="favorite-chips"></div>
            </div>
        </div>
        <div id="schedule-container"></div>
    </div>
    <script>
        ${generateTimetableJS(dataJsonString)}
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