// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var emitter = require('./index.js');

// Определим объект для счетчика нотификаций
var notifications = {
    counter: 0,
    count: function () {
        this.counter++;
    }
};

// Определим для хранения логов
var logger = {
    logs: []
};

// Подписываемся на событие new_notification и сразу оповещаем всех подписчиков
emitter
    .on('new_notification', notifications, notifications.count)
    .on('new_notification', logger, function () {
        this.logs.push('Произошло новое событие new_notification');
    })
    .on('new_notification', logger, function () {
        // this указывает на logger
        this.logs.push('Добавлена новая нотификация. Количество - ' + notifications.counter);
    })
    .emit('new_notification');

//// Проверяем количество нотификаций
assert.equal(notifications.counter, 1, 'Получена одна нотификация');

// В логе сохранено событие
// Так как обработчик notifications.count отработал первым,
//  в логах сохранено правильное количество нотификаций
assert.deepEqual(logger.logs, [
    'Произошло новое событие new_notification',
    'Добавлена новая нотификация. Количество - 1'
]);

// На время отключаем логгирование, а затем снова включаем
emitter
    .off('new_notification', logger)
    .emit('new_notification')
    .on('new_notification', logger, function () {
        this.logs.push('Новое событие new_notification!');
    })
    .emit('new_notification');

// Проверяем количество нотификаций
assert.equal(notifications.counter, 3, 'Получено три нотификации');
// Проверяем, что логи были отключены, а затем снова подключены
assert.deepEqual(logger.logs, [
    'Произошло новое событие new_notification',
    'Добавлена новая нотификация. Количество - 1',
    'Новое событие new_notification!'
]);


// Проверяем всё досконально со всеми краевыми случами.

// Так как с фантазией не очень хорошо, то создаём примитивных подписчиков
// firedEvents - это будет мапа (map, словарь) с ключом = "event" и значением = количество раз, которое
// сработал зарегистрированный хэндлер на это событие.
//var sub1 = {
//    firedEvents: {},
//};
//
//var sub2 = {
//    firedEvents: {},
//};

// Создаём такие хэндлеры, так как лень придумывать что-то особенное.
// Они просто добавляют в мапу запись о событии, если её ещё нет,
// и увеличивают счётчик количества зарегистрированных событий.
//
// При регистрации хэндлер привязывается к subscriber с событием event в качестве параметра,т.е.
// handler.bind(subscriber, event)
// Поэтому можно в handler передать параметр event

//function handler(event) {
//    if (this.firedEvents[event] === undefined) {
//        this.firedEvents[event] = 0;
//    }
//    this.firedEvents[event]++;
//}
//
////Регаем sub1 на event[1-2], а sub2 на event[1-3]
//emitter
//    .on('event1', sub1, handler)
//    .on('event2', sub1, handler)
//    .on('event1', sub2, handler)
//    .on('event2', sub2, handler)
//    .on('event3', sub2, handler);
//
//emitter.emit('event1');
//assert.deepEqual(sub1.firedEvents, {
//    'event1': 1
//});
//assert.deepEqual(sub2.firedEvents, {
//    'event1': 1
//});

//// Регистрируем ещё один такой-же хэндлер для sub1 на event1.
//// Счетчик sub1 для event1 должен увеличиваться на 2 при регистрации event1
//emitter
//    .on('event1', sub1, handler)
//    .emit('event1')
//    .emit('event2');
//
//// счетчик event1 для sub1 увеличивается на 2, а для sub2 на 1
//// и появляется счетчик event2 для sub1 и sub2
//assert.deepEqual(sub1.firedEvents, {
//    'event1': 3,
//    'event2': 1
//});
//assert.deepEqual(sub2.firedEvents, {
//    'event1': 2,
//    'event2': 1
//});
//
//// Отписываем sub1 от event1
//// и запускаем события event1 и event3
//emitter
//    .off('event1', sub1)
//    .emit('event1')
//    .emit('event3');
//
//// для sub1 ничего не меняется, так как он не подписан на event1 и на event3
//assert.deepEqual(sub1.firedEvents, {
//    'event1': 3,
//    'event2': 1
//});
//// для sub2 счетчик event1 увеличивается на 1,
//// и появляется счетчик event3
//assert.deepEqual(sub2.firedEvents, {
//    'event1': 3,
//    'event2': 1,
//    'event3': 1
//});
//
//// запускаем event2
//emitter.emit('event2');
//// Так как sub1 не отписывался от event2, то счетчик увеличивается на 1
//assert.deepEqual(sub1.firedEvents, {
//    'event1': 3,
//    'event2': 2
//});
//// Для sub2 счетчик event2 также увеличивается на 1
//assert.deepEqual(sub2.firedEvents, {
//    'event1': 3,
//    'event2': 2,
//    'event3': 1
//});
//
//// Отписываем sub2 от event1 и event3
//// Подписывает sub1 на event1 и event3
//// Эмитим event1, event2, event3
//emitter
//    .off('event1', sub2)
//    .off('event3', sub2)
//    .on('event1', sub1, handler)
//    .on('event3', sub1, handler)
//    .emit('event1')
//    .emit('event2')
//    .emit('event3');
//
////Счетчики event1 и event2 для sub1 увеличиваются на 1, и появляется счетчик event3
//assert.deepEqual(sub1.firedEvents, {
//    'event1': 4,
//    'event2': 3,
//    'event3': 1
//});
//
////У sub2 должен увеличиться только счетчик event2 на 1, т.к. от остальных он отписался
//assert.deepEqual(sub2.firedEvents, {
//    'event1': 3,
//    'event2': 3,
//    'event3': 1
//});
//
//// Отписываем sub1 от всех событий
//// И подписываем sub2 ещё раз на event2 - тогда при запуске event2
//// счетчик event2 у sub2 должен увеличиваться на 2
//emitter
//    .off('event1', sub1)
//    .off('event2', sub1)
//    .off('event3', sub1)
//    .on('event2', sub2, handler);
//
//// Запускаем event1, event2 и event3.
//emitter
//    .emit('event1')
//    .emit('event2')
//    .emit('event3');
//
//// Для sub1 ничего не должно измениться - он ото всех отписался
//assert.deepEqual(sub1.firedEvents, {
//    'event1': 4,
//    'event2': 3,
//    'event3': 1
//});
//// Для sub2 изменится только счетчик event2 - увеличиться на 2. От остальных он был отписан ранее
//assert.deepEqual(sub2.firedEvents, {
//    'event1': 3,
//    'event2': 5,
//    'event3': 1
//});
//
//// При попытке отписать подписчика от несуществующего эвента - игнор
//emitter
//    .off('event4', sub1)
//    .off('event4', sub2);
//
//// Эммитим event4 - ничего не происходит, так как на него никто не подписан
//emitter.emit('event4');
//// Для sub1 ничего не должно измениться
//assert.deepEqual(sub1.firedEvents, {
//    'event1': 4,
//    'event2': 3,
//    'event3': 1
//});
//// Для sub2 тоже ничего не должно измениться
//assert.deepEqual(sub2.firedEvents, {
//    'event1': 3,
//    'event2': 5,
//    'event3': 1
//});
//
//// При попытке отписать подписчика от эвента, на который он не зареган - игнор
//// Подписываем sub2 на event4. Теперь на event4 в принципе кто-то когда-то регался.
//// Пытаемся отписать sub1 от event4.
////
//// Разница с предыдущим тестом в том, что там на event4 никто никогда не регался,
//// а здесь мы зарегали sub2 на event4, и только после этого отписываем sub1 от event4
//// Из-за этой разницы потенциально могут быть разные ошибки.
////
//emitter
//    .on('event4', sub2, handler)
//    .off('event4', sub1);
//// запускаем event4
//emitter.emit('event4');
//// у sub2 появляется счетчик event4
//assert.deepEqual(sub2.firedEvents, {
//    'event1': 3,
//    'event2': 5,
//    'event3': 1,
//    'event4': 1
//});
//// Так как sub1 никогда на него нерегался - ничего не происходит
//assert.deepEqual(sub1.firedEvents, {
//    'event1': 4,
//    'event2': 3,
//    'event3': 1
//});
//
//
//// При этом если его после этого подписать sub1 на такой эвент,
//// тогда всё будет нормально
//emitter
//    .on('event4', sub1, handler);
//// запускаем event4
//emitter.emit('event4');
//// у sub2 счетчик event4 увеличиться на 1
//assert.deepEqual(sub2.firedEvents, {
//    'event1': 3,
//    'event2': 5,
//    'event3': 1,
//    'event4': 2
//});
//// у sub1 появится счетчик event4 = 1
//assert.deepEqual(sub1.firedEvents, {
//    'event1': 4,
//    'event2': 3,
//    'event3': 1,
//    'event4': 1
//});

console.info('OK!');
