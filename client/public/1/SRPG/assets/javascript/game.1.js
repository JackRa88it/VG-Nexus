function Character(ref,name,hp,ap,acc,dodge,mspd,exp,giveexp,ally,active,pos) {
    this.ref = ref;
    this.name = name;
    this.hp = hp;
    this.ap = ap;
    this.acc = acc;
    this.dodge = dodge;//unused so far
    this.mspd = mspd;
    this.moves = null;

    this.validattacks = null;
    this.exp = exp;
    this.giveexp = giveexp;
    this.ally = ally;

    
    this.active = active;
    this.pos = pos;

    this.levelup = function(){
        //Increases stats, called after the player reaches 100 exp
        setTimeout(function(){
            levelUpSound.play();
            printLabel("LEVEL UP")
        },1000)
        
        printMessage(this.name + " leveled up!" )
        this.acc += 10
        this.dodge += 10
        this.mspd += 1
        this.ap += 10
        this.exp -= 100
    }

    this.attack = function(target){
        //Attack logic
        //Initial attack animations(can probably turn this into a function)
        if(target.pos[0] == this.pos[0] - 1){
            $(this.ref).animate({bottom:'50px'},250)
            $(this.ref).animate({bottom:'0px'},250)
        }
        else if (target.pos[0] == this.pos[0] + 1){
            $(this.ref).animate({top:'50px'},250)
            $(this.ref).animate({top:'0px'},250)
        }
        else if (target.pos[1] == this.pos[1] + 1){
            $(this.ref).animate({left:'50px'},250)
            $(this.ref).animate({left:'0px'},250)
        }
        else if (target.pos[1] == this.pos[1] - 1){
            $(this.ref).animate({right:'50px'},250)
            $(this.ref).animate({right:'0px'},250)
        }

        var hitroll = Math.floor(Math.random()*100) 
        var enemyroll = Math.floor(Math.random()*100)

        if (this.acc > hitroll){
            //If you hit
            printMessage(this.name + ' attacks '+  target.name + ' dealing ' + this.ap + ' damage.')
            hitSound.play()
            target.hp = Math.max(target.hp-this.ap,0)
            if (target.hp <= 0) { 
                printMessage(this.name + ' deals a lethal blow to ' + target.name)
                removeChar(target)
                this.exp += target.giveexp
                if (this.exp >= 100){
                    this.levelup()
                } 
                
                if (target.ally == false){ //Ally  killed enemy
                    if (enemies.length == 0){
                        //All enemies defeated //Should make a victory() function
                        phase = 'Victory'
                        printLabel('VICTORY')
                        printMessage("You have defeated all enemies!")
                    }
                }
                else{
                    if (allies.length == 0){
                        //All allies defeated //Should make a defeat() function
                        phase = 'GameOver'
                        printLabel('DEFEAT')
                        printMessage("All allies have been slain.")      
                    }
                }
            }
        }

        else {
            //attack misses
            missSound.play()
            printMessage(this.name + ' attacks but ' + target.name + ' parries!')
        }

        $(this.ref).promise().done(function(){
            //promise waits until the initial attack animation is done
            //Counterattack animation
            if(this.data().pos[0] == target.pos[0] - 1){
                $(target.ref).animate({bottom:'50px'},250)
                $(target.ref).animate({bottom:'0px'},250)
            }
            else if (this.data().pos[0] == target.pos[0] + 1){
                $(target.ref).animate({top:'50px'},250)
                $(target.ref).animate({top:'0px'},250)
            }
            else if (this.data().pos[1] == target.pos[1] + 1){
                $(target.ref).animate({left:'50px'},250)
                $(target.ref).animate({left:'0px'},250)
            }
            else if (this.data().pos[1] == target.pos[1] - 1){
                $(target.ref).animate({right:'50px'},250)
                $(target.ref).animate({right:'0px'},250)
            }

            if ((target.acc > enemyroll) && (target.hp > 0)) {
                //counterattack lands
                hitSound.play()
                this.data().hp = Math.max(this.data().hp-target.ap,0)
                printMessage(target.name + ' lands the riposte dealing ' + target.ap + ' damage.')
                if (this.data().hp <= 0) {
                    printMessage(target.name + ' deals a lethal blow to ' +this.data().name )
                    target.exp += this.data().giveexp
                    removeChar(this.data())

                    if (target.exp >= 100){
                        target.levelup()
                    }
                    if (this.data().ally == false){ //Ally  killed enemy
                        if (enemies.length == 0){
                            phase = 'Victory'
                            printLabel('VICTORY')
                            printMessage("You have defeated all enemies!")
                        }
                    }
                    else{
                        if (allies.length == 0){
                            phase = 'GameOver'
                            printLabel('DEFEAT')
                            printMessage("All allies have been slain.")
                        }
                    }
                }
            }
        
            else if (target.hp > 0){
                //counterattack misses
                missSound.play()
                printMessage(target.name + ' misses the riposte!')
            }
            statupdate(target)
            statupdate(this.data())
        })
    };

    this.moveto = function(targetrow,targetcol){ 
        $(this.ref).css('left','0px')
        $(this.ref).css('bottom','0px')
        this.ref.detach()
        this.pos = [targetrow,targetcol]
        $('#'+targetrow+'\\,'+targetcol).append(this.ref)
        this.ref.data(this)
    };
}


//CREATE SFX///
var hitSound = document.createElement('audio')
hitSound.src = ('assets/SFX/Hit.wav')
hitSound.volume = 0.25
var missSound = document.createElement('audio')
missSound.src = ('assets/SFX/Miss.wav')
var levelUpSound = document.createElement('audio')
levelUpSound.src = ('assets/SFX/LevelUp.wav')
//////////////////

var gamegrid = [] // I might use this
//Create gamegrid
for (var i = 0; i<10;i++){
    //Create grid on html
    var row = []
    var rowref = $('<div>')
    rowref.addClass('row')
    for (var j = 0; j<10;j++){
        row.push(j)
        var colref = $('<div>')
        colref.addClass('col')
        rowref.append(colref)
        colref.attr('id',i+','+j)
    }
    gamegrid.push(row)
    $('#container').append(rowref)
}

var player = null
var target = null
var phase = 'ChooseCharacter'


//DEFINE CHARACTERS HERE
//(ref,name,hp,ap,acc,dodge,mspd,exp,giveexp,ally,active,pos)
var SpearSkeleton1 = new Character($('#spear1'),'Spear Skeleton 1',100,20,80,20,4,0,50,false, false, [9,1])
var SpearSkeleton2 = new Character($('#spear2'),'Spear Skeleton 2',100,20,80,20,4,0,50,false, false, [1,8])
var SpearSkeleton3 = new Character($('#spear3'),'Spear Skeleton 3',100,20,80,20,4,0,50,false, false, [0,2])
var SwordSkeleton1 = new Character($('#sword1'),'Sword Skeleton 1',100,30,70,20,4,0,50,false, false, [0,1])
var SwordSkeleton2 = new Character($('#sword2'),'Sword Skeleton 2',100,30,70,100,4,0,50,false, false,[1,1])
var AxeSkeleton1 = new Character($('#axe1'),'Axe Skeleton 1',100,40,50,20,4,0,50,false, false, [0,0])
var AxeSkeleton2 = new Character($('#axe2'),'Axe Skeleton 2',100,40,50,20,4,0,50,false, false, [2,0])


var Chamomile = new Character($('#chamomile'),'Chamomile',100,40,90,20,4,0,0,true, true, [8,8])
var Earl = new Character($('#earl'),'Earl',120,30,80,20,4,0,0,true, true, [9,7])
var Ceylon = new Character($('#ceylon'),'Ceylon',200,70,50,20,4,0,0,true, true, [7,9])


//CREATE ARRAYS FOR ENEMIES/ALLIES FOR GAME TO LOOP THROUGH
var enemies = [SpearSkeleton1,SpearSkeleton2,SpearSkeleton3,SwordSkeleton1,SwordSkeleton2,AxeSkeleton1,AxeSkeleton2]
var allies = [Chamomile,Earl,Ceylon]

//Initialize position of allies and store their object reference in the tile
enemies.forEach(function(char){
    char.ref.data(char)
    char.moveto(char.pos[0],char.pos[1]) 
})
//Initialize position of allies
allies.forEach(function(char){
    char.ref.data(char)
    char.moveto(char.pos[0],char.pos[1])   
})

//Replace the allies variable with the jquery references after initialization
for (var i = 0; i < allies.length;i++){
    allies[i] = allies[i].ref
}
for (var i = 0; i < enemies.length;i++){
    enemies[i] = enemies[i].ref
}

function removeChar(char){
    //Remove char from game
    index = null
    char.pos = [-50,-50]
    if (char.ally == true){
        //If ally
        for (var i = 0;i < allies.length;i++){
            
            if (allies[i].data().name == char.name){
                index = i     
            }
        }
        allies.splice(index,1)
    }
    else{
        //If enemy
        for (var i = 0;i < enemies.length;i++){
            //Remove the enemy from the array
            if (enemies[i].data().name == char.name){     
                index = i
            }
        }
        enemies.splice(index,1)
    }
    $(char.ref).parent().empty()
}

//////////////////////////MOVEMENT LOGIC/////////////////////////
var originalTileWeights =  [[[-1,-1],99],[[-1,0],99],[[-1,1],99],[[-1,2],99],[[-1,3],99],[[-1,4],99],[[-1,5],99],[[-1,6],99],[[-1,7],99],[[-1,8],99],[[-1,9],99],[[-1,10],99],
                    [[0,-1],99],[[0,0],1],[[0,1],1],[[0,2],1],[[0,3],1],[[0,4],1],[[0,5],1],[[0,6],1],[[0,7],1],[[0,8],1],[[0,9],1],[[0,10],99],
                    [[1,-1],99],[[1,0],1],[[1,1],1],[[1,2],1],[[1,3],1],[[1,4],1],[[1,5],1],[[1,6],1],[[1,7],3],[[1,8],1],[[1,9],1],[[1,10],99],
                    [[2,-1],99],[[2,0],1],[[2,1],1],[[2,2],1],[[2,3],1],[[2,4],1],[[2,5],1],[[2,6],2],[[2,7],2],[[2,8],1],[[2,9],1],[[2,10],99],
                    [[3,-1],99],[[3,0],1],[[3,1],1],[[3,2],1],[[3,3],1],[[3,4],1],[[3,5],3],[[3,6],1],[[3,7],1],[[3,8],1],[[3,9],1],[[3,10],99],
                    [[4,-1],99],[[4,0],1],[[4,1],2],[[4,2],1],[[4,3],1],[[4,4],3],[[4,5],3],[[4,6],3],[[4,7],1],[[4,8],2],[[4,9],1],[[4,10],99],
                    [[5,-1],99],[[5,0],1],[[5,1],1],[[5,2],1],[[5,3],2],[[5,4],3],[[5,5],2],[[5,6],3],[[5,7],1],[[5,8],1],[[5,9],1],[[5,10],99],
                    [[6,-1],99],[[6,0],1],[[6,1],1],[[6,2],1],[[6,3],3],[[6,4],1],[[6,5],1],[[6,6],1],[[6,7],1],[[6,8],1],[[6,9],1],[[6,10],99],
                    [[7,-1],99],[[7,0],1],[[7,1],1],[[7,2],1],[[7,3],2],[[7,4],1],[[7,5],1],[[7,6],1],[[7,7],1],[[7,8],1],[[7,9],1],[[7,10],99],
                    [[8,-1],99],[[8,0],1],[[8,1],3],[[8,2],1],[[8,3],1],[[8,4],1],[[8,5],1],[[8,6],1],[[8,7],1],[[8,8],1],[[8,9],1],[[8,10],99],
                    [[9,-1],99],[[9,0],2],[[9,1],1],[[9,2],1],[[9,3],1],[[9,4],1],[[9,5],1],[[9,6],1],[[9,7],1],[[9,8],1],[[9,9],1],[[9,10],99],
                    [[10,-1],99],[[10,0],99],[[10,1],99],[[10,2],99],[[10,3],99],[[10,4],99],[[10,5],99],[[10,6],99],[[10,7],99],[[10,8],99],[[10,9],99],[[10,10],99],]

var allymovemap = {} //Tileweights, Store the steps needed to move into a tile in a map
var enemymovemap = {}



//Use in between each turn. 
function updateAllyTileWeights(){
    //Recreate original weightmap
    originalTileWeights.forEach(function (r){ 
        r.forEach(function (c){
            allymovemap[r[0]] = r[1] 
        })
    })
    var tileWeights = originalTileWeights.slice()  //Make a copy of the array
    enemies.forEach(function(char){
        allymovemap[char.data().pos] = 99    
    })   
    //Replace tile weights based on new positions
}
function updateEnemyTileWeights(){
    //Same logic as ally but with different targets; maybe put them in the same function later
    originalTileWeights.forEach(function (r){ 
        r.forEach(function (c){
            enemymovemap[r[0]] = r[1] 
        })
    })
    var tileWeights = originalTileWeights.slice()  //Make a copy of the array
    allies.forEach(function(char){
        enemymovemap[char.data().pos] = 99    
    })
}

updateAllyTileWeights()
updateEnemyTileWeights()

function findPath(start,mspd,map){ 
    //Flood fill algorithm to determine valid moves
    updateAllyTileWeights() 
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

    return travelmap
}


function animateMove(character,path){
    //Redraws the path and queues up animations

    prev = character.pos
    var vert = 0
    var hor = 0
    for (var i = 0;i<path.length;i++){
        if(prev[0]-1 == path[i][0]){
            vert += 50
        }
        else if (prev[0]+1 == path[i][0]){
            vert -= 50
        }
        else if (prev[1]+1 == path[i][1]){
            hor += 50
        }
        else if (prev[1]-1 == path[i][1]){
            hor -= 50
        }
        $(character.ref).animate({bottom: vert + 'px',left: hor + 'px'},150,'linear')
            
        prev = path[i]
    }
}

function showMoves(character){
    if (character.ally){
        var possiblemoves = (findPath(character.pos,character.mspd,allymovemap))
    }
    else{
        var possiblemoves = (findPath(character.pos,character.mspd,enemymovemap))
    }
    //Style all tiles that are part of the possible moves
    for (var key in possiblemoves){
        var correctedKey = key.slice(0,key.indexOf(',')) + '\\' + key.slice(key.indexOf(','))
        if (character.ally == false){
            $('#'+correctedKey).addClass('enemyMovement')
        }
        else{
            $('#'+correctedKey).addClass('movement')
        }
    character.moves = possiblemoves
    }
}

function showAttacks(character){
    var possibleattacks = [[+character.pos[0] + 1, +character.pos[1]],[+character.pos[0] - 1, +character.pos[1]],
                        [+character.pos[0] , +character.pos[1]+1],[+character.pos[0], +character.pos[1]-1]]
    
        character.validattacks = possibleattacks
        possibleattacks.forEach(function(pos){
        correctedPos = pos.join().slice(0,pos.join().indexOf(',')) + '\\' + pos.join().slice(pos.join().indexOf(','))
        $('#'+correctedPos).addClass('attacks')
    })
    
}

function removeAttacks(character){
    var possibleattacks = [[+character.pos[0] + 1, +character.pos[1]],[+character.pos[0] - 1, +character.pos[1]],
    
    [+character.pos[0] , +character.pos[1]+1],[+character.pos[0], +character.pos[1]-1]]

    possibleattacks.forEach(function(pos){

    correctedPos = pos.join().slice(0,pos.join().indexOf(',')) + '\\' + pos.join().slice(pos.join().indexOf(','))
    $('#'+correctedPos).removeClass('attacks')
    })
}

//Should always be called after showMoves and during/before movement otherwise the positions will not be correct and 
function removeMoves(character){
    for (var key in character.moves){
        var correctedKey = key.slice(0,key.indexOf(',')) + '\\' + key.slice(key.indexOf(','))
        if (character.ally == false){
            $('#'+correctedKey).removeClass('enemyMovement')
        }
        else{
            $('#'+correctedKey).removeClass('movement')
        }
    }
}


//////////////MESSAGE AND LABEL LOGGING///////////////////////

function printMessage(message){
    $('#messages').prepend('<br>' + message + '<br>')
}

function printLabel(label){
    var message = $('<div></div>').text(label)
    message.addClass('label')
    $('#container').append(message)
    message.animate({opacity: '1'},100)
    if (label == 'VICTORY' || label == 'DEFEAT'){}
    else{
        setTimeout(function(){
            message.animate({ opacity: '0'},1000)
            message.promise().done(function(){
                message.remove()
            })
        },1200)        
    }
}   
    

function statupdate(object){
    if (object.ally == true){
        $('#statbox').empty()
        $('#statbox').append('<br>' + object.name + '<br>')
        $('#statbox').append('<br> HP: ' + object.hp + '<br>')
        $('#statbox').append('<br> ATT: ' + object.ap + '<br>')
        $('#statbox').append('<br> HIT: ' + object.acc + '<br>')
        $('#statbox').append('<br> EXP: ' + object.exp+ '<br>')
    }
    else{
        $('#messagebox').empty()
        $('#messagebox').append('<br>' + object.name + '<br>')
        $('#messagebox').append('<br> HP: ' + object.hp + '<br>')
        $('#messagebox').append('<br> ATT: ' + object.ap + '<br>')
        $('#messagebox').append('<br> HIT: ' + object.acc + '<br>')

    }
}


///////////UTILITY FUNCTIONS///////////////////
function parseID(id,delimiter){ //Parse through our custom ID tag to determine location of target box
    var row = ''
    var col = ''
    var toggle = 0
    for (var i = 0;i<id.length;i++){
        if (id[i] == delimiter){
            toggle = 1
        }
        else if(toggle == 0){
            row += id[i]
        }
        else{
            col += id[i]
        }
    }
    return [row,col]
    
}

function indexOfa2Ina1(a1,a2){
    return (a1.findIndex(function(N){
        return N.toString() == a2.toString()
    }))
}
//////////////////////////////////

//////////////ENEMY TURN FUNCTIONS//////////////
function shortestPath(start,target){
    //This function used in enemy turn
    function reconstructPath(cameFrom,current,path){
        if (current in cameFrom){
            path.splice(0,0,cameFrom[current])
            return reconstructPath(cameFrom,cameFrom[current],path)
        }
        return path
    }

    function estimate(start,target){
        return (target[1]-start[1]) + (target[0]-start[0])
    }

    function findMinKey(keys){
        //Find the key that corresponds to the smallest value
        var min = 999
        var minKey = null
        for (var i = 0; i<keys.length; i++){
            if (estimatedCost[keys[i]] < min){
                min = estimatedCost[keys[i]]
                minKey = keys[i]
            }
        }
        return minKey
    }

    

    var closedSet = []
    var openSet = [start]

    var cameFrom = {} //Best Path to that tile
    var startToPos = {} //Amount of steps taken to reach tile
    startToPos[start] = 0
    var estimatedCost = {}
    estimatedCost[start] = estimate(start,target)

    var n = 0
    while ((openSet.length > 0) ){
        n += 1
        // set current to the key in openSet that corresponds to the lowest value in estimatedCost

        var current = findMinKey(openSet)

        if (indexOfa2Ina1([current],[target]) != -1){
            return reconstructPath(cameFrom,current,[current],startToPos)
        }

        openSet.splice(openSet.indexOf(current),1)
        closedSet.push(current)

        var neighbors = [[current[0] + 1,current[1]],[current[0],current[1]+1],[current[0]-1,current[1]],[current[0],current[1]-1] ]

        
        neighbors.forEach(function(neighbor){
            //This tile is in the closed set so ignore it
            if (indexOfa2Ina1(closedSet,neighbor) != -1){
                return
            }

            //This is a new tile so queue the neighbors 
            var score = startToPos[current] + enemymovemap[neighbor]
            if (indexOfa2Ina1(openSet,neighbor) == -1){
                openSet.push(neighbor)
            }
            // Path is suboptimal so ignore it
            else if (score >= startToPos[neighbor]){
                return
            }

            //This is currently the optimal path so replace it in the map  
            cameFrom[neighbor] = current
            startToPos[neighbor] = score
            estimatedCost[neighbor] = startToPos[neighbor] + estimate(neighbor,target)   
        })
    }
}

function bestMove(enemy){
    var minDistance = 999
    var bestTile = enemy.pos
    var bestTarget = null
    var bestPath = null
    var bestPathIndex = 0
    var tempIndex = 0
    for(var i = 0;i<allies.length;i++){
        var targetPos = allies[i].data().pos
        var path = shortestPath(enemy.pos,targetPos)
        var stepsTaken = 0
        var lastTile = enemy.pos
        for (var j = 0; j < path.length; j++){
            stepsTaken += enemymovemap[path[j]]
            if (stepsTaken <= enemy.mspd){
                if(enemies.every(function(enemy){return indexOfa2Ina1([enemy.data().pos],[path[j]]) == -1})){
                    lastTile = path[j]
                    tempIndex = j

                }
            }
        }
        if (stepsTaken < minDistance){
            minDistance = stepsTaken
            bestTile = lastTile
            bestPathIndex = tempIndex
            bestPath = path.slice(0,bestPathIndex+1)
            
            if ((Math.abs(targetPos[0] - bestTile[0])+Math.abs(targetPos[1] - bestTile[1])) <= 1){
                bestTarget = allies[i]
            }
        }
    }
    
    animateMove(enemy,bestPath)

    $(enemy.ref).promise().done(function(){
        enemy.moveto(bestTile[0],bestTile[1])
        if (bestTarget != null){
            enemy.attack(bestTarget.data())
            updateEnemyTileWeights()
            updateAllyTileWeights()
        }
    })
   
}

function enemyTurn(){
    //ENEMY TURN
    printLabel('ENEMY PHASE')
    allies.forEach(function(char){
        char.data().active = true
        $(char).find('img').attr('src','assets/images/Sprites/' + char.data().name + '.png')
    })
    updateEnemyTileWeights()

    var i = 0

    function moveNext(i){
        //Wait for each enemy to finish moving before moving onto the next enemy
        //Recursive promises
        if (i < enemies.length){
            bestMove(enemies[i].data())
            $('.character').promise().done(function(){
                moveNext(i)
            })
            i ++
        }
        else{
            setTimeout(function(){allyTurn()},1200)
        }
        
    }
    
    moveNext(i)
    updateAllyTileWeights()
    
}

function allyTurn(){
    printLabel('PLAYER PHASE')
    phase = 'ChooseCharacter' 
}



//////////////////ON CLICK///////////////
////CYCLES THROUGH PHASES 'ChooseCharacter' -> 'Move' -> 'Attack' 
// After attack checks if all allies have moved and if so, switch to the enemy turn and lockout clicks
$('.col').on('click',function(){
    
    if (phase === 'ChooseCharacter'){
        if (this.firstChild){
            if ($(this.firstChild).data().active && $(this.firstChild).data().ally){
                
                player = $(this.firstChild).data()
                showMoves(player)
                phase = 'Move'
                statupdate(player)
            }
            else if ($(this.firstChild).data().ally == false){
                target = $(this.firstChild).data()
                 showMoves(target)
                 phase = 'ShowEnemyMoves'
                 statupdate(target)
            }
        }
        
           
        else{}
    }
    
    else if (phase ==='ShowEnemyMoves'){
        //Same as ChooseCharacter but removes the 
        //possible moves of the target when selecting a new character
        removeMoves(target)
        if (this.firstChild){
            if ($(this.firstChild).data().active && $(this.firstChild).data().ally){
        
                player = $(this.firstChild).data()
                showMoves(player)
                phase = 'Move'
                statupdate(player)
            }
            else if ($(this.firstChild).data().ally == false){
                target = $(this.firstChild).data()
                    showMoves(target)
                    phase = 'ShowEnemyMoves'
                    statupdate(target)
            }
        }
    }
    else if (phase === 'Move'){
        removeMoves(player)
        var movetarget = parseID($(this).attr('id'), ',')
        if (player.moves[movetarget] != undefined){
            if (this.firstChild){
                if ($(this.firstChild).data().name == player.name){
                    phase = 'Attack'
                    showAttacks(player)
                }
                else{
                    phase = 'ChooseCharacter'
                }
            }
            
            else {
                animateMove(player,player.moves[movetarget].pathTaken)
                phase = 'Moving'
                $(player.ref).promise().done(function(){
                    player.moveto(+movetarget[0],+movetarget[1])
                    updateEnemyTileWeights()
                    phase = 'Attack'
                    showAttacks(player)
                })
                
            }
        }
        else{
            phase = 'ChooseCharacter'
        }
        
    }

    else if (phase == 'Attack'){
        removeAttacks(player)
        $(player.ref).find('img').attr('src','assets/images/Sprites/' + player.name + 'Grayed.png')
        player.active = false
        phase = 'ChooseCharacter'
        
        if (this.firstChild){
            target = $(this.firstChild).data()
            if (!(target.ally)){
                statupdate(target)
                if (indexOfa2Ina1(player.validattacks,target.pos) != -1){  
                player.attack(target)
                }
            }
        }

        if (allies.every(function(char){return (!char.data().active)})){
            phase = 'Enemy'
            setTimeout(function(){enemyTurn()},1200)
            // $(target.ref).promise().done(function(){enemyTurn()})
        }
            
    }
})



