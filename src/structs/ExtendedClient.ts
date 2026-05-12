import { BitFieldResolvable, Partials, Client, GatewayIntentsString, IntentsBitField, GuildScheduledEvent, Message, Collection, ApplicationCommandDataResolvable } from "discord.js";
import dotenv from "dotenv";
import { CommandType, ComponentsButton, ComponentsModal, ComponentsSelect } from "./types/command";
dotenv.config();
import fs from "fs";
import path from "path";

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection();
    public buttons: ComponentsButton = new Collection();
    public selects: ComponentsSelect = new Collection();
    public modals: ComponentsModal = new Collection();

    constructor(){
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
            partials: [
                Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent,
                Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User
            ]
        })
    }
    public start(){
        this.login(process.env.BOT_TOKEN);
    }
    private registerCommands(commands: Array<ApplicationCommandDataResolvable>){
        this.application?.commands.set(commands)
        .then(() => {
            console.log("✅ Slash commands (/) defined".green);
        })
        .catch(error => {
            console.log(`❌An error occurred while trying to tset the Slash Commands (/): \n${error}`.red)
        })
        
    }
    private registerModules(){
        const slashCOmmands: Array<ApplicationCommandDataResolvable> = new Array();

        const commandsPath = path.join(__dirname, "..", "commands");
        const fileCOndition = (fileName: string) => __filename.endsWith(".ts") || __filename.endsWith(".js");

        fs.readdirSync(commandsPath).forEach(local => {
            fs.readdirSync(commandsPath + '/${local}/')
        })
    }
}

