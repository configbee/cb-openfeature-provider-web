const { withNx } = require('@nx/rollup/with-nx');

// These options were migrated by @nx/rollup:convert-to-inferred from project.json
const options = {
"project": "package.json",
"outputPath": "dist",
"main": "src/index.ts",
"tsConfig": "tsconfig.lib.json",
"buildableProjectDepsInPackageJsonType": "dependencies",
"updateBuildableProjectDepsInPackageJson": true,
"compiler": "tsc",
"sourceMap": true,
"generateExportsField": true,
"umdName": "configbee-openfeature-provider-web",
"external": (id) => {
    if (id === 'tslib') return false; // Do not treat tslib as external (bundle it!)
    return true; // Keep everything else external
  },
"format": [
"cjs",
"esm"
],
"assets": [
{
"glob": "package.json",
"input": "./assets",
"output": "./src/"
},
{
"glob": "LICENSE",
"input": "./",
"output": "./"
},
{
"glob": "README.md",
"input": "./",
"output": "./"
}
]
};

const config = withNx(options, {
// Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
// e.g.
// output: { sourcemap: true },
});



module.exports = config;