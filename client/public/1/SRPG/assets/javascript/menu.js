var menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function menu(){
        Phaser.Scene.call(this, {key:'menu'});
    },

    preload: function(){
        this.load.image('menu','assets/images/Menus/attackMenu.png')
        
    },

    create: function(){
        // this.scene.pause('menu')//Load scene and then immediately pause it
        // this.scene.moveDown('menu')
        var image = this.add.image(204,56,'menu')
        var _this = this;
        
        var end = this.add.text(186,16,'End Turn',{fontFamily: 'Arial',fontSize: '8px',color: '#00ff00' })
        var stats = this.add.text(186,32,'Status',{fontFamily: 'Arial',fontSize: '8px',color: '#ffffff' })


        var pointer = 0
        var choiceArray = [end,stats]

        this.input.keyboard.on('keydown_DOWN', function(event){
            pointer++;
            if (pointer > choiceArray.length){pointer = 0};
            for(var i = 0;i<choiceArray.length;i++){
                choiceArray[i].setColor('#ffffff')
            };
            choiceArray[pointer].setColor('#00ff00')
        })

        this.input.keyboard.on('keydown_UP',function(event){
            pointer--;
            if(pointer<0){pointer = choiceArray.length - 1};
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

