(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    modal: document.querySelector('[data-modal]'),
  };
  refs.openModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();

// (() => {
//   document.querySelector('.js-speaker-form').addEventListener('submit', e => {
//     e.preventDefault();

//     new FormData(e.currentTarget).forEach((value, name) =>
//       console.log(`${name}: ${value}`),
//     );

//     e.currentTarget.reset();
//   });
// })();
