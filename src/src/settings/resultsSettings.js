export const result = {
    200: {
        status: 'success',
        title: 'Все прошло успешно!',
        text: 'Лицензия автоматически сохранена на Ваш компьютер',
        buttonText: 'Сгенерировать еще',
    },

    201: {
        status: 'success',
        title: 'Пользователь успешно добавлен',
        text: '',
        buttonText: 'Выйти',
    },
    400: {
        status: 'error',
        title: 'УПС! Что-то пошло не так',
        text: 'Произошла ошибка в отправке данных',
        buttonText: 'Выйти',
    },
    403: {
        status: 'error',
        title: 'У Вас нет прав на генерацию лицензии',
        text: 'Обратитесь в поддержку',
        buttonText: 'Выйти',
    },
    404: {
        status: 'error',
        title: 'УПС! Что-то пошло не так',
        text: 'Ошибка запроса сервера',
        buttonText: 'Выйти',
    },
    415: {
        status: 'error',
        title: 'УПС! Что-то пошло не так',
        text: 'Попробуйте повторить попытку позже',
        buttonText: 'Выйти',
    },
};
