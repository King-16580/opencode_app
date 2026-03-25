// pages/index/index.js
const app = getApp()

Page({
  data: {
    currentLevel: 1,
    levels: [
      { level: 1, target: 500, unlocked: true, completed: false },
      { level: 2, target: 1000, unlocked: false, completed: false },
      { level: 3, target: 1500, unlocked: false, completed: false },
      { level: 4, target: 2000, unlocked: false, completed: false },
      { level: 5, target: 3000, unlocked: false, completed: false },
      { level: 6, target: 4000, unlocked: false, completed: false }
    ]
  },

  onLoad() {
    this.loadProgress()
  },

  onShow() {
    this.loadProgress()
  },

  loadProgress() {
    try {
      const progress = wx.getStorageSync('game_progress') || {}
      const levels = this.data.levels.map(item => ({
        ...item,
        unlocked: progress[item.level]?.unlocked || item.level === 1,
        completed: progress[item.level]?.completed || false
      }))
      this.setData({ levels })
    } catch (e) {
      console.error('加载进度失败:', e)
    }
  },

  selectLevel(e) {
    const { level, unlocked } = e.currentTarget.dataset
    if (!unlocked) {
      wx.showToast({
        title: '请先完成前一关',
        icon: 'none'
      })
      return
    }
    this.setData({ currentLevel: level })
  },

  startGame() {
    const level = this.data.levels.find(l => l.level === this.data.currentLevel)
    if (!level || !level.unlocked) {
      wx.showToast({
        title: '关卡未解锁',
        icon: 'none'
      })
      return
    }

    app.globalData.currentLevel = this.data.currentLevel
    wx.navigateTo({
      url: `/pages/game/game?level=${this.data.currentLevel}`
    })
  }
})
