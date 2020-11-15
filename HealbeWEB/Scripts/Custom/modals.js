import 'jquery';
import 'bootstrap';

const spinner = $('#modal-spinner');

export function showSpinner() {
    spinner.modal('show');
};

export function hideSpinner() {
    spinner.modal('hide');
};