(() => {
  const refs = {
    openModalBtn: document.querySelector('[modal-openmap]'),
    closeModalBtn: document.querySelector('[modal-closemap]'),
    modal: document.querySelector('[modalmap]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('hidd');
  }
})();
