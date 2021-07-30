Shifty.ShapeBuilder = (function () {
  let gap          = 13,
      shapeCanvas  = document.createElement('canvas'),
      shapeContext = shapeCanvas.getContext('2d'),
      fontSize     = 500,
      fontFamily   = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif';

  function fit () {
    shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
    shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
    shapeContext.fillStyle = 'red';
    shapeContext.textBaseline = 'middle';
    shapeContext.textAlign = 'center';
  }

  function processCanvas () {
    let pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data,
        dots   = [],
        x      = 0,
        y      = 0,
        fx     = shapeCanvas.width,
        fy     = shapeCanvas.height,
        w      = 0,
        h      = 0;

    for (let p = 0; p < pixels.length; p += (4 * gap)) {
      if (pixels[p + 3] > 0) {
        dots.push(new Shifty.Point({
          x: x,
          y: y
        }));

        w = x > w ? x : w;
        h = y > h ? y : h;
        fx = x < fx ? x : fx;
        fy = y < fy ? y : fy;
      }

      x += gap;

      if (x >= shapeCanvas.width) {
        x = 0;
        y += gap;
        p += gap * 4 * shapeCanvas.width;
      }
    }

    return { dots: dots, w: w + fx, h: h + fy };
  }

  function setFontSize (s) {
    shapeContext.font = 'bold ' + s + 'px ' + fontFamily;
  }

  function isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  return {
    init: function () {
      fit();
      window.addEventListener('resize', fit);
    },

    imageFile: function (url, callback) {
      let image = new Image(),
          a     = Shifty.Drawing.getArea();

      image.onload = function () {
        shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
        shapeContext.drawImage(this, 0, 0, a.h * 0.6, a.h * 0.6);
        callback(processCanvas());
      };

      image.onerror = function () {
        callback(Shifty.ShapeBuilder.letter('What?'));
      };

      image.src = url;
    },

    circle: function (d) {
      let r = Math.max(0, d) / 2;
      shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
      shapeContext.beginPath();
      shapeContext.arc(r * gap, r * gap, r * gap, 0, 2 * Math.PI, false);
      shapeContext.fill();
      shapeContext.closePath();

      return processCanvas();
    },

    letter: function (l) {
      let s = 0;

      setFontSize(fontSize);
      s = Math.min(fontSize,
        (shapeCanvas.width / shapeContext.measureText(l).width) * 0.8 * fontSize,
        (shapeCanvas.height / fontSize) * (isNumber(l) ? 1 : 0.45) * fontSize);
      setFontSize(s);

      shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
      shapeContext.fillText(l, shapeCanvas.width / 2, shapeCanvas.height / 2);

      return processCanvas();
    },

    rectangle: function (w, h) {
      let dots   = [],
          width  = gap * w,
          height = gap * h;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          dots.push(new Shifty.Point({
            x: x,
            y: y,
          }));
        }
      }

      return { dots: dots, w: width, h: height };
    }
  };
}());
