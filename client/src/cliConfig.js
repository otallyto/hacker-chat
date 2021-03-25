export default class CliConfig {
  constructor ({username, hostUri, room}){
    this.username = username,
    this.room = room
    const {hostname, port, protocol} = new URL(hostUri)
    this.hostUri = hostname
    this.port = port
    this.protocol = protocol.replace(/\W/, '')
  }

  static parseArguments(comands) {
    const cmd = new Map()

    for (const key in comands) {
      const index = parseInt(key)
      const command = comands[key]
      const commandPreffix = '--'
      if (!command.includes(commandPreffix)) continue
      cmd.set(command.replace(commandPreffix, ''),
        comands[index + 1])
    }

    return new CliConfig(Object.fromEntries(cmd))
  }

}