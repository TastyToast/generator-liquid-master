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
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |'+'--(o)--'.red+'|   .--------------------------.' +
  '\n   `---------´  |    '+'Welcome to Yeoman,'.yellow.bold+'    |' +
  '\n    '+'( '.yellow+'_'+'´U`'.yellow+'_'+' )'.yellow+'   |   '+'ladies and gentlemen!'.yellow.bold+'  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __'+'\'.___.\''.yellow+'__' +
  '\n ´   '+'`  |'.red+'° '+'´ Y'.red+' `\n';

  console.log(welcome);
  console.log("I'm here to help you start your new Pages template!");

  var prompts = [{
    name: 'mobile',
    message: 'Would you like to make this template mobile?',
    default: 'Y/n',
    warning: 'This will create mobile.liquid and mobile.css'
  },{
    name: 'microsite',
    message: 'Are you developing for microsite?',
    default: 'y/N',
    warning: 'This will create microsite.liquid and microsite.css'
  },{
    name: 'fbcanvas',
    message: 'Are you developing a canvas page?',
    default: 'y/N',
    warning: 'This will create fbcanvas.liquid and fbcanvas.css'
  },{
    name: 'gallery',
    message: 'Would you like to include a gallery?',
    default: 'y/N',
    warning: 'This will generate a gallery plugin'
  }];

  this.prompt(prompts, function(e, props){
    if(e) { return self.emit('error', e);}

    self.mobile = (/y/i).test(props.mobile);
    self.microsite = (/y/i).test(props.microsite);
    self.fbcanvas = (/y/i).test(props.fbcanvas);
    self.gallery = (/y/i).test(props.gallery);

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

  if (this.fbcanvas){
    this.template('fbcanvas.liquid', 'fbcanvas.liquid', data);
    this.template(path.join('assets', 'fbcanvas.css'), path.join('assets', 'fbcanvas.css'));
  };
};

Generator.prototype.buildData = function(){
  var data = {
    gallery: false
  };

  if (this.gallery){
    data.gallery = true;
  };

  return data;
}