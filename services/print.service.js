import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from './api.services.js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' +  msg);
};

const printHelp = () => {
    console.log(dedent`
        ${chalk.bgBlue(' HELP ')}
        ${chalk.blue('Без параметров')} для вывода погоды
        ${chalk.blue('-s [CITY]')} для устрановки города
        ${chalk.blue('-h')} для вывода помощи
        ${chalk.blue('-t [API_KEY]')} для сохранения токена
    `)
}

const printWeather = (data) => {
    //console.log(data);
    console.log(dedent`
        ${chalk.bold.bgYellow('WEATHER')} Погода в городе ${chalk.yellow(data.name)}
        ${getIcon(data.weather[0].icon)} ${data.weather[0].description}
        ${chalk.yellow('Tемпература:')} ${data.main.temp} (ощущается как ${data.main.feels_like})
        ${chalk.yellow('Влажность:')} ${data.main.humidity}
        ${chalk.yellow('Скорость ветра:')} ${data.wind.speed}
    `)
}

export { printError, printSuccess, printHelp, printWeather };