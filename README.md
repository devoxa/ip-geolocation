<!-- Title -->
<h1 align="center">
  ip-geolocation
</h1>

<!-- Description -->
<h4 align="center">
  Resolve an IP address into a geolocation (continent, country, subdivision, city & lat/long)
</h4>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/@devoxa/ip-geolocation">
    <img
      src="https://img.shields.io/npm/v/@devoxa/ip-geolocation?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://app.circleci.com/pipelines/github/devoxa/ip-geolocation?branch=master">
    <img
      src="https://img.shields.io/circleci/build/github/devoxa/ip-geolocation/master?style=flat-square"
      alt="Build Status"
    />
  </a>

  <a href="https://codecov.io/github/devoxa/ip-geolocation">
    <img
      src="https://img.shields.io/codecov/c/github/devoxa/ip-geolocation/master?style=flat-square"
      alt="Code Coverage"
    />
  </a>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License :warning:</a>
</p>

<br>

## Installation

:warning: **Before installing this make sure you understand the [license](#license)!**

```bash
yarn add @devoxa/ip-geolocation
```

**This module will automatically download a ~85MB IP geolocation database from
[db-ip.com](https://db-ip.com/db/download/ip-to-city-lite) in a postinstall step.**

## Usage

```ts
import { loadDatabase, geolocateIp } from '@devoxa/ip-geolocation'

// Preload the geolocation database
// Recommended, but not required. Will reduce the first call to `geolocateIp` by ~100ms
await loadDatabase()

// Lookup an IP address
const result = await geolocateIp('69.10.63.243')
// {
//   continent: { code: 'NA', name: 'North America' },
//   country: { code: 'US', name: 'United States', isInEuropeanUnion: false },
//   subdivision: { name: 'New Jersey' },
//   city: { name: 'Secaucus' },
//   location: { latitude: 40.7861, longitude: -74.0743 },
// }
```

## Contributing

```sh
# Download the database for testing
yarn postinstall src/

# Run the tests
yarn test
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4" width="75px;" alt=""/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/devoxa/ip-geolocation/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/devoxa/ip-geolocation/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/devoxa/ip-geolocation/commits?author=queicherius" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT

:warning: The module will also automatically download and use a ~85MB IP geolocation database from
[db-ip.com](https://db-ip.com/db/download/ip-to-city-lite). This database is licensed under a
**Creative Commons Attribution 4.0 International License**. You are free to use this database in
your application, provided you give attribution to DB-IP.com for the data.

In the case of a web application, you must include a link back to DB-IP.com on pages that display or
use results from the database:

```html
<a href="https://db-ip.com">IP Geolocation by DB-IP</a>
```
