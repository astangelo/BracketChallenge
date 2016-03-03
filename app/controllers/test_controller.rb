class TestController < ApplicationController
  @teamWins = {}
  def testVar
    #puts "works\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\nworks\n"
    output = {'resp' => params["vars"]}.to_json
    #output = {'foo' => 'bar'}.to_json
    #render :json => output
    #respond_to do |format|
    #  format.json { render :json => output}
    #end
    render :json => output
    #=begin    
    #if request.xhr?
    #    render :json => {
    #                        :file_content => @script.fileContent
    #                    }
    #end
    #=end                

  end

  def getTeamList
    #teams = {'resp' => params["vars"]}.to_json
    teams = {teams:[
		  'Purdue',
		  'Maryland',
		  'Indiana',
		  'Michigan',
		  'Michigan State',
		  'Ohio State',
		  'Wisconsin',
		  'Iowa',
		  'Northwestern',
		  'Penn State',
		  'Illinois',
		  'Minnesota',
		  'Nebraska',
		  'Maryland',
		  'Rutgers',
		  'Missouri'
		]}.to_json

	render :json => teams

  end

  def saveTeamPicks
  	byebug
  	@teamWins = params["teams"]
  	head :no_content
  end

end
