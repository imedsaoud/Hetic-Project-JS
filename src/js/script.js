var character;

setTimeout(() => {
    var playBtn = document.querySelector('.home__play');
    playBtn.addEventListener('click', function () {
        oxo.screens.loadScreen('game', function () {
            game();
        })
    })
}, 100);

document.addEventListener('keypress', (event) => {
    switch (event.key) {
        case "a":oxo.screens.loadScreen('game', function(){game();});
        break;
        case "b":oxo.screens.loadScreen('game2', function(){game2();});
        break;
        case "c":oxo.screens.loadScreen('game3', function(){game3();});
        break;
    }
});

oxo.inputs.listenKey('enter', function() {
    oxo.screens.loadScreen('game', function(){
        game();
    })
});

//level 1
function game() {
    //creation des obstacles: bus, crs, tank etc
    createObstacles();
    //initialisation des variables
    character = document.querySelector('.game__character');
    var finishline = document.querySelector('.game__finishline');
    var obstacles = document.querySelectorAll('.game__obstacle');
    var yellowjacket = document.getElementById('yellowjacket');
    var water = document.querySelector('.water');
    var enemies = document.querySelectorAll('.game__enemy');
    var cap = document.getElementById('cap');
    var scorejacket = 0;
    var scorecap = 0;
    var falsebarier = document.querySelector('.false__barier');
    var audio = document.getElementById('sound');
    //bouger character avec les keys directionnelles
    oxo.animation.moveElementWithArrowKeys(character, 150);
    //Si collision avec le gilet jaune
    oxo.elements.onCollisionWithElementOnce(character, yellowjacket, function () {
        //on supprime l'element et on l'ajout à l'inventaire
        scorejacket = 1;
        audio.play();
        yellowjacket.classList.add('invisible');
        document.querySelector('.game__score--jacket').innerText = "Gilet jaune : " + scorejacket + "/1";
    });

    oxo.elements.onCollisionWithElementOnce(character, cap, function () {
        //on supprime l'element et on l'ajout à l'inventaire
        scorecap = 1;
        audio.play();
        cap.classList.add('invisible');
        document.querySelector('.game__score--cap').innerText = "Bonnet : " + scorecap + "/1";
    });

    // Si tous les objets récoltés
    setInterval(function () {
        if (scorecap == 1 && scorejacket == 1) {
            finishline.classList.remove('game__barriere');
            falsebarier.classList.add('is-open');

        };
    }, 500)

    //Si collision entre character et ligne d'arrivée
    oxo.elements.onCollisionWithElement(character, finishline, function () {
        if (scorecap == 1 && scorejacket == 1) {
                oxo.screens.loadScreen('game2', function () {
                    game2();
                });
        };
    });

    //Si collision entre ennemis et character game over
    enemies.forEach(element => {
        oxo.elements.onCollisionWithElementOnce(character, element, function () {
            //le niveau est fini
            console.log('niveau fini');
            oxo.screens.loadScreen('lost');
        });
    })

};
// creation elements niveau 1
function createObstacles() {
    //Personnage principal
    var charater = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__character', // optional,
        obstacle: false, // optional,
        styles: { // optional
            transform: 'translate(640px, 600px)'
        },
        appendTo: 'body' // optional
    });

    //finishline 
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__barriere game__finishline', // optional,
        obstacle: false, // optional,
        styles: { // optional
            transform: 'translate(550px, 200px)'
        },
        appendTo: 'body' // optional
    });

    createBus(626, 400, -90);
    createBus(850, 400, -90);
    createBus(700, 250, -90);
    createBusAir(470,116,0);
    createBusAir(470,347,0);
    createBusAir(400, 578, 0);
    createBusAir(780, 0, 0);
    createBusAir(1000, 325, 0);

    //poubelles
    createTrash(550, 335);


    // fausse barrière
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'false__barier game__barriere', // optional,
        obstacle: true, // optional,
        styles: { // optional
            transform: 'translate(550px, 200px)'
        },
        appendTo: 'body' // optional
    });

    //Barrière 
    createBarriere(660, 100, 90);
    createBarriere(855, 0, 0);
    createBarriere(1065, 0, 0);
    createBarriere(1170, 50, 90);
    createBarriere(1170, 250, 90);
    createBarriere(1170, 450, 90);
    createBarriere(1170, 650, 90);
    createBarriere(1070, 780, 0);
    createBarriere(870, 780, 0);
    createBarriere(670, 780, 0);
    createBarriere(470, 780, 0);

    //Ennemi/crs
    createCrs(1250, 500, 'move1', 0.5);
    createCrs(1250, 330, 'move2', 0.5);
    createCrs(700, 220, 'move3', 0.5);
    createCrs(950, 335, 'move4', 0.5);

}

//Fonction niveau 2
function game2() {

    //creation des obstacles: bus, crs, tank etc
    createObstacles2();
    //initialisation des variables
    character = document.querySelector('.game__character');
    var finishline = document.querySelector('.game__finishline');
    var obstacles = document.querySelectorAll('.game__obstacle');
    var water = document.querySelector('.water');
    var enemies = document.querySelectorAll('.game__enemy');
    var megaphone = document.getElementById('megaphone');
    var cone = document.getElementById('cone');
    var sign = document.getElementById('sign');
    var scorecone = 0;
    var scoremegaphone = 0;
    var scoresign = 0;
    var falsebarier = document.querySelector('.false__barier');
    var audio = document.getElementById('sound');

    //bouger character avec les keys directionnelles
    oxo.animation.moveElementWithArrowKeys(character, 150);

    // Si tous les objets récoltés
    setInterval(function () {
        if (scorecone == 1 && scoremegaphone == 1 && scoresign == 1) {
            finishline.classList.remove('game__barriere--short');
            falsebarier.classList.add('is-open');
        };
    }, 500)

    //Si collision entre character et ligne d'arrivée
    oxo.elements.onCollisionWithElement(character, finishline, function () {
        if (scorecone == 1 && scoremegaphone == 1 && scoresign == 1) {
            oxo.screens.loadScreen('game3', function () {
                game3();
            });
        };
    });

    //on supprime l'element et on l'ajoute à l'inventaire
    //Ajout du megaphone
    oxo.elements.onCollisionWithElementOnce(character, megaphone, function () {
        scoremegaphone = 1;
        audio.play();
        megaphone.classList.add('invisible');
        document.querySelector('.game__score--megaphone').innerText = "Megaphone : " + scoremegaphone + "/1";
    });
    //Ajout du megaphone
    oxo.elements.onCollisionWithElementOnce(character, cone, function () {
        scorecone = 1;
        audio.play();
        cone.classList.add('invisible');
        document.querySelector('.game__score--cone').innerText = " Cone de signalisation : " + scorecone + "/1";
    });
    //Ajout du panneau
    oxo.elements.onCollisionWithElementOnce(character, sign, function () {
        scoresign = 1;
        audio.play();
        sign.classList.add('invisible');
        document.querySelector('.game__score--sign').innerText = " Panneau : " + scoresign + "/1";
    });

    //Si collision entre ennemis et character game over
    enemies.forEach(element => {
        oxo.elements.onCollisionWithElementOnce(character, element, function () {
            //le niveau est fini
            console.log('niveau fini');
            oxo.screens.loadScreen('lost');
        });
    })

};

// Création des Élements du niveau 2
function createObstacles2() {
    //Personnage principal
    var character = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__character', // optional,
        obstacle: false, // optional,
        styles: { // optional
            transform: 'translate(120px, 710px)'
        },
        appendTo: 'body' // optional
    });


    //finishline              
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__barriere--short game__finishline', // optional,
        obstacle: false, // optional,
        styles: { // optional
            transform: 'translate(550px, 150px)'
        },
        appendTo: 'body' // optional
    });
    // fausse barrière
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'false__barier game__barriere--short', // optional,
        obstacle: true, // optional,
        styles: { // optional
            transform: 'translate(550px, 150px)'
        },
        appendTo: 'body' // optional
    });

    // bus/voiture
    createBusAir(470, 80, 0);
    createBusAir(275, 440, 0);
    createBusAir(793, 250, 0);
    createBus(700, 399, -90);
    createBus(1100, 599, -90);
    createBus(800, 0, -90);

    //trash
    createTrash(849, 468);
    createTrash(300, 368);
    createTrash(480, 310);

    //Barrière 
    createBarriere(0, 60, 0);
    createBarriere(205, 60, 0);
    createBarriere(882, 60, 0);
    createBarriere(1080, 60, 0);
    createBarriere(1070, 780, 0);
    createBarriere(870, 780, 0);
    createBarriere(670, 780, 0);
    createBarriere(470, 780, 0);
    createBarriere(270, 780, 0);
    createBarriere(70, 780, 0);
    createBarriere(-130, 780, 0);
    createBarriere(1170, 270, 90);
    createBarriere(1170, 470, 90);
    createBarriere(1170, 670, 90);

    createBarriereShort(410, 60, 0);

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__barriere--shortest', // optional,
        obstacle: true, // optional,
        styles: { // optional
            transform: 'translate(670px, 90px) rotate(90deg)'
        },
        appendTo: 'body' // optional
    });

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__barriere--shortest', // optional,
        obstacle: true, // optional,
        styles: { // optional
            transform: 'translate(1229px, 120px) rotate(90deg)'
        },
        appendTo: 'body' // optional
    });

    createBarriereShort(725, 60, 0);

    //Ennemi/crs
    createCrs(490, 520, 'move5', 0.5);
    createCrs(1020, 490, 'move6', 0.5);
    createCrs(0, 570, 'move7', 0.5);
    createCrs(0, 485, 'move8', 0.5);
    createCrs(240, 520, 'move9', 0.5);    
    createCrs(240, 440, 'move10', 0.5);
    createCrs(0, 400, 'move11', 0.5);
    createCrs(370, 500, 'move12', 0.8);
    createCrs(240, 610, 'move13', 0.5);
    createCrs(560, 500, 'move14', 0.8);    
    createCrs(1070, 625, 'move15', 0.5);
    createCrs(1070, 100, 'move16', 0.5);
    createCrs(220, 90, 'move17', 0.5);

    // ennemi smoke
    createSmoke(890, 400, character);
    createSmoke(1080, 400, character);
    createSmoke(980, 400, character);
    createSmoke(1170, 400, character);
    createSmoke(555, 180, character);
    createSmoke(630, 180, character);
    createSmoke(690, 180, character);
    createSmoke(555, 250, character);
    createSmoke(630, 250, character);
    createSmoke(690, 250, character);
    createSmoke(275, 96, character);
    createSmoke(275, 151, character);
    createSmoke(275, 300, character);
    createSmoke(275, 230, character);
    createSmoke(457, 584, character);
    createSmoke(457, 649, character);
    createSmoke(457, 713, character);
    createSmoke(1170, 320, character);
    createSmoke(1080, 320, character);
    createSmoke(1170, 230, character);
    createSmoke(1080, 230, character);

    var smokes = document.querySelectorAll('.game__smoke');
    smokes.forEach(smoke => {
        setInterval(function () { setDeadlySmoke(smoke); }, 4000);
        
    })
}

//Niveau 3

function game3() {
    createElements3();

    var character = document.querySelector('.game__character');
    var water = document.querySelector('.water');
    var enemies = document.querySelectorAll('.game__enemy');
    var obstacles = document.querySelectorAll('.game__obstacle');
    var fumi = document.querySelector('.game__fumi');
    var pave = document.querySelector('.game__pave');
    var scorepave = 0;
    var scorefumi = 0;
    var textpave = document.getElementById('pave');
    var textfumi = document.getElementById('fumi');
    var finishline = document.querySelector('.game__finishline');
    var falsebarier = document.querySelector('.false__barier');
    var audio = document.getElementById('sound');

    oxo.animation.moveElementWithArrowKeys(character, 150);

    //Si collision entre ennemis et character game over
    enemies.forEach(element => {
        oxo.elements.onCollisionWithElementOnce(character, element, function () {
            //le niveau est fini
            console.log('niveau fini');
            oxo.screens.loadScreen('lost');
        });
    });

    oxo.elements.onCollisionWithElementOnce(character, pave, function () {
        pave.classList.add('invisible');
        audio.play();
        scorepave++;
        textpave.innerHTML = 'Pave: 1/1';
    });
    oxo.elements.onCollisionWithElementOnce(character, fumi, function () {
        fumi.classList.add('invisible');
        audio.play();
        scorefumi++;
        textfumi.innerHTML = 'Fumigene: 1/1';
    });

    // Si tous les objets récoltés

    setInterval(function () {
        if (scorepave == 1 && scorefumi == 1) {
            console.log("items ok");
            finishline.classList.remove('game__barriere--short');
            falsebarier.classList.add('is-open');
        };
    }, 500)

    //Si collision entre character et ligne d'arrivée
    oxo.elements.onCollisionWithElement(character, finishline, function () {
        if (scorepave == 1 && scorefumi == 1) {
            oxo.screens.loadScreen('end', function () {
                end();
            });
        };
    });

}

function createElements3() {
    //character
    var character = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__character', // optional,
        obstacle: false,
        styles: {
            transform: 'translate(60px, 700px)'
        },
        appendTo: 'body' // optional
    }); 

    //objectifs
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__pave', // optional,
        obstacle: false,
        appendTo: 'body' // optional
    });

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__fumi', // optional,
        obstacle: false,
        appendTo: 'body' // optional
    });

    //tank
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__tank', // optional,
        obstacle: true,
        styles: {
            transform: 'translate(168px, 569px) scaleX(-1)'
        },
        appendTo: 'body' // optional
    });

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'water game__enemy', // optional,
        appendTo: 'div.game__tank' // optional
    });

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__tank second', // optional,
        obstacle: true,
        styles: {
            transform: 'translate(647px, 404px)',
            animation: 'move34 1s infinite alternate linear'
        },
        appendTo: 'body' // optional
    });

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'water game__enemy',
        appendTo: '.second' // optional
    });

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__tank fourth', // optional,
        obstacle: true,
        styles: {
            transform: 'translate(993px, 176px) scaleX(-1)'
        },
        appendTo: 'body' // optional
    });

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'water game__enemy',
        appendTo: '.fourth' // optional
    });

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__tank last', // optional,
        obstacle: true,
        styles: {
            transform: 'translate(1000px, 540px) scaleX(-1)'
        },
        appendTo: 'body' // optional
    });

    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'water game__enemy',
        appendTo: '.last' // optional
    });

    //bus/voitures
    createBus(84, 263, -90);
    createBus(448, 253, -90);
    createBusAir(618, 498, 0);
    
    //crs
    createCrs(262, 369, 'move31', 0.8); 
    createCrs(750, 500, 'move32', 0.5);
    createCrs(950, 226, 'move33', 0.5);
    createCrs(170, 665, 'move500', 0.3);

    //poubelles
    createTrash(243, 509);
    createTrash(606, 359);
    createTrash(686, 650);
    createTrash(245, 307);
    createTrash(295, 320);
    createTrash(790, 340);
    createTrash(790, 280);
    createTrash(790, 220);

    //barriere
    createBarriere(5, 138, 0);
    createBarriere(210, 138, 0);
    createBarriere(730, 138, 0);
    createBarriere(883, 138, 0);
    createBarriere(1080, 138, 0);
    createBarriere(1070, 780, 0);
    createBarriere(870, 780, 0);
    createBarriere(670, 780, 0);
    createBarriere(470, 780, 0);
    createBarriere(270, 780, 0);
    createBarriere(70, 780, 0);
    createBarriere(-130, 780, 0);
    createBarriere(1170, 350, 90);
    createBarriereShort(1190, 690, 90);
    createBarriereShort(410, 138, 0);
    
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__barriere--shortest', // optional,
        obstacle: true, // optional,
        styles: { // optional
            transform: 'translate(1229px, 490px) rotate(90deg)'
        },
        appendTo: 'body' // optional
    });

    //finishline              
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__barriere--short game__finishline', // optional,
        obstacle: false, // optional,
        styles: { // optional
            transform: 'translate(570px, 138px)'
        },
        appendTo: 'body' // optional
    });

    // fausse barrière
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'false__barier game__barriere--short', // optional,
        obstacle: true, // optional,
        styles: { // optional
            transform: 'translate(570px, 138px)'
        },
        appendTo: 'body' // optional
    });

    //smokes
    createSmoke(330, 400, character);
    createSmoke(420, 400, character);
    createSmoke(510, 480, character);
    createSmoke(330, 480, character);
    createSmoke(420, 480, character);
    createSmoke(380, 700, character);
    createSmoke(490, 700, character);
    createSmoke(490, 620, character);
    createSmoke(490, 540, character);
    createSmoke(970, 420, character);
    createSmoke(1070, 420, character);
    createSmoke(1170, 420, character);
    createSmoke(400, 160, character);
    createSmoke(400, 260, character);
    createSmoke(300, 160, character);
    createSmoke(300, 260, character);
    createSmoke(200, 160, character);
    createSmoke(200, 260, character);
    createSmoke(100, 260, character);
    createSmoke(5, 160, character);

    var smokes = document.querySelectorAll('.game__smoke');
    smokes.forEach(smoke => {
        setInterval(function () { setDeadlySmoke(smoke); }, 4000);
    })
}

//Gestion des smokes

function setDeadlySmoke(smoky) {
    setTimeout(function () {
        smoky.classList.remove('game__enemy--smoke');
    }, 300);
    setTimeout(function () {
        smoky.classList.add('game__enemy--smoke');
    }, 2900);
}

//Fonctions de génération des différents elements utilisés

function createBarriere(x, y, deg){
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__barriere', // optional,
        obstacle: true, // optional,
        styles: { // optional
            transform: 'translate(' + x + 'px, ' + y +'px) rotate(' + deg + 'deg)'
        },
        appendTo: 'body' // optional
    });
}

function createBarriereShort(x, y, deg){
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__barriere--short', // optional,
        obstacle: true, // optional,
        styles: { // optional
            transform: 'translate(' + x + 'px, ' + y +'px) rotate(' + deg + 'deg)'
        },
        appendTo: 'body' // optional
    });
}

function createCrs(x, y, anim, time){
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__enemy crs',
        styles: {
            transform: 'translate(' + x + 'px, ' + y + 'px)',
            animation: anim +' ' + time+'s infinite alternate linear'
        },
        appendTo: 'body' // optional
    });    
}

function createTrash(x, y){
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__trash',
        obstacle: true,
        styles: {
            transform: 'translate(' + x + 'px, ' + y + 'px)',
        },
        appendTo: 'body' // optional
    });
}

function createBus(x, y, deg){
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__obstacle', // optional,
        obstacle: true,
        styles: {
            transform: 'translate(' + x + 'px, ' + y + 'px) rotate(' + deg + 'deg)'
        },
        appendTo: 'body' // optional
    });
}

function createBusAir(x, y, deg){
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__obstacle--air', // optional,
        obstacle: true,
        styles: {
            transform: 'translate(' + x + 'px, ' + y + 'px) rotate(' + deg + 'deg)'
        },
        appendTo: 'body' // optional
    });
}

function createSmoke(x, y, character) {
    var element = oxo.elements.createElement({
        type: 'div', // optional
        class: 'game__smoke game__enemy--smoke', // optional,
        styles: { // optional
            left: x + 'px',
            top: y + 'px',
            // transform: 'translate(' + x + 'px, ' + y + 'px)'
        },
        appendTo: 'body' // optional
    });
    
    oxo.elements.onCollisionWithElement(character, element, function() {
        console.log(element.classList.contains('game__enemy--smoke'))
        if (element.classList.contains('game__enemy--smoke')) {
            oxo.screens.loadScreen('lost');
        }
        
    });    
}