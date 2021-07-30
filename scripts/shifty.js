/*
 * Shifty
 * by Warren Galyen
 * https://github.com/treetop-playground/shifty
 * A canvas experiment
 */

'use strict';

let Shifty = {
  init: function () {
    let action = window.location.href,
        i      = action.indexOf('?a=');

    Shifty.Drawing.init('.canvas');
    Shifty.ShapeBuilder.init();
    Shifty.UI.init();
    document.body.classList.add('body--ready');

    if (i !== -1) {
      Shifty.UI.simulate(decodeURI(action).substring(i + 3));
    } else {
      Shifty.UI.simulate('Shifty|Type|to start|#icon thumbs-up|#countdown 3||');
    }

    Shifty.Drawing.loop(function () {
      Shifty.Shape.render();
    });
  }
};

window.addEventListener('load', function () {
  Shifty.init();
});
