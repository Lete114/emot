'use strict';

function createElement(name, className) {
  const dom = document.createElement(name);
  if (className) dom.className = className;
  return dom
}

class Emot {
  #options
  #output
  #emotAll
  constructor(options) {
    this.#injectStyle();
    this.#options = options;
    this.#options.el = document.querySelector(options.el);
    this.#options.target = document.querySelector(options.target);
    this.#output = { content: '', contentHTML: '' };
    this.#emotAll = {};
    this.#request(this.#options.emotMaps);
  }
  get() {
    return this.#output
  }

  #init() {
    const self = this;

    // 将所有的表情合并成一个
    for (const e in self.#options.emotMaps) {
      const type = self.#options.emotMaps[e].type;
      if (type === 'text') continue
      const items = self.#options.emotMaps[e].items;
      self.#emotAll = Object.assign(self.#emotAll, items);
    }

    self.#createDOM();

    // 监听目标(textarea)输入
    self.#options.target.oninput = function () {
      self.#output.content = this.value;
      self.#parseEmot();
    };
  }

  // eslint-disable-next-line max-statements
  #createDOM() {
    const self = this;
    const root = createElement('div', 'emot');
    const emotMaps = self.#options.emotMaps;

    const packages = createElement('div', 'emot-packages');
    for (const emotKey in emotMaps) {
      const emotValue = emotMaps[emotKey];
      const ul = createElement('ul', 'emot-items');
      ul.emotKey = emotKey;
      root.appendChild(ul);
      // 表情选项卡分类
      for (const iKey in emotValue.items) {
        const iValue = emotValue.items[iKey];
        const li = createElement('li', 'emot-item');
        ul.appendChild(li);
        li.onclick = function () {
          // 获取输入框光标位置
          let cursorStart = self.#options.target.selectionStart;
          let cursorEnd = self.#options.target.selectionEnd;
          const ctx = self.#output.content;
          const Start = ctx.substring(0, cursorStart);
          const Ent = ctx.substring(cursorEnd);
          if (emotValue.type === 'text') self.#output.content = Start + iValue + Ent;
          else self.#output.content = Start + '[' + iKey + ']' + Ent;
          self.#options.target.focus();
          self.#options.target.value = self.#output.content;
          // 将光标指定到插入内容的后面
          self.#options.target.selectionEnd = Ent ? self.#output.content.indexOf(Ent) : self.#output.content.length;
          // 重新解析表情
          self.#parseEmot();
        };

        // 如果是问本类型这创建span，反之创建img
        if (emotValue.type === 'text') {
          const span = createElement('span');
          span.title = iKey;
          span.textContent = iValue;
          li.appendChild(span);
        } else {
          const img = createElement('img');
          img.src = iValue;
          img.title = img.alt = iKey;
          li.appendChild(img);
        }
      }

      // 创建表情包选项卡
      const pkgSpan = createElement('span');
      pkgSpan.innerHTML = emotKey;
      pkgSpan.onclick = function () {
        // 当点击表情选项卡时，清空所有表情选项卡的class属性
        packages.childNodes.forEach((node) => {
          node.className = '';
        });
        // 为当前点击的表情选项卡添加class属性
        pkgSpan.className = 'emot-package-active';

        // 选中的表情列表
        root.querySelectorAll('.emot-items').forEach((node) => {
          node.classList.remove('emot-items-active');
          if (node.emotKey === emotKey) {
            node.classList.add('emot-items-active');
          }
        });
      };
      packages.appendChild(pkgSpan);
    }

    // 默认选择第一个表情包选项卡
    root.childNodes[0].classList.add('emot-items-active');
    packages.childNodes[0].classList.add('emot-package-active');

    root.appendChild(packages);
    self.#options.el.appendChild(root);
  }

  #parseEmot() {
    let ctx = this.#output.content;
    const emots = [];
    // 匹配所有[]格式的内容，并存储到emots数组中
    ctx.replace(/\[(.*?)\]/g, ($0, $1) => {
      emots.push($1);
    });

    // 遍历匹配到的所有[]格式的表情
    for (const emot of emots) {
      // 匹配是否包含在指定的表情当中
      // 不包含直接直接进入下次循环
      const link = this.#emotAll[emot];
      if (!link) continue
      const img = '<img src=' + link + ' alt=' + emot + '/>';
      ctx = ctx.replace('[' + emot + ']', img);
    }
    this.#output.contentHTML = ctx;
  }

  #injectStyle() {
    const style = createElement('style');
    /* eslint-disable max-len */
    style.textContent =
      '.emot{top:30px;width:100%;margin-top:10px;border:1px solid rgba(128,128,128,0.2);border-radius:4px;background:#fff;}.emot-items{display:none;height:180px;min-height:100px;max-height:200px;resize:vertical;padding:10px;margin:0;font-size:0;overflow-x:hidden;user-select:none;}.emot-items-active{display:block;}.emot-item{list-style-type:none;padding:5px 10px;border-radius:5px;display:inline-block;font-size:12px;line-height:14px;margin:0 10px 12px 0;cursor:pointer;transition:0.3s;}.emot-item img{width:32px;height:auto;}.emot-item:hover{background:rgba(128,128,128,0.2);box-shadow:0 2px 2px 0 rgb(0 0 0 / 14%),0 3px 1px -2px rgb(0 0 0 / 20%),0 1px 5px 0 rgb(0 0 0 / 12%);}.emot-packages{padding:0;font-size:0;border-top:solid 1px rgba(128,128,128,0.2);}.emot-packages span{display:inline-block;line-height:30px;font-size:14px;padding:0 10px;cursor:pointer;}.emot-packages:nth-child(1){border-radius:0 0 0 3px;}.emot-packages span img{width:20px;position:relative;top:5px;}.emot-package-active{background:rgba(128,128,128,0.2);}';
    /* eslint-enable max-len */
    document.head.appendChild(style);
  }

  #request(emotMaps) {
    // 判断是否是.json结尾，如果是则发送请求
    if (!/\.json$/.test(emotMaps)) return this.#init()
    const xhr = new XMLHttpRequest();
    xhr.open('GET', emotMaps, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const isSuccess = xhr.status >= 200 && xhr.status < 300;
        if (isSuccess) {
          this.#output.emotMaps = this.#options.emotMaps = JSON.parse(xhr.responseText);
          this.#init();
        } else {
          // eslint-disable-next-line no-console
          console.error('Emotion request failure:', xhr);
        }
      }
    };
  }
}

module.exports = Emot;
