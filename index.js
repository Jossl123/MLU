var pos = "MLU"
var path = [pos]
var mouse = { x: 0, y: 0, color: '0.0.O' }
var mapCanvas, mapImage, ratio
var imageData = load_map(`./views/maps/${pos}.png`)

function back() {
    if (path.length <= 1) return
    path.pop()
    var name = path[path.length - 1]
    change_pos(name)
}

function change_pos(npos) {
    pos = npos
    document.getElementById("img").setAttribute("src", `./views/pictures/${pos}.png`)
    document.getElementById("next_map").innerHTML = ""
    document.getElementById("next_map_ph").innerHTML = "(La prochaine destination)"
    document.getElementById("description").innerHTML = maps[pos].infos.description
    document.getElementById("title").innerHTML = maps[pos].infos.title
    imageData = load_map(`./views/maps/${pos}.png`)
}

function mouse_click(e) {
    if (mouse.color in (maps[pos]).path) {
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
document.addEventListener("click", mouse_click);
change_pos(pos)