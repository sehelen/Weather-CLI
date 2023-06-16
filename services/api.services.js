import axios from "axios";
import { getFromStorage } from "./storage.service.js";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async() => {
    const token = process.env.TOKEN || await getFromStorage('token');
    const city = process.env.CITY || await getFromStorage('city');

    if (!token) {
        throw new Error('Token should be set!')
    }

    if (!city) {
        throw new Error('City should be set!')
    }

    const data = await axios.get(BASE_URL, {
        params: {
            q: city,
            appid: token,
            units: 'metric',
            lang: 'ru'
        }
    })
    return data.data;
}

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

export { getWeather, getIcon };