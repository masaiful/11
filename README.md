[![Netlify Status](https://api.netlify.com/api/v1/badges/d7716919-cb6e-4c73-a7b0-d252f1ee94fd/deploy-status)](https://app.netlify.com/sites/ina/deploys)

## Usage

Create `.env` with these

```
ALGOLIA_APPLICATION_ID="foobar"
ALGOLIA_API_KEY="foobar"
OMDB_API_KEY="foobar"
```

Then,

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

# Drop any assets in to misc/ and run this to organize
# them and optimize where appropriate
yarn borg

# Push changes. The log itself is pushed here, which
# triggers a CircleCI build that syncs to an S3 Bucket.
# The misc assets are synced from my machine to another
# bucket (that has versioning enabled.)
yarn push
```

## Resources

- [TurnDown](https://domchristie.github.io/turndown) turns HTML &rarr; Markdown.
- [Gruvbox Palette](https://github.com/morhetz/gruvbox#palette)

