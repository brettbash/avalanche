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
        start: -45,
        end: 0,
        duration: 0.3,
        stagger: null,
        ease: 'circ.inOut',
    },

    scale: {
        active: false,
        start: 0,
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
        stagger: null,
        ease: 'circ.inOut',
    },

    y: {
        active: false,
        start: '100px',
        end: 0,
        duration: 0.3,
        stagger: null,
        ease: 'circ.inOut',
    },

    xPercent: {
        active: false,
        start: -25,
        end: 0,
        duration: 0.3,
        stagger: null,
        ease: 'circ.inOut',
    },

    yPercent: {
        active: false,
        start: 25,
        end: 0,
        duration: 0.8,
        stagger: null,
        ease: 'circ.inOut',
    },

    type: 'words',
    linesClass: '',
    wordsClass: '',
    charsClass: '',

    splitText: {},

    stagger: 0.06,
    delay: false,
    scrollTrigger: true,
    scrollSettings: false,
    start: 'top 85%',
    end: 'bottom top',
    toggleActions: 'play none play none',
    scrub: false,
    element: null,
    text: null,
    trigger: null,
    markers: false,

    mounted() {
        if (!this.element) {
            if (!this.$refs.element) {
                avalanche.error.element('AnimateText')
                return
            }

            this.element = this.$refs.element
        }

        gsap.set(this.element, { autoAlpha: 0 })

        if (!this.trigger && this.scrollTrigger) {
            if (!this.$refs.container) {
                avalanche.error.trigger('AnimateText')
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
            this.text,
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
