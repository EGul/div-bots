# div-bots
programmable div bots

## Usage
### HTML
```html
<!doctype html>
<html>

  <head>

  </head>

  <body>

    <div id='divbots' style='height: 500px; width: 500px'></div>

    <script type='text/javascript' src='index.js'></script>
  </body>

</html>
```

### JS
```js
var opts = {
  numberOfBots: 50,
  size: 10,
  rows: 10,
  speed: 1
  color: 'black'
}

var divBots = new DivBots(opts);

setInterval(function () {
  divBots.move();
}, 25)
```

## Install
```
git clone https://github.com/egul/div-bots.git
```
Move index.js to project

## License
MIT
