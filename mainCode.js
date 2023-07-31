let gameData;           // Latest game info from game:update_state event
let boostCircleElem;    // Element for the target boost circle
let boostCircleCircum;  // Circumference of the target boost circle

document.addEventListener("DOMContentLoaded", function() {
    boostMeterSetup();
    wsInit();
});

function boostMeterSetup() {
    boostCircleElem = document.getElementById('boost-ring-circle');
    boostCircleCircum = boostCircleElem.r.baseVal.value * 2 * Math.PI;

    boostCircleElem.style.strokeDasharray = `${boostCircleCircum} ${boostCircleCircum}`;
    boostCircleElem.style.strokeDashoffset = `${boostCircleCircum}`;
}

function teamInfoFill() {
    if (gameData !== undefined) {
        // Colors
        document.getElementsByClassName("left-name")[0].bgColor = gameData['game']['teams'][0]['color_primary'];
        document.getElementsByClassName("right-name")[0].bgColor = gameData['game']['teams'][1]['color_primary'];

        // Names
        $(".teams .left-name").text(gameData['game']['teams'][0]['name']);
        $(".teams .right-name").text(gameData['game']['teams'][1]['name']);
    }
}

function playerInfoFill(team, player) {
    const playerNum = player.id.at(-1);
    const playerClassName = "." + team + "Players ." + team + playerNum + " ." + team + "Name";
    const playerClassBoost = "." + team + "Players ." + team + playerNum + " ." + team + "Boost";

    $(playerClassName).text(player.name);
    $(playerClassBoost).text(player.boost);
}

function targetInfoFill () {
    const targetPlayer = Object.values(gameData.players).filter(p => p.id === gameData['game']['target'])[0];

    let tName = $(".target-info .t-name");
    tName.text(targetPlayer.name);
    tName.css("background-color", "#" + gameData.game.teams[targetPlayer.team].color_primary);
    $(".target-info .t-score").text(targetPlayer.score);
    $(".target-info .t-goals").text(targetPlayer.goals);
    $(".target-info .t-shots").text(targetPlayer.shots);
    $(".target-info .t-assists").text(targetPlayer.assists);
    $(".target-info .t-saves").text(targetPlayer.saves);

    $(".boost-number").text(targetPlayer.boost);

    const offset = boostCircleCircum - targetPlayer.boost / 100 * boostCircleCircum;
    boostCircleElem.style.strokeDashoffset = offset;
    boostCircleElem.style.stroke = "#" + gameData.game.teams[targetPlayer.team].color_primary;
}

function wsInit () {
    WsSubscribers.init(49322, true);

    WsSubscribers.subscribe("wsRelay", "info", (d) => {
        setTimeout(() => {
            console.log("UI UPDATE: WS Connect");
            teamInfoFill();
            }, 500);
    });

    WsSubscribers.subscribe("game", "match_created", (d) => {
        setTimeout(() => {
            console.log("UI UPDATE: Match Created");
            $('body').show();
            teamInfoFill();
            }, 500);
    });

    WsSubscribers.subscribe("game", "replay_start", (d) => {
        $(".teams .timer").text("REPLAY");
        $('.target-info').hide();
        $('.target-boost').hide();
    });

    WsSubscribers.subscribe("game", "match_destroyed", (d) => {
        $('body').show();
        $('.target-info').hide();
        $('.target-boost').hide();
    });


    WsSubscribers.subscribe("game", "update_state", (d) => {
        gameData = d;

        // Game ended - hide overlay
        if (d['game']['hasWinner']) {
            $('body').hide();
        }

        // Update timer and team scores when not in a replay
        if (!d['game']['isReplay']) {
            let timeGame = d['game']['time_seconds'];
            let timeMin = Math.floor(timeGame / 60);
            let timeSec = timeGame % 60;
            if (timeSec < 10)
                timeSec = '0' + timeSec;
            if (d['game']['isOT'])
                timeMin = '+' + timeMin;
            $(".teams .timer").text(timeMin + ":" + timeSec);
            $(".teams .left-score").text(d['game']['teams'][0]['score']);
            $(".teams .right-score").text(d['game']['teams'][1]['score']);
        }

        // Current specced player
        if (d['game']['hasTarget']) {
            targetInfoFill();
            $('.target-info').show();
            $('.target-boost').show();
        }
        else {
            $('.target-info').hide();
            $('.target-boost').hide();
        }

        // Update all player info
        const blue = Object.values(d.players).filter(p => p.team === 0 && p.id.at(-1) !== 4);
        const orange = Object.values(d.players).filter(p => p.team === 1 && p.id.at(-1) !== 8);
        blue.forEach(player => {
            playerInfoFill("blue", player);
        });
        orange.forEach(player => {
            playerInfoFill("orange", player);
        });
    });
}
