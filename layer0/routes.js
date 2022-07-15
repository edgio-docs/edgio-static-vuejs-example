import { BACKENDS, Router } from '@layer0/core'
import getPrerenderRequests from './getPrerenderRequests'
import { isProductionBuild } from '@layer0/core/environment'
import { API_CACHE_HANDLER, EDGE_CACHE_HANDLER } from './cache'

const router = new Router()

router.get(
  {
    headers: {
      // Regex to catch multiple hostnames
      // Any deployment will have a L0 permalink
      // Don't allow Google bot to crawl it, read more on:
      // https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
      host: /layer0.link|layer0-perma.link/,
    },
  },
  ({ setResponseHeader }) => {
    setResponseHeader('x-robots-tag', 'noindex')
  }
)

// Pre-render the static home page
// By pre-rendering, once the project is deployed
// the set of links are visited to warm the cache
// for future visits (expected to be the first view for real users)
// More on static prerendering: https://docs.layer0.co/guides/static_prerendering
router.prerender(getPrerenderRequests)

// Serve the old Layer0 predefined routes by the latest prefix
router.match('/__xdn__/:path*', ({ redirect }) => {
  redirect('/__layer0__/:path*', 301)
})

// Cache the Layer0 devtools css js and other assets served by L0 by default
router.match('/__layer0__/:path*', EDGE_CACHE_HANDLER)

// API (Any backend) caching
router.match('/l0-api/:path*', API_CACHE_HANDLER)

router.match('/', EDGE_CACHE_HANDLER)
router.match('/about', EDGE_CACHE_HANDLER)
router.match('/commerce', EDGE_CACHE_HANDLER)
router.match('/product/:path', EDGE_CACHE_HANDLER)

if (isProductionBuild()) {
  router.match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('dist/service-worker.js')
  })

  // Send requests to static assets in the build output folder `dist`
  router.static('dist')

  // Send everything else to the App Shell
  router.fallback(({ appShell }) => {
    appShell('dist/index.html')
  })
} else {
  router.fallback(({ proxy }) => {
    proxy(BACKENDS.js)
  })
}

export default router
