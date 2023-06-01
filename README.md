# RLOverlay

After doing many Rocket League broadcasts over the years I was curious how custom overlays worked
and decided to experiment with making one.
The project is currently meant for learning purposes and not intended to be used in an actual broadcast.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Rocket League](https://store.epicgames.com/en-US/p/rocket-league) - Videogame that the overlay is meant for. Also works with the Steam version if you have it from before being delisted
* [BakkesMod](https://bakkesplugins.com) - Main modding tool for Rocket League and required for getting game data
* [Node.js](https://nodejs.org/en/) - JavaScript runtime, needed for SOS-WS-Relay
* [SOS-WS-Relay](https://gitlab.com/bakkesplugins/sos/sos-ws-relay) - Broadcasts game information to be picked up by the overlay

### Installing & Running

Download and install BakkesMod and Node.js. The current LTS build of Node.js is preferred.
Download the SOS-WS-Relay repository and place the folder in an easily accessible location.
Direct a command prompt window to the folder and run `npm install` then `node ws-relay.js`.
Information about the launch options for SOS-WS-Relay can be found in the project's README file.
<br>
Now launch Rocket League and BakkesMod. Then launch SOS-WS-Relay through a command prompt. Lastly, open main.html and spectate a custom game with bots in Rocket League. If everything is working properly, live information from the game will show up in the main.html window.

## Built With

* [RL Broadcast Programming discord](https://discord.gg/za2wqSf) - Community and resources for creating Rocket League overlays
* [SOS Overlay System](https://gitlab.com/bakkesplugins/sos/sos-plugin) - Information on events and data pulled from the game
* [WebStorm](https://www.jetbrains.com/webstorm/) - JavaScript IDE
* [GitHub Desktop](https://desktop.github.com/) - GitHub app

## Authors

* **Ryan Marsh** - *Project Creator* - [RhinoVOD](https://github.com/RhinoVOD)
