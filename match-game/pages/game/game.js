// pages/game/game.js
const app = getApp()

// 方块图标
const TILE_ICONS = ['', '', '', '', '', '']

Page({
  data: {
    level: 1,
    score: 0,
    targetScore: 500,
    combo: 0,
    comboBonus: 0,
    progressPercent: 0,
    board: [],
    showModal: false,
    modalType: 'success',
    modalTitle: '',
    modalMessage: '',
    isProcessing: false
  },

  // 游戏配置
  ROWS: 8,
  COLS: 8,
  COLORS: 6,

  onLoad(options) {
    const level = parseInt(options.level) || 1
    const targetScore = this.getTargetScore(level)
    
    this.setData({
      level,
      targetScore,
      score: 0,
      combo: 0
    })

    this.initBoard()
  },

  // 获取关卡目标分数
  getTargetScore(level) {
    const targets = [500, 1000, 1500, 2000, 3000, 4000]
    return targets[level - 1] || 500 + (level - 1) * 500
  },

  // 初始化棋盘
  initBoard() {
    const board = []
    
    for (let row = 0; row < this.ROWS; row++) {
      board[row] = []
      for (let col = 0; col < this.COLS; col++) {
        let color
        do {
          color = Math.floor(Math.random() * this.COLORS)
        } while (this.wouldCreateMatch(board, row, col, color))
        
        board[row][col] = {
          color,
          icon: TILE_ICONS[color],
          selected: false,
          eliminating: false,
          falling: false
        }
      }
    }
    
    this.setData({ board })
  },

  // 检查是否会创建初始匹配
  wouldCreateMatch(board, row, col, color) {
    // 检查水平方向
    if (col >= 2) {
      if (board[row][col - 1]?.color === color && 
          board[row][col - 2]?.color === color) {
        return true
      }
    }
    
    // 检查垂直方向
    if (row >= 2) {
      if (board[row - 1]?.[col]?.color === color && 
          board[row - 2]?.[col]?.color === color) {
        return true
      }
    }
    
    return false
  },

  // 点击方块
  onTileTap(e) {
    if (this.data.isProcessing) return
    
    const { row, col } = e.currentTarget.dataset
    const board = this.data.board
    const tile = board[row][col]
    
    // 如果点击的是已选中的方块，取消选择
    if (tile.selected) {
      this.clearSelection()
      return
    }
    
    // 清除之前的选择
    this.clearSelection()
    
    // 查找相连的相同颜色方块
    const connected = this.findConnectedTiles(row, col, tile.color)
    
    if (connected.length < 2) {
      // 只有一个方块，无法消除
      wx.showToast({
        title: '需要至少2个相连的相同方块',
        icon: 'none',
        duration: 1500
      })
      return
    }
    
    // 高亮选中的方块
    connected.forEach(pos => {
      board[pos.row][pos.col].selected = true
    })
    
    this.setData({ board })
    
    // 延迟后执行消除
    setTimeout(() => {
      this.eliminateTiles(connected)
    }, 300)
  },

  // 清除选择状态
  clearSelection() {
    const board = this.data.board
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        board[row][col].selected = false
      }
    }
    this.setData({ board })
  },

  // 查找相连的相同颜色方块（使用BFS）
  findConnectedTiles(startRow, startCol, color) {
    const visited = new Set()
    const connected = []
    const queue = [{ row: startRow, col: startCol }]
    
    while (queue.length > 0) {
      const { row, col } = queue.shift()
      const key = `${row},${col}`
      
      if (visited.has(key)) continue
      if (row < 0 || row >= this.ROWS || col < 0 || col >= this.COLS) continue
      if (this.data.board[row][col].color !== color) continue
      
      visited.add(key)
      connected.push({ row, col })
      
      // 添加相邻方块
      queue.push(
        { row: row - 1, col },
        { row: row + 1, col },
        { row, col: col - 1 },
        { row, col: col + 1 }
      )
    }
    
    return connected
  },

  // 消除方块
  eliminateTiles(tiles) {
    this.setData({ isProcessing: true })
    
    const board = this.data.board
    
    // 标记为消除状态
    tiles.forEach(pos => {
      board[pos.row][pos.col].eliminating = true
    })
    
    this.setData({ board })
    
    // 计算分数
    const baseScore = tiles.length * 10
    const combo = this.data.combo + 1
    const comboBonus = combo > 1 ? (combo - 1) * 20 : 0
    const totalScore = baseScore + comboBonus
    
    this.setData({
      score: this.data.score + totalScore,
      combo,
      comboBonus,
      progressPercent: Math.min(100, (this.data.score + totalScore) / this.data.targetScore * 100)
    })
    
    // 延迟后执行下落
    setTimeout(() => {
      this.removeAndDrop(tiles)
    }, 400)
  },

  // 移除方块并执行下落
  removeAndDrop(eliminatedTiles) {
    const board = this.data.board
    
    // 将消除的方块设为null
    eliminatedTiles.forEach(pos => {
      board[pos.row][pos.col] = null
    })
    
    // 执行下落
    this.dropTiles(board)
  },

  // 下落逻辑
  dropTiles(board) {
    const fallingPositions = []
    
    // 从下往上，从左到右处理每一列
    for (let col = 0; col < this.COLS; col++) {
      let writeRow = this.ROWS - 1
      
      // 从下往上扫描，将非空方块移动到下方
      for (let row = this.ROWS - 1; row >= 0; row--) {
        if (board[row][col] !== null) {
          if (row !== writeRow) {
            board[writeRow][col] = board[row][col]
            board[row][col] = null
            fallingPositions.push({ row: writeRow, col })
          }
          writeRow--
        }
      }
      
      // 在顶部填充新方块
      for (let row = writeRow; row >= 0; row--) {
        const color = Math.floor(Math.random() * this.COLORS)
        board[row][col] = {
          color,
          icon: TILE_ICONS[color],
          selected: false,
          eliminating: false,
          falling: true
        }
        fallingPositions.push({ row, col })
      }
    }
    
    this.setData({ board })
    
    // 清除下落动画标记
    setTimeout(() => {
      fallingPositions.forEach(pos => {
        if (board[pos.row][pos.col]) {
          board[pos.row][pos.col].falling = false
        }
      })
      this.setData({ board })
      
      // 检查是否有连锁消除
      this.checkChainReaction()
    }, 300)
  },

  // 检查连锁反应
  checkChainReaction() {
    const matches = this.findAllMatches()
    
    if (matches.length > 0) {
      // 有连锁消除，延迟后执行
      setTimeout(() => {
        matches.forEach(match => {
          this.eliminateTiles(match)
        })
      }, 200)
    } else {
      // 没有连锁，重置连击数，检查游戏状态
      this.setData({ 
        combo: 0,
        comboBonus: 0,
        isProcessing: false 
      })
      
      this.checkGameStatus()
    }
  },

  // 查找所有匹配
  findAllMatches() {
    const board = this.data.board
    const allMatches = []
    const visited = new Set()
    
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        const key = `${row},${col}`
        if (visited.has(key) || !board[row][col]) continue
        
        const connected = this.findConnectedTiles(row, col, board[row][col].color)
        
        if (connected.length >= 2) {
          allMatches.push(connected)
          connected.forEach(pos => visited.add(`${pos.row},${pos.col}`))
        }
      }
    }
    
    return allMatches
  },

  // 检查游戏状态
  checkGameStatus() {
    const { score, targetScore, level } = this.data
    
    if (score >= targetScore) {
      // 过关
      this.showResultModal('success')
      this.saveProgress(level, true)
    } else if (!this.hasValidMoves()) {
      // 无解
      this.showResultModal('fail')
    }
  },

  // 检查是否有有效移动
  hasValidMoves() {
    const board = this.data.board
    
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        const connected = this.findConnectedTiles(row, col, board[row][col].color)
        if (connected.length >= 2) {
          return true
        }
      }
    }
    
    return false
  },

  // 显示结果弹窗
  showResultModal(type) {
    const isSuccess = type === 'success'
    
    this.setData({
      showModal: true,
      modalType: type,
      modalTitle: isSuccess ? '恭喜过关！' : '游戏结束',
      modalMessage: isSuccess 
        ? `你已达到目标分数 ${this.data.targetScore}！` 
        : '没有可消除的方块了，再试一次吧！'
    })
  },

  // 弹窗按钮操作
  modalAction(e) {
    const action = e.currentTarget.dataset.action
    
    this.setData({ showModal: false })
    
    if (action === 'continue') {
      if (this.data.modalType === 'success') {
        // 下一关
        const nextLevel = this.data.level + 1
        wx.redirectTo({
          url: `/pages/game/game?level=${nextLevel}`
        })
      } else {
        // 重新开始
        this.restartGame()
      }
    } else {
      // 返回主页
      wx.navigateBack()
    }
  },

  // 保存进度
  saveProgress(level, completed) {
    try {
      const progress = wx.getStorageSync('game_progress') || {}
      
      if (!progress[level]) {
        progress[level] = {}
      }
      
      progress[level].completed = completed
      progress[level + 1] = progress[level + 1] || {}
      progress[level + 1].unlocked = true
      
      wx.setStorageSync('game_progress', progress)
    } catch (e) {
      console.error('保存进度失败:', e)
    }
  },

  // 重新开始
  restartGame() {
    this.setData({
      score: 0,
      combo: 0,
      comboBonus: 0,
      progressPercent: 0,
      showModal: false,
      isProcessing: false
    })
    this.initBoard()
  },

  // 返回
  goBack() {
    wx.navigateBack()
  }
})
