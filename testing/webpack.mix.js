const mix = require('laravel-mix')

// mix.alias({
//     '@': 'resources/js',
//     '@templates': 'resources/js/templates',
//     '@blocks': 'resources/js/blocks',
//     '@modules': 'resources/js/modules',
//     '@components': 'resources/js/components',
//     '@stores': 'resources/js/stores',
// })
//
mix.setPublicPath('./')
mix.js('./site.js', './dist/site.js')

mix.options({ cssNano: { minifyFontValues: false } })

mix.browserSync({
    proxy: 'http://avalanche.test',
    files: ['**/*.html', '**/*.(css|js)'],
    // Option to open in non default OS browser.
    // browser: "firefox",
    notify: false,
})

mix.webpackConfig({
    stats: {
        children: true,
    },
})

mix.version()
