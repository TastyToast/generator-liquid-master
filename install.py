import os
import shutil
import sys

# Script to install the generator.
# I am a novice in python so it's certainly not perfect. If you know a way to improve it, feel free to fork it

generatorPath = '/usr/local/lib/node_modules/yo/node_modules/yeoman-generator/lib/generators'
currentDir = os.path.dirname(os.path.abspath(__file__))
yeomanLiquidPath = os.path.join(generatorPath, 'liquid')

# Check if Yeoman is installed
if not os.path.isdir(generatorPath):
	print 'It seems that Yeoman is not installed.'
	print 'If you have trouble installing the generator please refer to the install instructions in the Readme.'
	sys.exit()

# if the generator is already installed we remove it to avoid errors
if os.path.isdir(yeomanLiquidPath):
	shutil.rmtree(yeomanLiquidPath)
try:
	shutil.copytree(currentDir, yeomanLiquidPath)
	print '\033[32mGenerator installed successfully.\033[37m\n'
except :
	print 'Oops, something went wrong, sorry'
	print 'If you have trouble installing the generator please refer to the install install instructions in the Readme.'
	raise
