const defaultPos = "MLU"
var musicFile = ""
var pos = defaultPos
var path = [pos]
var mouse = { x: 0, y: 0, color: '0.0.O' }
var frame = 0
var mapCanvas, mapImage, ratio, imageData
var audio = new Audio("./music/" + defaultPos + ".mp3");
audio.loop = true;
var musicOn = false
var hoverImg = false
var seen = new Set()
seen.add(defaultPos)
const placesToSee = Object.keys(maps).length
window.onload = async() => {
    imageData = load_map(`./views/maps/${pos}.png`)
    document.addEventListener("click", mouse_click);
    await change_pos(pos)

    const interval = setInterval(function() {
        change_frame()
    }, 700);

    window.onresize = async() => {
        await change_pos(pos)
        imageData = load_map(`./views/maps/${pos}.png`)
    }

    document.addEventListener("mouseup", function(e) {
        var popup = document.getElementById("help");
        if (e.target.id != "help") popup.classList.add("hidden");
    });
    document.getElementById("numberOfPlacesToSee").innerHTML = placesToSee
}

async function back() {
    if (path.length <= 1) return
    path.pop()
    var name = path[path.length - 1]
    await change_pos(name)
}

async function change_pos(npos) {
    mouse.color = ""
    pos = npos
    seen.add(npos)
    if (maps[pos].infos.frames > 1) document.getElementById("img").setAttribute("src", `./views/pictures/${pos}_1.png`)
    else document.getElementById("img").setAttribute("src", `./views/pictures/${pos}.png`)
    document.getElementById("next_map").innerHTML = ""
    document.getElementById("next_map_ph").innerHTML = "(La prochaine destination)"
    document.getElementById("description").innerHTML = maps[pos].infos.description
    document.getElementById("title").innerHTML = maps[pos].infos.title
    imageData = load_map(`./views/maps/${pos}.png`)
    console.log(seen.size)
    document.getElementById("numberOfPlacesSeen").innerHTML = seen.size
    load_music()
}

function mouse_click(e) {
    if (mouse.color in (maps[pos]).path && e.target.id != "undo") {
        var name = maps[pos].path[mouse.color]
        path.push(name)
        change_pos(name)
    }
}

function mouse_position(e) {
    var bo = document.getElementById("img").getBoundingClientRect()
    mouse.x = Math.floor((e.clientX - bo.x) / ratio);
    mouse.y = Math.floor((e.clientY - bo.y) / ratio);
    get_col()
}

function get_col() {
    if (!(mouse.y < mapCanvas.height && mouse.x < mapCanvas.width)) return
    var index = (mouse.y * imageData.width + mouse.x) * 4;
    var red = imageData.data[index];
    var green = imageData.data[index + 1];
    var blue = imageData.data[index + 2];
    mouse.color = `${red}.${green}.${blue}`
    if (maps[pos].path[mouse.color]) {
        document.getElementById("next_map").innerHTML = maps[maps[pos].path[mouse.color]].infos.title
        document.getElementById("next_map_ph").innerHTML = ""
    } else {
        document.getElementById("next_map").innerHTML = ""
        document.getElementById("next_map_ph").innerHTML = "(La prochaine destination)"
    }
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function music_panel(on) {
    musicOn = !on;
    change_volume()
    document.getElementById("musicPanel").style.opacity = "0"
    document.getElementById("musicPanel").style.zIndex = "0"
    await sleep(900)
    document.getElementById("main").style.zIndex = "10"
}

async function load_music() {
    audio.play()
    if (musicOn) {
        if (doesFileExist("./music/" + pos + ".mp3") && musicFile != pos) {
            naudio = new Audio("./music/" + pos + ".mp3")
            naudio.loop = true;
            for (let i = 0; i < 1; i += 0.1) {
                await sleep(50)
                audio.volume = 1 - i
            }
            naudio.volume = 0
            audio.pause();
            naudio.play();
            for (let i = 0; i < 1; i += 0.1) {
                naudio.volume = i
                await sleep(50)
            }
            audio = naudio
            musicFile = pos
        }
    } else {
        audio.pause()
    }
}

function change_volume() {
    musicOn = !musicOn
    if (musicOn) document.getElementById("volume").innerHTML = "volume_up"
    else document.getElementById("volume").innerHTML = "volume_off"
    load_music()
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

function load_map(src) {
    mapImage = new Image();
    mapImage.crossOrigin = "Anonymous";
    mapImage.onload = function() {
        mapCanvas = document.createElement('canvas');
        mapCanvas.width = mapImage.width;
        mapCanvas.height = mapImage.height;
        var context = mapCanvas.getContext('2d');
        context.drawImage(mapImage, 0, 0);
        imageData = context.getImageData(0, 0, mapCanvas.width, mapCanvas.height);
        ratio = (document.getElementById("img").height / mapImage.height)
    };
    mapImage.src = src
}

function change_frame() {
    if (maps[pos].infos.frames > 1) {
        frame += 1
        if (maps[pos].infos.frames <= frame) {
            frame = 0
        }
        document.getElementById("img").setAttribute("src", `./views/pictures/${pos}_${frame+1}.png`)
    }
}

function help() {
    var popup = document.getElementById("help");
    if (popup.classList.contains("hidden")) {
        popup.classList.remove("hidden");
    } else {
        popup.classList.add("hidden");
    }
}

function sort(object) {
    var sortedKeys = Object.keys(object).sort().reduce((objEntries, key) => {

        objEntries[key] = object[key];

        return objEntries;

    }, {});
    return sortedKeys
}