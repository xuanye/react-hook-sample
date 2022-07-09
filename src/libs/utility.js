export default {
  formatTime(time) {
    var h = Math.floor(time / 3600).toString();
    var m = Math.floor((time / 60) % 60).toString();
    var s = Math.floor(time % 60).toString();
    return [h.padStart(2, '0'), m.padStart(2, '0'), s.padStart(2, '0')].join(':');
  },
  ascCompare(m, n) {
    var a = m['name'];
    var b = n['name'];
    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }
    var x1 = a.toUpperCase();
    var x2 = b.toUpperCase();
    if (x1 < x2) {
      return -1;
    }
    if (x1 > x2) {
      return 1;
    }
    return 0;
  },
  descCompare(m, n) {
    var a = m['name'];
    var b = n['name'];
    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }
    var x2 = a.toUpperCase();
    var x1 = b.toUpperCase();
    if (x1 < x2) {
      return -1;
    }
    if (x1 > x2) {
      return 1;
    }
    return 0;
  },
  generateId() {
    return new Date().getTime().toString();
  },
};
