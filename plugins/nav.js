module.exports = plugin;

/**
 * Metalsmith plugin that adds `navigation` of files to the global
 * metadata as a sorted array.
 */

function plugin(opts) {

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata()

    console.log(files)
    
    metadata.navigation = {}
    
    done()
  }
}
