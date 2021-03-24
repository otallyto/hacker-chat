import blessed from 'blessed'

export default class ComponentsBuilder {
  _screen
  _input
  _layout
  _chat
  _status
  _activityLog
  constructor() { }

  _baseCompoent() {
    return {
      border: 'line',
      mouse: true,
      keys: true,
      top: 0,
      scrollbar: {
        ch: ' ',
        inverse: true
      },
      // habilita colocar cores e tags no texto
      tags: true
    }
  }

  setScreen({ title }) {
    this._screen = blessed.screen({
      smartCSR: true,
      title
    })
    this._screen.key(['escape', 'q', 'C-c'], () => process.exit(0))
    return this
  }

  setLayoutComponent() {
    this._layout = blessed.layout({
      parent: this._screen,
      width: '100%',
      height: '100%'
    })

    return this
  }

  setInputComponent(onEnterPressed) {
    const input = blessed.textarea({
      parent: this._screen,
      bottom: 0,
      height: '10%',
      inputOnFocus: true,
      padding: {
        top: 1,
        left: 2
      },
      style: {
        fg: '#f6f6f6',
        bd: '#353535'
      }

    })

    input.key('enter', onEnterPressed)
    this._input = input

    return this


  }
  setChatComponent(){
    this._chat = blessed.list({
      ...this._baseCompoent(),
      parent: this._layout,
      align: 'left',
      width: '50%',
      height: '90%',
      items: ['{bold}Messager{/}']
    })

    return this
  }

  setStatusComponent(){
    this._status = blessed.list({
      ...this._baseCompoent(),
      parent: this._layout,
      width: '25%',
      height: '90%',
      items: ['{bold}Users on Room{/}']

    })
     return this
  }

  setActivityLogComponent(){

    this._activityLog = blessed.list({
      ...this._baseCompoent(),
      parent: this._layout,
      width: '25%',
      height: '90%',
      style: { 
        fg: 'yellow'
      },
      items: ['{bold}Activity log{/}']

    })
    return this
 }

  build() {
    const components = {
      screen: this._screen,
      input: this._input,
      chat: this._chat,
      activityLog: this._activityLog,
      status: this._status
    }

    return components
  }
}

