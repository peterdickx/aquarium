"use strict";
import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let xPositions = [];
let yPositions = [];
let sizes = [];

let xFish = [];
let yFish = [];
let sizeFish = [];
let speedFish = [];
let directionFish = [];
let hueFish = [];

let frameCount = 0;

setup();
update();

function setup() {
    xPositions[0] = width / 2;
    yPositions[0] = height - 100;
    sizes[0] = 5;

    for (let i = 0; i < 15; i++) {
        xFish[i] = Utils.randomNumber(50, width - 50);
        yFish[i] = Utils.randomNumber(50, height - 250);
        sizeFish[i] = Utils.randomNumber(10, 75);
        speedFish[i] = Utils.randomNumber(1, 3);
        directionFish[i] = Utils.randomNumber(0, 1);
        hueFish[i] = Utils.randomNumber(10, 50);

    }
}

function update() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "beige";
    context.fillRect(0, height - 150, width, 150);
    frameCount++;
    drawFish();
    if (frameCount % 20 == 0) {
        xPositions[xPositions.length] = width / 2;
        yPositions[yPositions.length] = height - 75;
        sizes[sizes.length] = Utils.randomNumber(1, 5);
    }

    if (frameCount % 20 == 0) {
        xPositions[xPositions.length] = width / 2 - width / 4;
        yPositions[yPositions.length] = height - 125;
        sizes[sizes.length] = Utils.randomNumber(1, 5);
    }

    if (frameCount % 20 == 0) {
        xPositions[xPositions.length] = width / 2 + width / 4;
        yPositions[yPositions.length] = height - 100;
        sizes[sizes.length] = Utils.randomNumber(1, 5);
    }

    for (let i = 0; i < sizes.length; i++) {
        xPositions[i] += Utils.randomNumber(-1, 1);
        yPositions[i] -= 1;
        sizes[i] += 0.05;
        drawBubble(xPositions[i], yPositions[i], sizes[i], 180, 50 - sizes[i]);
    }

    for (let i = 0; i < xFish.length; i++) {
        if (xFish[i] >= width - sizeFish[i]) {
            directionFish[i] = false;
        } else if (xFish[i] <= sizeFish[i]) {
            directionFish[i] = true;
        }


        if (directionFish[i] == true) {
            xFish[i] += speedFish[i];
        } else {
            xFish[i] -= speedFish[i];
        }
        drawFish(xFish[i], yFish[i], sizeFish[i], directionFish[i], hueFish[i]);
    }
    requestAnimationFrame(update);
}

function drawBubble(x, y, size, hue, alpha) {
    context.fillStyle = Utils.hsla(hue, 50, 50, alpha);
    Utils.fillCircle(x, y, size);
    context.fillStyle = Utils.hsla(hue, 50, 75, alpha);
    Utils.fillCircle(x + size / 3, y - size / 3, size / 4);
}

function drawFish(x, y, size, direction, hue) {
    context.fillStyle = Utils.hsl(hue, 80, 50);
    Utils.fillEllipse(x, y, size * 0.75, size / 2);
    if (direction == true) {
        context.moveTo(x, y);
        context.lineTo(x - size * 1.5, y - size / 2);
        context.lineTo(x - size * 1.5, y + size / 2);
        context.fill();
        context.fillStyle = "black";
        Utils.fillCircle(x + size / 2, y - size / 4, size / 20);
    } else {
        context.moveTo(x, y);
        context.lineTo(x + size * 1.5, y - size / 2);
        context.lineTo(x + size * 1.5, y + size / 2);
        context.fill();
        context.fillStyle = "black";
        Utils.fillCircle(x - size / 2, y - size / 4, size / 20);
    }

}