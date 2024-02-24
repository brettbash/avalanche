export default () => ({
    draw: {
        start: 0,
        end: '100%',
    },
    duration: 0.3,
    ease: 'none',
    delay: false,
    scrollTrigger: true,
    scrollSettings: false,
    start: 'top 75%',
    end: 'bottom 80%',
    toggleActions: 'play none play none',
    scrub: true,
    stagger: false,
    element: null,
    trigger: null,
    markers: false,

    // π ----
    // :: SETUP ---------------------------::
    // ____
    mounted() {
        if (!this.element) {
            if (!this.$refs.element) {
                avalanche.error.element('Draw')
                return
            }

            this.element = this.$refs.element
        }

        if (!this.trigger && this.scrollTrigger) {
            if (!this.$refs.element) {
                avalanche.error.trigger('Draw')
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
            this.delay = avalanche.delay.default
        }

        this.animate()
    },

    // π ----
    // :: ANIMATE ---------------------------::
    // ____
    animate() {
        const animation = gsap.timeline({
            delay: this.delay,
            scrollTrigger: this.scrollSettings,
        })

        animation.addLabel('start')

        animation.fromTo(
            this.element,
            {
                drawSVG: this.draw.start,
            },
            {
                drawSVG: this.draw.end,
                duration: this.duration,
                ease: this.ease,
            },
            'start',
        )
    },
})
