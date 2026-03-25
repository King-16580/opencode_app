// pages/index/index.js
const app = getApp()

// 关卡配置
const LEVELS = [
  { id: 1, name: '入门', stars: 0, unlocked: true, completed: false },
  { id: 2, name: '基础', stars: 0, unlocked: false, completed: false },
  { id: 3, name: '进阶', stars: 0, unlocked: false, completed: false },
  { id: 4, name: '挑战', stars: 0, unlocked: false, completed: false },
  { id: 5, name: '困难', stars: 0, unlocked: false, completed: false },
  { id: 6, name: '地狱', stars: 0, unlocked: false, completed: false },
  { id: 7, name: '噩梦', stars: 0, unlocked: false, completed: false },
  { id: 8, name: '终极', stars: 0, unlocked: false, completed: false }
]

Page({
  data: {
    levels: [],
    selectedLevel: 1
  },

  onLoad() {
    this.loadProgress()
  },

  onShow() {
    this.loadProgress()
  },

  loadProgress() {
    try {
      const progress = wx.getStorageSync('gravity_progress') || {}
      const levels = LEVELS.map((level, index) => {
        const saved = progress[level.id] || {}
        return {
          ...level,
          unlocked: saved.unlocked !== undefined ? saved.unlocked : index === 0,
          completed: saved.completed || false,
          stars: saved.stars || 0
        }
      })
      this.setData({ levels })
    } catch (e) {
      console.error('加载进度失败:', e)
      this.setData({ levels: LEVELS })
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
    this.setData({ selectedLevel: level })
  },

  startGame() {
    wx.navigateTo({
      url: `/pages/game/game?level=${this.data.selectedLevel}`
    })
  }
})
