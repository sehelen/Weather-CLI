#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.services.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/print.service.js";
import { saveToStorage } from "./services/storage.service.js";

const saveSetting = async (key, value) => {
    try {
        await saveToStorage(key, value);
        printSuccess('Settings have been saved');
    } catch (error) {
        printError(error.message);
    }
}

const getForecast = async () => {
    try {
        const weather = await getWeather();
        printWeather(weather);
    } catch (e) {
        if (e?.response?.status == 404){
            printError('Wrong city name!');
        } else if (e?.response?.status == 401){
            printError('Wrong token!');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv);
    //Error in args input

    if (args.h) {
        printHelp();
    } else if (args.s) {
        saveSetting('city', args.s);
    } else if (args.t) {
        saveSetting('token', args.t);
    } else {
        getForecast();
    }
}

initCLI();