require File.expand_path('../boot', __FILE__)

#require 'YAML'
require 'rails/all'
Bundler.require(:default, Rails.env)

#open and load project.yml
fileName = File.open('config/projects.yml', 'r')
$projectData = YAML.load(fileName)

module Proj1
  class Application < Rails::Application
  	config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
  end
end
