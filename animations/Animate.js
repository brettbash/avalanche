export default () => ({
    opacity: {
        active: true,
        start: 0,
        end: 1,
        duration: 0.3,
        ease: 'quad.inOut',
    },

    rotation: {
        active: false,
        start: 180,
        end: 0,
        duration: 0.3,
        repeat: false,
        ease: 'circ.inOut',
    },

    scale: {
        active: false,
        start: 1.1,
        end: 1,
        duration: 0.3,
        ease: 'circ.inOut',
    },

    x: {
        active: false,
        start: '-100px',
        end: 0,
        duration: 0.3,
        repeat: false,
        ease: 'circ.inOut',
    },

    xPercent: {
        active: false,
        start: -25,
        end: 0,
        duration: 0.3,
        repeat: false,
        ease: 'circ.inOut',
    },

    y: {
        active: false,
        start: '100px',
        end: 0,
        duration: 0.3,
        repeat: false,
        ease: 'circ.inOut',
    },

    yPercent: {
        active: false,
        start: 25,
        end: 0,
        duration: 0.3,
        repeat: false,
        ease: 'circ.inOut',
    },

    delay: false,
    scrollTrigger: true,
    scrollSettings: false,
    start: 'top 85%',
    end: 'bottom top',
    toggleActions: 'play none play none',
    scrub: false,
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

        if (this.opacity.active) {
            animation.fromTo(
                this.element,
                {
                    opacity: this.opacity.start,
                },
                {
                    opacity: this.opacity.end,
                    duration: this.opacity.duration,
                    stagger: this.stagger,
                    ease: this.opacity.ease,
                },
                'start',
            )
        }

        if (this.rotation.active) {
            animation.fromTo(
                this.element,
                {
                    rotation: this.rotation.start,
                },
                {
                    rotation: this.rotation.end,
                    duration: this.rotation.duration,
                    repeat: this.rotation.repeat,
                    stagger: this.stagger,
                    ease: this.rotation.ease,
                },
                'start',
            )
        }

        if (this.scale.active) {
            animation.fromTo(
                this.element,
                {
                    scale: this.scale.start,
                },
                {
                    scale: this.scale.end,
                    duration: this.scale.duration,
                    stagger: this.stagger,
                    ease: this.scale.ease,
                },
                'start',
            )
        }

        if (this.x.active) {
            animation.fromTo(
                this.element,
                {
                    x: this.x.start,
                },
                {
                    x: this.x.end,
                    duration: this.x.duration,
                    repeat: this.x.repeat,
                    stagger: this.stagger,
                    ease: this.x.ease,
                },
                'start',
            )
        }

        if (this.xPercent.active) {
            animation.fromTo(
                this.element,
                {
                    xPercent: this.xPercent.start,
                },
                {
                    xPercent: this.xPercent.end,
                    duration: this.xPercent.duration,
                    repeat: this.xPercent.repeat,
                    stagger: this.stagger,
                    ease: this.xPercent.ease,
                },
                'start',
            )
        }

        if (this.y.active) {
            animation.fromTo(
                this.element,
                {
                    y: this.y.start,
                },
                {
                    y: this.y.end,
                    duration: this.y.duration,
                    stagger: this.stagger,
                    repeat: this.y.repeat,
                    ease: this.y.ease,
                },
                'start',
            )
        }

        if (this.yPercent.active) {
            animation.fromTo(
                this.element,
                {
                    yPercent: this.yPercent.start,
                },
                {
                    yPercent: this.yPercent.end,
                    duration: this.yPercent.duration,
                    repeat: this.yPercent.repeat,
                    stagger: this.stagger,
                    ease: this.yPercent.ease,
                },
                'start',
            )
        }
    },

    watch(item) {
        this.$watch(item, value => {
            value ? this.active() : this.inactive()
        })
    },

    active() {
        opacity = {
            ...opacity,
            start: 0,
            end: 1,
        }
    },

    inactive() {
        opacity = {
            ...opacity,
            start: 1,
            end: 0,
        }
    },

    setTrigger(container) {
        this.trigger = container

        if (avalanche.inView(container)) {
            this.scrollTrigger = false
            this.delay = avalanche.delay.enter
        } else {
            this.delay = avalanche.delay.default
        }
    },
})
