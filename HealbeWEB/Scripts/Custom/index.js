import 'jquery';
import 'jsrender';
import 'bootstrap';

import { showSpinner, hideSpinner } from 'Scripts/Custom/modals'

const container = $('#render-container');

$(document).ready(function (e) {
    console.log('ready');

    showSpinner();

    $.ajax({
        url: "../Home/GetRenderAjax",
        type: "post",
        cache: false,
        data: { example: "Сюда кидать параметры запроса" },
        error: {},
        success: async function (response) {
            if (response.Status == 'ok') {
                container.empty();
                await container.html(
                    $('#render-test').render(response.Data)
                );
            }

            await setTimeout(hideSpinner, 1000);
        }
    });
});