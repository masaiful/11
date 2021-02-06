const { green, red } = require("chalk");
const { uploadDirectory } = require("s3-lambo");

(async () => {
  try {
    await uploadDirectory({
      path: "./_site",
      params: {
        Bucket: "log.nikhil.io",
      },
    });
    console.log(green("✓ Done syncing to bucket"));
  } catch (error) {
    console.log(red("! Error deploying to bucket:", error));
  }
})();
