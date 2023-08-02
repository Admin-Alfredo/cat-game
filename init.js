const game = new Phaser.Game(800, 500, Phaser.CANVAS, null)
var blocks, relvas,senas, player, keys;
var map = [
    [3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0],//0,0 - 0,1
    [3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0],
    [3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]
game.state.add('inicio',{
    preload(){
        game.load.image('background','img/background.png');
        game.load.image('block','img/block.png');
        game.load.image('relva','img/relva2.png');
        game.load.image('sena','img/sena.png')
        game.load.spritesheet('player', 'img/sprite-2.png',44,60)
    },
    create(){
        keys = game.input.keyboard.createCursorKeys()
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.image(0,0,'background');
       
        //DIFININDO GROUPOS DE BLOCOS key 1
        blocks = game.add.group()
        blocks.enableBody = true
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if(map[i][j] === 1){
                    var block = blocks.create(j * 60,i * 60,'block')
                    block.body.immovable = true
                };
            }
        }
        //DIFINDO GROUPOS DE RELVA key 2
        relvas = game.add.group()
        relvas.enableBody = true;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if(map[i][j] === 2){
                    var relva = relvas.create(j * 50,i * 60 ,'relva')
                    relva.body.immovable = true
                };
            }
        }
         //DIFININDO GROUPOS DE SENA key 3
         senas = game.add.group()
         senas.enableBody = true;
         for (let i = 0; i < map.length; i++) {
             for (let j = 0; j < map[i].length; j++) {
                 if(map[i][j] === 3){
                     var sena = senas.create(j * 100,i * 60,'sena')
                     sena.body.immovable = true
                 };
             }
         }
         player = game.add.sprite(100, game.world.height - 150, 'player')
         game.physics.arcade.enable(player);
         player.body.gravity.y = 500;
         player.body.collideWorldBounds = true;
         player.body.bounce.y = .1; 
         player.animations.add('left',[0,1,2], 10,true)
         player.animations.add('right',[0,1,2],10,true)
    },
    update(){
        game.physics.arcade.collide(player, relvas);
        game.physics.arcade.collide(player, senas);
        game.physics.arcade.collide(player, blocks);
        
        player.body.velocity.x = 0;
        if(keys.left.isDown){
            player.body.velocity.x = -175;
            player.animations.play('left')
        }else if(keys.right.isDown){
            player.body.velocity.x = 175;
            player.animations.play('right')
        }else{
            player.animations.stop();
            player.frame = 2;
        }
        if(!player.body.touching.down){
            player.animations.stop();
            player.frame = 2;
        }
        if(keys.up.isDown && player.body.touching.down){
            player.body.velocity.y = -300
            player.animations.stop();
            player.frame = 2;
        }
    }
})
game.state.start('inicio')