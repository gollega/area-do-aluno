const calendarDays = document.getElementById("calendar-days");
const monthYear = document.getElementById("month-year");

const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");

let currentDate = new Date();

function renderCalendar() {

    if (!calendarDays || !monthYear) {
        return;
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    });

    monthYear.textContent = monthName.toUpperCase();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();

    calendarDays.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {

        const emptyDay = document.createElement("div");

        emptyDay.classList.add("calendar-day");

        calendarDays.appendChild(emptyDay);

    }

    for (let day = 1; day <= daysInMonth; day++) {

        const dayElement = document.createElement("div");
        const dayNumber = document.createElement("span");

        dayElement.classList.add("calendar-day");

        dayNumber.textContent = day;

        dayElement.appendChild(dayNumber);

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            dayElement.classList.add("today");

        }

        calendarDays.appendChild(dayElement);

    }

}

if (prevMonth && nextMonth) {

    prevMonth.addEventListener("click", function () {

        currentDate.setDate(1);
        currentDate.setMonth(currentDate.getMonth() - 1);

        renderCalendar();

    });

    nextMonth.addEventListener("click", function () {

        currentDate.setDate(1);
        currentDate.setMonth(currentDate.getMonth() + 1);

        renderCalendar();

    });

}

renderCalendar();

const homeView = document.getElementById("home-view");
const agendaView = document.getElementById("agenda-view");

const agendaCard = document.getElementById("agenda-card");
const backHome = document.getElementById("back-home");

function abrirAgenda() {

    homeView.hidden = true;
    agendaView.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

function abrirInicio() {

    agendaView.hidden = true;
    homeView.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

if (agendaCard) {

    agendaCard.addEventListener("click", abrirAgenda);

    agendaCard.addEventListener("keydown", function (event) {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();
            abrirAgenda();

        }

    });

}

// Botão Voltar
if (backHome) {

    backHome.addEventListener("click", abrirInicio);

}

const filterButtons = document.querySelectorAll(".filter-button");
const dateButtons = document.querySelectorAll(".date-button");

const activityCards = document.querySelectorAll(".activity-card");
const emptyMessage = document.getElementById("empty-message");

let selectedCategory = "todas";
let selectedDate = "proximas";

function filterActivities() {

    let visibleActivities = 0;

    activityCards.forEach(function (card) {

        const category = card.dataset.category;

        const matchesCategory =
            selectedCategory === "todas" ||
            category === selectedCategory;

        const matchesDate =
            selectedDate === "todas" ||
            selectedDate === "proximas";

        if (matchesCategory && matchesDate) {

            card.hidden = false;
            visibleActivities++;

        } else {

            card.hidden = true;

        }

    });

    if (emptyMessage) {
        emptyMessage.hidden = visibleActivities !== 0;
    }

}

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.filter;

        filterActivities();

    });

});

dateButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        dateButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedDate = button.dataset.date;

        filterActivities();

    });

});

filterActivities();

const vlibrasTrigger = document.getElementById("vlibras-trigger");

if (vlibrasTrigger) {

    vlibrasTrigger.addEventListener("click", function () {

        const botaoOficial = window.VLibrasWidget?.initBtn;

        if (botaoOficial) {

            botaoOficial.click();

        } else {

            console.warn("VLibras ainda não foi inicializado.");

        }

    });

}