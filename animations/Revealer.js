export default () => ({
    opacity: null,
    rotation: null,
    scale: null,
    scaleX: null,
    scaleY: null,
    skew: null,
    skewX: null,
    skewY: null,
    x: null,
    y: null,
    xPercent: null,
    yPercent: null,
    animations: null,
    elm: {
        animations: {
            opacity: null,
            rotation: null,
            scale: null,
            scaleX: null,
            scaleY: null,
            skew: null,
            skewX: null,
            skewY: null,
            x: null,
            y: null,
            xPercent: null,
            yPercent: null,
        },
        duration: 0.3,
        ease: 'quad.inOut',
        delay: 0,
    },

    element: null,

    duration: 0.55,
    ease: 'expo.inOut',
    delay: 0,
    repeat: 0,

    scrollTrigger: true,
    scrollSettings: false,
    trigger: null,
    start: 'top 85%',
    end: 'bottom top',
    toggleActions: 'play none play none',
    scrub: false,
    stagger: false,
    markers: false,

    mounted() {
        if (!this.element) {
            if (!this.$refs.element) {
                Avalanche.error.element('Animate')
                return
            }

            this.element = this.$refs.element
        }

        if (!this.trigger && this.scrollTrigger) {
            if (!this.$refs.element) {
                Avalanche.error.trigger('Animate')
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
            this.delay = Avalanche.delay.default
        }

        this.animations = {
            opacity: this.opacity,
            rotation: this.rotation,
            scale: this.scale,
            scaleX: this.scaleX,
            scaleY: this.scaleY,
            x: this.x,
            y: this.y,
            xPercent: this.xPercent,
            yPercent: this.yPercent,
        }
        this.animate()
    },

    animate() {
        const tl = gsap.timeline({
            delay: this.delay,
            scrollTrigger: this.scrollSettings,
        })

        gsap.set(this.element, { opacity: 0 })

        tl.addLabel('start')

        let from = {}
        let pause = {}
        let to = {}
        Object.keys(this.animations).forEach(key => {
            if (this.animations[key]) {
                from = { ...from, [key]: this.animations[key][0] }
                pause = { ...pause, [key]: key === 'opacity' ? 0 : 1 }
                to = { ...to, [key]: this.animations[key][1] }
            }
        })

        let elementTo = {}
        let elementFrom = {}
        Object.keys(this.elm.animations).forEach(key => {
            if (this.elm.animations[key]) {
                elementFrom = { ...elementFrom, [key]: this.elm.animations[key][0] }
                elementTo = { ...elementTo, [key]: this.elm.animations[key][1] }
            }
        })

        tl.fromTo(
            this.$refs.curtain,
            from,
            {
                ...pause,
                duration: this.duration,
                ease: this.ease,
            },
            'start',
        )

        if (this.$refs.cover) {
            tl.set(this.$refs.cover, { opacity: 0 })
        }

        tl.set(this.element, elementFrom)
        tl.addLabel('element')
        tl.to(
            this.$refs.element,
            {
                ...elementTo,
                duration: this.elm.duration,
                ease: this.elm.ease,
            },
            `element+=${this.elm.delay ?? 0}`,
        )

        tl.to(
            this.$refs.curtain,
            {
                ...to,
                duration: this.duration,
                ease: this.ease,
            },
            'element',
        )

        if (this.$refs.curtainWrapper) {
            tl.to(this.$refs.curtainWrapper, { autoAlpha: 0, duration: 0.2 })
        }
    },

    watch(item) {
        this.$watch(item, value => {
            value ? this.active() : this.inactive()
        })
    },

    active() {
        opacity = [0, 1]
    },

    inactive() {
        opacity = [1, 0]
    },

    setTrigger(container) {
        Avalanche.setTrigger(container, this)
    },

    preset(animation) {
        const preset = Alpine.store('avalanche').revealer[animation]
        if (preset) {
            Object.keys(preset).forEach(key => {
                this[key] = preset[key]
            })
        }
    },
})
