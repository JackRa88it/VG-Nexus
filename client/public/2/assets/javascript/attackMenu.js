var attackMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function AttackMenu(){
        Phaser.Scene.call(this, {key:'attackMenu'});
    },

    preload: function(){
        this.load.image('AttackMenu','assets/images/Menus/AttackMenu.png')
        
    },

    create: function(){
        // this.scene.pause('attackMenu')//Load scene and then immediately pause it
        // this.scene.moveDown('attackMenu')
        var image = this.add.image(204,56,'AttackMenu')
        var _this = this;
        
        var attack = this.add.text(186,16,'Attack',{fontFamily: 'Arial',fontSize: '8px',color: '#00ff00' })
        var wait = this.add.text(186,32,'Wait',{fontFamily: 'Arial',fontSize: '8px',color: '#ffffff' })
        var shelter = this.add.text(186,48,'Rescue',{fontFamily: 'Arial',fontSize: '8px', color: '#ffffff'})
        var item = this.add.text(186,64,'Item',{fontFamily: 'Arial',fontSize: '8px', color: '#ffffff'})

        var pointer = 0
        var choiceArray = [attack,wait,shelter,item]

        this.input.keyboard.on('keydown_DOWN', function(event){
            pointer++;
            if (pointer > 3){pointer = 0};
            for(var i = 0;i<choiceArray.length;i++){
                choiceArray[i].setColor('#ffffff')
            };
            choiceArray[pointer].setColor('#00ff00')
        })

        this.input.keyboard.on('keydown_UP',function(event){
            pointer--;
            if(pointer<0){pointer = 3};
            for(var i = 0;i<choiceArray.length;i++){
                choiceArray[i].setColor('#ffffff')
            };
            choiceArray[pointer].setColor('#00ff00')
        })
        
        this.input.keyboard.on('keydown_Z', function(event){
            delete activeQueue[charTarget.name]
            _this.scene.stop('attackMenu')//looks like stop doesn't trigger until the end of create
            if (pointer == 0){//Attack
                console.log('attackstats')
                
                _this.scene.run('attackStats')
            }
            else if (pointer == 1){//Wait
                delete activeQueue[charTarget.name]
                charTarget.img.setTexture(charTarget.name + 'Grayed')
                colorBlue.clear(true,true)
                colorRed.clear(true,true)
                setTimeout(function(){
                    phase = 'choose'
               },100)
            }

        })

    }
})

