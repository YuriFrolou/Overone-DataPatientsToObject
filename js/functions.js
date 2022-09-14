const results = document.querySelector('.results');
const getPatientsBtn = document.querySelector('.buttons__all');
const tips = document.getElementById('tips');
const closeBtn = document.querySelector('.close');
const searchedPatientData = {
    lastName: null,
    firstName: null,
    surname: null,
    age: null
};
const showPatientDataBtn = document.querySelector('.search-form__button');

showPatientDataBtn.disabled = true;

const form = document.forms[1];
const radioGenderBtns = form.elements.gender;
const addOptionsBtns = form.elements.options;

const searchForm = document.forms[0];

radioGenderBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        removeActiveGender();
        event.target.classList.add('active');
    });
});

addOptionsBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        event.target.classList.toggle('active');
    });
});

function getData() {
    const lastName = form.lastname.value;
    const firstName = form.firstname.value;
    const surname = form.surname.value;
    const age = form.age.value;
    const gender = form.gender.value;
    const diagnosis = form.diagnosis.value;
    const operation = form.operation.value;
    const anesthesia = form.anesthesia.value;
    const anesthesiologist = form.anesthesiologists.value;
    const comments = form.comments.value;
    let addOptions = [];
    for (const option of form.options) {
        if (option.checked) {
            addOptions.push(option.value);
        }
    }

    const obj = patientsDB.find((item) => {
        if (item.lastName === lastName && item.firstName === firstName && item.surname === surname && item.age === age) {
            return item;
        }
    });
    if (obj !== undefined) {
        return null;
    }
    return {
        lastName: lastName,
        firstName: firstName,
        surname: surname,
        age: age,
        gender: gender,
        diagnosis: diagnosis,
        operation: operation,
        anesthesia: anesthesia,
        addOptions: addOptions,
        anesthesiologist: anesthesiologist,
        comments: comments
    }
}

function removeActiveGender() {
    for (const radio of radioGenderBtns) {
        radio.classList.remove('active');
    }
}

function removeActiveOptions() {
    for (const option of addOptionsBtns) {
        option.classList.remove('active');
    }
}

function getAllPatients(listOfObjects) {
    if (listOfObjects.length === 0) {
        return '<h1 style="margin: 10px auto;">Список пациентов пуст</h1>';
    }
    let str = '<div class="all">';
    for (const obj of listOfObjects) {
        str += `<h3 class="all__item">ФИО: ${obj.lastName} ${obj.firstName} ${obj.surname}</h3>`;
        str += `<p class="all__item">Возраст: ${obj.age}</p>`;
        str += `<p class="all__item">Пол: ${obj.gender}</p>`;
        str += `<p class="all__item">Диагноз: ${obj.diagnosis}</p>`;
        str += `<p class="all__item">Операция: ${obj.operation}</p>`;
        str += `<p class="all__item">Анестезия: ${obj.anesthesia}</p>`;
        str += `<p class="all__item">Анестезиолог: ${obj.anesthesiologist}</p>`;
        str += getAllOptions(obj.addOptions);
        str += `<p class="all__item">Замечания по анестезии: ${obj.comments ? obj.comments : " отсутствуют"}</p>`;

    }
    str += '</div>';
    return str;
}

function getOnePatient(listOfObjects) {
    const obj = listOfObjects.find((item) => {
        if (item.lastName === searchedPatientData.lastName && item.firstName === searchedPatientData.firstName && item.surname === searchedPatientData.surname && item.age === searchedPatientData.age) {
            return item;
        }
    });
    let str = '<div class="all">';
    str += `<h3 class="all__item">ФИО: ${obj.lastName} ${obj.firstName} ${obj.surname}</h3>`;
    str += `<p class="all__item">Возраст: ${obj.age}</p>`;
    str += `<p class="all__item">Пол: ${obj.gender}</p>`;
    str += `<p class="all__item">Диагноз: ${obj.diagnosis}</p>`;
    str += `<p class="all__item">Операция: ${obj.operation}</p>`;
    str += `<p class="all__item">Анестезия: ${obj.anesthesia}</p>`;
    str += `<p class="all__item">Анестезиолог: ${obj.anesthesiologist}</p>`;
    str += getAllOptions(obj.addOptions);
    str += `<p class="all__item">Замечания по анестезии: ${obj.comments ? obj.comments : " отсутствуют"}</p>`;

    str += '</div>';
    showPatientDataBtn.disabled = true;
    return str;
}

function getAllOptions(array) {
    let str = '';
    if (array.length > 0) {
        str += '<ul class="all__item all__item_list">';
        str += 'Были использованы: ';
        for (let item of array) {
            str += `<li>${item} </li>`;
        }
        str += '</ul>';
    }
    return str;
}

function closeResults() {
    results.classList.remove('active');
    document.querySelector('.all').innerHTML = '';
}

function searchByLastName(value) {
    const searched = patientsDB.filter((patient) => {
        return patient.lastName.includes(value);
    });
    if (searched.length > 0) {
        tips.classList.add('active');
        renderFiltered(searched);
        return true
    }
    return false;
}

function renderFiltered(array) {
    for (const item of array) {
        const pElement = document.createElement('p');
        pElement.classList.add('filtered');
        pElement.innerHTML = `${item.lastName} ${item.firstName} ${item.surname} ${item.age}`;
        pElement.onclick = (e) => {
            setSearchInputValue(e.target.innerText);
        }
        tips.append(pElement);
    }
}

function setSearchInputValue(value) {
    search.value = value;
    searchedPatientData.lastName = value.split(' ')[0];
    searchedPatientData.firstName = value.split(' ')[1];
    searchedPatientData.surname = value.split(' ')[2] || '';
    searchedPatientData.age = value.split(' ')[3];
    showPatientDataBtn.disabled = false;
}