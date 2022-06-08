'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

  return _classApplyDescriptorGet(receiver, descriptor);
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

  _classApplyDescriptorSet(receiver, descriptor, value);

  return value;
}

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}

function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);

  privateMap.set(obj, value);
}

function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet);

  privateSet.add(obj);
}

var styles = ".emot{top:30px;width:100%;margin-top:10px;border:1px solid rgba(128,128,128,0.2);border-radius:4px;background:#fff;}.emot-items{display:none;height:180px;min-height:100px;max-height:200px;resize:vertical;padding:10px;margin:0;font-size:0;overflow-x:hidden;user-select:none;}.emot-items-active{display:block;}.emot-item{list-style-type:none;padding:5px 10px;border-radius:5px;display:inline-block;font-size:12px;line-height:14px;margin:0 10px 12px 0;cursor:pointer;transition:0.3s;}.emot-item img{width:32px;height:auto;}.emot-item:hover{background:rgba(128,128,128,0.2);box-shadow:0 2px 2px 0 rgb(0 0 0 / 14%),0 3px 1px -2px rgb(0 0 0 / 20%),0 1px 5px 0 rgb(0 0 0 / 12%);}.emot-packages{padding:0;font-size:0;border-top:solid 1px rgba(128,128,128,0.2);}.emot-packages span{display:inline-block;line-height:30px;font-size:14px;padding:0 10px;cursor:pointer;}.emot-packages:nth-child(1){border-radius:0 0 0 3px;}.emot-packages span img{width:20px;position:relative;top:5px;}.emot-package-active{background:rgba(128,128,128,0.2);}";

function createElement(name, className) {
  var dom = document.createElement(name);
  if (className) dom.className = className;
  return dom;
}

var _options = /*#__PURE__*/new WeakMap();

var _output = /*#__PURE__*/new WeakMap();

var _emotAll = /*#__PURE__*/new WeakMap();

var _init = /*#__PURE__*/new WeakSet();

var _createDOM = /*#__PURE__*/new WeakSet();

var _parseEmot = /*#__PURE__*/new WeakSet();

var _injectStyle = /*#__PURE__*/new WeakSet();

var _request = /*#__PURE__*/new WeakSet();

var Emot = /*#__PURE__*/function () {
  function Emot(options) {
    _classCallCheck(this, Emot);

    _classPrivateMethodInitSpec(this, _request);

    _classPrivateMethodInitSpec(this, _injectStyle);

    _classPrivateMethodInitSpec(this, _parseEmot);

    _classPrivateMethodInitSpec(this, _createDOM);

    _classPrivateMethodInitSpec(this, _init);

    _classPrivateFieldInitSpec(this, _options, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _output, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _emotAll, {
      writable: true,
      value: void 0
    });

    _classPrivateMethodGet(this, _injectStyle, _injectStyle2).call(this);

    _classPrivateFieldSet(this, _options, options);

    _classPrivateFieldGet(this, _options).el = document.querySelector(options.el);
    _classPrivateFieldGet(this, _options).target = document.querySelector(options.target);

    _classPrivateFieldSet(this, _output, {
      content: '',
      contentHTML: ''
    });

    _classPrivateFieldSet(this, _emotAll, {});

    _classPrivateMethodGet(this, _request, _request2).call(this, _classPrivateFieldGet(this, _options).emotMaps);
  }

  _createClass(Emot, [{
    key: "get",
    value: function get() {
      return _classPrivateFieldGet(this, _output);
    }
  }]);

  return Emot;
}();

function _init2() {
  var self = this; // 将所有的表情合并成一个

  for (var e in _classPrivateFieldGet(self, _options).emotMaps) {
    var type = _classPrivateFieldGet(self, _options).emotMaps[e].type;

    if (type === 'text') continue;

    var items = _classPrivateFieldGet(self, _options).emotMaps[e].items;

    _classPrivateFieldSet(self, _emotAll, Object.assign(_classPrivateFieldGet(self, _emotAll), items));
  }

  _classPrivateMethodGet(self, _createDOM, _createDOM2).call(self); // 监听目标(textarea)输入


  _classPrivateFieldGet(self, _options).target.oninput = function () {
    _classPrivateFieldGet(self, _output).content = this.value;

    _classPrivateMethodGet(self, _parseEmot, _parseEmot2).call(self);
  };
}

function _createDOM2() {
  var self = this;
  var root = createElement('div', 'emot');

  var emotMaps = _classPrivateFieldGet(self, _options).emotMaps;

  var packages = createElement('div', 'emot-packages');

  var _loop = function _loop(emotKey) {
    var emotValue = emotMaps[emotKey];
    var ul = createElement('ul', 'emot-items');
    ul.emotKey = emotKey;
    root.appendChild(ul); // 表情选项卡分类

    var _loop2 = function _loop2(iKey) {
      var iValue = emotValue.items[iKey];
      var li = createElement('li', 'emot-item');
      ul.appendChild(li);

      li.onclick = function () {
        // 获取输入框光标位置
        var cursorStart = _classPrivateFieldGet(self, _options).target.selectionStart;

        var cursorEnd = _classPrivateFieldGet(self, _options).target.selectionEnd;

        var ctx = _classPrivateFieldGet(self, _output).content;

        var Start = ctx.substring(0, cursorStart);
        var Ent = ctx.substring(cursorEnd);
        if (emotValue.type === 'text') _classPrivateFieldGet(self, _output).content = Start + iValue + Ent;else _classPrivateFieldGet(self, _output).content = Start + '[' + iKey + ']' + Ent;

        _classPrivateFieldGet(self, _options).target.focus();

        _classPrivateFieldGet(self, _options).target.value = _classPrivateFieldGet(self, _output).content; // 将光标指定到插入内容的后面

        _classPrivateFieldGet(self, _options).target.selectionEnd = Ent ? _classPrivateFieldGet(self, _output).content.indexOf(Ent) : _classPrivateFieldGet(self, _output).content.length; // 重新解析表情

        _classPrivateMethodGet(self, _parseEmot, _parseEmot2).call(self);
      }; // 如果是问本类型这创建span，反之创建img


      if (emotValue.type === 'text') {
        var span = createElement('span');
        span.title = iKey;
        span.textContent = iValue;
        li.appendChild(span);
      } else {
        var img = createElement('img');
        img.src = iValue;
        img.title = img.alt = iKey;
        li.appendChild(img);
      }
    };

    for (var iKey in emotValue.items) {
      _loop2(iKey);
    } // 创建表情包选项卡


    var pkgSpan = createElement('span');
    pkgSpan.innerHTML = emotKey;

    pkgSpan.onclick = function () {
      // 当点击表情选项卡时，清空所有表情选项卡的class属性
      packages.childNodes.forEach(function (node) {
        node.className = '';
      }); // 为当前点击的表情选项卡添加class属性

      pkgSpan.className = 'emot-package-active'; // 选中的表情列表

      root.querySelectorAll('.emot-items').forEach(function (node) {
        node.classList.remove('emot-items-active');

        if (node.emotKey === emotKey) {
          node.classList.add('emot-items-active');
        }
      });
    };

    packages.appendChild(pkgSpan);
  };

  for (var emotKey in emotMaps) {
    _loop(emotKey);
  } // 默认选择第一个表情包选项卡


  root.childNodes[0].classList.add('emot-items-active');
  packages.childNodes[0].classList.add('emot-package-active');
  root.appendChild(packages);

  _classPrivateFieldGet(self, _options).el.appendChild(root);
}

function _parseEmot2() {
  var ctx = _classPrivateFieldGet(this, _output).content;

  var emots = []; // 匹配所有[]格式的内容，并存储到emots数组中

  ctx.replace(/\[(.*?)\]/g, function ($0, $1) {
    emots.push($1);
  }); // 遍历匹配到的所有[]格式的表情

  for (var _i = 0, _emots = emots; _i < _emots.length; _i++) {
    var emot = _emots[_i];

    // 匹配是否包含在指定的表情当中
    // 不包含直接直接进入下次循环
    var link = _classPrivateFieldGet(this, _emotAll)[emot];

    if (!link) continue;
    var img = '<img src=' + link + ' alt=' + emot + '/>';
    ctx = ctx.replace('[' + emot + ']', img);
  }

  _classPrivateFieldGet(this, _output).contentHTML = ctx;
}

function _injectStyle2() {
  var style = createElement('style');
  style.textContent = styles;
  document.head.appendChild(style);
}

function _request2(emotMaps) {
  var _this = this;

  // 判断是否是.json结尾，如果是则发送请求
  if (!/\.json$/.test(emotMaps)) return _classPrivateMethodGet(this, _init, _init2).call(this);

  try {
    fetch(emotMaps).then(function (res) {
      return res.json();
    }).then(function (res) {
      _classPrivateFieldGet(_this, _options).emotMaps = res;

      _classPrivateMethodGet(_this, _init, _init2).call(_this);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Emotion request failure:', JSON.stringify(e));
  }
}

module.exports = Emot;
