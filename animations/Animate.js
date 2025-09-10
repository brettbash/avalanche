export default () => ({
    opacity: {
        active: true,
        start: 0,
        end: 1,
        duration: 0.3,
        stagger: null,
        ease: 'quad.inOut',
    },

    rotation: {
        active: false,
        start: 180,
        end: 0,
        duration: 0.3,
        stagger: null,
        repeat: false,
        ease: 'circ.inOut',
    },

    scale: {
        active: false,
        start: 1.1,
        end: 1,
        duration: 0.3,
        stagger: null,
        ease: 'circ.inOut',
    },

    scaleX: {
        active: false,
        start: 1.1,
        end: 1,
        duration: 0.3,
        stagger: null,
        ease: 'circ.inOut',
    },

    scaleY: {
        active: false,
        start: 1.1,
        end: 1,
        duration: 0.3,
        stagger: null,
        ease: 'circ.inOut',
    },

    x: {
        active: false,
        start: '-100px',
        end: 0,
        duration: 0.3,
        repeat: false,
        stagger: null,
        ease: 'circ.inOut',
    },

    y: {
        active: false,
        start: '100px',
        end: 0,
        duration: 0.3,
        repeat: false,
        stagger: null,
        ease: 'circ.inOut',
    },

    xPercent: {
        active: false,
        start: -25,
        end: 0,
        duration: 0.3,
        repeat: false,
        stagger: null,
        ease: 'circ.inOut',
    },

    yPercent: {
        active: false,
        start: 25,
        end: 0,
        duration: 0.3,
        stagger: null,
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

    animate() {
        const tl = gsap.timeline({
            delay: this.delay,
            scrollTrigger: this.scrollSettings,
        })

        tl.addLabel('start')

        const animations = [
            this.opacity,
            this.rotation,
            this.scale,
            this.scaleX,
            this.scaleY,
            this.x,
            this.y,
            this.xPercent,
            this.yPercent,
        ]
        animations.forEach(animation => {
            this.set(animation, tl)
        })
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
        avalanche.setTrigger(container, this)
    },

    set(animation, tl) {
        if (!animation.active) return
        let from
        let to
        if (animation == this.opacity) {
            from = { opacity: animation.start }
            to = { opacity: animation.end }
        } else if (animation == this.rotation) {
            from = { rotation: animation.start }
            to = { rotation: animation.end }
        } else if (animation == this.scale) {
            from = { scale: animation.start }
            to = { scale: animation.end }
        } else if (animation == this.scaleX) {
            from = { scaleX: animation.start }
            to = { scaleX: animation.end }
        } else if (animation == this.scaleY) {
            from = { scaleY: animation.start }
            to = { scaleY: animation.end }
        } else if (animation == this.x) {
            from = { x: animation.start }
            to = { x: animation.end }
        } else if (animation == this.y) {
            from = { y: animation.start }
            to = { y: animation.end }
        } else if (animation == this.xPercent) {
            from = { xPercent: animation.start }
            to = { xPercent: animation.end }
        } else if (animation == this.yPercent) {
            from = { yPercent: animation.start }
            to = { yPercent: animation.end }
        }

        tl.fromTo(
            this.element,
            from,
            {
                ...to,
                stagger: animation.stagger ?? this.stagger,
                repeat: animation.repeat ?? 0,
                duration: animation.duration,
                ease: animation.ease,
            },
            'start',
        )
    },
})
