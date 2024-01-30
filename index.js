const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)
const gravity = 0.7

class Sprite{
    constructor({ position,velocity })  {
    this.position = position 
    this.velocity = velocity
    this.height = 150
    this.width = 50
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        }

        update() {
            this.draw();
        
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        
            // Ground collision check should consider the current height of the sprite
            if (this.position.y + this.height + this.velocity.y >= canvas.height) {
                this.velocity.y = 0;
                this.position.y = canvas.height - this.height; // Adjust position to sit on ground
            } else {
                this.velocity.y += gravity;
            }
        }
}

const player = new Sprite({
    position:  
    {
    x:100,
    y:0
    },

    velocity:
    {
    x:0,
    y:0
    }
})

const enemy = new Sprite({
    position:  
    {
    x:874,
    y:0
    },

    velocity:
    {
    x:0,
    y:0
    }
})

console.log(player)

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    s:{
        pressed: false
    },
    AR:{
        pressed: false
    },
    AL:{
        pressed: false
    },
    AU:{
        pressed: false
    },
    AD:{
        pressed: false
    },
    m:{
        pressed: false
    },
    e:{
        pressed: false
    }
}
let lastkey

function animate(){
window.requestAnimationFrame(animate)
c.fillStyle= 'black'
c.fillRect(0,0,canvas.width,canvas.height)
player.update()
enemy.update()

// Player movement
const playerSpeed = 0.5;
const maxSpeed = 8;
let counter = 0;
let counterE = 0;

if (keys.a.pressed && player.velocity.x > -maxSpeed) {
    player.velocity.x -= playerSpeed;
} else if (keys.d.pressed && player.velocity.x < maxSpeed) {
    player.velocity.x += playerSpeed;
}

// Friction or deceleration player
if (!keys.a.pressed && !keys.d.pressed) {
    if (player.velocity.x > 0) player.velocity.x -= playerSpeed;
    if (player.velocity.x < 0) player.velocity.x += playerSpeed;
}

// Jumping
if (keys.w.pressed && player.position.y + player.height >= canvas.height) {
    player.velocity.y = -20;
}
//crouch
if (keys.s.pressed) {
    if (player.height !== 75) { // Check if not already crouching
        player.position.y += 75; // Move down to crouch
        player.height = 75;
    }
} else {
    if (player.height !== 150) { // Check if not already standing
        player.position.y -= 75; // Move up to stand
        player.height = 150;
    }
}

if (keys.AL.pressed && enemy.velocity.x > -maxSpeed) {
    enemy.velocity.x -= playerSpeed;
} else if (keys.AR.pressed && enemy.velocity.x < maxSpeed) {
    enemy.velocity.x += playerSpeed;
}

// Friction or deceleration enemy
if (!keys.AL.pressed && !keys.AR.pressed) {
    if (enemy.velocity.x > 0) enemy.velocity.x -= playerSpeed;
    if (enemy.velocity.x < 0) enemy.velocity.x += playerSpeed;
}

// Jumping
if (keys.AU.pressed && enemy.position.y + enemy.height >= canvas.height) {
    enemy.velocity.y = -20;
}
//crouch
if (keys.AD.pressed) {
    enemy.height = 75;
    if (counterE !== 1) {
        enemy.position.y += 75;
        counterE = 1;
    }
} else {
    enemy.height = 150;
    if (counterE !== 0) {
        enemy.position.y -= 75;
        counterE = 0;
    }
}
}


animate()

window.addEventListener('keydown', (event)=>{
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastkey ='d'
        break
        case 'a':
            keys.a.pressed = true
            lastkey ='a'
        break
        case 'w':
            keys.w.pressed = true
            lastkey ='w'
        break
        case 's':
            keys.s.pressed = true
            lastkey ='s'
        break
        case 'ArrowRight':
            keys.AR.pressed = true
            lastkeyE ='AR'
        break
        case 'ArrowUp':
            keys.AU.pressed = true
            lastkeyE ='AU'
        break
        case 'ArrowLeft':
            keys.AL.pressed = true
            lastkeyE ='AL'
        break
        case 'ArrowDown':
            keys.AD.pressed = true
            lastkeyE ='AD'
            break
        case 'm':
            keys.m.pressed = true
            lastkeyE ='m'
            break
        case 'e':
            keys.e.pressed = true
            lastkeyE ='e'
            break
    }
    console.log(event);
})

window.addEventListener('keyup', (event)=>{
    switch (event.key) {
        case 'd':
            keys.d.pressed = false 
        break
        case 'a':
            keys.a.pressed = false
        break
        case 'w':
            keys.w.pressed = false
        break
        case 's':
            keys.s.pressed = false
        break
        case 'ArrowRight':
            keys.AR.pressed = false 
        break
        case 'ArrowUp':
            keys.AU.pressed = false
        break
        case 'ArrowLeft':
            keys.AL.pressed = false
            break
        case 'ArrowDown':
            keys.AD.pressed = false
        break
        case 'm':
            keys.m.pressed = false
            break
        case 'e':
            keys.e.pressed = false
            break
    }
    console.log(event);
})