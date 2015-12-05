# gulp-json-hash-manifest
A Gulp plugin for generating a JSON file with the hash checksums of a list of files.

## Installation

    npm install gulp-json-hash-manifest --save-dev

## Usage
### Generate a hash manifest file
```
var hashManifest = require("gulp-json-hash-manifest");

// ...

gulp.src(["static/**/*.js"]).
	pipe(hashManifest({dest: "static"})); // Write the manifest file
```
   
This will generate a `hash-manifest.json` file which maps the files paths with their hashes.
```
{
	"file-1.js":"728c3e121f031cc4fcab32ff1259b25de808ee6c",
	"file-2.js":"58e77ce2cbe0f762b35a596e4c7896fe14e0d457"
}
```

### Options
- **`dest`** - *string*  
    The destination directory of the hash manifest file.  
    Default: `process.cwd()` (the current working directory)

- **`filename`** - *string*  
    The filename of the hash manifest file.  
    Default: `hash-manifest.json`

- **`hash`** - *string*  
    The hash function to use. Must be one supported by 
    [crypto](https://www.npmjs.org/package/crypto).  
    Default: `sha1`