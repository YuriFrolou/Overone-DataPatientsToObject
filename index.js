const patientsDB = [];
const search = document.querySelector('.search');
const success = document.querySelector('.success');


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getData();
    if (data === null) {
        alert("Пациент с такими данными уже существует");
    } else {
        patientsDB.push(data);
        success.classList.add('active');
        setTimeout(() => {
            success.classList.remove('active');
        }, 1500);
    }
    form.reset();
    removeActiveGender();
    removeActiveOptions();
});


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    results.innerHTML = '';
    results.append(closeBtn);
    results.classList.add('active');
    results.innerHTML += getOnePatient(patientsDB);
    searchForm.reset();
    tips.classList.remove('active');
});

getPatientsBtn.addEventListener('click', () => {
    results.innerHTML = '';
    results.append(closeBtn);
    results.classList.add('active');
    results.innerHTML += getAllPatients(patientsDB);
});

search.addEventListener('input', (e) => {
    e.preventDefault();
    tips.innerHTML = '';
    if (e.target.value !== '') {
        searchByLastName(e.target.value);
    } else {
        tips.innerHTML = '';
        tips.classList.remove('active');
    }
});





    
    