const { defaultBottomNavTap } = require('../../utils/defaultNavTap.js');

const MONTHS_FR = [
  'JANVIER',
  'FEVRIER',
  'MARS',
  'AVRIL',
  'MAI',
  'JUIN',
  'JUILLET',
  'AOUT',
  'SEPTEMBRE',
  'OCTOBRE',
  'NOVEMBRE',
  'DECEMBRE'
];

function buildMonthDays(year, monthIndex, selectedDay) {
  const first = new Date(year, monthIndex, 1);
  const jsWeekday = first.getDay(); // 0=Dim ... 6=Sam
  const leadingEmpty = (jsWeekday + 6) % 7; // Lundi=0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const today = new Date();
  const isSameMonthAsToday =
    today.getFullYear() === year && today.getMonth() === monthIndex;

  const days = [];
  for (let i = 0; i < leadingEmpty; i++) days.push({ value: '', empty: true });

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      value: day,
      empty: false,
      selected: day === selectedDay,
      dot: isSameMonthAsToday && day === today.getDate(),
      muted: false
    });
  }

  while (days.length < 35) days.push({ value: '', empty: true });
  return days;
}

Page({
  data: {
    monthLabel: 'SEPTEMBRE',
    yearLabel: '2025',
    weekdays: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    days: [],
    currentYear: 2025,
    currentMonth: 8,
    selectedDay: 14
  },

  onLoad() {
    this.refreshCalendar();
  },

  refreshCalendar() {
    const { currentYear, currentMonth, selectedDay } = this.data;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const finalSelected = Math.min(selectedDay || 1, daysInMonth);
    this.setData({
      monthLabel: MONTHS_FR[currentMonth],
      yearLabel: String(currentYear),
      selectedDay: finalSelected,
      days: buildMonthDays(currentYear, currentMonth, finalSelected)
    });
  },

  onBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack({ delta: 1 });
      return;
    }
    wx.switchTab({ url: '/pages/dashboard/dashboard' });
  },

  onPrevMonth() {
    let { currentYear, currentMonth } = this.data;
    currentMonth -= 1;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    }
    this.setData({ currentYear, currentMonth });
    this.refreshCalendar();
  },

  onNextMonth() {
    let { currentYear, currentMonth } = this.data;
    currentMonth += 1;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }
    this.setData({ currentYear, currentMonth });
    this.refreshCalendar();
  },

  onSelectDay(e) {
    const day = Number(e.currentTarget.dataset.day || 0);
    if (!day) return;
    this.setData({ selectedDay: day });
    this.refreshCalendar();
  },

  onNextStep() {
    wx.navigateTo({
      url: '/pages/medecin-horaire/medecin-horaire'
    });
  },

  onNavTap: defaultBottomNavTap
});