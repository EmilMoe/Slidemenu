document.addEventListener('DOMContentLoaded', function() {
    var options = document.querySelectorAll('#master-menu > nav > ul > li > a');

    for (var i = 0; i < options.length; i++) {
        options[i].addEventListener('click', function(event) {
            var target = event.srcElement.attributes.href.value;

            document.querySelector(target).classList.toggle('active');
        });
    }
});