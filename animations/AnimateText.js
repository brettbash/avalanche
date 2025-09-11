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

    element: null,
    text: null,
    splitText: {},
    type: 'words',
    linesClass: '',
    wordsClass: '',
    charsClass: '',

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
    stagger: 0.06,
    markers: false,

    mounted() {
        if (!this.element) {
            if (!this.$refs.element) {
                Avalanche.error.element('AnimateText')
                return
            }

            this.element = this.$refs.element
        }

        gsap.set(this.element, { autoAlpha: 0 })

        if (!this.trigger && this.scrollTrigger) {
            if (!this.$refs.container) {
                Avalanche.error.trigger('AnimateText')
                return
            }

            this.trigger = this.$refs.container
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

        this.splitText.autoSplit = true
        if (this.type === 'lines') {
            this.splitText.type = this.type
        } else if (this.type === 'words') {
            this.splitText.type = `${this.type}, lines`
        } else if (this.type === 'chars') {
            this.splitText.type = `${this.type}, words, lines`
            this.splitText.charsClass = this.charsClass
        }

        this.splitText.linesClass = this.linesClass
        if (this.type !== 'lines') {
            this.splitText.mask = 'lines'
            this.splitText.wordsClass = this.wordsClass
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
        const split = SplitText.create(this.element, {
            ...this.splitText,
            onSplit: self => {
                const tl = gsap.timeline({
                    delay: this.delay,
                    scrollTrigger: this.scrollSettings,
                })
                if (this.type === 'lines') {
                    this.text = self.lines
                } else if (this.type === 'words') {
                    this.text = self.words
                } else if (this.type === 'chars') {
                    this.text = self.chars
                }
                gsap.set(this.element, { autoAlpha: 1 })
                tl.addLabel('start')
                Object.keys(this.animations).forEach(key => {
                    if (this.animations[key]) {
                        this.set(this.animations[key], tl)
                    }
                })
            },
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
        const preset = Alpine.store('avalanche').animateText[animation]
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
            this.text,
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
