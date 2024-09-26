/**
   * Timer
   * 
   * Чтобы определить сколько времени осталось, нужно из даты дедлайна вычесть текущее время.
   * В контексте языка, мы переводим дедлайн в мс, и из него вычитаем текущую дату в мс
   * Метод Date.parse() переводит дату в мс, прошедшие с 1 янв. 1970 года
   * 
   * Затем, милисекунды переводятся в секунды, и деление на 60 отчленяет 
   * остаток секунд до достижения минуты (23:59:XX)
   * 
   * Такой же подход с минутами, и часами. 
   * Но часов может быть > 24 в контексте нашего таймера (тк нет дней)
   */
let deadline = '2024-11-01';

// Получаем сколько осталось
function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t/1000) % 60),
      minutes = Math.floor((t/1000/60) % 60),
      hours = Math.floor((t/(1000 * 60 * 60)));
  
  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

// Далее необходимо обновить данные на самой странице (в верстке)
function setClock(id, endtime) {
  let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds');

  // updateClock() вызывается каждую секунду
  let timeInterval = setInterval(updateClock, 1000);
  
  // обновляет данные в верстке
  function updateClock() {
    let t = getTimeRemaining(endtime);

    function addZero(num) {
      if (num <= 9)
        return '0' + 9;
      return num
    }

    hours.textContent = addZero(t.hours);
    minutes.textContent = addZero(t.minutes);
    seconds.textContent = addZero(t.seconds);

    // остановить таймер, если разница мс < 0
    if (t.total <= 0) {
      clearInterval(timeInterval);
      hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    }
  }
}

setClock('timer', deadline);