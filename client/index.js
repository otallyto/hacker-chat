import Events from 'events'
import CliConfig from './src/cliConfig.js';
import SocketClient from './src/socket.js';
import TerminalController from "./src/terminalController.js";
const [nodePath, filePath, ...comands] = process.argv
const config = CliConfig.parseArguments(comands)
const componentEmitter = new Events()
const socketClient = new SocketClient(config)
socketClient.initialize()
// const controller = new TerminalController()
//await controller.initializeTable(componentEmitter)   