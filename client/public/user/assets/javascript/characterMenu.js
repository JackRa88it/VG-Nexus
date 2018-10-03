var characterMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function CharacterMenu(){
        Phaser.Scene.call(this, {key:'characterMenu'});
    },

    preload: function(){
        this.load.image('CharacterMenu','assets/images/Menus/CharacterMenu.png')
        this.load.image('Portrait',Chamomile.portrait)
    },

    create: function(){
        
        var background = this.add.image(120,80,'CharacterMenu')
        var portrait = this.add.image(56,54,'Portrait')
    }

})