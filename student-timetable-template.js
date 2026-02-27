// 학생 시간표 HTML 템플릿 생성기 (정규식 오류 수정 버전)

// 테마별 컬러 팔레트 정의
const themes = {
    'serenity': {
        primary: '#92A8D1',
        primaryLight: '#B8CAE6',
        accent: '#D1E2F7',
        background: '#F7FAFC',
        cardBg: '#FFFFFF',
        headerBg: '#92A8D1',
        headerText: '#FFFFFF'
    },
    'classic-blue': {
        primary: '#0F4C81',
        primaryLight: '#2E86AB',
        accent: '#4A90A4',
        background: '#F7FAFC',
        cardBg: '#FFFFFF',
        headerBg: '#0F4C81',
        headerText: '#FFFFFF'
    },
    'midnight': {
        primary: '#2C3E50',
        primaryLight: '#4A6274',
        accent: '#7F8C9B',
        background: '#F5F6F8',
        cardBg: '#FFFFFF',
        headerBg: '#2C3E50',
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
    'rose': {
        primary: '#D4708F',
        primaryLight: '#E8A0B4',
        accent: '#F2C4D0',
        background: '#FDF7F9',
        cardBg: '#FFFFFF',
        headerBg: '#D4708F',
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
    'ocean': {
        primary: '#1A8A7D',
        primaryLight: '#3BB5A6',
        accent: '#8CD4CA',
        background: '#F4FAF9',
        cardBg: '#FFFFFF',
        headerBg: '#1A8A7D',
        headerText: '#FFFFFF'
    },
    'amber': {
        primary: '#D48C2E',
        primaryLight: '#E5AD5E',
        accent: '#F0D0A0',
        background: '#FDFAF4',
        cardBg: '#FFFFFF',
        headerBg: '#D48C2E',
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
    'slate': {
        primary: '#5A7D8B',
        primaryLight: '#7FA3B0',
        accent: '#B0CED6',
        background: '#F6F9FA',
        cardBg: '#FFFFFF',
        headerBg: '#5A7D8B',
        headerText: '#FFFFFF'
    },
    'graphite': {
        primary: '#4A4A4A',
        primaryLight: '#717171',
        accent: '#A0A0A0',
        background: '#F5F5F5',
        cardBg: '#FFFFFF',
        headerBg: '#4A4A4A',
        headerText: '#FFFFFF'
    }
};

function clampColorChannel(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}

function normalizeHexColor(hexColor) {
    const source = String(hexColor || '').trim().replace('#', '');
    if (source.length === 3) {
        return source.split('').map(ch => ch + ch).join('');
    }
    if (source.length === 6) {
        return source;
    }
    return '92A8D1';
}

function hexToRgb(hexColor) {
    const normalized = normalizeHexColor(hexColor);
    return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16)
    };
}

function rgbToHex(rgb) {
    return '#' + [rgb.r, rgb.g, rgb.b]
        .map(channel => clampColorChannel(channel).toString(16).padStart(2, '0'))
        .join('');
}

function mixColors(colorA, colorB, weightA = 0.5) {
    const first = hexToRgb(colorA);
    const second = hexToRgb(colorB);
    const w = Math.max(0, Math.min(1, weightA));

    return rgbToHex({
        r: first.r * w + second.r * (1 - w),
        g: first.g * w + second.g * (1 - w),
        b: first.b * w + second.b * (1 - w)
    });
}

function withAlpha(color, alpha = 1) {
    const rgb = hexToRgb(color);
    const clampedAlpha = Math.max(0, Math.min(1, alpha));
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clampedAlpha})`;
}

function getRelativeLuminance(color) {
    const rgb = hexToRgb(color);
    const transform = (channel) => {
        const normalized = channel / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : Math.pow((normalized + 0.055) / 1.055, 2.4);
    };

    const r = transform(rgb.r);
    const g = transform(rgb.g);
    const b = transform(rgb.b);

    return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
}

// CSS 스타일 생성 함수
function generateTimetableCSS(selectedTheme = 'serenity') {
    const currentTheme = themes[selectedTheme] || themes['serenity'];
    const basePrimary = currentTheme.primary || '#92A8D1';
    const basePrimaryLight = currentTheme.primaryLight || '#B8CAE6';
    const baseAccent = currentTheme.accent || '#D1E2F7';
    const baseBackground = currentTheme.background || '#F7FAFC';
    const baseCard = currentTheme.cardBg || '#FFFFFF';
    const baseHeader = currentTheme.headerBg || basePrimary;

    const backgroundColor = mixColors(baseBackground, '#ffffff', 0.85);
    const cardBackground = mixColors(baseCard, '#ffffff', 0.94);
    const surfaceSoft = mixColors(baseAccent, '#ffffff', 0.64);
    const headerBg = mixColors(baseHeader, '#ffffff', 0.82);
    const headerText = getRelativeLuminance(headerBg) > 0.58 ? '#1f2937' : '#ffffff';
    const textColor = mixColors(basePrimary, '#0f172a', 0.22);
    const subtleText = mixColors(basePrimary, '#64748b', 0.22);
    const borderColor = mixColors(basePrimary, '#cbd5e1', 0.24);
    const lineSoft = mixColors(borderColor, '#ffffff', 0.52);
    const rowAlt = mixColors(surfaceSoft, '#ffffff', 0.3);
    const rowHover = mixColors(basePrimaryLight, '#ffffff', 0.36);
    const emptyBg = mixColors(surfaceSoft, '#ffffff', 0.46);
    const panelBorder = withAlpha(basePrimary, 0.25);
    const tabHoverBg = withAlpha(basePrimaryLight, 0.16);
    const modalBackdrop = withAlpha(basePrimary, 0.32);
    const chipBg = mixColors(basePrimaryLight, '#ffffff', 0.34);
    const chipBorder = mixColors(basePrimary, '#d5dfeb', 0.3);
    const chipText = mixColors(basePrimary, '#334155', 0.35);
    const teacherChipBg = mixColors(baseAccent, '#ffffff', 0.4);
    const teacherChipBorder = mixColors(basePrimary, '#d8dee8', 0.25);
    const teacherChipText = mixColors(basePrimary, '#475569', 0.3);
    const modalTop = mixColors(baseBackground, '#ffffff', 0.78);
    const modalBottom = mixColors(baseCard, '#ffffff', 0.96);
    const bodyGlowA = withAlpha(basePrimaryLight, 0.3);
    const bodyGlowB = withAlpha(basePrimary, 0.14);
    const bodyGradientStart = mixColors(baseBackground, '#ffffff', 0.9);
    const bodyGradientEnd = mixColors(baseAccent, '#ffffff', 0.72);
    const containerBg = withAlpha(cardBackground, 0.92);
    const tabHoverBorder = withAlpha(basePrimary, 0.2);
    const activeBorder = withAlpha(basePrimary, 0.34);
    
    return `
        :root {
            --primary-color: ${basePrimary};
            --primary-light: ${basePrimaryLight};
            --accent-color: ${baseAccent};
            --background-color: ${backgroundColor};
            --card-background: ${cardBackground};
            --surface-soft: ${surfaceSoft};
            --header-bg: ${headerBg};
            --header-text: ${headerText};
            --text-color: ${textColor};
            --subtle-text: ${subtleText};
            --border-color: ${borderColor};
            --line-soft: ${lineSoft};
            --empty-bg: ${emptyBg};
            --row-alt: ${rowAlt};
            --row-hover: ${rowHover};
            --panel-border: ${panelBorder};
            --tab-hover-bg: ${tabHoverBg};
            --modal-backdrop: ${modalBackdrop};
            --chip-bg: ${chipBg};
            --chip-border: ${chipBorder};
            --chip-text: ${chipText};
            --teacher-chip-bg: ${teacherChipBg};
            --teacher-chip-border: ${teacherChipBorder};
            --teacher-chip-text: ${teacherChipText};
            --modal-top: ${modalTop};
            --modal-bottom: ${modalBottom};
            --schedule-max-width: 980px;
        }
        * {
            box-sizing: border-box;
        }
        body {
            font-family: 'Pretendard Variable', 'Noto Sans KR', sans-serif;
            margin: 0;
            min-height: 100vh;
            padding: 28px 16px;
            color: var(--text-color);
            background:
                radial-gradient(circle at 8% 6%, ${bodyGlowA} 0%, transparent 44%),
                radial-gradient(circle at 94% 0%, ${bodyGlowB} 0%, transparent 38%),
                linear-gradient(155deg, ${bodyGradientStart} 0%, ${bodyGradientEnd} 100%);
        }
        body.modal-open {
            overflow: hidden;
        }
        #app-container {
            max-width: 1240px;
            margin: 0 auto;
            background: ${containerBg};
            border: 1px solid var(--panel-border);
            border-radius: 24px;
            backdrop-filter: blur(4px);
            padding: 34px;
        }
        h1 {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 14px;
            font-size: 2rem;
            line-height: 1.25;
            margin: 0 0 28px 0;
            letter-spacing: -0.02em;
        }
        .title-icon {
            height: 2.3em;
            border-radius: 10px;
            max-width: 150px;
            object-fit: contain;
        }

        .tab-navigation {
            display: flex;
            gap: 8px;
            margin-bottom: 22px;
            padding: 7px;
            background: var(--surface-soft);
            border: 1px solid var(--border-color);
            border-radius: 14px;
            overflow-x: auto;
        }
        .tab-button {
            flex: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 11px 14px;
            border: 1px solid transparent;
            border-radius: 10px;
            background: transparent;
            color: var(--text-color);
            cursor: pointer;
            transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
            font-weight: 600;
            font-size: 14px;
            white-space: nowrap;
        }
        .tab-button:hover:not(.active) {
            background: var(--tab-hover-bg);
            border-color: ${tabHoverBorder};
        }
        .tab-button.active {
            background: var(--card-background);
            border-color: ${activeBorder};
            color: var(--primary-color);
        }

        #search-section {
            background: var(--surface-soft);
            border: 1px solid var(--border-color);
            padding: 22px;
            border-radius: 16px;
            margin-bottom: 24px;
        }
        .search-container {
            position: relative;
            max-width: 560px;
            margin: 0 auto;
        }
        #search-input {
            width: 100%;
            padding: 14px 18px 14px 46px;
            border: 1px solid var(--border-color);
            border-radius: 999px;
            font-size: 15px;
            background: var(--card-background);
            color: var(--text-color);
            outline: none;
        }
        #search-input:focus {
            border-color: var(--primary-color);
        }
        .search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--subtle-text);
            pointer-events: none;
        }
        .autocomplete-dropdown {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            max-height: 280px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        }
        .autocomplete-item {
            padding: 11px 14px;
            cursor: pointer;
            border-bottom: 1px solid var(--line-soft);
            font-size: 14px;
        }
        .autocomplete-item:last-child {
            border-bottom: 0;
        }
        .autocomplete-item:hover,
        .autocomplete-item.selected {
            background-color: var(--surface-soft);
            color: var(--text-color);
        }
        .favorites-section {
            margin-top: 18px;
        }
        .favorites-title {
            font-size: 13px;
            color: var(--subtle-text);
            margin-bottom: 10px;
            text-align: center;
            font-weight: 500;
        }
        .favorite-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
        }
        .favorite-chip {
            background: var(--card-background);
            padding: 7px 12px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            border: 1px solid var(--border-color);
            color: var(--text-color);
            transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .favorite-chip:hover {
            background: var(--surface-soft);
            border-color: var(--primary-light);
        }

        .schedule-header {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            align-items: flex-end;
            margin: 0 auto 14px;
            width: min(100%, var(--schedule-max-width));
        }
        .schedule-info h2 {
            margin: 0;
            font-size: 1.52rem;
            line-height: 1.3;
            letter-spacing: -0.02em;
        }
        .schedule-info h2 small {
            color: var(--subtle-text);
            font-size: 0.78em;
            font-weight: 500;
        }
        .schedule-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }
        .action-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            padding: 9px 13px;
            border: 1px solid var(--border-color);
            background: var(--card-background);
            color: var(--text-color);
            border-radius: 10px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .action-btn:hover {
            background: var(--surface-soft);
            border-color: var(--primary-light);
        }
        .action-btn.favorited {
            background: var(--primary-color);
            border-color: var(--primary-color);
            color: #fff;
        }

        .table-container {
            border: 1px solid var(--border-color);
            border-radius: 14px;
            overflow: auto;
            background: var(--card-background);
            width: min(100%, var(--schedule-max-width));
            margin: 0 auto;
        }
        table {
            width: 100%;
            min-width: 760px;
            border-collapse: separate;
            border-spacing: 0;
            font-size: 14px;
            table-layout: fixed;
        }
        th,
        td {
            text-align: center;
            vertical-align: middle;
            border-right: 1px solid var(--line-soft);
            border-bottom: 1px solid var(--line-soft);
            padding: 8px 6px;
            line-height: 1.45;
        }
        thead th {
            background: var(--header-bg);
            color: var(--header-text);
            font-weight: 700;
            padding: 12px 8px;
            position: sticky;
            top: 0;
            z-index: 2;
        }
        th:last-child,
        td:last-child {
            border-right: 0;
        }
        tbody tr:last-child td {
            border-bottom: 0;
        }
        tbody td {
            height: 80px;
        }
        tbody tr:nth-child(even) td {
            background: var(--row-alt);
        }
        tbody tr:hover td {
            background: var(--row-hover);
        }
        .entry-divider {
            margin: 10px 0;
            border: 0;
            border-top: 1px solid var(--line-soft);
        }
        .empty-cell {
            background-color: var(--empty-bg) !important;
            color: var(--subtle-text);
        }
        .empty-cell-label {
            color: var(--subtle-text);
            font-size: 12px;
        }

        td .subject-name {
            font-weight: 700;
            font-size: 14px;
            color: var(--text-color);
            margin-bottom: 4px;
        }
        td .details {
            margin-top: 6px;
            line-height: 1.3;
        }
        .details.details-with-list-slot {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 6px;
            min-height: 50px;
        }
        .student-list-slot {
            min-height: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .student-list-placeholder {
            display: inline-block;
            width: 70px;
            height: 24px;
            visibility: hidden;
        }
        .location-chip {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 3px 9px;
            border-radius: 999px;
            background: var(--chip-bg);
            border: 1px solid var(--chip-border);
            color: var(--chip-text);
            font-size: 11px;
            font-weight: 600;
        }
        .teacher-name {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            color: var(--teacher-chip-text);
            font-weight: 600;
            padding: 3px 8px;
            background: var(--teacher-chip-bg);
            border: 1px solid var(--teacher-chip-border);
            border-radius: 999px;
        }
        .location-chip::before {
            content: '';
        }
        .elective-subject-line {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
        }
        .elective-class-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
            height: 24px;
            padding: 0 8px;
            border-radius: 999px;
            background: var(--primary-color);
            color: #fff;
            font-size: 11px;
            font-weight: 700;
            line-height: 1;
        }
        .student-list-btn {
            margin-top: 0;
            padding: 4px 10px;
            border: 1px solid var(--border-color);
            border-radius: 999px;
            background: var(--card-background);
            color: var(--text-color);
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .student-list-btn:hover {
            background: var(--surface-soft);
            border-color: var(--primary-light);
        }

        /* 교사 사이드바 레이아웃 */
        .teacher-layout {
            display: flex;
            gap: 20px;
            align-items: flex-start;
        }
        .teacher-sidebar {
            width: 220px;
            min-width: 220px;
            background: var(--surface-soft);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            max-height: calc(100vh - 200px);
            position: sticky;
            top: 20px;
            overflow: hidden;
        }
        .teacher-sidebar-header {
            padding: 14px 14px 0;
            flex-shrink: 0;
        }
        .teacher-sidebar-search {
            position: relative;
            margin-bottom: 12px;
        }
        .teacher-sidebar-search input {
            width: 100%;
            padding: 10px 12px 10px 36px;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            font-size: 13px;
            background: var(--card-background);
            color: var(--text-color);
            outline: none;
            transition: border-color 0.2s ease;
            box-sizing: border-box;
        }
        .teacher-sidebar-search input:focus {
            border-color: var(--primary-color);
        }
        .teacher-sidebar-search input::placeholder {
            color: var(--subtle-text);
        }
        .teacher-sidebar-search .sidebar-search-icon {
            position: absolute;
            left: 11px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--subtle-text);
            pointer-events: none;
            display: flex;
        }
        .teacher-sidebar-list {
            overflow-y: auto;
            padding: 0 8px 8px;
            flex: 1;
        }
        .teacher-sidebar-list::-webkit-scrollbar {
            width: 4px;
        }
        .teacher-sidebar-list::-webkit-scrollbar-track {
            background: transparent;
        }
        .teacher-sidebar-list::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 4px;
        }
        .teacher-sidebar-list::-webkit-scrollbar-thumb:hover {
            background: var(--subtle-text);
        }
        .sidebar-section-label {
            font-size: 11px;
            font-weight: 600;
            color: var(--subtle-text);
            text-transform: uppercase;
            letter-spacing: 0.04em;
            padding: 8px 8px 6px;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .sidebar-fav-clear {
            background: none;
            border: none;
            color: var(--subtle-text);
            cursor: pointer;
            padding: 2px 4px;
            font-size: 10px;
            font-weight: 500;
            border-radius: 6px;
            transition: color 0.15s ease, background-color 0.15s ease;
            line-height: 1;
            display: flex;
            align-items: center;
            gap: 3px;
        }
        .sidebar-fav-clear:hover {
            color: var(--text-color);
            background: var(--row-hover);
        }
        .sidebar-divider {
            height: 1px;
            background: var(--border-color);
            margin: 4px 8px 8px;
        }
        .teacher-sidebar-item {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            padding: 9px 12px;
            border: none;
            border-radius: 9px;
            background: transparent;
            color: var(--text-color);
            font-size: 13.5px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.15s ease, color 0.15s ease;
            text-align: left;
            line-height: 1.3;
            box-sizing: border-box;
        }
        .teacher-sidebar-item:hover {
            background: var(--row-hover);
        }
        .teacher-sidebar-item.active {
            background: var(--primary-color);
            color: #fff;
            font-weight: 600;
        }
        .teacher-sidebar-item .sidebar-fav-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--primary-color);
            flex-shrink: 0;
        }
        .teacher-sidebar-item.active .sidebar-fav-dot {
            background: rgba(255,255,255,0.6);
        }
        .teacher-sidebar-count {
            font-size: 11px;
            color: var(--subtle-text);
            text-align: center;
            padding: 6px 8px 10px;
            font-weight: 500;
            flex-shrink: 0;
        }
        .teacher-main-content {
            flex: 1;
            min-width: 0;
        }
        .sidebar-no-result {
            text-align: center;
            padding: 20px 12px;
            color: var(--subtle-text);
            font-size: 13px;
        }

        .empty-state {
            text-align: center;
            padding: 78px 20px;
        }
        .empty-state-icon {
            margin-bottom: 18px;
            opacity: 0.45;
            color: var(--subtle-text);
        }
        .empty-state h3 {
            margin: 0;
            color: var(--subtle-text);
            font-weight: 500;
        }
        .empty-state-icon svg {
            width: 44px;
            height: 44px;
        }

        .class-schedule-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .student-card {
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 15px;
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
            background: var(--surface-soft);
            border-radius: 6px;
        }

        .usage-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            background: var(--surface-soft);
            padding: 18px;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            text-align: center;
        }
        .stat-number {
            font-size: 2em;
            font-weight: 700;
            color: var(--primary-color);
        }
        .stat-label {
            font-size: 13px;
            color: var(--subtle-text);
            margin-top: 5px;
        }

        .student-list-modal {
            position: fixed;
            inset: 0;
            z-index: 2200;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 22px;
        }
        .student-list-modal.open {
            display: flex;
        }
        .student-list-modal-backdrop {
            position: absolute;
            inset: 0;
            background: var(--modal-backdrop);
        }
        .student-list-modal-dialog {
            position: relative;
            width: min(860px, 100%);
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background: linear-gradient(180deg, var(--modal-top) 0%, var(--modal-bottom) 100%);
            border: 1px solid var(--border-color);
            border-radius: 18px;
        }
        .student-list-modal-header {
            padding: 18px 20px 12px;
            border-bottom: 1px solid var(--line-soft);
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
        }
        #student-list-modal-title {
            margin: 0;
            font-size: 1.1rem;
            letter-spacing: -0.01em;
        }
        #student-list-modal-meta {
            margin-top: 4px;
            color: var(--subtle-text);
            font-size: 13px;
        }
        .modal-close-btn {
            border: 1px solid var(--border-color);
            background: var(--card-background);
            color: var(--text-color);
            border-radius: 10px;
            font-size: 16px;
            width: 34px;
            height: 34px;
            cursor: pointer;
            line-height: 1;
        }
        .student-list-modal-body {
            padding: 0 20px;
            overflow: auto;
        }
        .student-list-table {
            width: 100%;
            min-width: 360px;
            border-collapse: collapse;
            table-layout: fixed;
            font-size: 13px;
        }
        .student-list-table th,
        .student-list-table td {
            padding: 5px 8px;
            border-bottom: 1px solid var(--line-soft);
            border-right: 0;
        }
        .student-list-table th {
            position: sticky;
            top: 0;
            z-index: 1;
            background: var(--surface-soft);
            color: var(--text-color);
            font-weight: 700;
        }
        .student-list-modal-footer {
            padding: 14px 20px 18px;
            border-top: 1px solid var(--line-soft);
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }
        .modal-secondary-btn,
        .modal-primary-btn {
            padding: 8px 13px;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--card-background);
            color: var(--text-color);
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
        }
        .modal-primary-btn {
            background: var(--primary-color);
            border-color: var(--primary-color);
            color: #fff;
        }

        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            #app-container {
                border-radius: 16px;
                padding: 18px 14px;
            }
            h1 {
                font-size: 1.45rem;
                margin-bottom: 18px;
                flex-direction: column;
                gap: 8px;
            }
            .title-icon {
                height: 2em;
                max-width: 120px;
            }
            .tab-navigation {
                gap: 6px;
                margin-bottom: 14px;
            }
            .tab-button {
                font-size: 13px;
                padding: 10px 12px;
            }
            #search-section {
                padding: 14px 12px;
                margin-bottom: 14px;
            }
            #search-input {
                padding: 12px 15px 12px 42px;
                font-size: 15px;
            }
            .search-icon {
                left: 14px;
            }
            .favorite-chips {
                justify-content: flex-start;
            }
            .schedule-header {
                flex-direction: column;
                align-items: stretch;
                gap: 10px;
                margin-bottom: 10px;
            }
            .schedule-info h2 {
                font-size: 1.25rem;
            }
            .schedule-actions {
                width: 100%;
            }
            .action-btn {
                flex: 1;
                min-width: 120px;
            }
            table {
                font-size: 12px;
                min-width: 680px;
            }
            th:first-child,
            td:first-child {
                position: sticky;
                left: 0;
                z-index: 3;
                background: var(--card-background);
            }
            thead th:first-child {
                background: var(--header-bg);
            }
            .teacher-layout {
                flex-direction: column;
            }
            .teacher-sidebar {
                width: 100%;
                min-width: 0;
                max-height: none;
                position: static;
                flex-direction: row;
                flex-wrap: wrap;
                border-radius: 12px;
            }
            .teacher-sidebar-header {
                width: 100%;
                padding: 12px 12px 0;
            }
            .teacher-sidebar-list {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                padding: 8px 12px 12px;
                overflow-y: visible;
                max-height: 160px;
                overflow-y: auto;
            }
            .sidebar-section-label {
                width: 100%;
                padding: 4px 4px 2px;
            }
            .sidebar-divider {
                width: 100%;
                margin: 2px 0 4px;
            }
            .teacher-sidebar-item {
                padding: 7px 12px;
                border-radius: 999px;
                font-size: 13px;
                border: 1px solid var(--border-color);
                background: var(--card-background);
                width: auto;
            }
            .teacher-sidebar-item.active {
                border-color: var(--primary-color);
            }
            .teacher-sidebar-count {
                width: 100%;
                padding: 0 4px 6px;
                text-align: left;
            }
            .empty-state {
                padding: 56px 20px;
            }
            .student-list-modal {
                padding: 10px;
            }
            .student-list-modal-dialog {
                border-radius: 14px;
                max-height: 94vh;
            }
            .student-list-modal-header,
            .student-list-modal-body,
            .student-list-modal-footer {
                padding-left: 12px;
                padding-right: 12px;
            }
            .student-list-table {
                min-width: 460px;
            }
        }

        @media print {
            #search-section,
            .schedule-actions,
            .title-icon,
            .tab-navigation,
            .student-list-modal,
            .teacher-sidebar {
                display: none !important;
            }
            .teacher-layout {
                display: block !important;
            }
            body {
                background: #fff !important;
                padding: 0 !important;
                margin: 0 !important;
                -webkit-print-color-adjust: exact !important;
            }
            #app-container {
                border: 0 !important;
                border-radius: 0 !important;
                padding: 15px !important;
                margin: 0 !important;
                max-width: 100% !important;
                background: #fff !important;
            }
            h1 {
                font-size: 16pt !important;
            }
            .schedule-info h2 {
                font-size: 14pt !important;
            }
            .schedule-header,
            .table-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            table {
                min-width: 0 !important;
            }
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            .student-print-page {
                page-break-before: always !important;
                page-break-after: auto !important;
                page-break-inside: avoid !important;
                margin-bottom: 20px !important;
            }
            .student-print-page:first-child {
                page-break-before: auto !important;
            }
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
                padding: 0 1px !important;
                display: inline !important;
                background: rgba(0, 0, 0, 0.1) !important;
                border-radius: 1px !important;
            }
            body.pocket-size .location-chip::before {
                content: '' !important;
            }
            body.pocket-size .schedule-header {
                display: none !important;
            }
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
    
    console.log('[FEATURES] Safe features applied:', safeEnabledFeatures);
    
    return `
        // 디버깅: 생성된 JavaScript에서 features 확인
        console.log('[FEATURES] Templates received features:', ${JSON.stringify(safeEnabledFeatures)});
        
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
        console.log('[FEATURES] Final enabledFeatures in runtime:', enabledFeatures);
        console.log('[FEATURES] Available features check:', {
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
        const studentListStore = {};
        let studentListCounter = 0;
        const studentIndexByName = buildStudentIndex(allStudents);

        function buildStudentIndex(students) {
            const index = {};
            students.forEach(student => {
                if (!student || !student.name) return;
                const name = String(student.name).trim();
                if (!name) return;

                if (!index[name]) {
                    index[name] = [];
                }

                const homeroom = student.homeroom || '';
                const number = student.number !== undefined && student.number !== null ? String(student.number).trim() : '';
                let studentId = '';

                if (homeroom && number) {
                    const parts = homeroom.split('-');
                    if (parts.length === 2) {
                        const grade = parts[0];
                        const classNum = String(parts[1]).padStart(2, '0');
                        const studentNum = number.padStart(2, '0');
                        studentId = grade + classNum + studentNum;
                    }
                }

                index[name].push({
                    name: name,
                    homeroom: homeroom,
                    number: number,
                    studentId: studentId
                });
            });
            return index;
        }

        function escapeHtml(value) {
            if (value === null || value === undefined) return '';
            return String(value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function csvEscape(value) {
            if (value === null || value === undefined) return '';
            const stringValue = String(value);
            if (/[",\\n]/.test(stringValue)) {
                return '"' + stringValue.replace(/"/g, '""') + '"';
            }
            return stringValue;
        }

        function sanitizeFileName(name) {
            return String(name || '학생목록')
                .replace(/[\\\\/:*?"<>|]/g, '_')
                .replace(/\\s+/g, '_')
                .replace(/_+/g, '_')
                .replace(/^_+|_+$/g, '')
                .slice(0, 80) || '학생목록';
        }

        function registerStudentList(payload) {
            studentListCounter += 1;
            const listId = 'student-list-' + studentListCounter;
            studentListStore[listId] = payload;
            return listId;
        }

        function clearStudentListStore() {
            Object.keys(studentListStore).forEach(key => {
                delete studentListStore[key];
            });
            studentListCounter = 0;
        }

        function resolveStudentRows(studentNames) {
            const usageIndexByName = {};
            return (studentNames || []).map(name => {
                const safeName = String(name || '').trim();
                if (!usageIndexByName[safeName]) {
                    usageIndexByName[safeName] = 0;
                }

                const candidates = studentIndexByName[safeName] || [];
                const indexPointer = usageIndexByName[safeName];
                usageIndexByName[safeName] = indexPointer + 1;

                if (candidates.length > 0) {
                    const selected = candidates[Math.min(indexPointer, candidates.length - 1)];
                    return {
                        name: selected.name,
                        homeroom: selected.homeroom || '',
                        number: selected.number || '',
                        studentId: selected.studentId || ''
                    };
                }

                return {
                    name: safeName,
                    homeroom: '',
                    number: '',
                    studentId: ''
                };
            });
        }

        function openStudentListModal(listId) {
            const payload = studentListStore[listId];
            const modal = document.getElementById('student-list-modal');
            if (!payload || !modal) return;

            const titleElement = document.getElementById('student-list-modal-title');
            const metaElement = document.getElementById('student-list-modal-meta');
            const bodyElement = document.getElementById('student-list-modal-body');
            const rows = resolveStudentRows(payload.students);

            if (titleElement) {
                titleElement.textContent = payload.title || '학생 목록';
            }
            if (metaElement) {
                metaElement.textContent = '총 ' + rows.length + '명';
            }
            if (bodyElement) {
                let tableHtml = '<table class="student-list-table">' +
                    '<thead>' +
                        '<tr><th>학년</th><th>반</th><th>번호</th><th>학번</th><th>이름</th></tr>' +
                    '</thead>' +
                    '<tbody>';

                if (rows.length === 0) {
                    tableHtml += '<tr><td colspan="5" class="empty-cell-label">학생 정보가 없습니다.</td></tr>';
                } else {
                    var sortedRows = rows.map(function(row) {
                        var parts = String(row.homeroom || '').split('-');
                        return {
                            grade: parts[0] || '',
                            classNum: parts[1] || '',
                            number: row.number || '',
                            studentId: row.studentId || '',
                            name: row.name || ''
                        };
                    });
                    sortedRows.sort(function(a, b) {
                        return parseInt(a.studentId, 10) - parseInt(b.studentId, 10);
                    });
                    sortedRows.forEach(function(row) {
                        tableHtml += '<tr>' +
                            '<td>' + escapeHtml(row.grade || '-') + '</td>' +
                            '<td>' + escapeHtml(row.classNum || '-') + '</td>' +
                            '<td>' + escapeHtml(row.number || '-') + '</td>' +
                            '<td>' + escapeHtml(row.studentId || '-') + '</td>' +
                            '<td>' + escapeHtml(row.name || '-') + '</td>' +
                        '</tr>';
                    });
                }

                tableHtml += '</tbody></table>';
                bodyElement.innerHTML = tableHtml;
            }

            modal.dataset.currentListId = listId;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        }

        function closeStudentListModal() {
            const modal = document.getElementById('student-list-modal');
            if (!modal) return;
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            modal.dataset.currentListId = '';
            document.body.classList.remove('modal-open');
        }

        function downloadStudentListExcel() {
            const modal = document.getElementById('student-list-modal');
            if (!modal) return;

            const listId = modal.dataset.currentListId;
            const payload = studentListStore[listId];
            if (!payload) return;

            const rows = resolveStudentRows(payload.students);
            const exportRows = rows.map(function(row) {
                var parts = String(row.homeroom || '').split('-');
                return {
                    학년: parts[0] || '',
                    반: parts[1] || '',
                    번호: row.number || '',
                    학번: row.studentId || '',
                    이름: row.name || ''
                };
            });
            exportRows.sort(function(a, b) {
                return parseInt(a['학번'], 10) - parseInt(b['학번'], 10);
            });

            const fileBaseName = sanitizeFileName(payload.fileName || payload.title || '학생목록');

            if (window.XLSX && XLSX.utils && XLSX.writeFile) {
                const worksheet = XLSX.utils.json_to_sheet(
                    exportRows.length > 0 ? exportRows : [{ 학년: '', 반: '', 번호: '', 학번: '', 이름: '' }]
                );
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, '학생목록');
                XLSX.writeFile(workbook, fileBaseName + '.xlsx');
                return;
            }

            const csvHeader = ['순번', '학번', '반', '번호', '이름'];
            const csvRows = [csvHeader.join(',')];
            exportRows.forEach(row => {
                csvRows.push([
                    csvEscape(row.순번),
                    csvEscape(row.학번),
                    csvEscape(row.반),
                    csvEscape(row.번호),
                    csvEscape(row.이름)
                ].join(','));
            });

            if (exportRows.length === 0) {
                csvRows.push(',,,,');
            }

            const csvBlob = new Blob(['\\uFEFF' + csvRows.join('\\n')], { type: 'text/csv;charset=utf-8;' });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(csvBlob);
            downloadLink.download = fileBaseName + '.csv';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(downloadLink.href);
        }

        function cssColorToHex(color, fallback = '#92A8D1') {
            const value = String(color || '').trim();
            if (!value) return fallback;

            if (value.startsWith('#')) {
                const hex = value.slice(1);
                if (hex.length === 3) {
                    return '#' + hex.split('').map(ch => ch + ch).join('').toUpperCase();
                }
                if (hex.length === 6) {
                    return '#' + hex.toUpperCase();
                }
                return fallback;
            }

            const rgbMatch = value.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);
            if (rgbMatch) {
                const r = Math.max(0, Math.min(255, parseInt(rgbMatch[1], 10)));
                const g = Math.max(0, Math.min(255, parseInt(rgbMatch[2], 10)));
                const b = Math.max(0, Math.min(255, parseInt(rgbMatch[3], 10)));
                return '#' + [r, g, b].map(ch => ch.toString(16).padStart(2, '0')).join('').toUpperCase();
            }

            return fallback;
        }

        function toExcelRgb(color, fallback = '#92A8D1') {
            return cssColorToHex(color, fallback).replace('#', '').toUpperCase();
        }

        function getExcelThemeColors() {
            const styles = getComputedStyle(document.documentElement);
            return {
                primary: toExcelRgb(styles.getPropertyValue('--primary-color'), '#92A8D1'),
                surface: toExcelRgb(styles.getPropertyValue('--surface-soft'), '#EEF4FF'),
                headerBg: toExcelRgb(styles.getPropertyValue('--header-bg'), '#D7E3FF'),
                headerText: toExcelRgb(styles.getPropertyValue('--header-text'), '#1F2937'),
                border: toExcelRgb(styles.getPropertyValue('--border-color'), '#B7C4D6'),
                text: toExcelRgb(styles.getPropertyValue('--text-color'), '#1F2937'),
                subtle: toExcelRgb(styles.getPropertyValue('--subtle-text'), '#64748B'),
                rowAlt: toExcelRgb(styles.getPropertyValue('--row-alt'), '#F7F9FD')
            };
        }

        function getTeacherFilteredInfoByPeriod(scheduleData, day, period) {
            const periodKey = day + period;
            const classInfo = scheduleData[periodKey] || [];
            if (classInfo.length === 0) {
                return [];
            }

            let filteredInfo = classInfo;
            const hasElectives = classInfo.some(info => info.electiveClassName);
            const hasFixed = classInfo.some(info => info.homeroom && !info.electiveClassName);
            if (hasElectives && hasFixed) {
                filteredInfo = classInfo.filter(info => info.electiveClassName);
            }

            return filteredInfo;
        }

        function getTeacherMaxPeriods(scheduleData) {
            const periods = Object.keys(scheduleData || {}).map(key => {
                const match = String(key).match(/(\\d+)$/);
                return match ? parseInt(match[1], 10) : 0;
            }).filter(value => Number.isFinite(value) && value > 0);

            return periods.length > 0 ? Math.max(...periods) : 7;
        }

        function downloadTeacherScheduleExcel(teacherId) {
            const scheduleData = teacherData[teacherId] || {};
            if (!window.XLSX || !XLSX.utils || !XLSX.writeFile) {
                alert('엑셀 라이브러리를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
                return;
            }

            const days = ['월', '화', '수', '목', '금'];
            const maxPeriods = getTeacherMaxPeriods(scheduleData);
            const now = new Date();
            const generatedAt = now.getFullYear() + '-' +
                String(now.getMonth() + 1).padStart(2, '0') + '-' +
                String(now.getDate()).padStart(2, '0') + ' ' +
                String(now.getHours()).padStart(2, '0') + ':' +
                String(now.getMinutes()).padStart(2, '0');

            const rows = [];
            rows.push([teacherId + ' 선생님 시간표']);
            rows.push(['생성일: ' + generatedAt]);
            rows.push([]);
            rows.push(['교시', '월', '화', '수', '목', '금']);

            for (let period = 1; period <= maxPeriods; period++) {
                const row = [period];
                days.forEach(day => {
                    const infoList = getTeacherFilteredInfoByPeriod(scheduleData, day, period);
                    if (infoList.length === 0) {
                        row.push('공강');
                        return;
                    }

                    const cellText = infoList.map(info => {
                        const hasStudents = info.students && info.students.length > 0;
                        const subjectTitle = info.electiveClassName && hasStudents
                            ? '[' + info.electiveClassName + '] ' + info.subject
                            : info.subject;
                        const classroom = info.classroom ? ('\\n교실: ' + info.classroom) : '';
                        const students = hasStudents ? ('\\n학생: ' + info.students.length + '명') : '';
                        return subjectTitle + classroom + students;
                    }).join('\\n────────\\n');

                    row.push(cellText);
                });
                rows.push(row);
            }

            const ws = XLSX.utils.aoa_to_sheet(rows);
            ws['!merges'] = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
                { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }
            ];
            ws['!cols'] = [
                { wch: 7 },
                { wch: 22 },
                { wch: 22 },
                { wch: 22 },
                { wch: 22 },
                { wch: 22 }
            ];

            const rowHeights = [
                { hpt: 30 },
                { hpt: 18 },
                { hpt: 8 },
                { hpt: 22 }
            ];
            for (let i = 0; i < maxPeriods; i++) {
                rowHeights.push({ hpt: 62 });
            }
            ws['!rows'] = rowHeights;

            const theme = getExcelThemeColors();
            const borderAll = {
                top: { style: 'thin', color: { rgb: theme.border } },
                bottom: { style: 'thin', color: { rgb: theme.border } },
                left: { style: 'thin', color: { rgb: theme.border } },
                right: { style: 'thin', color: { rgb: theme.border } }
            };

            const titleStyle = {
                font: { bold: true, sz: 16, color: { rgb: theme.primary }, name: '맑은 고딕' },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { patternType: 'solid', fgColor: { rgb: theme.surface } },
                border: borderAll
            };
            const metaStyle = {
                font: { sz: 10, color: { rgb: theme.subtle }, name: '맑은 고딕' },
                alignment: { horizontal: 'left', vertical: 'center' }
            };
            const headerStyle = {
                font: { bold: true, sz: 11, color: { rgb: theme.headerText }, name: '맑은 고딕' },
                fill: { patternType: 'solid', fgColor: { rgb: theme.headerBg } },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: borderAll
            };
            const periodStyle = {
                font: { bold: true, sz: 11, color: { rgb: theme.text }, name: '맑은 고딕' },
                fill: { patternType: 'solid', fgColor: { rgb: theme.surface } },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: borderAll
            };
            const dataBaseStyle = {
                font: { sz: 10, color: { rgb: theme.text }, name: '맑은 고딕' },
                alignment: { horizontal: 'center', vertical: 'top', wrapText: true },
                border: borderAll
            };
            const altFillStyle = {
                patternType: 'solid',
                fgColor: { rgb: theme.rowAlt }
            };

            const range = XLSX.utils.decode_range(ws['!ref']);
            for (let r = 0; r <= range.e.r; r++) {
                for (let c = 0; c <= range.e.c; c++) {
                    const cellRef = XLSX.utils.encode_cell({ r, c });
                    if (!ws[cellRef]) continue;

                    if (r === 0) {
                        ws[cellRef].s = titleStyle;
                    } else if (r === 1) {
                        ws[cellRef].s = metaStyle;
                    } else if (r === 3) {
                        ws[cellRef].s = headerStyle;
                    } else if (r >= 4 && c === 0) {
                        ws[cellRef].s = periodStyle;
                    } else if (r >= 4) {
                        const isAltRow = (r - 4) % 2 === 1;
                        ws[cellRef].s = isAltRow
                            ? { ...dataBaseStyle, fill: altFillStyle }
                            : dataBaseStyle;
                    }
                }
            }

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, ws, '선생님시간표');

            const fileName = sanitizeFileName(teacherId + '_선생님_시간표') + '.xlsx';
            XLSX.writeFile(workbook, fileName, { compression: true });
        }
        

        function init() {
            console.log('[INIT] Initializing timetable system...');
            console.log('[INIT] Features check at init:', enabledFeatures);
            
            // DOM이 준비될 때까지 기다림
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    console.log('[INIT] DOM loaded, starting setup...');
                    performInit();
                });
            } else {
                console.log('[INIT] DOM already loaded, starting setup...');
                performInit();
            }
        }
        
        function performInit() {
            try {
                setupTabs();
                updateSearchSection();
                showEmptyState();
                setupModalEventListeners();
                console.log('[INIT] Initialization completed successfully');
            } catch (error) {
                console.error('[INIT] Initialization failed:', error);
                // 오류 발생시 기본 탭이라도 보여주기
                const tabNavigation = document.querySelector('.tab-navigation');
                if (tabNavigation) {
                    tabNavigation.innerHTML = '' +
                        '<button class="tab-button active" data-mode="student"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>학생별</button>' +
                        '<button class="tab-button" data-mode="class"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>반별</button>' +
                        '<button class="tab-button" data-mode="classroom"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>교실별</button>' +
                        '<button class="tab-button" data-mode="teacher"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>선생님별</button>';
                    currentMode = 'student';  
                    setupBasicEventListeners();
                }
            }
        }

        function setupModalEventListeners() {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    closeStudentListModal();
                }
            });
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
            
            // SVG 아이콘 정의
            const tabIcons = {
                student: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
                class: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
                classroom: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
                teacher: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
            };
            const tabLabels = {student: '학생별', class: '반별', classroom: '교실별', teacher: '선생님별'};

            if (!hasAnyFeature) {
                console.warn('[TABS] No features enabled, using defaults');
                safeFeatures.student = true;
                safeFeatures.class = true;
                safeFeatures.classroom = true;
                safeFeatures.teacher = true;
            }

            if (safeFeatures.student) {
                availableModes.push('student');
                tabsHtml.push('<button class="tab-button" data-mode="student">' + tabIcons.student + tabLabels.student + '</button>');
                console.log('[TABS] Student tab added');
            }
            if (safeFeatures.class) {
                availableModes.push('class');
                tabsHtml.push('<button class="tab-button" data-mode="class">' + tabIcons.class + tabLabels.class + '</button>');
                console.log('[TABS] Class tab added');
            }
            if (safeFeatures.classroom) {
                availableModes.push('classroom');
                tabsHtml.push('<button class="tab-button" data-mode="classroom">' + tabIcons.classroom + tabLabels.classroom + '</button>');
                console.log('[TABS] Classroom tab added');
            }
            if (safeFeatures.teacher) {
                availableModes.push('teacher');
                tabsHtml.push('<button class="tab-button" data-mode="teacher">' + tabIcons.teacher + tabLabels.teacher + '</button>');
                console.log('[TABS] Teacher tab added');
            }

            const tabNavigation = document.querySelector('.tab-navigation');

            if (availableModes.length === 0) {
                console.error('[TABS] No features enabled after safety check!');
                tabNavigation.innerHTML = '<div style="text-align: center; padding: 20px; color: #999;">선택된 조회 기능이 없습니다.</div>';
                return;
            }
            
            // 첫 번째 사용 가능한 모드를 기본값으로 설정
            currentMode = availableModes[0];
            console.log('[TABS] Current mode set to:', currentMode);
            
            tabNavigation.innerHTML = tabsHtml.join('');
            console.log('[TABS] Generated tabs:', tabsHtml.length);
            
            // 첫 번째 탭을 활성화
            const firstTab = document.querySelector('.tab-button');
            if (firstTab) {
                firstTab.classList.add('active');
                console.log('[TABS] First tab activated:', firstTab.dataset.mode);
            }
            
            // 탭 클릭 이벤트
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.addEventListener('click', () => {
                    console.log('[TABS] Tab clicked:', btn.dataset.mode);
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
            closeStudentListModal();
            removeTeacherSidebar();

            // 교사 탭이 아닌 경우 search-section 다시 표시
            if (currentMode !== 'teacher') {
                searchSection.style.display = '';
            }

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
                // 선생님별 탭: 사이드바 레이아웃 (search-section은 숨기고, 사이드바로 대체)
                searchSection.style.display = 'none';
                buildTeacherSidebar();
            }
            
            // 검색창이 있는 탭에서 이벤트 리스너 재설정
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
            
            autocompleteDropdown.innerHTML = filteredData.map(item => {
                const icon = '';
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
            clearStudentListStore();
            
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
                        tableHTML += '<td class="empty-cell"></td>';
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
            clearStudentListStore();
            
            const days = ['월', '화', '수', '목', '금'];
            const maxPeriods = Math.max(...students.map(s => s.maxPeriods));
            
            let html = '<div class="schedule-header">' +
                    '<div class="schedule-info">' +
                        '<h2>' + classId + '반 시간표 <small>(총 ' + students.length + '명)</small></h2>' +
                    '</div>' +
                    '<div class="schedule-actions">' +
                        '<button class="action-btn" id="pocket-toggle" onclick="togglePocketSize()">' +
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
                            html += '<td class="empty-cell"></td>';
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
            closeStudentListModal();
            clearStudentListStore();
            
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
                        const hasElectives = usageInfo.some(info => info.electiveClassName);
                        const hasFixed = usageInfo.some(info => info.homeroom && !info.electiveClassName);

                        // 선택수업이 있으면 고정수업은 제외
                        if (hasElectives && hasFixed) {
                            filteredInfo = usageInfo.filter(info => info.electiveClassName);
                        }

                        const content = filteredInfo.map(info => {
                            const isElective = !!info.electiveClassName;
                            const hasStudents = isElective && info.students && info.students.length > 0;
                            
                            let detailsHtml = '<div class="details details-with-list-slot">' +
                                            '<span class="teacher-name">' + info.teacher + '</span>' +
                                            '<div class="student-list-slot">';
                            
                            // 학생이 있는 경우에만 학생목록 버튼 표시
                            if (hasStudents) {
                                const listId = registerStudentList({
                                    title: classroomId + ' 교실 · ' + periodKey + ' · ' + info.subject,
                                    fileName: classroomId + '_' + periodKey + '_' + info.subject + '_학생목록',
                                    students: info.students
                                });
                                detailsHtml += '<button class="student-list-btn" onclick="openStudentListModal(\\'' + listId + '\\')">학생목록</button>';
                            } else {
                                detailsHtml += '<span class="student-list-placeholder" aria-hidden="true"></span>';
                            }
                            
                            detailsHtml += '</div></div>';
                            
                            return '<div class="subject-name">' + info.subject + '</div>' + detailsHtml;
                        }).join('<hr class="entry-divider">');
                        html += '<td>' + content + '</td>';
                    } else {
                        html += '<td class="empty-cell"><span class="empty-cell-label">비어있음</span></td>';
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
            closeStudentListModal();
            clearStudentListStore();
            
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
                        '<button class="action-btn" onclick="downloadTeacherScheduleExcel(\\'' + teacherId + '\\')">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>' +
                                '<polyline points="7 10 12 15 17 10"></polyline>' +
                                '<line x1="12" y1="15" x2="12" y2="3"></line>' +
                            '</svg> ' +
                            '엑셀 다운로드' +
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
                        const hasElectives = classInfo.some(info => info.electiveClassName);
                        const hasFixed = classInfo.some(info => info.homeroom && !info.electiveClassName);

                        // 선택수업이 있으면 고정수업은 제외
                        if (hasElectives && hasFixed) {
                            filteredInfo = classInfo.filter(info => info.electiveClassName);
                        }

                        const content = filteredInfo.map(info => {
                            const isElective = !!info.electiveClassName;
                            const hasStudents = isElective && info.students && info.students.length > 0;
                            
                            let detailsHtml = '<div class="details details-with-list-slot">' +
                                            '<span class="location-chip">' + info.classroom + '</span>' +
                                            '<div class="student-list-slot">';
                            
                            // 학생이 있는 경우에만 학생목록 표시
                            if (hasStudents) {
                                const listId = registerStudentList({
                                    title: teacherId + ' 선생님 · ' + periodKey + ' · ' + info.subject,
                                    fileName: teacherId + '_' + periodKey + '_' + info.subject + '_학생목록',
                                    students: info.students
                                });
                                detailsHtml += '<button class="student-list-btn" onclick="openStudentListModal(\\'' + listId + '\\')">학생목록</button>';
                            } else {
                                detailsHtml += '<span class="student-list-placeholder" aria-hidden="true"></span>';
                            }
                            
                            detailsHtml += '</div></div>';
                            
                            // 선택과목의 경우 반명을 원형으로 표시
                            let subjectDisplayHtml = '';
                            if (info.electiveClassName && hasStudents) {
                                subjectDisplayHtml = '<div class="elective-subject-line">' +
                                    '<span class="elective-class-badge">' + info.electiveClassName + '</span>' +
                                    '<div class="subject-name">' + info.subject + '</div>' +
                                '</div>';
                            } else {
                                subjectDisplayHtml = '<div class="subject-name">' + info.subject + '</div>';
                            }
                            
                            return subjectDisplayHtml + detailsHtml;
                        }).join('<hr class="entry-divider">');
                        html += '<td>' + content + '</td>';
                    } else {
                        html += '<td class="empty-cell"><span class="empty-cell-label">공강</span></td>';
                    }
                });
                html += '</tr>';
            }
            
            html += '</tbody></table></div>';
            // 사이드바 모드면 메인 콘텐츠 영역에 렌더링
            const targetContainer = document.getElementById('teacher-main-content') || scheduleContainer;
            targetContainer.innerHTML = html;
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
                periodStructure = calculatePeriodStructure(totalCells, weeklyData);
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
                        
                        // 고정수업인지 확인 (elective-class-name 태그가 없는 경우)
                        if (content && !content.includes('<span class="elective-class-name"')) {
                            // subject-name div가 있으면 HTML에서 과목명 추출, 없으면 plain text
                            let subject = '';
                            const subjectTagStart = content.indexOf('<div class="subject-name">');
                            if (subjectTagStart !== -1) {
                                const subjectTagEnd = content.indexOf('</div>', subjectTagStart);
                                if (subjectTagEnd !== -1) {
                                    subject = content.substring(subjectTagStart + 26, subjectTagEnd).trim();
                                }
                            } else {
                                subject = content.trim();
                            }
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

                        // 선택과목인지 확인 (elective-class-name 태그가 있는 경우)
                        else if (content && content.includes('<span class="elective-class-name"')) {
                            let classroom = '';
                            let subject = '';
                            let teacher = '';
                            let electiveClassName = '';
                            
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
                            
                            // 선택과목 반명 정보 추출
                            const electiveClassNameStart = content.indexOf('<span class="elective-class-name"');
                            if (electiveClassNameStart !== -1) {
                                const electiveClassNameContentStart = content.indexOf('>', electiveClassNameStart) + 1;
                                const electiveClassNameEnd = content.indexOf('</span>', electiveClassNameContentStart);
                                if (electiveClassNameContentStart > 0 && electiveClassNameEnd !== -1) {
                                    electiveClassName = content.substring(electiveClassNameContentStart, electiveClassNameEnd);
                                }
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
                        
                        // 고정수업인지 확인 (elective-class-name 태그가 없는 경우)
                        if (content && !content.includes('<span class="elective-class-name"')) {
                            // subject-name div가 있으면 HTML에서 과목명 추출, 없으면 plain text
                            let subject = '';
                            const subjectTagStart = content.indexOf('<div class="subject-name">');
                            if (subjectTagStart !== -1) {
                                const subjectTagEnd = content.indexOf('</div>', subjectTagStart);
                                if (subjectTagEnd !== -1) {
                                    subject = content.substring(subjectTagStart + 26, subjectTagEnd).trim();
                                }
                            } else {
                                subject = content.trim();
                            }
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

                        // 선택과목인지 확인 (elective-class-name 태그가 있는 경우)
                        else if (content && content.includes('<span class="elective-class-name"')) {
                            let classroom = '';
                            let subject = '';
                            let teacher = '';
                            let electiveClassName = '';
                            
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
                            
                            // 선택과목 반명 정보 추출
                            const electiveClassNameStart = content.indexOf('<span class="elective-class-name"');
                            if (electiveClassNameStart !== -1) {
                                const electiveClassNameContentStart = content.indexOf('>', electiveClassNameStart) + 1;
                                const electiveClassNameEnd = content.indexOf('</span>', electiveClassNameContentStart);
                                if (electiveClassNameContentStart > 0 && electiveClassNameEnd !== -1) {
                                    electiveClassName = content.substring(electiveClassNameContentStart, electiveClassNameEnd);
                                }
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
                                
                                // 같은 과목과 교실의 수업 찾기 (반명도 비교)
                                let existingClass = teacherData[normalizedTeacher][periodKey].find(
                                    item => item.subject === subject && item.classroom === classroom && item.electiveClassName === electiveClassName
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
                                        electiveClassName: electiveClassName,
                                        students: [student.name]
                                    });
                                    console.log('[TEACHER_ELECTIVE] Added elective class:', subject, 'for teacher', normalizedTeacher, 'in', classroom, 'class:', electiveClassName);
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
                const periodStructure = calculatePeriodStructure(totalCells, weeklyData);
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
                periodStructure = calculatePeriodStructure(totalCells, weeklyData);
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
        
        function calculatePeriodStructure(totalCells, weeklyRaw = null) {
            // 실제 엑셀 데이터가 있다면 2행과 3행을 분석해서 정확한 교시 구조를 파악
            if (weeklyRaw && weeklyRaw.length >= 3) {
                try {
                    const daysInOrder = ['월', '화', '수', '목', '금'];
                    const row2 = weeklyRaw[1] || []; // 2행 (0-indexed이므로 index 1)
                    const row3 = weeklyRaw[2] || []; // 3행 (0-indexed이므로 index 2)
                    
                    // 2행에서 요일 시작 위치 찾기
                    const dayStartCols = {};
                    for (let col = 0; col < row2.length; col++) {
                        const cellValue = row2[col];
                        if (cellValue && daysInOrder.includes(String(cellValue).trim())) {
                            dayStartCols[String(cellValue).trim()] = col;
                        }
                    }
                    
                    console.log('감지된 요일 시작 위치:', dayStartCols);
                    
                    // 각 요일별 교시 수 계산
                    const periodCounts = [];
                    for (let i = 0; i < daysInOrder.length; i++) {
                        const currentDay = daysInOrder[i];
                        if (currentDay in dayStartCols) {
                            const startCol = dayStartCols[currentDay];
                            let endCol;
                            
                            // 다음 요일 찾기
                            if (i < daysInOrder.length - 1) {
                                const nextDay = daysInOrder[i + 1];
                                if (nextDay in dayStartCols) {
                                    endCol = dayStartCols[nextDay] - 1;
                                } else {
                                    // 다음 요일이 없으면 전체 길이에서 1을 뺀 값
                                    endCol = row2.length - 1;
                                }
                            } else {
                                // 마지막 요일인 경우
                                endCol = row2.length - 1;
                            }
                            
                            const periodCount = endCol - startCol + 1;
                            periodCounts.push(periodCount);
                            console.log(currentDay + '요일: 열 ' + startCol + '~' + endCol + ' = ' + periodCount + '교시');
                        } else {
                            periodCounts.push(0);
                        }
                    }
                    
                    const totalCalculated = periodCounts.reduce((a, b) => a + b, 0);
                    console.log('계산된 교시 패턴:', periodCounts, '총합:', totalCalculated);
                    
                    // 계산된 총합이 실제 데이터 길이와 일치하거나 비슷하면 사용
                    if (totalCalculated > 0 && Math.abs(totalCalculated - totalCells) <= 2) {
                        return {
                            periodCounts: periodCounts,
                            maxPeriods: Math.max(...periodCounts)
                        };
                    }
                } catch (error) {
                    console.warn('엑셀 헤더 분석 중 오류:', error);
                }
            }
            
            // 기존 로직: 미리 정의된 패턴 사용
            const commonPatterns = [
                [7, 7, 6, 7, 6], // 새로운 패턴 추가
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
                            
                            let electiveClassName = '';

                            // 선택과목 처리 (elective-class-name 태그가 있는 경우)
                            if (content.includes('<span class="elective-class-name"')) {
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

                                // 선택반명 추출
                                const electiveStart = content.indexOf('<span class="elective-class-name"');
                                const electiveContentStart = content.indexOf('>', electiveStart) + 1;
                                const electiveEnd = content.indexOf('</span>', electiveContentStart);
                                if (electiveContentStart > 0 && electiveEnd !== -1) {
                                    electiveClassName = content.substring(electiveContentStart, electiveEnd);
                                }
                            } else {
                                // 고정수업 처리 (elective-class-name 태그가 없는 경우)
                                let plainText = '';
                                const subjectTagStart = content.indexOf('<div class="subject-name">');
                                if (subjectTagStart !== -1) {
                                    const subjectTagEnd = content.indexOf('</div>', subjectTagStart);
                                    if (subjectTagEnd !== -1) {
                                        plainText = content.substring(subjectTagStart + 26, subjectTagEnd).trim();
                                    }
                                } else {
                                    plainText = content.trim();
                                }
                                if (plainText && plainText !== '' && plainText !== '자습' && plainText !== '공강') {
                                    subject = plainText;
                                    // 고정수업의 경우 반별 교실 사용 (정규화 적용)
                                    classroom = normalizeClassroomName(student.homeroom);
                                    // 교사 정보가 HTML에 있으면 추출, 없으면 기본값
                                    const teacherStart = content.indexOf('<span class="teacher-name">');
                                    const teacherEnd = content.indexOf('</span>', teacherStart);
                                    if (teacherStart !== -1 && teacherEnd !== -1) {
                                        teacher = content.substring(teacherStart + 27, teacherEnd);
                                    } else {
                                        teacher = '담임'; // 기본값
                                    }
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
                                let existing;
                                if (electiveClassName) {
                                    existing = classroomData[classroom][periodKey].find(
                                        item => item.subject === subject && item.teacher === teacher && item.electiveClassName === electiveClassName
                                    );
                                } else {
                                    existing = classroomData[classroom][periodKey].find(
                                        item => item.subject === subject && item.teacher === teacher && !item.electiveClassName
                                    );
                                }

                                if (existing) {
                                    if (!existing.students.includes(student.name)) {
                                        existing.students.push(student.name);
                                    }
                                } else {
                                    const entry = {
                                        subject: subject,
                                        teacher: teacher,
                                        students: [student.name]
                                    };
                                    if (electiveClassName) {
                                        entry.electiveClassName = electiveClassName;
                                    } else {
                                        entry.homeroom = student.homeroom;
                                    }
                                    classroomData[classroom][periodKey].push(entry);
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
                            let electiveClassName = '';

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

                            // 선택반명 추출 (선택과목 여부 판별)
                            const electiveStart = content.indexOf('<span class="elective-class-name"');
                            if (electiveStart !== -1) {
                                const electiveContentStart = content.indexOf('>', electiveStart) + 1;
                                const electiveEnd = content.indexOf('</span>', electiveContentStart);
                                if (electiveContentStart > 0 && electiveEnd !== -1) {
                                    electiveClassName = content.substring(electiveContentStart, electiveEnd);
                                }
                            }

                            if (teacher && subject) {
                                const periodKey = day + (i + 1);

                                if (!teacherData[teacher]) {
                                    teacherData[teacher] = {};
                                }
                                if (!teacherData[teacher][periodKey]) {
                                    teacherData[teacher][periodKey] = [];
                                }

                                // 선택과목이면 electiveClassName+classroom으로 중복 체크
                                // 고정과목이면 subject+classroom으로 중복 체크
                                let existing;
                                if (electiveClassName) {
                                    existing = teacherData[teacher][periodKey].find(
                                        item => item.subject === subject && item.classroom === classroom && item.electiveClassName === electiveClassName
                                    );
                                } else {
                                    existing = teacherData[teacher][periodKey].find(
                                        item => item.subject === subject && item.classroom === classroom && !item.electiveClassName
                                    );
                                }

                                if (existing) {
                                    if (!existing.students.includes(student.name)) {
                                        existing.students.push(student.name);
                                    }
                                } else {
                                    const entry = {
                                        subject: subject,
                                        classroom: classroom,
                                        students: [student.name]
                                    };
                                    if (electiveClassName) {
                                        entry.electiveClassName = electiveClassName;
                                    } else {
                                        // 고정수업: 교실이 없으면 homeroom 사용
                                        if (!classroom) {
                                            entry.classroom = student.homeroom;
                                        }
                                        entry.homeroom = student.homeroom;
                                    }
                                    teacherData[teacher][periodKey].push(entry);
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

        // 교사 사이드바 구축
        let activeTeacherId = '';

        function buildTeacherSidebar() {
            removeTeacherSidebar();

            const teacherList = Object.keys(teacherData).sort();
            const container = document.getElementById('schedule-container');

            // 사이드바 + 메인 콘텐츠 레이아웃 생성
            const layout = document.createElement('div');
            layout.className = 'teacher-layout';
            layout.id = 'teacher-layout';

            // 즐겨찾기와 전체 목록 분리
            const favTeachers = teacherList.filter(t => teacherFavorites.includes(t));
            const otherTeachers = teacherList.filter(t => !teacherFavorites.includes(t));

            let listHtml = '';

            if (favTeachers.length > 0) {
                listHtml += '<div class="sidebar-section-label"><span>즐겨찾기</span><button class="sidebar-fav-clear" onclick="clearTeacherFavorites();" title="즐겨찾기 초기화"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>초기화</button></div>';
                favTeachers.forEach(t => {
                    listHtml += '<button class="teacher-sidebar-item" data-teacher="' + t + '">' +
                        '<span class="sidebar-fav-dot"></span>' + t +
                        '</button>';
                });
                listHtml += '<div class="sidebar-divider"></div>';
            }

            listHtml += '<div class="sidebar-section-label">전체 (' + teacherList.length + ')</div>';
            otherTeachers.forEach(t => {
                listHtml += '<button class="teacher-sidebar-item" data-teacher="' + t + '">' + t + '</button>';
            });

            layout.innerHTML = '' +
                '<div class="teacher-sidebar" id="teacher-sidebar">' +
                    '<div class="teacher-sidebar-header">' +
                        '<div class="teacher-sidebar-search">' +
                            '<span class="sidebar-search-icon">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
                            '</span>' +
                            '<input type="text" id="teacher-sidebar-filter" placeholder="이름 검색...">' +
                        '</div>' +
                    '</div>' +
                    '<div class="teacher-sidebar-list" id="teacher-sidebar-list">' +
                        listHtml +
                    '</div>' +
                '</div>' +
                '<div class="teacher-main-content" id="teacher-main-content">' +
                    '<div class="empty-state"><div class="empty-state-icon">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' +
                    '</div><h3>선생님을 선택하세요</h3></div>' +
                '</div>';

            container.innerHTML = '';
            container.appendChild(layout);

            setupTeacherSidebarEvents();
        }

        function removeTeacherSidebar() {
            const layout = document.getElementById('teacher-layout');
            if (layout) layout.remove();
            activeTeacherId = '';
        }

        function setupTeacherSidebarEvents() {
            const filterInput = document.getElementById('teacher-sidebar-filter');
            const listContainer = document.getElementById('teacher-sidebar-list');
            if (!filterInput || !listContainer) return;

            // 클릭 이벤트
            listContainer.addEventListener('click', function(e) {
                const item = e.target.closest('.teacher-sidebar-item');
                if (!item) return;
                const teacherName = item.dataset.teacher;
                selectTeacherFromSidebar(teacherName);
            });

            // 필터 이벤트
            filterInput.addEventListener('input', function() {
                const query = this.value.trim().toLowerCase();
                const items = listContainer.querySelectorAll('.teacher-sidebar-item');
                const labels = listContainer.querySelectorAll('.sidebar-section-label');
                const dividers = listContainer.querySelectorAll('.sidebar-divider');
                let visibleCount = 0;

                items.forEach(item => {
                    const name = item.dataset.teacher.toLowerCase();
                    const show = !query || name.includes(query);
                    item.style.display = show ? '' : 'none';
                    if (show) visibleCount++;
                });

                // 필터 중일 때 섹션 라벨/구분선 숨김
                const isFiltering = query.length > 0;
                labels.forEach(l => l.style.display = isFiltering ? 'none' : '');
                dividers.forEach(d => d.style.display = isFiltering ? 'none' : '');

                // 검색 결과 없음
                let noResult = listContainer.querySelector('.sidebar-no-result');
                if (visibleCount === 0) {
                    if (!noResult) {
                        noResult = document.createElement('div');
                        noResult.className = 'sidebar-no-result';
                        noResult.textContent = '검색 결과 없음';
                        listContainer.appendChild(noResult);
                    }
                } else if (noResult) {
                    noResult.remove();
                }
            });

            // Enter 키로 첫 번째 결과 선택
            filterInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const firstVisible = listContainer.querySelector('.teacher-sidebar-item:not([style*="display: none"])');
                    if (firstVisible) {
                        selectTeacherFromSidebar(firstVisible.dataset.teacher);
                    }
                }
            });
        }

        function selectTeacherFromSidebar(teacherName) {
            activeTeacherId = teacherName;

            // 활성 상태 업데이트
            const listContainer = document.getElementById('teacher-sidebar-list');
            if (listContainer) {
                listContainer.querySelectorAll('.teacher-sidebar-item').forEach(item => {
                    item.classList.toggle('active', item.dataset.teacher === teacherName);
                });
            }

            // 시간표 표시 (displayTeacherSchedule이 자동으로 teacher-main-content에 렌더링)
            displayTeacherSchedule(teacherName);
        }

        function refreshTeacherSidebar() {
            if (currentMode === 'teacher' && document.getElementById('teacher-sidebar')) {
                const savedTeacher = activeTeacherId;
                buildTeacherSidebar();
                if (savedTeacher && teacherData[savedTeacher]) {
                    selectTeacherFromSidebar(savedTeacher);
                }
            }
        }

        function showEmptyState() {
            const svgIcons = {
                student: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
                class: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
                classroom: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
                teacher: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
            };
            const defaultIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
            const labels = {student: '학생 이름을 검색하세요', class: '반을 선택하세요', classroom: '교실을 선택하세요', teacher: '선생님을 선택하세요'};
            const icon = svgIcons[currentMode] || defaultIcon;
            const label = labels[currentMode] || '선택하세요';

            if (currentMode === 'teacher') {
                // 교사 탭은 사이드바에서 처리
                return;
            }
            scheduleContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">' + icon + '</div><h3>' + label + '</h3></div>';
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
                    teacher + ' 선생님' +
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
            if (document.getElementById('teacher-sidebar')) {
                selectTeacherFromSidebar(teacherName);
            } else {
                clearTeacherSearch();
                displayTeacherSchedule(teacherName);
            }
        }
        
        function clearTeacherSearch() {
            const searchInput = document.getElementById('search-input');
            const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
            if (searchInput) searchInput.value = '';
            if (autocompleteDropdown) autocompleteDropdown.style.display = 'none';
        }
        
        // 선생님 즐겨찾기 관리
        let teacherFavorites = JSON.parse(localStorage.getItem('favTeachers') || '[]');

        function clearTeacherFavorites() {
            teacherFavorites = [];
            localStorage.setItem('favTeachers', JSON.stringify(teacherFavorites));
            refreshTeacherSidebar();
        }
        
        function toggleTeacherFavorite(teacherName) {
            const index = teacherFavorites.indexOf(teacherName);
            if (index > -1) {
                teacherFavorites.splice(index, 1);
            } else {
                teacherFavorites.unshift(teacherName);
                if (teacherFavorites.length > 10) {
                    teacherFavorites = teacherFavorites.slice(0, 10);
                }
            }
            localStorage.setItem('favTeachers', JSON.stringify(teacherFavorites));
            // 사이드바가 있으면 갱신, 없으면 기존 방식
            if (document.getElementById('teacher-sidebar')) {
                refreshTeacherSidebar();
            } else {
                updateTeacherFavoriteChips();
                displayTeacherSchedule(teacherName);
            }
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js"></script>
    <style>
        ${generateTimetableCSS(selectedTheme)}
    </style>
</head>
<body>
    <div id="app-container">
        <h1>
            ${iconBase64 ? `<img src="${iconBase64}" alt="logo" class="title-icon">` : ''}
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

    <div id="student-list-modal" class="student-list-modal" aria-hidden="true">
        <div class="student-list-modal-backdrop" onclick="closeStudentListModal()"></div>
        <div class="student-list-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="student-list-modal-title">
            <div class="student-list-modal-header">
                <div>
                    <h3 id="student-list-modal-title">학생 목록</h3>
                    <div id="student-list-modal-meta">총 0명</div>
                </div>
                <button type="button" class="modal-close-btn" onclick="closeStudentListModal()" aria-label="닫기">×</button>
            </div>
            <div id="student-list-modal-body" class="student-list-modal-body"></div>
            <div class="student-list-modal-footer">
                <button type="button" class="modal-secondary-btn" onclick="closeStudentListModal()">닫기</button>
                <button type="button" class="modal-primary-btn" onclick="downloadStudentListExcel()">엑셀 다운로드</button>
            </div>
        </div>
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
