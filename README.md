project 3

phaser example games can be found at:
https://github.com/photonstorm/phaser3-examples

## Inject this code after "game" is defined into phaser games to make the window fit its container

```javascript
function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var scale = Math.min(w / config.width, h / config.height);
    
    game.canvas.setAttribute('style',
        ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' +
        ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' +
        ' transform-origin: top left;   image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;image-rendering: pixelated;image-rendering: crisp-edges;'
    );
    
    width = w / scale;
    height = h / scale;
    game.resize(width, height);
    game.scene.scenes.forEach(function (scene) {
        scene.cameras.main.setViewport(0, 0, width, height);
    });
}

window.addEventListener('resize', resize);
if(game.isBooted) resize();
else game.events.once('boot', resize);

resize()
```
