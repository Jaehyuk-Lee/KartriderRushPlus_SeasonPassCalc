const LOCALIZE = {
    enterFields: {
        ko: '항목을 모두 입력하세요.',
        en: 'Please enter all fields.',
    },
    possibleAchieve: {
        ko: '목표 달성이 가능합니다.',
        en: 'Possible to achieve your goal.',
    },
    impossibleAchieve: {
        ko: '목표 달성이 불가능합니다.',
        en: 'Impossible to achieve your goal.',
    },
    notSupportedYet: {
        ko: '아직 이번 시즌 대응 업데이트를 하지 않았습니다.',
        en: 'Not yet updated for latest season pass.',
    }
}

const SEASON_DATA = {
    S1 : {
        START: new Date('2020-05-12T00:00:00Z'),
        END: new Date('2020-07-16T23:59:59Z'),
    },
    S2 : {
        START: undefined,
        END: undefined,
    },

    // ADD NEW SEASON INFORMATION TO WORK PROPERLY
}

let nowSeasonNumber = 1; // JUST CHANGE THIS FOR NEW SEASON
let nowSeason = 'S' + nowSeasonNumber;
let seasonStart = SEASON_DATA[nowSeason].START;
let seasonEnd = SEASON_DATA[nowSeason].END;


function initSeasonInformation() {
    document.getElementById("seasonNumber").innerText = nowSeasonNumber;
    if (seasonEnd < new Date() || seasonEnd == undefined){
        alert(LOCALIZE.notSupportedYet[lang]);
        document.getElementById("passPeriod").innerText = '-';
        document.getElementById("remainDate").innerText = '-';
    }
    else {
        document.getElementById("passPeriod").innerText = dateObjToDateStr(seasonStart) + ' ~ ' + dateObjToDateStr(seasonEnd);
        document.getElementById("remainDate").innerText = findRemainingDates();
    }
}

function refreshRemainingDates() {
    document.getElementById("remainDate").innerText = findRemainingDates();
}

function findRemainingDates() {
    const timezone = parseInt(document.getElementById("time-zone").value);
    let baseDate = new Date(seasonEnd.getTime());
    baseDate.setHours(seasonEnd.getHours() + timezone);
    return Math.floor((new Date(baseDate) - new Date()) / 1000 / 60 / 60 / 24);
}

function toggleWeeklyQuest(object) {
    if (object.checked)
        document.getElementById("weeklyQuest").classList.remove('display-none');
    else
        document.getElementById("weeklyQuest").classList.add('display-none');
}

function calculate() {
    if (!document.getElementById("targetLevel").value || !document.getElementById("remainPoint").value) {
        alert(LOCALIZE.enterFields[lang]);
        return;
    }

    let b_RoyalPass = document.getElementById("royalPass").checked;

    // toggle royalPass information
    for (let i = 0; i < document.getElementsByClassName("royal").length; i++) {
        if (b_RoyalPass)
            document.getElementsByClassName("royal")[i].classList.remove('display-none');
        else
            document.getElementsByClassName("royal")[i].classList.add('display-none');
    }

    let remainingDate = findRemainingDates();
    let targetLevel = parseInt(document.getElementById("targetLevel").value || 1);
    let remainPoint = parseInt(document.getElementById("remainPoint").value || 0);
    let nowLevel = parseInt(document.getElementById("nowLevel").value || 1);

    let needPoint = (targetLevel - nowLevel - 1) * 100 + remainPoint;
    document.getElementById("needPoint").innerText = needPoint;
    document.getElementById("needPointPerDay").innerText = Math.ceil(needPoint / remainingDate);

    let dailyPoint = b_RoyalPass ? 195 : 180;
    if (!document.getElementById('friendQuest').checked) {
        dailyPoint -= b_RoyalPass ? 11 : 10;
    }
    let clearedWeekly = parseInt(document.getElementById("clearedWeeklyQuest").value || 0);
    let needDay = Math.ceil(needPoint / dailyPoint);
    let needDay_clearWeekly = Math.ceil((needPoint - (9 - clearedWeekly) * 750) / dailyPoint);

    document.getElementById("needDay").innerText = needDay;
    document.getElementById("needDay-clearWeekly").innerText = needDay_clearWeekly;
    document.getElementById("needPointPerDay-clearWeekly").innerText = Math.ceil((needPoint - (9 - clearedWeekly) * 750) / remainingDate);
    let possibleLevel;
    if (b_RoyalPass)
        possibleLevel = (remainingDate * dailyPoint - remainPoint + (9 - clearedWeekly) * 750) / 100 + 1 + nowLevel;
    else
        possibleLevel = (remainingDate * dailyPoint - remainPoint) / 100 + 1 + nowLevel;
    document.getElementById("possibleLevel").innerText = Math.floor(possibleLevel);

    if (b_RoyalPass && needDay_clearWeekly < remainingDate || !b_RoyalPass && needDay < remainingDate)
        document.getElementById("possibleOrNot").innerText = LOCALIZE.possibleAchieve[lang];
    else
        document.getElementById("possibleOrNot").innerText = LOCALIZE.impossibleAchieve[lang];
}