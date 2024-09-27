import animate from './animations/Animate.js'
import animateText from './animations/AnimateText.js'
import draw from './animations/Draw.js'
import magnetic from './animations/Magnetic.js'
import revealer from './animations/Revealer.js'

export default () => {
    Alpine.data('animate', animate)
    Alpine.data('animateText', animateText)
    Alpine.data('draw', draw)
    Alpine.data('magnetic', magnetic)
    Alpine.data('revealer', revealer)
    Alpine.store('isTouch', 'ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))

    window.avalanche = {
        loaded: false,
        delay: {
            default: 0.25,
            enter: 1,
        },

        screens: {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            '2xl': 1536,
            '3xl': 1680,
        },

        textClass: {
            chars: {},
            lines: {},
            words: {},
        },

        breakpoint(width, type = 'min', dimension = 'width') {
            if (type === 'max') {
                width--
            }
            return `(${type}-${dimension}: ${width}px)`
        },

        inView(el) {
            if (!el) {
                avalanche.error.inView()
                return
            }
            const rect = el.getBoundingClientRect()
            let top

            if (Alpine.store('barba').started && Alpine.store('barba').currentHeight) {
                const pageScrolled = window.scrollY
                const offset = Alpine.store('barba').currentHeight - pageScrolled
                top = rect.top - offset
            } else {
                top = rect.top
            }

            top = Math.round(top)
            return top >= 0 && top <= (window.innerHeight || document.documentElement.clientHeight)
        },

        error: {
            root: '🏔️AVALANCHE ERROR 🚨: ',
            inView() {
                console.error(`${this.root} inView is missing an triggger! 😱`)
            },

            element($el) {
                console.error(`${this.root} A ${$el}() animation has no element to animate!`)
            },

            trigger($el) {
                console.error(`${this.root} A ${$el}() animation has no trigger set! 😱`)
            },
        },
    }
}
