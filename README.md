# [log.nikhil.io](https://log.nikhil.io/)

My personal log powered by the awesome [11ty.js](https://www.11ty.dev/). Simple and scores very well on [Lighthouse](https://developers.google.com/web/tools/lighthouse) and [WebPageTest](https://www.webpagetest.org/).

## Usage

### Environment

Create `.env` with these

```
ALGOLIA_APPLICATION_ID="foobar"
ALGOLIA_API_KEY="foobar"
OMDB_API_KEY="foobar"
```

### Commands

```bash
# Install dependencies
yarn

# Bootstrap misc assets (like photos, videos, etc)
# Will pull down assets from a separate S3 bucket
# that hosts them with versioning in case I do
# something stupid.
yarn bootstrap-misc

# Start a live-reloading server
yarn start

# Create a new post
yarn new

# Organize and run `sharp` on images in /misc (where applicable)
yarn borg

# Push changes. The log itself is pushed here, which
# triggers a CircleCI build that syncs to an S3 Bucket.
# The misc assets are synced from my machine to another
# bucket (that has versioning enabled.)
yarn push
```

See `package.json` for more commands.

### Misc Notes

I use [this project](https://github.com/afreeorange/s3-bucket-listing) for a [nice bucket listing](https://static-log.nikhil.io/).

Uses Sharp to create optimized _and_ WebP versions of PNG and JPEG assets. These are created in `misc/_optimized` with the same path. That is to say: the original assets (in `misc/a`, `misc/b`, and so on) remain **untouched** and **unused**.

Things can be customized in `_scripts/eleventy/config.js`

## Resources

* [TurnDown](https://domchristie.github.io/turndown) turns HTML &rarr; Markdown.
