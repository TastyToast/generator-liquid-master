var util = require('util'),
  yeoman = require('yeoman'),
  path = require('path');

module.exports = Generator;

function Generator(){
  yeoman.generators.Base.apply(this, arguments);
  this.sourceRoot( path.join(__dirname, 'template'));

  // cleanup the name property from trailing /, typical usage of directories.
  // update the args object, it's used to initialize js-framework hooks
  if(this.name) this.args[0] = this.args[0].replace(/\/$/, '');
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor(argument){
  var cb = this.async(),
    self = this;

  // Welcome message

  var Welcome = 
  '\n __        ___ _     _  __ _'.red+          
  '\n \\ \\      / (_) | __| |/ _(_)_ __ ___ '.red +
  "\n  \\ \\ /\\ / /| | |/ _` | |_| | '__/ _ \\ ".red +
  "\n   \\ V  V / | | | (_| |  _| | | |  __/".red +
  "\n    \\_/\\_/  |_|_|\\__,_|_| |_|_|  \\___|".red+'\n';
                                     

  console.log(Welcome);
  console.log("I'm here to help you start your new Pages template!");

  var prompts = [{
    name: 'mobile',
    message: 'Would you like to make this template mobile?',
    default: 'Y/n',
    warning: 'This will create mobile.liquid and mobile.css'
  },{
    name: 'redirect',
    message: 'Would you like to use the canvas page as a mobile redirect?',
    default: 'y/N',
    warning: 'This will create fbcanvas.liquid with the redirect script'
  },{
    name: 'microsite',
    message: 'Are you developing for microsite?',
    default: 'y/N',
    warning: 'This will create microsite.liquid and microsite.css'
  },{
    name: 'gallery',
    message: 'Would you like to include a gallery?',
    default: 'y/N',
    warning: 'This will generate a gallery plugin'
  },{
    name: 'sweepstakes',
    message: 'Would you like to add a sweepstakes?',
    default: 'y/N',
    warning: 'This will generate a sweepstakes plugin'
  },{
    name: 'voting',
    message: 'Do you want to include a voting gallery?',
    default: 'y/N',
    warning: 'This will generate a voting gallery'
  },{
    name: 'stories',
    message: 'Will you be including Facebook stories in this template?',
    default: 'y/N',
    warning: 'This will generate a stories plugin'
  },{
    name: 'posttowall',
    message: 'Would you like to include a post to wall plugin?',
    default: 'y/N',
    warning: 'This will generate a Post To Wall plugin'
  },{
    name: 'sendamessage',
    message: 'Would you like to include a send a message plugin?',
    default: 'y/N',
    warning: 'This will generate a Send a Message plugin'
  },{
    name: 'signup',
    message: 'Would you like to include a signup form?',
    default: 'y/N',
    warning: 'This will generate a Signup form plugin'
  }];

  this.prompt(prompts, function(e, props){
    if(e) { return self.emit('error', e);}

    self.mobile = (/y/i).test(props.mobile);
    self.microsite = (/y/i).test(props.microsite);
    self.redirect = (/y/i).test(props.redirect);
    self.gallery = (/y/i).test(props.gallery);
    self.sweepstakes = (/y/i).test(props.sweepstakes);
    self.voting = (/y/i).test(props.voting);
    self.stories = (/y/i).test(props.stories);
    self.posttowall = (/y/i).test(props.posttowall);
    self.sendamessage = (/y/i).test(props.sendamessage);
    self.signup = (/y/i).test(props.signup);

    cb();
  });
}

Generator.prototype.createTemplate = function(){
  console.log(this.fbcanvas);
  var data = this.buildData();

  this.template('default.liquid', 'default.liquid', data);
  this.copy(path.join('assets','default.css'), path.join('assets','default.css'));
  this.copy(path.join('assets','global.css'), path.join('assets', 'global.css'));

  if (this.mobile){
    this.template('mobile.liquid', 'mobile.liquid', data);
    this.template(path.join('assets', 'mobile.css'), path.join('assets', 'mobile.css'));
  };

  if (this.microsite){
    this.template('microsite.liquid', 'microsite.liquid', data);
    this.template(path.join('assets', 'microsite.css'), path.join('assets', 'microsite.css'));
  };

  if (this.redirect){
    this.copy('fbcanvas.liquid', 'fbcanvas.liquid');
  };
};

Generator.prototype.buildData = function(){
  var data = {
    gallery: (this.gallery) ? true : false,
    sweepstakes: (this.sweepstakes) ? true : false,
    voting: (this.voting) ? true : false,
    stories: (this.stories) ? true : false,
    posttowall: (this.posttowall) ? true : false,
    sendamessage: (this.sendamessage) ? true : false,
    signup: (this.signup) ? true : false
  };

  return data;
}