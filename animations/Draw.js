export default () => ({
    draw: [0, '100%'],

    element: null,

    duration: 0.3,
    ease: 'none',
    delay: false,
    repeat: 0,

    scrollTrigger: true,
    scrollSettings: false,
    trigger: null,
    start: 'top 75%',
    end: 'bottom 80%',
    toggleActions: 'play none play none',
    scrub: true,
    stagger: false,
    markers: false,

    mounted() {
        if (!this.element) {
            if (!this.$refs.element) {
                Avalanche.error.element('Draw')
                return
            }

            this.element = this.$refs.element
        }

        if (!this.trigger && this.scrollTrigger) {
            if (!this.$refs.element) {
                Avalanche.error.trigger('Draw')
                return
            }

            this.trigger = this.$refs.element
        }

        if (this.scrollTrigger) {
            this.scrollSettings = {
                start: this.start,
                end: this.end,
                toggleActions: this.toggleActions,
                trigger: this.trigger,
                scrub: this.scrub,
                markers: this.markers,
            }
        }

        if (!this.delay) {
            this.delay = Avalanche.delay.default
        }

        this.animate()
    },

    animate() {
        const tl = gsap.timeline({
            delay: this.delay,
            scrollTrigger: this.scrollSettings,
            repeat: this.repeat,
        })

        tl.addLabel('start')

        const options = draw[2] || {}

        tl.fromTo(
            this.element,
            {
                drawSVG: this.draw[0],
            },
            {
                drawSVG: this.draw[1],
                duration: options.duration ?? this.duration,
                stagger: options.stagger ?? this.stagger,
                ease: options.ease ?? this.ease,
            },
            'start',
        )
    },

    watch(item) {
        this.$watch(item, value => {
            value ? this.active() : this.inactive()
        })
    },

    active() {
        draw = [0, '100%']
    },

    inactive() {
        draw = [0, 0]
    },

    setTrigger(container) {
        Avalanche.setTrigger(container, this)
    },

    preset(animation) {
        const preset = Alpine.store('avalanche').draw[animation]
        if (preset) {
            Object.keys(preset).forEach(key => {
                this[key] = preset[key]
            })
        }
    },
})
