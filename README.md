# @aktriver/rssified

[![build](https://github.com/aktriver/rssified/actions/workflows/build.yml/badge.svg)](https://github.com/aktriver/rssified/actions/workflows/build.yml)
[![generate-feed](https://github.com/aktriver/rssified/actions/workflows/generate-feed.yml/badge.svg)](https://github.com/aktriver/rssified/actions/workflows/generate-feed.yml)

I created RSS feeds for favorite websites because they are not providing them. 🥺

This repository has useful functions to make RSS feed for any websites easily.<br>
You can fork this repository and get started to create your own RSS feed.

## Generated RSS feeds

### [TANO\*C STORE (New Items)](https://www.tanocstore.net/)

https://rssified.akutagawa.dev/tanocstore-new-items.rss

### [TANO\*C RELEASES](http://www.tano-c.net/release/)

https://rssified.akutagawa.dev/tanoc-releases.rss

## Usage

### Setup

```sh
yarn install --frozen-lockfile
```

Recommended Node.js version is `16.x`.

### Generate

```sh
yarn generate
```

RSS feeds are generated into `dist` directory.

### Deploy

An example which deploys to netlify.

```sh
npx netlify-cli deploy --dir dist --prod
```

### Development

Runs `yarn generate` in development mode.

```sh
yarn dev [siteName]
# yarn dev tanocstore-new-items
```
