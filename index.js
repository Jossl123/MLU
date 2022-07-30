var pos = "world"
var maps = {
    "world": {
        "10.20.20": 0
    }
}
var mouse = { x: 0, y: 0, color: '0.0.O' }
var mapCanvas, mapImage

var imageData = load_map('https://picsum.photos/200/300')

function mouse_click(e) {
    return
}
document.addEventListener("click", mouse_click);

function mouse_position(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    show_col()
    console.log(mouse.color)
}

function show_col() {
    if (!(mouse.y < mapCanvas.height && mouse.x < mapCanvas.width)) return console.log("out of bound")
    var index = (mouse.y * imageData.width + mouse.x) * 4;
    var red = imageData.data[index];
    var green = imageData.data[index + 1];
    var blue = imageData.data[index + 2];
    mouse.color = `${red}.${green}.${blue}`
}

function load_map(src) {
    var imageData
    mapImage = new Image();
    mapImage.crossOrigin = "Anonymous";
    mapImage.onload = function() {
        mapCanvas = document.createElement('canvas');
        mapCanvas.width = mapImage.width;
        mapCanvas.height = mapImage.height;
        var context = mapCanvas.getContext('2d');
        context.drawImage(mapImage, 0, 0);
        imageData = context.getImageData(0, 0, mapCanvas.width, mapCanvas.height);
        return imageData
    };
    mapImage.src = src
}