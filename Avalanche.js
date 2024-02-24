import animate from '@components/avalanche/animations/Animate.js'
import animateText from '@components/avalanche/animations/AnimateText.js'
import draw from '@components/avalanche/animations/Draw.js'
import magnetic from '@components/avalanche/animations/Magnetic.js'
import revealer from '@components/avalanche/animations/Revealer.js'

export default () => {
    Alpine.data('animate', animate)
    Alpine.data('animateText', animateText)
    Alpine.data('draw', draw)
    Alpine.data('magnetic', magnetic)
    Alpine.data('revealer', revealer)

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

        inView(el) {
            if (!el) {
                avalanche.error.inView()
                return
            }
            const rect = el.getBoundingClientRect()
            return rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        },

        breakpoint(width, type = 'min', dimension = 'width') {
            if (type === 'max') {
                width--
            }
            return `(${type}-${dimension}: ${width}px)`
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
