// import checkNumInputs from "./checkNumInputs";

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]');

    const messages = {
        loadind: 'Загрузка...', 
        success: 'Спасибо! скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const a = item.files[0].name.split('.');
            
            a[0].length > 6 ? dots = "..." : dots = '.';
            const name = a[0].substring(0, 6) + dots + a[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessages = document.createElement('div');
            statusMessages.classList.add('status');
            item.parentNode.appendChild(statusMessages);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', messages.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessages.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = messages.loadind;
            statusMessages.appendChild(textMessage);

            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('calc__form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', messages.ok);
                    textMessage.textContent = messages.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', messages.fail);
                    textMessage.textContent = messages.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessages.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.remove('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;