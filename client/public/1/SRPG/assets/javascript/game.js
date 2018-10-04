var config = {
    type: Phaser.AUTO,
    width: 240,
    height: 160,
    pixelArt: true,
    backgroundColor: '#2d2d2d',
    parent: 'gameView',
    zoom: 3,
    scene: [{
        key: 'main',
        // active: true,
        preload: preload,
        create: create,
        update: update,
    },attackMenu,attackStats,menu,characterMenu,]
};

function Character(name,hp,atk,def,acc,avo,crit,mspd,exp,giveexp,ally,active,pos,portrait ) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.acc = acc;
    this.avo = avo;//unused so far
    this.crt = crit

    this.mspd = mspd;
    this.moves = null;

    this.validattacks = null;
    this.exp = exp;
    this.giveexp = giveexp;
    this.ally = ally;

    
    this.active = active;
    this.pos = pos;

    this.portrait = portrait;

    this.levelup = function(){
        //Increases stats, called after the player reaches 100 exp
        setTimeout(function(){
            levelUpSound.play();
            printLabel("LEVEL UP")
        },1000)
        
        printMessage(this.name + " leveled up!" )
        this.acc += 10
        this.avo += 10
        this.mspd += 1
        this.ap += 10
        this.exp -= 100
    }

    this.moveto = function(target){ 
        delete charPosKeys[this.pos]

        path = this.moves[target].pathTaken
        var tweens = []
        var prev = this.pos
        
        for(var i = 0;i<path.length;i++){
            if(prev[0]-1 == path[i][0]){
                tweens.push({x: '-=16',duration:200,ease:'linear'})
            }
            else if (prev[0]+1 == path[i][0]){
                tweens.push({x: '+=16',duration:200,ease:'linear'})
            }
            else if (prev[1]+1 == path[i][1]){
                tweens.push({y: '+=16',duration:200,ease:'linear'})
            }
            else if (prev[1]-1 == path[i][1]){
                tweens.push({y: '-=16',duration:200,ease:'linear'})
            }
            prev = path[i]
        }
        var timeline = base.tweens.timeline({
            targets: this.img,
            tweens: tweens,
            onComplete: function(){
                phase = 'attackConfirm'
                base.scene.run('attackMenu')
                showAttacks(charTarget)

            }
        })      
        this.pos = PostoTilePos([cursor.x,cursor.y])
        charPosKeys[this.pos] = this // Store a reference to this object on that tile


    };
}




var charPosKeys = {}

//name,hp,atk,def,acc,avo,crit,mspd,exp,giveexp,ally,active,pos

var Chamomile = new Character('Chamomile',20,200,10,90,20,15,4,0,0,true, true, [1,1],'assets/images/Sprites/PortraitPlaceholder.png')
charPosKeys[Chamomile.pos] = Chamomile

var Earl = new Character('Earl',24,30,20,80,20,10,4,0,0,true, true, [2,1])
charPosKeys[Earl.pos] = Earl

var Ceylon = new Character('Ceylon',33,70,10,50,20,5,4,0,0,true, true, [3,1])
charPosKeys[Ceylon.pos] = Ceylon

var SpearSkeleton1 = new Character('Spear Skeleton',20,200,10,80,20,1,4,0,50,false, false, [4,1])
charPosKeys[SpearSkeleton1.pos] = SpearSkeleton1

var AxeSkeleton1 = new Character('Axe Skeleton',30,40,10,60,10,1,4,0,50,false, false, [3,2])
charPosKeys[AxeSkeleton1.pos] = AxeSkeleton1



var game = new Phaser.Game(config);
var allies = [Chamomile,Earl,Ceylon]
var enemies = [SpearSkeleton1,AxeSkeleton1]
var activeQueue = {}
for (var i = 0;i<allies.length;i++){
    activeQueue[(allies[i].name)] = 1
}
var phase = 'choose'


var player;
var cursor;
var layer;
var colorBlue;
var colorRed;
var base;
var tweenRef;

var toggle = false;//Toggle is temporary boolean for selecttarget/showmove phase

var cursorTarget //Character the cursor is hovering over
var cursorPos
var charTarget //Last selected character

var originalTileWeights = {}
var allymovemap = {} //Tileweights, Store the steps needed to move into a tile in a map
var enemymovemap = {}

function preload(){
    this.load.image('Tileset', 'assets/TileMap/Tileset.png');
    this.load.tilemapTiledJSON('map','assets/TileMap/Map1.json');
    this.load.image('cursor','assets/images/Sprites/Cursor.png')

    this.load.image('Chamomile','assets/images/Sprites/Chamomile.png')
    this.load.image('ChamomileGrayed','assets/images/Sprites/ChamomileGrayed.png')
    this.load.image('Earl','assets/images/Sprites/Earl.png')
    this.load.image('EarlGrayed','assets/images/Sprites/EarlGrayed.png')
    this.load.image('Ceylon','assets/images/Sprites/Ceylon.png')
    this.load.image('CeylonGrayed','assets/images/Sprites/CeylonGrayed.png')

    this.load.image('AxeSkeleton', 'assets/images/Sprites/AxeSkeleton.png')
    this.load.image('SpearSkeleton','assets/images/Sprites/SpearSkeleton.png')
    this.load.image('SwordSkeleton','assets/images/Sprites/SwordSkeleton.png')

    this.load.image('colorBlue','assets/images/Tiles/colorBlue.png')
    this.load.image('colorRed','assets/images/Tiles/colorRed.png')
}

function create(){
    //Launch parallel scenes(menus) and immediately hide them

    //CAMERA//

    var camera = this.cameras.add(-16,-16,240,160)



    base = this
    var _this = this


    colorRed = this.add.group();
    colorBlue = this.add.group();

    map = this.make.tilemap({key: 'map'})
    var tileset = map.addTilesetImage('Tileset');
    
    layer = map.createStaticLayer('Tile Layer 1',tileset,0,0);
    layer.setDepth(-2)
    cursor = this.add.image(16+8,16+8,'cursor');

    Chamomile.img = this.add.sprite(16+8,16+8,'Chamomile');
    Earl.img = this.add.sprite(16+24,16+8,'Earl');
    Ceylon.img = this.add.sprite(16+40,16+8,'Ceylon');

    SpearSkeleton1.img = this.add.sprite(72,24,'SpearSkeleton')
    AxeSkeleton1.img = this.add.sprite(56,40,'AxeSkeleton')


    ///Grab original tile data from JSON
    var tiles = layer.layer.data
    for (var i = 0; i < tiles.length; i++){
        for (var j = 0; j < tiles[0].length;j++){
            originalTileWeights[[j,i]] = tiles[i][j].properties.weight
        }
    }
    updateAllyTileWeights()
    updateEnemyTileWeights()

////////////
    this.input.keyboard.on('keydown_LEFT', function (event) {
        if (phase != 'attackConfirm'){
            cursor.x = Math.max(16+8,cursor.x-16);
            cursorPos = PostoTilePos([cursor.x,cursor.y]);
            cursorTarget = charPosKeys[cursorPos]
        }
    });

    this.input.keyboard.on('keydown_RIGHT', function (event) {
        if (phase != 'attackConfirm'){

            cursor.x = Math.min(256-8,cursor.x + 16);
            cursorPos = PostoTilePos([cursor.x,cursor.y]);
            cursorTarget = charPosKeys[cursorPos]
        }
    });

    this.input.keyboard.on('keydown_UP', function (event) {
        if (phase != 'attackConfirm'){

            cursor.y = Math.max(16+8,cursor.y-16);
            cursorPos = PostoTilePos([cursor.x,cursor.y]);
            cursorTarget = charPosKeys[cursorPos]
        }
    });

    this.input.keyboard.on('keydown_DOWN', function (event) {
        if (phase != 'attackConfirm'){

            cursor.y = Math.min(176-8,cursor.y + 16);
            cursorPos = PostoTilePos([cursor.x,cursor.y]);
            cursorTarget = charPosKeys[cursorPos]
        }
    });

    this.input.keyboard.on('keydown_Z', function(event){
        if(phase == 'choose'){
            colorBlue.clear(true,true)
            colorRed.clear(true,true)
            if (cursorPos in charPosKeys){
                charTarget = charPosKeys[cursorPos]
                if((charTarget.name in activeQueue) || (charTarget.ally == false)){
                    showMoves(charTarget)
                    if (charTarget.ally == true){
                        phase = 'move'
                    }
                }
                    
            }
        }
        else if(phase =='move'){
            if (cursorPos in charTarget.moves){
                colorBlue.clear(true,true)
                colorRed.clear(true,true)
                if (String(cursorPos) == String(charTarget.pos)){//Characted chose to stay in same tile
                    phase = 'attackConfirm'
                    base.scene.run('attackMenu')
                    showAttacks(charTarget)
                }
                else{
                    charTarget.moveto(PostoTilePos([cursor.x,cursor.y]))
                    phase = 'moving'
                }


                
            }
        
        }
        //Attack phase is started when animation for moving is complete
        // else if(phase == 'attack'){
        //     if (cursorPos in charPosKeys){
        //         cursorTarget = charPosKeys[cursorPos]
        //         if ( (cursorPos in charTarget.validattacks) && (cursorTarget.ally == false)){

        //         }

        //     }
        //     else{
        //         phase = 'choose'
        //         charTarget.img.setTexture(charTarget.name + "Grayed")
        //         delete activeQueue[charTarget.name]
        //         colorBlue.clear(true,true)
        //         colorRed.clear(true,true)
        //         if (Object.keys(activeQueue).length == 0){
        //             phase = 'enemy'
        //         }
                
        //     }
        // }
    });
}


function update (){
}



////UTILITY FUNCTIONS////////
function PostoTilePos(pos){
    return [Math.floor((pos[0]-8)/16),Math.floor((pos[1]-8)/16)]
}
function TilePostoPos(tilepos){
    return [tilepos[0]*16 + 8,tilepos[1]*16 + 8]
}

//Use in between each turn. 
function updateAllyTileWeights(){
    //Recreate original weightmap
    for (key in originalTileWeights){
        allymovemap[key] = originalTileWeights[key]
    }
    //Replace tileweight with 99 where enemies are standing
    enemies.forEach(function(char){
        if (char.hp){
            allymovemap[char.pos] = 99    
        }
    })   
}
function updateEnemyTileWeights(){
    //Recreate original weightmap
    for (key in originalTileWeights){
        enemymovemap[key] = originalTileWeights[key]
    }
    //Replace tileweight with 99 where enemies are standing
    allies.forEach(function(char){
        if(char.hp > 0){
            enemymovemap[char.pos] = 99    
        }
    })   
}

function parseKey(key,delimiter){ //Parse through our custom ID tag to determine location of target box
    var row = ''
    var col = ''
    var toggle = 0
    for (var i = 0;i<key.length;i++){
        if (key[i] == delimiter){
            toggle = 1
        }
        else if(toggle == 0){
            row += key[i]
        }
        else{
            col += key[i]
        }
    }
    return [+row,+col]
    
}

function showMoves(character){
    var possibleAttacks = {}
    function findPath(start,mspd,map){ 
        //Flood fill algorithm to determine valid moves
        // updateAllyTileWeights() 
        //Create object Path that will eventually store the stepsLeft and a pathTaken to a tile
        function Path(stepsLeft,pathTaken){
            this.stepsLeft = stepsLeft;
            this.pathTaken = pathTaken;
        }
        //Initialize a map that will store the Path to each tile
        var travelmap = {}
        travelmap[start] = new Path(mspd,[])
    
        //Openset contains the queue of tiles to be looped through
        var openset = []
        openset.push(start)
        var closedset = []
        var n = 0
        
        while ((openset.length) > 0 && (n < 1000)){
            //n < 1000 is just to make sure the loop doesn't go infinite, it is probably safe to remove
            n += 1
    
            //set curr as the first element in the openset and put it in the closed set
            var curr = openset[0]
            openset.splice(0,1)
            closedset.push(curr)
            
            //Populate the neighboring tiles
            var neighbors = [[curr[0] + 1,curr[1]],[curr[0],curr[1]+1],[curr[0]-1,curr[1]],[curr[0],curr[1]-1] ]
            
            //For every neighbor
            neighbors.forEach(function(neighbor){
                possibleAttacks[neighbor] = 1
                //Calculate how many steps are left if the neighbor is moved into
                tentativeStepsLeft = travelmap[curr].stepsLeft - map[neighbor]
                //If we've already calculated this tile, only replace it in the travel map if it requires less steps
                if (neighbor in travelmap){
                    if (tentativeStepsLeft > travelmap[neighbor].stepsLeft){
                        travelmap[neighbor].stepsLeft = tentativeStepsLeft
                    }
                }
                //Otherwise if you do not have enough steps to move into neighbor do nothing
                else if (travelmap[curr].stepsLeft - map[neighbor] < 0){
                }
                //If you have exactly enough steps push it to the closedset
                else if (travelmap[curr].stepsLeft - map[neighbor] == 0){
                    travelmap[neighbor] = new Path(travelmap[curr].stepsLeft - map[neighbor], travelmap[curr].pathTaken.concat([neighbor]))
                    closedset.push(neighbor)
                }
                else{
                //If the tile has not been previously calculated and it is possible to move into it with steps remaining
                //Put that tile in the Open Set and log its Path in the map.
                    openset.push(neighbor)
                    travelmap[neighbor] = new Path(travelmap[curr].stepsLeft - map[neighbor], travelmap[curr].pathTaken.concat([neighbor]))
                }
            })
        }
        ///Determine where valid attacks are
        closedset.forEach(function(curr){
            var neighbors = [[curr[0] + 1,curr[1]],[curr[0],curr[1]+1],[curr[0]-1,curr[1]],[curr[0],curr[1]-1] ]
            neighbors.forEach(function(neighbor){
                possibleAttacks[neighbor] = 1
            })
        })
    
        return travelmap
    }

    if (character.ally){
        var possiblemoves = (findPath(character.pos,character.mspd,allymovemap))
    }
    else{
        var possiblemoves = (findPath(character.pos,character.mspd,enemymovemap))
    }
    //Style all tiles that are part of the possible moves
    colorBlue.clear(true,true)
    colorRed.clear(true,true)
    for (var key in possiblemoves){
        var tile = TilePostoPos(parseKey(key,','))
        if (character.ally == false){
            colorRed.create(tile[0],tile[1],'colorRed')
        }
        else{
            colorBlue.create(tile[0],tile[1],'colorBlue')
        }
    }
    for (var key in possibleAttacks){
        var tile = TilePostoPos(parseKey(key,','))
        if (!(key in possiblemoves)){
            colorRed.create(tile[0],tile[1],'colorRed')
        }

    }

    character.moves = possiblemoves
    colorBlue.setDepth(-1)
    colorRed.setDepth(-1)
}

function showAttacks(character){
    var possibleattacks = [[+character.pos[0] + 1, +character.pos[1]],[+character.pos[0] - 1, +character.pos[1]],
                        [+character.pos[0] , +character.pos[1]+1],[+character.pos[0], +character.pos[1]-1]]
        character.validattacks = {}
        possibleattacks.forEach(function(tile){
            if (tile in charPosKeys){
                if (!charPosKeys[tile].ally){
                    character.validattacks[tile] = charPosKeys[tile]
                }
            }
            var absTile = TilePostoPos(tile)
            colorRed.create(absTile[0],absTile[1],'colorRed')
            colorRed.setDepth(-1)
            })
    
}

function removeChar(character){
    delete charPosKeys[character.pos]
    updateAllyTileWeights()
    updateEnemyTileWeights()

}

