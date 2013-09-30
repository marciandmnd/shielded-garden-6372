class PagesController < ApplicationController
  def home
  	@current_time = Time.now
  	@projectHash = $projectData.to_hash()
  	@projectNames = @projectHash.keys
  end
end
#attr_reader :attr_names