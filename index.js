
function Bot(opts) {

  this.div;
  this.opts = opts;

  this.div = document.createElement('div');

  this.div.style.position = 'absolute';
  this.div.style.backgroundColor = this.opts.color;
  this.div.style.height = this.opts.size + 'px';
  this.div.style.width = this.opts.size + 'px';

  this.div.style.marginLeft = this.opts.x + 'px';
  this.div.style.marginTop = this.opts.y + 'px';

  this.reverse = function () {
    this.opts.xDirection = this.opts.xDirection * -1;
    this.opts.yDirection = this.opts.yDirection * -1;
  }

  this.move = function () {

    this.opts.x = this.opts.x + (this.opts.xDirection * this.opts.speed);
    this.div.style.marginLeft = this.opts.x + 'px';

    this.opts.y = this.opts.y + (this.opts.yDirection * this.opts.speed);
    this.div.style.marginTop = this.opts.y + 'px';

  }

}

function DivBots(opts) {

  this.opts = opts;
  bots = [];

  var div = null;

  div = document.getElementById('divbots');

  var spacing = div.clientWidth / this.opts.rows;

  var currentX = spacing;
  var currentY = spacing;

  for (var i = 0; i < this.opts.numberOfBots; i++) {

    var direction = 0;

    var xDirection = 0;
    var yDirection = 0;

    if (Math.floor(Math.random() * 2) === 0) {
      direction = 1;
    }
    else {
      direction = -1;
    }

    if (Math.floor(Math.random() * 2)) {
      xDirection = direction;
    }
    else {
      yDirection = direction;
    }

    var botOpts = {
      x: currentX - (this.opts.size / 2),
      y: currentY - (this.opts.size / 2),
      xDirection: xDirection,
      yDirection: yDirection,
      speed: this.opts.speed,
      size: this.opts.size,
      color: this.opts.color
    }

    var bot = new Bot(botOpts);

    div.appendChild(bot.div);

    bots.push(bot);

    currentX += spacing;
    if (currentX + this.opts.size >= div.clientWidth) {
      currentX = spacing;
      currentY += spacing;
    }

  }

  this.move = function () {

    for (var i = 0; i < bots.length; i++) {

      var currentBot = bots[i];

      var contact = false;

      for (var l = 0; l < bots.length; l++) {
        if (i !== l) {
          if (didContactBot(currentBot, bots[l])) {
            contact = true;
          }
        }
      }

      if (didContactDiv(currentBot)) {
        contact = true;
      }

      if (contact) {
        currentBot.reverse();
      }

    }

    for (var i = 0; i < bots.length; i++) {
      bots[i].move();
    }

  }

  function didContactBot(bot, anotherBot) {

    var points = [
      {x: bot.opts.x, y: bot.opts.y},
      {x: bot.opts.x + bot.opts.size, y: bot.opts.y},
      {x: bot.opts.x + bot.opts.size, y: bot.opts.y + bot.opts.size},
      {x: bot.opts.x, y: bot.opts.y + bot.opts.size}
    ];

    for (var i = 0; i < points.length; i++) {
      if (points[i].x >= anotherBot.opts.x && points[i].x <= anotherBot.opts.x + anotherBot.opts.size) {
        if (points[i].y >= anotherBot.opts.y && points[i].y <= anotherBot.opts.y + anotherBot.opts.size) {
          return true;
        }
      }
    }

    return false;
  }

  function didContactDiv(bot) {

    if (bot.opts.xDirection === 1) {
      if (bot.opts.x + bot.opts.size > div.clientWidth) {
        return true;
      }
    }

    if (bot.opts.xDirection === -1) {
      if (bot.opts.x < 0) {
        return true;
      }
    }

    if (bot.opts.yDirection === 1) {
      if (bot.opts.y + bot.opts.size > div.clientHeight) {
        return true;
      }
    }

    if (bot.opts.yDirection === -1) {
      if (bot.opts.y < 0) {
        return true;
      }
    }

    return false;
  }

}
