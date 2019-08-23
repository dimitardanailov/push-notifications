const fs = require('fs');
const path = require('path');
const pushLib = require('safari-push-notifications');

const websiteJson = pushLib.websiteJSON(
	// websiteName
	"Dimitar Danailov push notifications",

	// websitePushID
	"web.com.firebaseapp.push-notifications-ddanailov",

	// allowedDomains
	[
		"https://push-notifications-ddanailov.firebaseapp.com"
	],

	// urlFormatString
	[
		"https://push-notifications-ddanailov.firebaseapp.com/%@/?notification=%@"
	],

	// authenticationToken (zeroFilled to fit 16 chars)
	'0123456789012345',

	// webServiceURL
	'https://push-notifications-ddanailov.firebaseapp.com/push'
);

const cert = fs.readFileSync('cert.pem');
const key = fs.readFileSync('key.pem');
const intermediate = fs.readFileSync('intermediate.crt');

pushLib.generatePackage(
	// The object from before / your own website.json object
	websiteJson, 

	// Folder containing the iconset
	path.join('assets', 'safari_assets'), 

	// Certificate
	cert, 
	
	// Private Key
	key, 
	
	// Intermediate certificate
	intermediate
)
.pipe(fs.createWriteStream('pushPackage.zip'))
.on('finish', function () {
	console.log('pushPackage.zip is ready.');
});