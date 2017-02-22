const TeleBot = require('telebot');
const bot = new TeleBot('333539794:AAFU7-bTZpvzRgk1XdO9m5zweX7xX5cT2Ms');

const drinks = 'Напитки';
const desserts = 'Десерты';
const back = `${String.fromCodePoint(0x1F448, 0x1F3FE)} Назад`;

let drinks_menu = {
    [back]: '',
    'Лимонад, 0,5л.': '',
    'Мохито, 0,5л.': '',
    'Молочный коктейль на соке, 0,5л.': '',
    'Молочный коктейль с вареньем, 0,5л.': '',
    'Ягодный смузи, 0,3л.': '',
    'Фруктовый смузи, 0,3л.': '',
    'Кола со льдом, 0,2л.': '',
    'Просто кола, 0,2л.': '',
    'Кофе гляссе, 0,2л.': '',
    'Просто кофе, 0,2л.': '',
    'Виноградный сок, 0,2л.': '',
    'Апельсиновый сок, 0,2л.': '',
    'Мультифруктовый сок, 0,2л.': '',
    'Яблочный сок, 0,2л.': '',
    'Горячий шоколад 0,2 л': '',
    'Чай чёрный, 0,2л': '',
    'Чай зелёный, 0,2л': ''
};

let desserts_menu = {
    [back]: '',
    'Кусочек брауни с заботой о вас': '',
    'Кусочек шарлотки с любовью': '',
    'Наивкуснейший синабон от всего сердца': '',
    'Банановый тарт': '',
    'Легкий ореховый тортик': ''
};

let owner;
let menu = {};
Object.assign(menu, drinks_menu);
Object.assign(menu, desserts_menu);

bot.on('/openTheBar', msg => {
    owner = msg.from.id;
    return bot.sendMessage(msg.from.id, 'Веселье начинается');
});

bot.on('/closeTheBar', msg => {
    owner = '';
    return bot.sendMessage(msg.from.id, 'Спасибо, что были с нами');
});

let mainButtons = bot.keyboard([[drinks, desserts]], {resize: true});

let drinksButtons = bot.keyboard(Object.keys(drinks_menu).map(e => {return [e]}), {resize: true});
let dessertsButtons = bot.keyboard(Object.keys(desserts_menu).map(e => {return [e]}), {resize: true});

bot.on('text', msg => {
    if ((msg.text in menu) && owner && msg.text !== back) {
        bot.sendMessage(owner, `Заказ: *${msg.text}* для *${msg.from.username ? msg.from.username : msg.from.first_name + ' ' + msg.from.last_name}*`, {parse: 'markdown'});
    }

    if (msg.text === drinks) {
        return bot.sendMessage(msg.from.id, drinks, {markup: drinksButtons});
    }

    if (msg.text === desserts) {
        return bot.sendMessage(msg.from.id, desserts, {markup: dessertsButtons});
    }

    if (msg.text === back) {
        return bot.sendMessage(msg.from.id, 'Давай, выбирай уже', {markup: mainButtons});
    }

    if ((msg.text in menu) && (owner !== msg.from.id)) {
        return bot.sendMessage(msg.from.id, owner ? 'Будет сделано!' : 'Извините, мы закрыты');
    }
});
bot.on(['/start'], msg => {
    return bot.sendMessage(msg.from.id, 'Мы с нетерпением ждём твой заказ :3', {markup: mainButtons});
});

bot.connect();

//Убрать сообщение при нажатии на кнопки
//Добавить эмодзю на кнопку назад
//Проверить, что ферст нейм и ласт нейм работают
//Возможно, сделать двухколоночную верстку