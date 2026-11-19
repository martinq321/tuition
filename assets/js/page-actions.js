/* Shared actions for printable sheets and activity dialogs. */
document.addEventListener('click', function (event) {
  const control = event.target.closest('[data-mw-page-action]');
  if (!control) return;
  switch (control.dataset.mwPageAction) {
    case 'print':
      window.print();
      break;
    case 'close-containing-dialog':
      control.closest('dialog')?.close();
      break;
    case 'close-first-dialog':
      document.querySelector('dialog')?.close();
      break;
  }
});
