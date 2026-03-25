// pages/game/game.js
const app = getApp()

// 游戏配置
const CANVAS_SIZE = 340 // rpx转px后的实际大小
const BALL_RADIUS = 12
const GRAVITY = 0.5
const FRICTION = 0.98
const BOUNCE = 0.6

// 关卡数据
const LEVEL_DATA = {
  1: {
    name: '入门',
    ball: { x: 50, y: 50 },
    exit: { x: 290, y: 290 },
    stars: [
      { x: 170, y: 170 },
      { x: 100, y: 250 },
      { x: 250, y: 100 }
    ],
    walls: [
      { x: 0, y: 0, w: 340, h: 10 },    // 上
      { x: 0, y: 330, w: 340, h: 10 },   // 下
      { x: 0, y: 0, w: 10, h: 340 },     // 左
      { x: 330, y: 0, w: 10, h: 340 }    // 右
    ],
    spikes: [],
    lasers: []
  },
  2: {
    name: '基础',
    ball: { x: 50, y: 50 },
    exit: { x: 290, y: 290 },
    stars: [
      { x: 170, y: 100 },
      { x: 100, y: 170 },
      { x: 240, y: 240 }
    ],
    walls: [
      { x: 0, y: 0, w: 340, h: 10 },
      { x: 0, y: 330, w: 340, h: 10 },
      { x: 0, y: 0, w: 10, h: 340 },
      { x: 330, y: 0, w: 10, h: 340 },
      { x: 100, y: 100, w: 140, h: 10 }
    ],
    spikes: [],
    lasers: []
  },
  3: {
    name: '进阶',
    ball: { x: 50, y: 290 },
    exit: { x: 290, y: 50 },
    stars: [
      { x: 170, y: 170 },
      { x: 80, y: 170 },
      { x: 260, y: 170 }
    ],
    walls: [
      { x: 0, y: 0, w: 340, h: 10 },
      { x: 0, y: 330, w: 340, h: 10 },
      { x: 0, y: 0, w: 10, h: 340 },
      { x: 330, y: 0, w: 10, h: 340 },
      { x: 100, y: 80, w: 10, h: 180 },
      { x: 230, y: 80, w: 10, h: 180 }
    ],
    spikes: [
      { x: 150, y: 150, w: 40, h: 40 }
    ],
    lasers: []
  },
  4: {
    name: '挑战',
    ball: { x: 50, y: 170 },
    exit: { x: 290, y: 170 },
    stars: [
      { x: 120, y: 80 },
      { x: 170, y: 260 },
      { x: 220, y: 80 }
    ],
    walls: [
      { x: 0, y: 0, w: 340, h: 10 },
      { x: 0, y: 330, w: 340, h: 10 },
      { x: 0, y: 0, w: 10, h: 340 },
      { x: 330, y: 0, w: 10, h: 340 },
      { x: 80, y: 120, w: 180, h: 10 },
      { x: 80, y: 210, w: 180, h: 10 }
    ],
    spikes: [
      { x: 150, y: 60, w: 40, h: 40 },
      { x: 150, y: 240, w: 40, h: 40 }
    ],
    lasers: []
  },
  5: {
    name: '困难',
    ball: { x: 50, y: 50 },
    exit: { x: 290, y: 290 },
    stars: [
      { x: 170, y: 80 },
      { x: 80, y: 170 },
      { x: 260, y: 170 }
    ],
    walls: [
      { x: 0, y: 0, w: 340, h: 10 },
      { x: 0, y: 330, w: 340, h: 10 },
      { x: 0, y: 0, w: 10, h: 340 },
      { x: 330, y: 0, w: 10, h: 340 },
      { x: 100, y: 100, w: 10, h: 140 },
      { x: 230, y: 100, w: 10, h: 140 },
      { x: 100, y: 100, w: 140, h: 10 }
    ],
    spikes: [
      { x: 150, y: 150, w: 40, h: 40 },
      { x: 60, y: 280, w: 40, h: 40 },
      { x: 240, y: 60, w: 40, h: 40 }
    ],
    lasers: [
      { x1: 100, y1: 260, x2: 240, y2: 260 }
    ]
  },
  6: {
    name: '地狱',
    ball: { x: 170, y: 50 },
    exit: { x: 170, y: 290 },
    stars: [
      { x: 60, y: 170 },
      { x: 280, y: 170 },
      { x: 170, y: 170 }
    ],
    walls: [
      { x: 0, y: 0, w: 340, h: 10 },
      { x: 0, y: 330, w: 340, h: 10 },
      { x: 0, y: 0, w: 10, h: 340 },
      { x: 330, y: 0, w: 10, h: 340 },
      { x: 80, y: 80, w: 10, h: 80 },
      { x: 250, y: 80, w: 10, h: 80 },
      { x: 80, y: 180, w: 10, h: 80 },
      { x: 250, y: 180, w: 10, h: 80 }
    ],
    spikes: [
      { x: 150, y: 100, w: 40, h: 40 },
      { x: 150, y: 200, w: 40, h: 40 },
      { x: 60, y: 150, w: 30, h: 40 },
      { x: 250, y: 150, w: 30, h: 40 }
    ],
    lasers: [
      { x1: 100, y1: 120, x2: 240, y2: 120 },
      { x1: 100, y1: 220, x2: 240, y2: 220 }
    ]
  },
  7: {
    name: '噩梦',
    ball: { x: 50, y: 50 },
    exit: { x: 290, y: 290 },
    stars: [
      { x: 170, y: 50 },
      { x: 50, y: 170 },
      { x: 290, y: 170 }
    ],
    walls: [
      { x: 0, y: 0, w: 340, h: 10 },
      { x: 0, y: 330, w: 340, h: 10 },
      { x: 0, y: 0, w: 10, h: 340 },
      { x: 330, y: 0, w: 10, h: 340 },
      { x: 100, y: 80, w: 140, h: 10 },
      { x: 100, y: 160, w: 140, h: 10 },
      { x: 100, y: 240, w: 140, h: 10 }
    ],
    spikes: [
      { x: 80, y: 100, w: 30, h: 40 },
      { x: 230, y: 100, w: 30, h: 40 },
      { x: 80, y: 180, w: 30, h: 40 },
      { x: 230, y: 180, w: 30, h: 40 },
      { x: 80, y: 260, w: 30, h: 40 },
      { x: 230, y: 260, w: 30, h: 40 }
    ],
    lasers: []
  },
  8: {
    name: '终极',
    ball: { x: 170, y: 170 },
    exit: { x: 170, y: 170 },
    stars: [
      { x: 50, y: 50 },
      { x: 290, y: 50 },
      { x: 170, y: 290 }
    ],
    walls: [
      { x: 0, y: 0, w: 340, h: 10 },
      { x: 0, y: 330, w: 340, h: 10 },
      { x: 0, y: 0, w: 10, h: 340 },
      { x: 330, y: 0, w: 10, h: 340 },
      { x: 120, y: 120, w: 100, h: 10 },
      { x: 120, y: 210, w: 100, h: 10 },
      { x: 120, y: 120, w: 10, h: 100 },
      { x: 210, y: 120, w: 10, h: 100 }
    ],
    spikes: [
      { x: 40, y: 40, w: 40, h: 40 },
      { x: 260, y: 40, w: 40, h: 40 },
      { x: 40, y: 260, w: 40, h: 40 },
      { x: 260, y: 260, w: 40, h: 40 },
      { x: 150, y: 150, w: 40, h: 40 }
    ],
    lasers: [
      { x1: 50, y1: 170, x2: 120, y2: 170 },
      { x1: 220, y1: 170, x2: 290, y2: 170 }
    ]
  }
}

Page({
  data: {
    level: 1,
    stars: 0,
    totalStars: 3,
    time: 0,
    score: 0,
    gravityDir: 'down',
    gravityIcon: '↓',
    showModal: false,
    modalType: 'success',
    modalTitle: '',
    earnedStars: 0
  },

  // 游戏状态
  ctx: null,
  gameLoop: null,
  ball: { x: 50, y: 50, vx: 0, vy: 0 },
  levelData: null,
  collectedStars: [],
  isGameOver: false,
  startTime: 0,
  canvasWidth: 0,
  canvasHeight: 0,
  scale: 1,

  onLoad(options) {
    const level = parseInt(options.level) || 1
    this.setData({ level })
    this.initGame(level)
  },

  onReady() {
    // 获取Canvas上下文
    this.ctx = wx.createCanvasContext('gameCanvas')
    
    // 获取Canvas实际尺寸
    const query = wx.createSelectorQuery()
    query.select('.game-canvas').boundingClientRect()
    query.exec(res => {
      if (res[0]) {
        this.canvasWidth = res[0].width
        this.canvasHeight = res[0].height
        this.scale = this.canvasWidth / 340
        this.startGameLoop()
      }
    })
  },

  onUnload() {
    this.stopGameLoop()
  },

  initGame(level) {
    this.levelData = LEVEL_DATA[level] || LEVEL_DATA[1]
    this.ball = {
      x: this.levelData.ball.x,
      y: this.levelData.ball.y,
      vx: 0,
      vy: 0
    }
    this.collectedStars = new Array(this.levelData.stars.length).fill(false)
    this.isGameOver = false
    this.startTime = Date.now()
    
    this.setData({
      stars: 0,
      totalStars: this.levelData.stars.length,
      time: 0,
      gravityDir: 'down',
      gravityIcon: '↓',
      showModal: false
    })
  },

  startGameLoop() {
    const loop = () => {
      if (!this.isGameOver) {
        this.update()
        this.render()
        this.updateTime()
      }
      this.gameLoop = requestAnimationFrame(loop)
    }
    loop()
  },

  stopGameLoop() {
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop)
    }
  },

  updateTime() {
    const elapsed = Math.floor((Date.now() - this.startTime) / 1000)
    if (elapsed !== this.data.time) {
      this.setData({ time: elapsed })
    }
  },

  update() {
    const { ball, levelData } = this
    const gravity = GRAVITY

    // 应用重力
    switch (this.data.gravityDir) {
      case 'down':
        ball.vy += gravity
        break
      case 'up':
        ball.vy -= gravity
        break
      case 'left':
        ball.vx -= gravity
        break
      case 'right':
        ball.vx += gravity
        break
    }

    // 应用摩擦
    ball.vx *= FRICTION
    ball.vy *= FRICTION

    // 限制最大速度
    const maxSpeed = 15
    ball.vx = Math.max(-maxSpeed, Math.min(maxSpeed, ball.vx))
    ball.vy = Math.max(-maxSpeed, Math.min(maxSpeed, ball.vy))

    // 更新位置
    ball.x += ball.vx
    ball.y += ball.vy

    // 碰撞检测 - 墙壁
    levelData.walls.forEach(wall => {
      this.checkWallCollision(ball, wall)
    })

    // 碰撞检测 - 尖刺
    levelData.spikes.forEach(spike => {
      if (this.checkRectCollision(ball, spike)) {
        this.gameOver(false)
      }
    })

    // 碰撞检测 - 激光
    levelData.lasers.forEach(laser => {
      if (this.checkLaserCollision(ball, laser)) {
        this.gameOver(false)
      }
    })

    // 收集星星
    levelData.stars.forEach((star, index) => {
      if (!this.collectedStars[index]) {
        const dx = ball.x - star.x
        const dy = ball.y - star.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < BALL_RADIUS + 15) {
          this.collectedStars[index] = true
          const collected = this.collectedStars.filter(c => c).length
          this.setData({ stars: collected })
        }
      }
    })

    // 检查是否到达出口
    const exit = levelData.exit
    const dx = ball.x - exit.x
    const dy = ball.y - exit.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < BALL_RADIUS + 20) {
      this.gameOver(true)
    }
  },

  checkWallCollision(ball, wall) {
    // 找到球到矩形的最近点
    const closestX = Math.max(wall.x, Math.min(ball.x, wall.x + wall.w))
    const closestY = Math.max(wall.y, Math.min(ball.y, wall.y + wall.h))
    
    const dx = ball.x - closestX
    const dy = ball.y - closestY
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    if (dist < BALL_RADIUS) {
      // 碰撞响应
      const overlap = BALL_RADIUS - dist
      if (dist > 0) {
        ball.x += (dx / dist) * overlap
        ball.y += (dy / dist) * overlap
      }
      
      // 反弹
      if (Math.abs(dx) > Math.abs(dy)) {
        ball.vx = -ball.vx * BOUNCE
      } else {
        ball.vy = -ball.vy * BOUNCE
      }
    }
  },

  checkRectCollision(ball, rect) {
    const closestX = Math.max(rect.x, Math.min(ball.x, rect.x + rect.w))
    const closestY = Math.max(rect.y, Math.min(ball.y, rect.y + rect.h))
    
    const dx = ball.x - closestX
    const dy = ball.y - closestY
    
    return Math.sqrt(dx * dx + dy * dy) < BALL_RADIUS
  },

  checkLaserCollision(ball, laser) {
    // 简化：检查球是否在激光线段附近
    const { x1, y1, x2, y2 } = laser
    
    // 计算点到线段的距离
    const A = ball.x - x1
    const B = ball.y - y1
    const C = x2 - x1
    const D = y2 - y1
    
    const dot = A * C + B * D
    const lenSq = C * C + D * D
    let param = -1
    
    if (lenSq !== 0) param = dot / lenSq
    
    let xx, yy
    if (param < 0) {
      xx = x1
      yy = y1
    } else if (param > 1) {
      xx = x2
      yy = y2
    } else {
      xx = x1 + param * C
      yy = y1 + param * D
    }
    
    const dx = ball.x - xx
    const dy = ball.y - yy
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    return distance < BALL_RADIUS + 5 // 激光有5px的宽度
  },

  render() {
    const ctx = this.ctx
    const scale = this.scale
    const { ball, levelData } = this

    // 清空画布
    ctx.setFillStyle('#0a0a1a')
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

    // 绘制网格背景
    ctx.setStrokeStyle('rgba(0, 212, 255, 0.1)')
    ctx.setLineWidth(1)
    const gridSize = 34 * scale
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath()
      ctx.moveTo(i * gridSize, 0)
      ctx.lineTo(i * gridSize, this.canvasHeight)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * gridSize)
      ctx.lineTo(this.canvasWidth, i * gridSize)
      ctx.stroke()
    }

    // 绘制墙壁
    ctx.setFillStyle('#2d3436')
    levelData.walls.forEach(wall => {
      ctx.fillRect(wall.x * scale, wall.y * scale, wall.w * scale, wall.h * scale)
    })

    // 绘制尖刺
    ctx.setFillStyle('#e74c3c')
    levelData.spikes.forEach(spike => {
      ctx.save()
      ctx.translate(spike.x * scale + spike.w * scale / 2, spike.y * scale + spike.h * scale / 2)
      
      // 绘制尖刺图案
      const size = Math.min(spike.w, spike.h) * scale / 2
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(-size / 2, -size)
        ctx.lineTo(size / 2, -size)
        ctx.closePath()
        ctx.fill()
        ctx.rotate(Math.PI / 2)
      }
      ctx.restore()
    })

    // 绘制激光
    ctx.setStrokeStyle('#ff6b6b')
    ctx.setLineWidth(4 * scale)
    ctx.setShadow(0, 0, 10, '#ff6b6b')
    levelData.lasers.forEach(laser => {
      ctx.beginPath()
      ctx.moveTo(laser.x1 * scale, laser.y1 * scale)
      ctx.lineTo(laser.x2 * scale, laser.y2 * scale)
      ctx.stroke()
    })
    ctx.setShadow(0, 0, 0, 'transparent')

    // 绘制星星
    levelData.stars.forEach((star, index) => {
      if (!this.collectedStars[index]) {
        ctx.save()
        ctx.translate(star.x * scale, star.y * scale)
        
        // 星星发光效果
        ctx.setShadow(0, 0, 15, '#ffd700')
        ctx.setFillStyle('#ffd700')
        
        // 绘制五角星
        const starSize = 12 * scale
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI / 5) - Math.PI / 2
          const x = Math.cos(angle) * starSize
          const y = Math.sin(angle) * starSize
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        
        ctx.setShadow(0, 0, 0, 'transparent')
        ctx.restore()
      }
    })

    // 绘制出口
    const exit = levelData.exit
    ctx.save()
    ctx.translate(exit.x * scale, exit.y * scale)
    
    // 出口发光效果
    ctx.setShadow(0, 0, 20, '#00d4ff')
    ctx.setFillStyle('#00d4ff')
    ctx.beginPath()
    ctx.arc(0, 0, 18 * scale, 0, Math.PI * 2)
    ctx.fill()
    
    // 出口内部
    ctx.setFillStyle('#0f0f23')
    ctx.beginPath()
    ctx.arc(0, 0, 12 * scale, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.setShadow(0, 0, 0, 'transparent')
    ctx.restore()

    // 绘制小球
    ctx.save()
    ctx.translate(ball.x * scale, ball.y * scale)
    
    // 小球发光效果
    ctx.setShadow(0, 0, 20, '#00d4ff')
    
    // 小球渐变
    const gradient = ctx.createLinearGradient(-BALL_RADIUS * scale, -BALL_RADIUS * scale, BALL_RADIUS * scale, BALL_RADIUS * scale)
    gradient.addColorStop(0, '#00d4ff')
    gradient.addColorStop(1, '#0066ff')
    ctx.setFillStyle(gradient)
    
    ctx.beginPath()
    ctx.arc(0, 0, BALL_RADIUS * scale, 0, Math.PI * 2)
    ctx.fill()
    
    // 小球高光
    ctx.setFillStyle('rgba(255, 255, 255, 0.4)')
    ctx.beginPath()
    ctx.arc(-4 * scale, -4 * scale, 4 * scale, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.setShadow(0, 0, 0, 'transparent')
    ctx.restore()

    ctx.draw()
  },

  onCanvasTap(e) {
    if (this.isGameOver) return
    
    // 翻转重力
    const directions = ['down', 'right', 'up', 'left']
    const icons = ['↓', '→', '↑', '←']
    const currentIndex = directions.indexOf(this.data.gravityDir)
    const nextIndex = (currentIndex + 1) % 4
    
    this.setData({
      gravityDir: directions[nextIndex],
      gravityIcon: icons[nextIndex]
    })
  },

  gameOver(success) {
    this.isGameOver = true
    
    const time = this.data.time
    const stars = this.data.stars
    const totalStars = this.data.totalStars
    
    // 计算星级
    let earnedStars = 0
    if (success) {
      earnedStars = 1
      if (stars >= totalStars) earnedStars = 2
      if (stars >= totalStars && time < 30) earnedStars = 3
    }
    
    // 计算分数
    const score = success ? (stars * 100 + Math.max(0, 100 - time * 2) + earnedStars * 50) : 0
    
    this.setData({
      showModal: true,
      modalType: success ? 'success' : 'fail',
      modalTitle: success ? '恭喜过关！' : '游戏结束',
      earnedStars,
      score
    })
    
    // 保存进度
    if (success) {
      this.saveProgress(earnedStars)
    }
  },

  saveProgress(stars) {
    try {
      const progress = wx.getStorageSync('gravity_progress') || {}
      const level = this.data.level
      
      if (!progress[level]) {
        progress[level] = {}
      }
      
      progress[level].completed = true
      progress[level].stars = Math.max(progress[level].stars || 0, stars)
      
      // 解锁下一关
      if (level < 8) {
        progress[level + 1] = progress[level + 1] || {}
        progress[level + 1].unlocked = true
      }
      
      wx.setStorageSync('gravity_progress', progress)
    } catch (e) {
      console.error('保存进度失败:', e)
    }
  },

  modalAction(e) {
    const action = e.currentTarget.dataset.action
    
    if (action === 'continue') {
      if (this.data.modalType === 'success') {
        // 下一关
        const nextLevel = this.data.level + 1
        if (nextLevel <= 8) {
          wx.redirectTo({
            url: `/pages/game/game?level=${nextLevel}`
          })
        } else {
          wx.showToast({
            title: '恭喜通关所有关卡！',
            icon: 'success'
          })
          setTimeout(() => wx.navigateBack(), 1500)
        }
      } else {
        // 重新开始
        this.restartLevel()
      }
    } else {
      // 返回关卡选择
      wx.navigateBack()
    }
  },

  restartLevel() {
    this.initGame(this.data.level)
    if (this.ctx) {
      this.render()
    }
  },

  goBack() {
    wx.navigateBack()
  }
})
