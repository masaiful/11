const PATH = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const dirTree = require("directory-tree");

const all = [];
const thumbs = [];
const ret = { files: [] };

(async () => {
  await dirTree(
    "./misc",
    { exclude: [/_optimized/, /_thumbnails/, /.DS_Store/] },
    (item, PATH, stats) => {
      all.push({
        ...item,
        // path: item.path.replace("misc", ""),
      });
    },
  );

  await dirTree(
    "./misc/_thumbnails",
    { exclude: [/.DS_Store/] },
    (item, PATH, stats) => {
      thumbs.push(item.path.replace("_thumbnails/", ""));
    },
  );

  console.log(`Writing a manifest of ${all.length} files`);

  for (const file of all) {
    ret.files.push({
      id: uuid(file.path),
      path: file.path.replace("misc/", "/"),
      size: file.size,
      thumbnail: thumbs.includes(file.path)
        ? file.path.replace("misc/", "/_thumbnails/")
        : null,
    });
  }

  fs.writeFileSync("./misc/manifest.json", JSON.stringify(ret, null, 2));
})();
