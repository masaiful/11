/**
 * References:
 *
 * https://github.com/h404bi/markdown-it-lazy-image/blob/master/index.js
 * https://github.com/markdown-it/markdown-it/blob/1093e6/lib/token.js#L15
 *
 * Original:
 * https://github.com/johanlef/markdown-it-picture/blob/master/src/index.js
 */

const config = require("./config");

const LOCAL_MISC_PREFIX = `/${config.MISC_PATH}`;
const REMOTE_MISC_PREFIX = config.REMOTE_MISC_PREFIX;

/**
 * Converts md to html5 picture elements
 *
 * input:
 *    ![alt](defaultSource "title")(source1 "cond1")(source2 "cond2")(etc.)
 *
 * output:
 *    <picture>
 *      <source srcset="source1" media="cond1" />
 *      <source srcset="source2" media="cond2" />
 *      <img srcset="defaultSource" alt="alt" title="title" />
 *    </picture>
 */

const rule = (state, silent) => {
  if (state.src.charCodeAt(state.pos) !== 0x21 /* ! */) return false;
  if (state.src.charCodeAt(state.pos + 1) !== 0x5b /* [ */) return false;

  let pos = state.pos;
  let start = pos;
  let index = 0;
  let res = {};
  const oldPos = state.pos;

  const sources = [];
  const media = [];
  const labelStart = state.pos + 2;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) return false;
  // '(' should come next
  pos = labelEnd;
  if (state.src.charCodeAt(labelEnd + 1) !== 0x28 /* ( */) return false;

  const parseSources = () => {
    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < state.posMax; pos++) {
      const code = state.src.charCodeAt(pos);
      if (!state.md.utils.isSpace(code) && code !== 0x0a) {
        break;
      }
    }
    if (pos >= state.posMax) return false;

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      const source = state.md.normalizeLink(res.str);
      if (state.md.validateLink(source)) {
        pos = res.pos;
        index = sources.push(source);
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < state.posMax; pos++) {
      const code = state.src.charCodeAt(pos);
      if (!state.md.utils.isSpace(code) && code !== 0x0a) break;
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < state.posMax && start !== pos && res.ok) {
      media[index - 1] = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < state.posMax; pos++) {
        const code = state.src.charCodeAt(pos);
        if (!state.md.utils.isSpace(code) && code !== 0x0a) break;
      }
    }

    if (pos >= state.posMax || state.src.charCodeAt(pos) !== 0x29 /* ) */) {
      state.pos = oldPos;
      return false;
    }
    // pos++
  };

  while (state.src.charCodeAt(++pos) === 0x28 /* ( */ && pos < state.posMax) {
    parseSources();
  }

  if (!silent && sources.length) {
    const primary = sources.shift();
    const title = media.shift();
    const alt = state.src.slice(labelStart, labelEnd);

    /**
     * This is the structure being created here:
     *
     * <picture class="lazy" data-alt="Foo">
     *   <source type="image/webp" srcset="$REMOTE_MISC_PREFIX/misc/_optimized/m/midwest_cold.webp">
     *   <source srcset="$REMOTE_MISC_PREFIX/misc/_optimized/m/midwest_cold.png">
     *   <noscript>
     *     <img src="$REMOTE_MISC_PREFIX/misc/_optimized/m/midwest_cold.png" alt="Foo">
     *   </noscript>
     * </picture>
     */

    let token = state.push("picture_open", "picture", 1);
    token.attrs = [
      ["class", "lazy"],
      ["data-alt", alt],
      ["data-path", primary], // See token.attrs[2][1] below!
    ];

    /**
     * It might be possible to have another domain/bucket serve up the misc
     * files. Perform a path replacement appropriately. If the remote
     * URI/prefix exists, use it. If not, supply the absolute path to the
     * misc file.
     */
    let fullPathReplacement = REMOTE_MISC_PREFIX
      ? `${REMOTE_MISC_PREFIX}/${config.OPTIMIZED_MISC_FOLDER}`
      : `${LOCAL_MISC_PREFIX}/${config.OPTIMIZED_MISC_FOLDER}`;

    // Don't want GIFs as a source since Sharp won't even process them!
    if (!primary.endsWith(".gif")) {
      let normalOptimizedPath = primary;
      let webPOptimizedPath = primary
        .replace(/\.jpg/i, ".webp")
        .replace(/\.jpeg/i, ".webp")
        .replace(/\.png/i, ".webp");

      /**
       * Just use local files when working locally <3 Replace with optimized
       * assets in a production context.
       */
      if (process.env.CI) {
        normalOptimizedPath = normalOptimizedPath.replace(
          `${LOCAL_MISC_PREFIX}`,
          fullPathReplacement,
        );
        webPOptimizedPath = webPOptimizedPath.replace(
          `${LOCAL_MISC_PREFIX}`,
          fullPathReplacement,
        );
      }

      /**
       * Nasty but whatever. Refers to the `data-path` attribute above
       * this block. Cannot use the cached WebP image since mobile
       * browsers offer it as a download instead of showing it.
       */
      token.attrs[2][1] = normalOptimizedPath;

      if (process.env.CI) {
        token = state.push("picture_source_webp", "source", 0);
        token.attrs = [
          ["type", "image/webp"],
          ["srcset", webPOptimizedPath],
        ];
      }

      token = state.push("picture_source_other", "source", 0);
      token.attrs = [["srcset", normalOptimizedPath]];
    }

    /* Original Implementation */
    // sources.forEach((s, i) => {
    //   token = state.push("picture_source", "source", 0);
    //   const attrs = [["srcwqset", s]];
    //   if (media[i]) attrs.push(["media", media[i]]);
    //   token.attrs = attrs;
    // });

    if (!primary.endsWith(".gif")) {
      token = state.push("noscript_open", "noscript", 1);
    }

    token = state.push("picture_img", "img", 0);
    let imageSrc = primary;

    if (!primary.endsWith(".gif") || process.env.CI) {
      imageSrc = primary.replace(`${LOCAL_MISC_PREFIX}`, fullPathReplacement);
    }

    const imgAttrs = [["src", imageSrc]];
    if (alt) imgAttrs.push(["alt", alt]);
    if (title) imgAttrs.push(["title", title]);
    token.attrs = imgAttrs;

    if (!primary.endsWith(".gif")) {
      token = state.push("noscript_close", "noscript", -1);
    }

    token = state.push("picture_close", "picture", -1);
  }

  state.pos = pos;
  return true;
};

module.exports = (md, options = {}) => {
  md.inline.ruler.at("image", rule, options);
};
