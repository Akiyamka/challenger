export default class Player {
  constructor({ name }) {
    this.name = name || 'noname';
    this.bank = 0;
    this.factor = 0;
  }

  _saveToBank() {
    this.bank += this.factor;
  }

  _resetFactor() {
    this.factor = 0;
  }

  _increaseFactor() {
    this.factor = Math.min(this.factor === 0 ? 2 : this.factor * 2, 128);
  }

  get state() {
    return {
      bank: this.bank,
      factor: this.factor,
      name: this.name
    }
  }

  savePoints() {
    this._saveToBank();
    this._resetFactor();
    return this.state;
  }

  taskComplete() {
    this._increaseFactor();
    return this.state;
  }

  taskIncomplete() {
    this._resetFactor();
    return this.state;
  }

  move({ isSaveMove, isTaksComplete }) {
    if (isSaveMove) {
      this.savePoints();
      return;
    }

    isTaksComplete
      ? this.taskComplete()
      : this.taskIncomplete();
  }
}
