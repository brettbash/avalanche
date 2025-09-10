import Alpine from 'alpinejs'
import Avalanche from '../Avalanche'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

window.Alpine = Alpine
gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, ScrollToPlugin, SplitText)
window.gsap = gsap
window.mm = gsap.matchMedia()
ScrollTrigger.normalizeScroll(true)
window.ScrollTrigger = ScrollTrigger
window.SplitText = SplitText

Alpine.store('barba', {
    currentHeight: 0,
    started: false,
})

Avalanche()
Alpine.start()
