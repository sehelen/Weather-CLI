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

    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveSetting('city', args.s);
    }
    if (args.t) {
        return saveSetting('token', args.t);
    }
    return getForecast();
}

initCLI();