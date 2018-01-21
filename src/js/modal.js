export function popup() {
    // Функция для затемнения фона на котором появляется модалка
    const shadow = document.querySelector('.shadow');
    const modal = document.querySelector('.modal');
    const btnOpenModal = document.querySelector('.header-callback');
    const modalClose = document.querySelector('.modal-close');

    const openModal = function () {
        shadow.style.display = 'block';
        modal.style.display = 'block';
        setTimeout(function () {
            shadow.classList.add('shadowActive');
            modal.classList.add('modalActive');
        }, 100);

    };
// Функция для того чтобы убрать модальное окно и затемнения фона
    const closeModal = function () {
        shadow.classList.remove('shadowActive');
        modal.classList.remove('modalActive');

        setTimeout(function () {
            shadow.style.display = 'none';
            modal.style.display = 'none';
        }, 700);
    };

    btnOpenModal.addEventListener('click', function () {
        openModal()
    });

    modalClose.addEventListener('click', function () {
        closeModal()
    });
    shadow.addEventListener('click', function (event) {
        closeModal()
    });
}


export default {
    popup
}
