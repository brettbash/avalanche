export default () => ({
    xPercent: {
        start: -101,
        end: 101,
    },

    yPercent: {
        start: 0,
        end: 0,
    },

    duration: 0.55,
    ease: 'expo.inOut',
    delay: false,
    scrollTrigger: true,
    scrollSettings: false,
    start: 'top 85%',
    end: 'bottom top',
    toggleActions: 'play none play none',
    element: null,
    trigger: null,
    markers: false,

    // π ----
    // :: SETUP ---------------------------::
    // ____
    mounted() {
        if (!this.element) {
            if (!this.$refs.element) {
                avalanche.error.element('Animate')
                return
            }

            this.element = this.$refs.element
        }

        if (!this.trigger && this.scrollTrigger) {
            if (!this.$refs.element) {
                avalanche.error.trigger('Animate')
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
                markers: this.markers,
            }
        }

        if (!this.delay) {
            this.delay = avalanche.delay.default
        }

        this.animate()
    },

    animate() {
        const animation = gsap.timeline({
            delay: this.delay,
            scrollTrigger: this.scrollSettings,
        })

        gsap.set(this.element, { opacity: 0 })

        animation.addLabel('start')

        animation.fromTo(
            this.$refs.curtain,
            {
                xPercent: this.xPercent.start,
                yPercent: this.yPercent.start,
            },
            {
                xPercent: 0,
                yPercent: 0,
                duration: this.duration,
                ease: this.ease,
            },
            'start',
        )

        if (this.$refs.cover) {
            animation.set(this.$refs.cover, { opacity: 0 })
        }

        animation.set(this.element, { opacity: 1 }).to(this.$refs.curtain, {
            xPercent: this.xPercent.end,
            yPercent: this.yPercent.end,
            duration: this.duration,
            ease: this.ease,
        })

        if (this.$refs.curtainWrapper) {
            animation.to(this.$refs.curtainWrapper, { autoAlpha: 0, duration: 0.2 })
        }
    },

    setTrigger(container) {
        avalanche.setTrigger(container, this)
    },
})
