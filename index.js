var spawn = require('child_process').spawn;
var path = require('path');


function checkInput(input) {
  switch (typeof input) {
    case 'string':
    break;
    case 'object':
      if (Array.isArray(input)) {
        break;
      } else {
        throw new TypeError('Expected a string or an array as input');
      }
    break;
    default:
      throw new TypeError('Expected a string or an array as input');
  }

	if (!Array.isArray(input)) {
		var reg = new RegExp(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
		input = input.match(reg);
		input.forEach(function (el) {
			input[input.indexOf(el)] = el.replace(/"/g, '');
		});
	}

	return input;
}


module.exports = function (input, opts) {
	opts = opts || {};

	if (process.platform !== 'win32') {
		throw new Error('Only Windows systems are supported');
	}

	if (process.pkg) {
		__dirname = process.cwd()
	}

	return spawn(path.join(__dirname, 'SoundVolumeView.exe'), checkInput(input), opts).on('error',(err)=>{
		console.log(err)
	})
}