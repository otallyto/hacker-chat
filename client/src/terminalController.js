import ComponentsBuilder from "./components.js";
import { constants } from "./constants.js";

export default class TerminalController {
  usersCollors = new Map()
  constructor() { }
  _pickColor() {
    return `#` + ((1 << 24) * Math.random() | 0).toString(16) + '-fg'
  }
  _getUserCollor(userName) {
    if (this.usersCollors.has(userName))
      return this.usersCollors.get(userName)
    const collor = this._pickColor()
    this.usersCollors.set(userName, collor)

    return collor
  }
  _onInputReceived(eventEmitter) {
    return function () {
      const message = this.getValue()
      eventEmitter.emit(constants.events.app.MESSAGE_SENT, message)
      this.clearValue()
    }
  }
  _onMessageReceived({ screen, chat }) {
    return msg => {
      const { userName, message } = msg
      const collor = this._getUserCollor(userName)
      chat.addItem(`{${collor}}{bold}${userName}{/}: ${message}`)
      screen.render()
    }
  }
  _onLogChanged({ screen, activityLog }) {
    return msg => {
      const [userName] = msg.split(/\s/)
      const collor = this._getUserCollor(userName)
      activityLog.addItem(`{${collor}}{bold}${msg.toString()}{/}`)
      screen.render()
    }
  }

  _onStatusChanged({ screen, status }) {
    return users => {
      const { content } = status.items.shift()
      status.clearItems()
      status.addItem(content)
      users.forEach(userName => {
        const collor = this._getUserCollor(userName)
        status.addItem(`{${collor}}{bold}${userName}{/}`)

      })
      screen.render()

    }
  }
  _reristerEvents(eventEmitter, components) {

    eventEmitter.on(constants.events.app.MESSAGE_RECEIVED, this._onMessageReceived(components))
    eventEmitter.on(constants.events.app.ACTIVITYLOG_UPDATED, this._onLogChanged(components))
    eventEmitter.on(constants.events.app.STATUS_UPDATED, this._onStatusChanged(components))


  }
  async initializeTable(eventEmitter) {
    const components = new ComponentsBuilder()
      .setScreen({ title: 'HackerChat - Tallyto' })
      .setLayoutComponent()
      .setInputComponent(this._onInputReceived(eventEmitter))
      .setChatComponent()
      .setActivityLogComponent()
      .setStatusComponent()
      .build()
    this._reristerEvents(eventEmitter, components)
    components.input.focus()
    components.screen.render()
  }
}