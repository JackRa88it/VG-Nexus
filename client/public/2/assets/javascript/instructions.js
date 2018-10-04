function changePage(){
    $('#instruction').html(instructions[index])
    if(index < 7){
        $('img').attr('src','assets/InstructionsImages/Page' + (index+1) + '.png')
    }
}

var index = 0
var instructions = ['The goal of the game is to defeat all enemies. Enemy characters[2] are colored in red with their stats appearing in box [3].Your characters[1] are colored in blue with their stats appearing in box [4].General messages and combat logs are displayed in box [5]',
'Clicking on a character will reveal their possible movement',
'Click on one of the blue tiles to move to that location. Clicking on a non blue tile will cancel your character choice.',
'Then click on one of the red tiles to select a target to attack. Clicking on an invalid target will pass your turn.',
'Click on an enemy to attack. If your attack does not defeat your opponent, he will counterattack.',
'If your attack defeats an opponent that character will receive exp. Upon reaching 100 exp your character levels up and gains an increase in movement, attack power, dodge, and hit.',
'After moving your character will be inactive for the remainder of the turn. Once all allies have moved the enemies will take their turn.',
'Good luck!']
changePage()

$('#btnLeft').on('click',function(){
    index = Math.max(0,index-1)
    changePage()
})

$('#btnRight').on('click',function(){
    index = Math.min(7,index+1)
    changePage()
})

