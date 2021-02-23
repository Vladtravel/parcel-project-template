// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"slider.js":[function(require,module,exports) {
// var slideIndex = 1;
// showSlides(slideIndex);
// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }
// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }
// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName('sliderbox');
//   var dots = document.getElementsByClassName('slider-dots_item');
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = 'none';
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(' active', '');
//   }
//   slides[slideIndex - 1].style.display = 'block';
//   dots[slideIndex - 1].className += ' active';
// }
function Sim(sldrId) {
  var id = document.getElementById(sldrId);

  if (id) {
    this.sldrRoot = id;
  } else {
    this.sldrRoot = document.querySelector('.sim-slider');
  } // Carousel objects


  this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
  this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
  this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
  this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
  this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
  this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots'); // Initialization

  this.options = Sim.defaults;
  Sim.initialize(this);
}

Sim.defaults = {
  // Default options for the carousel
  loop: true,
  // Бесконечное зацикливание слайдера
  auto: true,
  // Автоматическое пролистывание
  interval: 5000,
  // Интервал между пролистыванием элементов (мс)
  arrows: true,
  // Пролистывание стрелками
  dots: true // Индикаторные точки

};

Sim.prototype.elemPrev = function (num) {
  num = num || 1;
  var prevElement = this.currentElement;
  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

  if (!this.options.loop) {
    if (this.currentElement == 0) {
      this.leftArrow.style.display = 'none';
    }

    this.rightArrow.style.display = 'block';
  }

  this.sldrElements[this.currentElement].style.opacity = '1';
  this.sldrElements[prevElement].style.opacity = '0';

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Sim.prototype.elemNext = function (num) {
  num = num || 1;
  var prevElement = this.currentElement;
  this.currentElement += num;
  if (this.currentElement >= this.elemCount) this.currentElement = 0;

  if (!this.options.loop) {
    if (this.currentElement == this.elemCount - 1) {
      this.rightArrow.style.display = 'none';
    }

    this.leftArrow.style.display = 'block';
  }

  this.sldrElements[this.currentElement].style.opacity = '1';
  this.sldrElements[prevElement].style.opacity = '0';

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Sim.prototype.dotOn = function (num) {
  this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;';
};

Sim.prototype.dotOff = function (num) {
  this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;';
};

Sim.initialize = function (that) {
  // Constants
  that.elemCount = that.sldrElements.length; // Количество элементов
  // Variables

  that.currentElement = 0;
  var bgTime = getTime(); // Functions

  function getTime() {
    return new Date().getTime();
  }

  function setAutoScroll() {
    that.autoScroll = setInterval(function () {
      var fnTime = getTime();

      if (fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime;
        that.elemNext();
      }
    }, that.options.interval);
  } // Start initialization


  if (that.elemCount <= 1) {
    // Отключить навигацию
    that.options.auto = false;
    that.options.arrows = false;
    that.options.dots = false;
    that.leftArrow.style.display = 'none';
    that.rightArrow.style.display = 'none';
  }

  if (that.elemCount >= 1) {
    // показать первый элемент
    that.sldrElemFirst.style.opacity = '1';
  }

  if (!that.options.loop) {
    that.leftArrow.style.display = 'none'; // отключить левую стрелку

    that.options.auto = false; // отключить автопркрутку
  } else if (that.options.auto) {
    // инициализация автопрокруки
    setAutoScroll(); // Остановка прокрутки при наведении мыши на элемент

    that.sldrList.addEventListener('mouseenter', function () {
      clearInterval(that.autoScroll);
    }, false);
    that.sldrList.addEventListener('mouseleave', setAutoScroll, false);
  }

  if (that.options.arrows) {
    // инициализация стрелок
    that.leftArrow.addEventListener('click', function () {
      var fnTime = getTime();

      if (fnTime - bgTime > 1000) {
        bgTime = fnTime;
        that.elemPrev();
      }
    }, false);
    that.rightArrow.addEventListener('click', function () {
      var fnTime = getTime();

      if (fnTime - bgTime > 1000) {
        bgTime = fnTime;
        that.elemNext();
      }
    }, false);
  } else {
    that.leftArrow.style.display = 'none';
    that.rightArrow.style.display = 'none';
  }

  if (that.options.dots) {
    (function () {
      // инициализация индикаторных точек
      var sum = '',
          diffNum;

      for (var i = 0; i < that.elemCount; i++) {
        sum += '<span class="sim-dot"></span>';
      }

      that.indicatorDots.innerHTML = sum;
      that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sim-dot'); // Назначаем точкам обработчик события 'click'

      var _loop = function _loop(n) {
        that.indicatorDotsAll[n].addEventListener('click', function () {
          diffNum = Math.abs(n - that.currentElement);

          if (n < that.currentElement) {
            bgTime = getTime();
            that.elemPrev(diffNum);
          } else if (n > that.currentElement) {
            bgTime = getTime();
            that.elemNext(diffNum);
          } // Если n == that.currentElement ничего не делаем

        }, false);
      };

      for (var n = 0; n < that.elemCount; n++) {
        _loop(n);
      }

      that.dotOff(0); // точка[0] выключена, остальные включены

      for (var _i = 1; _i < that.elemCount; _i++) {
        that.dotOn(_i);
      }
    })();
  }
};

new Sim();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58828" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","slider.js"], null)
//# sourceMappingURL=/slider.ab09d017.js.map