function toggleGiftPopup() {
    const popup = document.querySelector(".pop");

    if (popup.classList.contains("hide")) {
        popup.classList.remove("hide");
        popup.classList.add("show");
    } else {
        popup.classList.remove("show");
        popup.classList.add("hide");
    }
}

function animateNumbers() {
  
  const numberElements = document.querySelectorAll(".num");
  const targetNumbers = Array.from(numberElements).map((el) => parseInt(el.innerText));
  const step = targetNumbers.map((num) => Math.ceil(num / 100));
  let currentNumbers = new Array(targetNumbers.length).fill(0);

  const interval = setInterval(() => {
    // Флаг для проверки, достигли ли все числа своих исходных значений
    let allNumbersReachedTargets = true;

    for (let i = 0; i < targetNumbers.length; i++) {
      if (currentNumbers[i] < targetNumbers[i]) {
        // Увеличиваем текущее значение числа на шаг
        currentNumbers[i] = Math.min(currentNumbers[i] + step[i], targetNumbers[i]);
        // Обновляем текст элемента на странице с новым значением числа
        numberElements[i].innerText = currentNumbers[i];
        // Если хотя бы одно число еще не достигло своего исходного значения, устанавливаем флаг в false
        allNumbersReachedTargets = false;
      }
    }

    // Если все числа достигли своих исходных значений, останавливаем интервал
    if (allNumbersReachedTargets) {
      clearInterval(interval);
    }
  }, 10);
}

window.onload = function () {
  setTimeout(animateNumbers, 1000);
};



function updateText() {
    const descriptionTextElement = document.getElementById('description-text');
    const num = document.querySelector('.update-num');
    const updateText = document.getElementById('.update-text');
    if (window.innerWidth <= 768) {
        descriptionTextElement.innerHTML = `
            <span>BOGÁCH</span> – это место где творится красота и здоровье, в лице Константина и Кристины, ведущих специалистов нашего центра.
            <br><br>
            Нам доверяют и ходят семьями.
        `;
        num.innerHTML = `
            1400
        `;
        updateText.innerHTML = `
            <p>Прошли индивидуальное и
            Онлайн обучение и стали массажистми</p>
        `;
    } else {
        descriptionTextElement.innerHTML = `
            <span>BOGÁCH</span>
            – это место, где создается красота и здоровье. <br>Константин и Кристина знают,
            как исправить осанку, восстановить здоровье, сделать ваше лицо молодым,
            а тело красивым. <br><br> Нам доверяют и ходят семьями.
        `;
    }
}

window.addEventListener('load', updateText);
window.addEventListener('resize', updateText);



function toggleAppointmentPopup() {
    const popupContainer = document.querySelector('.pop-up-container');
    popupContainer.style.display = popupContainer.style.display === 'none' ? 'flex' : 'none';
}

