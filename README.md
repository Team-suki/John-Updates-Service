<h1 align="center">Welcome to kickstarter-updates-service 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E%3D6.14.5-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D12.16.3-blue.svg" />
  <a href="https://github.com/team-suki/john-service/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/team-iroh/pledge-rewards/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/xApnea/john-service" />
  </a>
</p>

> This module is one of 4 services for a crowdfunding website's Campaign page. This module specifically handles the Updates & Comment Sections.

## Related Projects

  - https://github.com/Team-suki/Quinn-Video-Overview
  - https://github.com/Team-suki/Zukostarter_Campaign
  - https://github.com/Team-suki/Nick-pledges-rewards-service
  - https://github.com/Team-suki/John-Proxy

## Table of Contents

1. [Installation](#installation)
1. [Usage](#Usage)
1. [Requirements](#requirements)

## Mounting Points in index.html
- Rewards module mounts to the div with id of 'rewards'
- Rewards modal window mounts to the div with id of 'modal-root'
```html
<div id="update"></div>
```

## Installation

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Usage

> Build

```sh
npm run build
```

> Seed Database

```sh
npm run db:setup
```

> Start

```sh
npm run start
```

> Run tests

```sh
npm run test
```

## Requirements

- npm >=6.14.5
- node >=12.16.3
