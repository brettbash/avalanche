import animate from './animations/Animate'
import animateText from './animations/AnimateText'
import draw from './animations/Draw'
import magnetic from './animations/Magnetic'
import revealer from './animations/Revealer'

export default () => {
    Alpine.data('animate', animate)
    Alpine.data('animateText', animateText)
    Alpine.data('draw', draw)
    Alpine.data('magnetic', magnetic)
    Alpine.data('revealer', revealer)

    window.Avalanche = {
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
                Avalanche.error.inView()
                return
            }
            const rect = el.getBoundingClientRect()
            let top = rect.top

            if (Alpine.store('barba')) {
                if (Alpine.store('barba').started && Alpine.store('barba').currentHeight) {
                    const pageScrolled = window.scrollY
                    const offset = Alpine.store('barba').currentHeight - pageScrolled
                    top = rect.top - offset
                }
            }

            top = Math.round(top)
            // only items at the very top of the screen to adjust
            // incase it's returning a negative value caused by a -mb-px class to prevent hairline gaps
            if (top < 10) {
                top = top + 10
            }
            return top >= 0 && top <= (window.innerHeight || document.documentElement.clientHeight)
        },

        // make the setTrigger method used in the other files globally available here as a utility
        setTrigger(container, component) {
            component.trigger = container

            if (Avalanche.inView(container)) {
                component.scrollTrigger = false
                component.delay = Avalanche.delay.enter
            } else {
                component.scrollTrigger = true
                component.delay = Avalanche.delay.default
            }
        },

        // simple mobile device detection
        isTouch() {
            return 'ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)
        },

        error: {
            root: '🏔️Avalanche ERROR 🚨: ',
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
