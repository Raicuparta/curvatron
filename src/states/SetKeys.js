/*eslint-disable*/
/* global keys, colorHex, clickButton, maxPlayers, w2, h2, localStorage,
ButtonList, colorHexDark */
/*eslint-enable*/
var setKeys = function (game) {
  this.ui = {}
  this.selectedPlayer = 0
  this.buttons = null
  this.playersButton = null
  this.maxPlayers = 7
  this.dialogText = null
}

setKeys.prototype = {
  create: function () {
    var ui = this.ui

    ui.title = this.game.add.text(w2, 100, 'configure keys', {
      font: '150px dosis',
      fill: '#ffffff',
      align: 'center'
    })
    ui.title.anchor.setTo(0.5, 0.5)

    this.buttons = new ButtonList(this, this.game)
    this.playersButton = this.buttons.add(null, '<    player ' + (this.selectedPlayer + 1) + '     >', this.right)
    this.buttons.add('smallKey_button', 'change', this.change)
    this.buttons.add('accept_button', 'confirm', this.backPressed)
    this.buttons.add('cancel_button', 'cancel', this.backPressed)

    this.buttons.create()

    // key select button
    ui.keyButton = this.game.add.sprite(w2, h2 + 320, 'key_button')
    ui.keyButton.anchor.setTo(0.5, 0.5)
    ui.keyText = this.game.add.text(w2, h2 + 290, String.fromCharCode(keys[this.selectedPlayer]), {
      font: '150px dosis',
      fill: colorHex,
      align: 'center'
    })
    ui.keyText.anchor.setTo(0.5, 0.5)

    this.overlay = this.add.sprite(0, 0, 'overlay')
    this.overlay.width = w2 * 2
    this.overlay.height = h2 * 2
    this.overlay.alpha = 0.7
    this.overlay.visible = false

    this.dialogText = this.add.text(w2, h2, '', {
      font: '80px dosis',
      fill: '#ffffff',
      align: 'center'
    })
    this.dialogText.anchor.setTo(0.5, 0.5)
    this.dialogText.visible = false

    this.game.input.keyboard.addCallbacks(this, this.onPressed)
  },

  update: function () {
    if (!this.overlay.visible) {
      this.buttons.update()
    }
  },

  left: function () {
    if (this.selectedPlayer === 0) {
      this.selectedPlayer = this.maxPlayers
    } else {
      this.selectedPlayer--
    }
    this.playersButton.setText('<    player ' + (this.selectedPlayer + 1) + '     >')
    this.ui.keyText.setText(String.fromCharCode(keys[this.selectedPlayer]))
  },

  right: function () {
    if (this.selectedPlayer === this.maxPlayers) {
      this.selectedPlayer = 0
    } else {
      this.selectedPlayer++
    }
    this.playersButton.setText('<    player ' + (this.selectedPlayer + 1) + '     >')
    this.ui.keyText.setText(String.fromCharCode(keys[this.selectedPlayer]))
  },

  up: function () {
    this.buttons.selectUp()
  },

  down: function () {
    this.buttons.selectDown()
  },

  selectPress: function () {
    this.buttons.selectPress()
  },

  selectRelease: function () {
    this.buttons.selectRelease()
  },

  backPressed: function () {
    this.game.state.start('Menu')
  },

  onPressed: function () {
    if (this.overlay.visible &&
      this.game.input.keyboard.lastKey.keyCode >= 48 &&
      this.game.input.keyboard.lastKey.keyCode <= 90 &&
      this.state.current === 'SetKeys') {
      keys[this.selectedPlayer] = this.game.input.keyboard.lastKey.keyCode
      localStorage['keys'] = JSON.stringify(keys)
      this.ui.keyText.setText(String.fromCharCode(keys[this.selectedPlayer]))
      this.hideDialog()
    }
  },

  change: function () {
    this.showDialog('press the desired key for player ' + (this.selectedPlayer + 1))
  },

  showDialog: function (text) {
    this.dialogText.text = text
    this.dialogText.visible = true
    this.overlay.visible = true
  },

  hideDialog: function () {
    this.dialogText.visible = false
    this.overlay.visible = false
  }
}
