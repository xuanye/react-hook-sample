export default {
  formatTime(time) {
    const h = Math.floor(time / 3600).toString();
    const m = Math.floor((time / 60) % 60).toString();
    const s = Math.floor(time % 60).toString();
    return [h.padStart(2, '0'), m.padStart(2, '0'), s.padStart(2, '0')].join(':');
  },
  ascCompare(m, n) {
    const a = m.name;
    const b = n.name;
    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }
    const x1 = a.toUpperCase();
    const x2 = b.toUpperCase();
    if (x1 < x2) {
      return -1;
    }
    if (x1 > x2) {
      return 1;
    }
    return 0;
  },
  descCompare(m, n) {
    const a = m.name;
    const b = n.name;
    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }
    const x2 = a.toUpperCase();
    const x1 = b.toUpperCase();
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
  contains(source, search) {
    if (!source) {
      return false;
    }
    if (!search) {
      return true;
    }

    return source.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  },
};
