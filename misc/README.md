# Miscellaneous Assets

Being pictures, video, text, and HTML files I use on this log. This is a mostly empty folder. The assets themselves are in [a CloudFront-ed S3 bucket](https://static-log.nikhil.io) with versioning enabled, for I got tired of messing around with `git lfs`.

Uses Sharp to create optimized _and_ WebP versions of PNG and JPEG assets. These are created in `_optimized` with the same path. That is to say: the original assets (in `a/`, `b/`, and so on) remain **untouched** and **unused**.

I use [this project](https://github.com/afreeorange/s3-bucket-listing) for a [nice bucket listing](https://static-log.nikhil.io/).
