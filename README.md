# Nuxt LTI

[![pnpm version][pnpm-version-src]][pnpm-version-href]
[![pnpm downloads][pnpm-downloads-src]][pnpm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Learning Tool Interoperability (LTI) implementation for Nuxt.js + Vue3 for doing amazing things.

<!-- - [✨ &nbsp;Release Notes](/CHANGELOG.md) -->
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-lti?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Quick Setup

1. Add `nuxt-lti` dependency to your project

```bash
# Using ppnpm
ppnpm add -D nuxt-lti

# Using yarn
yarn add --dev nuxt-lti

# Using pnpm
pnpm install --save-dev nuxt-lti
```

2. Add `nuxt-lti` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
	modules: [
		'nuxt-lti'
	]
})
```

That's it! You can now use Nuxt LTI in your Nuxt app ✨

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

<!-- Badges -->

[pnpm-version-src]: https://img.shields.io/pnpm/v/nuxt-lti/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[pnpm-version-href]: https://npmjs.com/package/nuxt-lti

[pnpm-downloads-src]: https://img.shields.io/pnpm/dm/nuxt-lti.svg?style=flat&colorA=18181B&colorB=28CF8D

[pnpm-downloads-href]: https://npmjs.com/package/nuxt-lti

[license-src]: https://img.shields.io/pnpm/l/nuxt-lti.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://npmjs.com/package/nuxt-lti

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com
