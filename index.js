var pos = "MLU"
var path = [pos]
var maps = {
    "MLU": {
        "description": "MLU first pic",
        "path": {
            "255.0.0": "l_espace_blanc",
            "0.255.0": "la_carte_des_dimensions_et_des_sous_mondes"
        }
    },
    "l'espace_blanc": {
        "description": "MLU second pic",
        "path": {}
    },
    "la_carte_des_dimensions_et_des_sous_mondes": {
        "description": "MLU second pic",
        "path": {
            "255.0.0": "le_desert_de_l'oubli",
            "0.255.0": "la_carte_des_dimensions_et_des_sous_mondes"
        }
    },
}
var mouse = { x: 0, y: 0, color: '0.0.O' }
var mapCanvas, mapImage, ratio
var imageData = load_map('./views/maps/MLU.png')

function back() {
    if (path.length <= 1) return
    path.pop()
    pos = path[path.length - 1]
    document.getElementById("img").setAttribute("src", `./views/pictures/${path[path.length -1]}.png`)
    imageData = load_map(`./views/maps/${path[path.length -1]}.png`)
}

function mouse_click(e) {
    if (mouse.color in (maps[pos]).path) {
        var name = maps[pos].path[mouse.color]
        pos = name
        path.push(pos)
        document.getElementById("img").setAttribute("src", `./views/pictures/${name}.png`)
        imageData = load_map(`./views/maps/${name}.png`)
    }
}
document.addEventListener("click", mouse_click);

function mouse_position(e) {
    mouse.x = Math.floor(e.clientX / ratio);
    mouse.y = Math.floor(e.clientY / ratio);
    show_col()
}

function show_col() {
    if (!(mouse.y < mapCanvas.height && mouse.x < mapCanvas.width)) return
    var index = (mouse.y * imageData.width + mouse.x) * 4;
    var red = imageData.data[index];
    var green = imageData.data[index + 1];
    var blue = imageData.data[index + 2];
    mouse.color = `${red}.${green}.${blue}`
    document.getElementById("color").innerHTML = maps[pos].path[mouse.color]
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
        ratio = (window.innerHeight / mapImage.height)
    };
    mapImage.src = src
}