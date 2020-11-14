# Miscellaneous Assets for `log.nikhil.io`

Being pictures, video, text, and HTML files I use on [my log](https://log.nikhil.io/). I just keep the scripts here. The assets themselves are in [a CloudFront-ed S3 bucket](https://static-log.nikhil.io) with versioning enabled, for I got tired of messing around with `git lfs`.

Uses Sharp to create optimized _and_ WebP versions of PNG and JPEG assets. These are created in `_optimized` with the same path. That is to say: the original assets (in `a/`, `b/`, and so on) remain **untouched** and **unused**.

I use [this project](https://github.com/afreeorange/s3-bucket-listing) for a [nice bucket listing](https://static-log.nikhil.io/).

### Usage

```bash
# Install dependencies
yarn

# Create a folder structure; organize assets by the first character
# of their filenames. This way, don't have to pull down the entire
# bucket for local development.
yarn bootstrap

# Pull all assets. Modify bucket in _scripts/pull.sh
yarn pull

# Organize assets
yarn organize

# Optimize Images
yarn build

# Push assets. Modify bucket in _scripts/push.sh
yarn push
```

Why `yarn`? The log itself is based on [11ty.js](https://www.11ty.dev/) and has a lot of `yarn` scripts itself. This just keeps the tooling consistent 🤷‍♂️
