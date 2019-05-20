class Menu {
    /**
     *
     */
    constructor() {
        this.root           = document.querySelector('#master-menu > .menu')
        this.events         = {}
        this.active         = null
        this.events.escape  = null
        this.events.outside = null
        this.pinned         = document.querySelector('#master-menu > .pinned')
        this.onScroll()
        this.setTopMargin()

        if (this.pinned) {
            this.open(this.pinned)
        }
    }
    /**
     *
     */
    setTopMargin(height = null) {
        if (! height) {
            document.querySelector('body').style.marginTop =
                this.root.offsetHeight +
                (this.pinned ? 130 : 0) + 'px'
        }

        if (height) {
            document.querySelector('body').style.marginTop = height + 'px'
        }
    }
    /**
     *
     */
    onScroll() {
        if (this.pinned) {
            return
        }

        var prevScrollpos = window.pageYOffset
        var treshold      = 400

        window.onscroll = function() {
            if (this.active) {
                return
            }

            var currentScrollPos = window.pageYOffset
        
            if (prevScrollpos > currentScrollPos || currentScrollPos < treshold) {
                this.root.style.top = 0
            } else {
                this.root.style.top = -1 * this.root.offsetHeight - 15 + 'px'
            }
        
            prevScrollpos = currentScrollPos

            window.pageYOffset >= treshold - 200
                ? this.root.classList.add('background')
                : this.root.classList.remove('background')
        }.bind(this)
    }
    /**
     *
     */
    close(section = null) {
        var active  = this.active
        this.active = null
        
        if (! this.pinned) {
            this.root.classList.remove('active')
        }

        this.detachEvents()

        document.querySelectorAll('#master-menu > .section').forEach(function (s) {
            if (! section) {
                s.classList.remove('active')
            }

            if (section && s.getAttribute('id') !== section.getAttribute('id')) {
                s.classList.remove('active')
            }
        })

        if (section && active && active.getAttribute('id') !== section.getAttribute('id')) {
            this.open(section)
        }
    }
    /**
     *
     */
    open(section) {
        section.style.paddingTop = this.root.offsetHeight + 50 + 'px'
        
        if (this.active === section) {
            this.close(this.pinned)
            return
        }

        this.close(section)
        this.active = section
        section.classList.add('active')
        this.root.classList.add('active')
        this.attachEvents()
    }
    /**
     *
     */
    attachEvents() {
        document.addEventListener('keydown', this.events.escape = function (event) {
            if (event.keyCode === 27) {
                this.close(this.pinned)
            }
        }.bind(this))

        document.addEventListener("click", this.events.outside = function (event) {
            const menu = document.getElementById('master-menu')
            let targetElement = event.target

            do {
                if (targetElement == menu) {
                    return
                }
                targetElement = targetElement.parentNode
            } while (targetElement)

            this.close(this.pinned)
        }.bind(this))
    }
    /**
     *
     */
     detachEvents() {
        document.removeEventListener('click', this.events.outside)
        document.removeEventListener('keydown', this.events.escape)
     }
}