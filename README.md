# log.nikhil.io

[My personal log](https://log.nikhil.io/) powered by [11ty.js](https://www.11ty.dev/).

```bash
# Clone the misc assets repo and bootstrap
git clone https://github.com/afreeorange/log-misc.git misc
pushd misc && yarn && yarn bootstrap && popd

# Create a .env with these
ALGOLIA_APPLICATION_ID="FOO"
ALGOLIA_API_KEY="FOO"
OMDB_API_KEY="FOO"

# Install dependencies
yarn

# Make a new post
yarn new

# Start a live-reloading server (on port 9000)
yarn start

# Clean build
yarn clean

# Build site
yarn build

# Publish stuff
yarn sync
```
