var spawn = require('child_process').spawn;
var path = require('path');


function checkInput(input) {
  const types = ['string', 'array']; // Array of types to check
  for (let i = 0; i < types.length; i++) { // Iterate through array of types
    if (Array.isArray(input)) { // Input already an array
      if (types[i] === 'array') {
        return input
      }
      continue;
    }
    if (typeof input === types[i]) {
      var reg = new RegExp(/[^\s"']+|"([^"]*)"|'([^']*)'/g); // Select groups of strings to separate them
      input = input.match(reg); // adds each string that is matched to an array
      input.forEach((item) => {
        input[input.indexOf(item)] = item.replace(/["']/g, ''); //Remove single and double quotes from array as it will stringify them automagically
      });
      return input
    }
    throw new TypeError('Expected a string or an array as input');
  }
}


module.exports = function (input, opts) {
	opts = opts || {};

	if (process.platform !== 'win32') {
		throw new Error('Only Windows systems are supported');
	}

	if (process.pkg) { //Set directory to outside the pkg exe (if packaged using zeit/pkg) as it cannot run inside of the snapshot system currently
		__dirname = process.cwd()
	}

	return spawn(path.join(__dirname, 'SoundVolumeView.exe'), checkInput(input), opts).on('error',(err)=>{
		console.log(err)
	})
}