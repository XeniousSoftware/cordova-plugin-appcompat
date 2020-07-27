module.exports = function(ctx) {
    // make sure android platform is part of build
    if (ctx.opts.cordova.platforms.indexOf('android') < 0) {
        return;
    }
    var fs = require('fs'),
        path = require('path');
        
    var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');

    setTimeout(function(){
		
		var splashScreenPlugin=platformRoot+'/app/src/main/java/org/apache/cordova/splashscreen/SplashScreen.java';
		fs.readFile(splashScreenPlugin, 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			var result = data.replace('context.getResources().getIdentifier("AppCompatDialogTheme","style", context.getPackageName())', 'android.R.style.Theme_Translucent_NoTitleBar');

			fs.writeFile(splashScreenPlugin, result, 'utf8', function (err) {
				if (err) return console.log(err);
			});
		});
	},10000);
};