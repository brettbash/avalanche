export default () => ({
    // property: [from, to, { duration, delay, stagger, repeat, ease }],
    // y: [100, 0, { duration: 0.3, delay: 0.1, stagger: 0.1, repeat: -1, ease: 'circ.inOut' }],
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

    element: null,

    duration: 0.3,
    ease: 'quad.inOut',
    delay: false,
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
                scrub: this.scrub,
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
            skew: this.skew,
            skewX: this.skewX,
            skewY: this.skewY,
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
        tl.addLabel('start')
        Object.keys(this.animations).forEach(key => {
            if (this.animations[key]) {
                this.set(this.animations[key], tl)
            }
        })
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
        const preset = Alpine.store('avalanche').animate[animation]
        if (preset) {
            Object.keys(preset).forEach(key => {
                this[key] = preset[key]
            })
        }
    },

    set(animation, tl) {
        if (!animation) return
        let from
        let to
        const property = [...Object.keys(this.animations)].find(key => animation == this.animations[key])
        if (property) {
            from = { [property]: animation[0] }
            to = { [property]: animation[1] }
        } else {
            return
        }
        const options = animation[2] || {}
        tl.fromTo(
            this.element,
            from,
            {
                ...to,
                duration: options.duration ?? this.duration,
                stagger: options.stagger ?? this.stagger,
                repeat: options.repeat ?? this.repeat,
                ease: options.ease ?? this.ease,
                transformOrigin: options.transformOrigin ?? 'center center',
            },
            `start+=${options.delay ?? 0}`,
        )
    },
})
