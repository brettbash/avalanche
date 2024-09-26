export default (force = 25) => ({
    force: 25,
    duration: 0.3,
    ease: 'power1.out',

    init() {
        this.force = force
    },

    magnetize(ev, item, element, force) {
        if (avalanche.isTouch()) {
            return
        }
        const boundingRect = item.getBoundingClientRect()
        const relX = ev.clientX - boundingRect.left
        const relY = ev.clientY - boundingRect.top

        if (force) {
            this.force = force
        }

        gsap.to(element, {
            x: ((relX - boundingRect.width / 2) / boundingRect.width) * this.force,
            y: ((relY - boundingRect.height / 2) / boundingRect.height) * this.force,
            duration: this.duration,
            transformOrigin: 'center',
            ease: this.ease,
        })
    },

    demagnetize(element) {
        if (avalanche.isTouch()) {
            return
        }
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: this.duration,
        })
    },
})
