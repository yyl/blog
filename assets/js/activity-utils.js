// Fill gaps in monthly data so missing months show as 0
const fillMonthGaps = (data, fields) => {
  if (!data || data.length < 2) return data;
  const filled = [];
  for (let i = 0; i < data.length; i++) {
    filled.push(data[i]);
    if (i < data.length - 1) {
      let [y, m] = data[i].month.split('-').map(Number);
      const [ny, nm] = data[i + 1].month.split('-').map(Number);
      m++;
      if (m > 12) { m = 1; y++; }
      while (y < ny || (y === ny && m < nm)) {
        const entry = { month: y + '-' + String(m).padStart(2, '0') };
        fields.forEach(f => entry[f] = 0);
        filled.push(entry);
        m++;
        if (m > 12) { m = 1; y++; }
      }
    }
  }
  return filled;
};

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.fillMonthGaps = fillMonthGaps;
}

// Make available for Node.js (testing)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fillMonthGaps };
}
