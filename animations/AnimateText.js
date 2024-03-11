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

    xPercent: {
        active: false,
        start: -25,
        end: 0,
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

    yPercent: {
        active: false,
        start: 25,
        end: 0,
        duration: 0.8,
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

    type: 'words',
    linesClass: 'overflow-hidden',
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

    // π ----
    // :: SETUP ---------------------------::
    // ____
    mounted() {
        if (!this.element) {
            if (!this.$refs.element) {
                avalanche.error.element('AnimateText')
                return
            }

            this.element = this.$refs.element
        }

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
            this.splitText.wordsClass = this.wordsClass
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

        const split = new SplitText(this.element, this.splitText)

        if (this.type === 'lines') {
            this.text = split.lines
        } else if (this.type === 'words') {
            this.text = split.words
        } else if (this.type === 'chars') {
            this.text = split.chars
        }

        animation.addLabel('start')

        if (this.opacity.active) {
            animation.fromTo(
                this.text,
                {
                    opacity: this.opacity.start,
                },
                {
                    opacity: this.opacity.end,
                    duration: this.opacity.duration,
                    stagger: this.opacity.stagger ?? this.stagger,
                    ease: this.opacity.ease,
                },
                'start',
            )
        }

        if (this.rotation.active) {
            animation.fromTo(
                this.text,
                {
                    rotation: this.rotation.start,
                },
                {
                    rotation: this.rotation.end,
                    duration: this.rotation.duration,
                    repeat: this.rotation.repeat,
                    stagger: this.rotation.stagger ?? this.stagger,
                    ease: this.rotation.ease,
                },
                'start',
            )
        }

        if (this.scale.active) {
            animation.fromTo(
                this.text,
                {
                    scale: this.scale.start,
                },
                {
                    scale: this.scale.end,
                    duration: this.scale.duration,
                    stagger: this.scale.stagger ?? this.stagger,
                    ease: this.scale.ease,
                },
                'start',
            )
        }

        if (this.xPercent.active) {
            animation.fromTo(
                this.text,
                {
                    xPercent: this.xPercent.start,
                },
                {
                    xPercent: this.xPercent.end,
                    duration: this.xPercent.duration,
                    stagger: this.xPercent.stagger ?? this.stagger,
                    ease: this.xPercent.ease,
                },
                'start',
            )
        }

        if (this.x.active) {
            animation.fromTo(
                this.text,
                {
                    x: this.x.start,
                },
                {
                    x: this.x.end,
                    duration: this.x.duration,
                    stagger: this.x.stagger ?? this.stagger,
                    ease: this.x.ease,
                },
                'start',
            )
        }

        if (this.yPercent.active) {
            animation.fromTo(
                this.text,
                {
                    yPercent: this.yPercent.start,
                },
                {
                    yPercent: this.yPercent.end,
                    duration: this.yPercent.duration,
                    stagger: this.yPercent.stagger ?? this.stagger,
                    ease: this.yPercent.ease,
                },
                'start',
            )
        }

        if (this.y.active) {
            animation.fromTo(
                this.text,
                {
                    y: this.y.start,
                },
                {
                    y: this.y.end,
                    duration: this.y.duration,
                    stagger: this.y.stagger ?? this.stagger,
                    ease: this.y.ease,
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
        this.container = container

        if (avalanche.inView(container)) {
            this.scrollTrigger = true
            this.delay = avalanche.delay.enter
        } else {
            this.delay = avalanche.delay.default
        }
    },
})
