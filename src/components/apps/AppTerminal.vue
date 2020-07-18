<template>
  <WinApp class="app-terminal" :class="calcTerminalBgColor">
      <!-- Content (text) -->
      <div
        class="terminal-inner"
        v-on:click="setFocusInput()"
        ref="terminalTextArea"
        :class="calcTerminalTextColor"
      >
        <perfect-scrollbar :options="this.scrollBarOptions" v-chat-scroll>
          <div class="terminal-content">
            <!-- Commands -->
            <div
              class="text-terminal command-line-item"
              :class="getTextColor(item)"
              v-for="item in terminal_dom"
              :key="item.index"
            >{{ lineToDOM(item) }}</div>

            <!-- Interact -->
            <div
              class="text-terminal command-line-item interact"
              v-on:keydown.enter="onEnter"
              v-on:keydown.up="navigateHistory(0)"
              v-on:keydown.down="navigateHistory(1)"
            >
              {{ this.command_pre }}
              <input
                type="text"
                class="command-input text-terminal"
                v-model="command_input"
                ref="commandInput"
                spellcheck="false"
              />
            </div>
          </div>
        </perfect-scrollbar>
      </div>
  </WinApp>
</template>

<script>
// App functionality
import WinApp from '@/components/apps/WinApp'

// UI
import AppBorder from "@/components/common/AppBorder.vue";
// import PerfectScrollbar from 'perfect-scrollbar';

export default {
  name: "terminal",
  components: {
    WinApp
  },
  props: {
    commandString: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      command_pre: "WEB:\\Users\\Reybel>",
      command_history: [],
      canInteract: true,
      command_input: "",
      currentHistoryIndex: 0, // keep track where user is when browsing previous commands
      // These are the items that are displayed in the terminal
      terminal_dom: [
        { command: "echo", arguments: ['"$welcomeMsg"'] },
        {
          output: "Hey there! Thank you for visiting my portfolio!",
          color: "orange"
        },
        {
          output:
            "Try typing that command you see down there (or just press it and press enter)",
          color: "green"
        }
      ],
      specialVariables: [
        { var: "$HOME", value: "/home/reybel" },
        { var: "$PATH", value: "/usr/local/bin" },
        { var: "$USER", value: "reybel" }
      ],
      isServed: false,
      commands: [
        { cmd: "npm run start", description: "Serves the site" },
        { cmd: "echo", description: "Display a message in the terminal" },
        { cmd: "clear", description: "Clears the terminal" },
        { cmd: "ls", description: "List items in the current directory" },
        { cmd: "alert", description: "Displays an alert in the browser" },
        { cmd: "cd", description: "Navigate to a location" }
      ],
      terminal_bg_color: "black",
      terminal_text_color: "white",
      scrollBarOptions: {
        wheelSpeed: 1,
        suppressScrollX: true
      }
    };
  },
  methods: {
    onEnter() {
      let command = this.command_input;
      // console.log("given command: " + command);

      // Parse given command
      let command_parsed = this.parseCommand(command);

      // Add to history and terminal DOM
      if (command_parsed.command != "")
        this.addCommandToHistory(command_parsed);
      this.addToTerminalDOM(command_parsed);

      // And lastly, execute it of course
      this.executeCommand(command_parsed);

      // Clear input
      this.command_input = "";
    },
    // Take an object, which might be a command or output, and convert it to a display-able string
    lineToDOM(item) {
      if (Object.prototype.hasOwnProperty.call(item, "command")) {
        // Type is command
        return (
          this.command_pre +
          " " +
          item.command +
          " " +
          this.argumentsAsString(item.arguments)
        );
      } else {
        // Type is output
        return item.output;
      }
    },
    // Adds a line to the terminal. Can be command or output
    addToTerminalDOM(item) {
      this.terminal_dom.push(item);
    },
    // Shortcut method
    showOutput(item) {
      this.addToTerminalDOM(item);
    },
    parseCommand(commandString) {
      let pieces = commandString.split(" ");
      let cmd = pieces[0];

      // Grab rest of arguments
      let args = [];
      if (pieces.length > 0) {
        for (let i = 1; i < pieces.length; i++) {
          args.push(pieces[i]);
        }
      }

      // console.log("Command was: " + cmd);
      // console.log("Arguments: " + args);
      return { command: cmd, arguments: args };
    },
    // Takes a command object and executes it given its arguments
    executeCommand(cmd) {
      switch (cmd.command) {
        case "npm":
          if (cmd.arguments[0] == "run") {
            if (cmd.arguments[1] == "serve") {
              if (!this.isServed) {
                this.isServed = true;
                this.$emit("serve");

                // Some output to terminal
                this.showOutput({
                  output: "DONE Compiled successfully in 261ms",
                  color: "green"
                });
                this.showOutput({ output: "App running at:", color: "white" });
                this.showOutput({
                  output: "- Network: https://reybelc.com",
                  color: "white"
                });
              } else {
                this.showOutput({
                  output: "App already running!",
                  color: "orange"
                });
              }
            }
          }
          break;

        case "clear":
          this.clearHistory();
          break;

        case "echo":
          // Special vars
          if (cmd.arguments.length == 1) {
            let special = this.matchSpecialVar(cmd.arguments[0]);
            if (special != false) {
              this.showOutput({ output: special, color: "orange" });
              return;
            }
          }

          if (cmd.arguments.length > 0) {
            // Build string
            let fullString = "";
            for (let word of cmd.arguments) {
              fullString += word + " ";
            }

            // Show output
            this.showOutput({ output: fullString });
          }
          break;

        case "alert":
          // alert
          if (cmd.arguments.length > 0) {
            // Build string
            let fullString = "";
            for (let word of cmd.arguments) {
              fullString += word + " ";
            }

            // Show output
            // this.showOutput({ output: fullString });
            alert(fullString);
          }
          break;

        case "git":
          if (cmd.arguments.length == 1) {
            // Single argument commands
            if (cmd.arguments[0] == "status") {
              this.showOutput({ output: "On branch dev" });
              this.showOutput({
                output: "Your branch is up to date with 'origin/dev'."
              });
              this.showOutput({
                output: "nothing to commit, working tree clean'."
              });
            }
          }
          break;
        case "ls":
          if (cmd.arguments.length == 1) {
            // Single argument commands
            if (cmd.arguments[0] == "projects") {
              this.showOutput({ output: "Listing projects..." });
            }
          }
          break;
        case "help":
          for (let command of this.commands) {
            this.showOutput({
              output: command.cmd + " ::: " + command.description
            });
          }
          break;
        case "cd":
          if (cmd.arguments.length == 1) {
            // Single argument commands
            if (cmd.arguments[0] == "resume") {
              // Open resume
              this.showOutput({ output: "Thank you for your interest!" });
              this.navigateTo("resume");
            } else if (cmd.arguments[0] == "projects") {
              // Check if site has been served yet
              if (!this.isServed) {
                this.showOutput({ output: "Run 'npm run serve' first!" });
                return;
              }
              this.showOutput({ output: "Navigating to projects..." });
              this.$emit("scroll", "projects");
            }
          }
          break;
        case "color":
          if (this.argExists(cmd.arguments, 1)) {
            // bg color
            let color1 = cmd.arguments[0];
            this.showOutput({
              output: "Changing background color to " + color1
            });
            this.terminal_bg_color = color1;
          } else {
            this.showOutput({ output: "Please specify a color!" });
          }

          // Check for a second color (text color)
          if (this.argExists(cmd.arguments, 2)) {
            // text color
            let color2 = cmd.arguments[1];
            this.showOutput({ output: "Changing text color to " + color2 });
            this.terminal_text_color = color2;
          }

          break;

        case "":
          break;

        default:
          // No match, Invalid command
          this.invalidCommand(cmd);
      }
    },
    // Siomply returns true if argument number exists
    // Ex. checkArgExists(2) will check if there is a second argument (starts from 1, not 0)
    argExists(args, argIndex) {
      if (args[argIndex - 1] === undefined) {
        return false;
      } else {
        return true;
      }
    },
    invalidCommand(cmd, errorMsg = null) {
      if (errorMsg == null) {
        // Default message
        let invalidCommandString = this.commandToString(cmd);
        this.showOutput({
          output: "unrecognized command '" + invalidCommandString + "'",
          color: "red"
        });
      } else {
        // Custom message
        this.showOutput({ ouput: errorMsg, color: "red" });
      }
    },
    // Takes Object { command: "add", arguments: "projects" }
    addCommandToHistory(command) {
      this.command_history.push(command);
      // console.log("added new command to history");
    },
    // Return list of arguments as a string
    argumentsAsString(args) {
      let argString = "";
      for (let arg of args) {
        argString = argString + " " + arg;
      }
      return argString;
    },
    setFocusInput() {
      this.$refs.commandInput.focus();
    },
    navigateHistory(direction) {
      if (direction == 0) {
        // console.log("going up")

        if (this.currentHistoryIndex > 0) {
          // Step backward 1 command
          this.currentHistoryIndex--;
          // console.log("index: " + this.currentHistoryIndex);
          this.command_input = this.commandToString(
            this.command_history[this.currentHistoryIndex]
          );
        } else {
          // console.log("You've reached the end of the history!");
        }
      } else if (direction == 1) {
        // Check if current position is lestt than last index
        if (this.currentHistoryIndex < this.command_history.length - 1) {
          // Step forward 1 command
          this.currentHistoryIndex++;
          // console.log("index: " + this.currentHistoryIndex);
          this.command_input = this.commandToString(
            this.command_history[this.currentHistoryIndex]
          );
        } else if (
          this.currentHistoryIndex ==
          this.command_history.length - 1
        ) {
          // Check if we are at the last index (most recent command)
          this.currentHistoryIndex++;
          this.command_input = "";
        } else {
          // console.log("You've reached the end of the history!");
        }
      }
    },
    // Turn a command object back into a string (as the user typed it originally)
    commandToString(command) {
      let commandAsString = command.command;

      // Arguments?
      if (command.arguments.length > 0) {
        for (let arg of command.arguments) {
          commandAsString = commandAsString + " " + arg;
        }
      }
      return commandAsString;
    },
    updateHistoryIndex() {
      this.currentHistoryIndex = this.command_history.length;
    },
    clearHistory() {
      this.terminal_dom = [];
    },
    getTextColor(item) {
      if (Object.prototype.hasOwnProperty.call(item, "color")) {
        return "text-" + item.color;
      }
    },
    // Match special variables/keywords
    matchSpecialVar(str) {
      for (let specialVar of this.specialVariables) {
        if (str == specialVar.var) {
          return specialVar.value;
        }
      }
      return false;
    },
    navigateTo(location) {
      this.$emit("navigate", location);
    }
  },
  mounted() {
    this.setFocusInput();
    this.updateHistoryIndex();

    const ps = new PerfectScrollbar('#container');
  },
  watch: {
    command_history: function() {
      this.updateHistoryIndex();
    },
    commandString: function(cmd) {
      this.command_input = cmd;
      this.setFocusInput();
    },
    terminal_dom: function() {}
  },
  computed: {
    calcTerminalBgColor: function() {
      return "bg-" + this.terminal_bg_color;
    },
    calcTerminalTextColor: function() {
      return "text-" + this.terminal_text_color;
    }
  }
};
</script>

<style scoped>
.app-terminal {
  background-color: #1c1c2b;
  padding-bottom: 12px;
  cursor: default;
  color: white;
}

/* Terminal text */
.terminal-inner {
  padding: 13px 8px 13px 13px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}

.terminal-content {
  padding-right: 30px;
  display: flex;
  flex-direction: column;
}
.text-area > .text {
  color: white;
}
/* Scoll container */
.ps {
}
.command-line-item {
  padding: 5px 0px 5px 10px;
  text-align: left;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

/* User input */
.interact.command-line-item {
}
.interact.command-line-item > .command-input {
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 16px;
  margin: 0;
  padding: 0;
  cursor: default;
  flex-grow: 1;
  margin-left: 8px;
}
</style>
