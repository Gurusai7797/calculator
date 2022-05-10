class Cal {
  constructor(prevOper, curOper) {
    this.prevOper = prevOper;
    this.curOper = curOper;
    this.clear();
  }

  clear() {
    this.prev = '';
    this.cur = '';
    this.oper = undefined;
  }
  delete() {
    this.cur = this.cur.toString().slice(0, -1);
  }
  appendNum(num) {
    if (num === '.' && this.cur.includes('.')) return;
    this.cur = this.cur.toString() + num.toString();
  }
  chooseOper(oper) {
    if (this.cur === '') return;
    if (this.prev !== '') {
      this.compute();
    }

    this.oper = oper;
    this.prev = this.cur;
    this.cur = '';
  }
  compute() {
    let com;
    const pr = parseFloat(this.prev);
    const cu = parseFloat(this.cur);
    if (isNaN(pr) || isNaN(cu)) return;
    switch (this.oper) {
      case '+':
        com = pr + cu;
        break;
      case '-':
        com = pr - cu;
        break;
      case '*':
        com = pr * cu;
        break;
      case '÷':
        com = pr / cu;
        break;
      default:
        return;
    }
    this.cur = com;
    this.oper = undefined;
    this.prev = '';
  }

  getDisNum(num) {
    const sNum = num.toString();
    const inDi = parseFloat(sNum.split('.')[0]);
    const deDi = sNum.split('.')[1];
    let intDis;
    if (isNaN(inDi)) {
      intDis = '';
    } else {
      intDis = inDi.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (deDi != null) {
      return `${intDis}.${deDi}`;
    } else {
      return intDis;
    }
  }
  updateDisplay() {
    this.curOper.innerText = this.getDisNum(this.cur);
    if (this.oper != null) {
      this.prevOper.innerText = `${this.getDisNum(this.prev)} ${this.oper}`;
    } else {
      this.prevOper.innerText = '';
    }
  }
}

const num = document.querySelectorAll('[data-num]');
const oper = document.querySelectorAll('[data-oper]');
const del = document.querySelector('[data-del]');
const eq = document.querySelector('[data-eq]');
const clr = document.querySelector('[data-clr]');
const prevOper = document.querySelector('[data-prev]');
const curOper = document.querySelector('[data-cur]');

const cal = new Cal(prevOper, curOper);

num.forEach((button) => {
  button.addEventListener('click', () => {
    cal.appendNum(button.innerText);
    cal.updateDisplay();
  });
});

oper.forEach((button) => {
  button.addEventListener('click', () => {
    cal.chooseOper(button.innerText);
    cal.updateDisplay();
  });
});

eq.addEventListener('click', (button) => {
  cal.compute();
  cal.updateDisplay();
});

clr.addEventListener('click', (button) => {
  cal.clear();
  cal.updateDisplay();
});

del.addEventListener('click', (button) => {
  cal.delete();
  cal.updateDisplay();
});
