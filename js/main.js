document.addEventListener('DOMContentLoaded', function() {
    var menu = new Menu()

    document.querySelectorAll('#master-menu > .menu > div > nav > ul > li > a').forEach(function (option) {
        option.addEventListener('click', function(event) {
            if (event.srcElement.tagName === 'IMG') {
                menu.open(document.querySelector(event.srcElement.parentElement.attributes.href.value))
            }
            else {
                menu.open(document.querySelector(event.srcElement.attributes.href.value))
            }
        })
    })
})