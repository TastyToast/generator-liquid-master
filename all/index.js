var path = require('path');
var util = require('util');
var yeoman = require('yeoman');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply( this, arguments );
  this.sourceRoot( path.join( __dirname, 'templates' ) );
  this.files = {

  };

  this.liquid = {
  };
}

util.inherits( Generator, yeoman.generators.NamedBase );

Generator.prototype.askFor = function askFor( argument ) {
  var cb = this.async();

  var prompts = [{
    name: 'microsite',
    message: 'Are you building for a Microsite?',
    default: 'y/N',
    warning: 'You can always change your mind'
  },
  {
    name: 'mobile',
    message: 'Is this app mobile?',
    default: 'y/N',
    warning: 'You can always change your mind'
  },
  {
    name: 'fbcanvas',
    message: 'Are you building for FB Canvas?',
    default: 'y/N',
    warning: 'You can always change your mind'
  },
  {
    name: 'sweepstakes',
    message: 'Would you like to include a sweepstakes?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  },
  {
    name: 'gallery',
    message: 'Would you like to include a gallery?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  },
  {
    name: 'poll',
    message: 'Will you be using the poll plugin?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  },
  {
    name: 'voting',
    message: 'Will you be using the voting plugin?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  },
  {
    name: 'rssFeed',
    message: 'Will you include an rss feed?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  },
  {
    name: 'stories',
    message: 'Will you include the stories plugin?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  },
  {
    name: 'signupForm',
    message: 'Are you using a signup form?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  },
  {
    name: 'postToWall',
    message: 'Will you include a post to wall button?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  },
  {
    name: 'sendAMessage',
    message: 'Will you include a send to message button?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  },
  {
    name: 'comments',
    message: 'Will you include comments from Facebook?',
    default: 'Y/n',
    warning: 'You can always change your mind'
  }

  ];

  this.prompt( prompts, function( err, props ) {
    if ( err ) {
      return this.emit( 'error', err );
    }

    this.files.microsite = (/y/i).test(props.microsite);
    this.files.mobile = (/y/i).test(props.mobile);
    this.files.fbcanvas = (/y/i).test(props.fbcanvas);
    this.liquid.sweepstakes = (/y/i).test(props.sweepstakes);
    this.liquid.gallery = (/y/i).test(props.gallery);
    this.liquid.voting = (/y/i).test(props.voting);
    this.liquid.poll = (/y/i).test(props.poll);
    this.liquid.rssFeed = (/y/i).test(props.rssFeed);
    this.liquid.stories = (/y/i).test(props.stories);
    this.liquid.signUpForm = (/y/i).test(props.signUpForm);
    this.liquid.postToWall = (/y/i).test(props.postToWall);
    this.liquid.sendAMessage = (/y/i).test(props.sendAMessage);
    this.liquid.comments = (/y/i).test(props.comments);

    // this.appFullName = props.appFullName;
    // this.appDescription = props.appDescription
    // this.appPermissions.serial = (/y/i).test(props.serialPermission);
    // this.appPermissions.identity = (/y/i).test(props.identityPermission);
    // this.appPermissions.unlimitedStorage = (/y/i).test(props.unlimitedStoragePermission);
    // this.appPermissions.usb = (/y/i).test(props.usbPermission);
    // this.appPermissions.bluetooth = (/y/i).test(props.bluetoothPermission);
    // this.appPermissions.browserTag = (/y/i).test(props.browserTagPermission);
    // this.appPermissions.audioCapture = (/y/i).test(props.audioCapturePermission);
    // this.appPermissions.videoCapture = (/y/i).test(props.videoCapturePermission);
    
    // var connections = [];
    // if((/y/i).test(props.udpbindPermission)) connections.push("udp-bind::8899");
    // if((/y/i).test(props.udpsendPermission)) connections.push("udp-send-to::8899");
    // if((/y/i).test(props.tcpPermission)) connections.push("tcp-connect");


    // Complex permission objects
    // if((/y/i).test(props.mediagalleryPermission))
    //   this.appPermissions.mediaGalleries = { "mediaGalleries" : ["read", "allAutoDetected"] };

    // if(connections.length > 0)
    //   this.appPermissions.socket = { 'socket': connections };

    cb();
  }.bind( this ));
};

Generator.prototype.writeFiles = function() {
  var data = this.buildData(); 
  
  this.directory( '.', '.' );

  this.template( 'app/index.html', path.join( 'app', 'index.html' ), data );
  this.template( 'app/manifest.json', path.join( 'app', 'manifest.json' ), data );
  this.template( 'app/_locales/en/messages.json', path.join( 'app', '_locales', 'en' , 'messages.json' ), data );
}

Generator.prototype.buildData = function () {

  var experimental = {
    "bluetooth" : true,
    "usb": true,
    "identity": true,
    "browserTag": true
  };

  // Using object to maintain complex objects rather than strings.
  var complex = {
    "socket": true,
    "mediaGalleries": true
  };

  var permissions = [];
  var usesExperimental = false;
  var complexPermissions = [];

  for(var permission in this.appPermissions) {
    if(!!this.appPermissions[permission] == false) continue;
    if(experimental[permission]) usesExperimental = true;
    if(complex[permission])  {
      complexPermissions.push(this.appPermissions[permission]);
      continue;
    }

    permissions.push(permission);
  }

  if(usesExperimental) permissions.push("experimental");
  var data = {
    appFullName: this.appFullName,
    appDescription: this.appDescription,
    appPermissions: permissions
  };

  if(complexPermissions.length > 0) {
    for(var p = 0; permission = complexPermissions[p]; p ++) {
      // Complex permissions aren't keyed off the name, remove it.
      delete data.appPermissions[permission];  
      data.appPermissions.push(permission);
    }
  }

  return data;
};
