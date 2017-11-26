class TestController < ApplicationController
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
  	#@teams = TeamInstance.find()
    #teams = {'resp' => params["vars"]}.to_json
    
    @year = 2015
    @challenge = Challenge.where(year: 2015).first()

    teams = {teams2:[], teams:[], users:[], user_picks:[], quadrants: []}
    
    # TeamInstance.order(:bracket_seed).each do |t|
    TeamInstance.all.sort {|a,b| a.bracket_seed <=> b.bracket_seed}.each do |t|
    	@gcount = t.home_teams.select{|x| ((x.winner.nil? == false) && (x.winner == t))}.count + t.away_teams.select{|x| ((x.winner.nil? == false) && (x.winner == t))}.count
    	teams[:teams2] << [t.team.name, @gcount]
    end

    @challenge.quadrants.order(:order).each do |q|
      teams[:quadrants] << q.name
    end


    @challenge.user_entries.each do |u|
      @games = []
      u.game_picks.each do |g|
        if (!g.team_instance.nil?) then
          @games << [g.team_instance.team.name, g.round]
        end

      end
      teams[:users] << u.user
      teams[:user_picks] << {user:u.user.first_name, selected:@games}
    end



=begin    
    teams2=TeamInstance.select(|ti| ti.bracket.challenge.year = 2015)
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
		], teams2:[["Kentucky", 4],
           ["Kansas", 1],
           ["Notre Dame", 3],
           ["Maryland", 1],
           ["West Virginia", 2],
           ["Butler", 1],
           ["Wichita State", 2],
           ["Cincy", 1],
           ["Purdue", 0],
           ["Indiana", 0],
           ["Texas", 0],
           ["Buffalo", 0],
           ["Valparaiso", 0],
           ["Northeastern", 0],
           ["New Mexico St", 0],
           ["Hampton", 0],
           ["Wisconsin", 5],
           ["Arizona", 3],
           ["Baylor", 0],
           ["N. Carolina", 2],
           ["Arkansas", 1],
           ["Xavier", 2],
           ["VCU", 0],
           ["Oregon", 1],
           ["Oklahoma St", 0],
           ["Ohio St", 1],
           ["Mississippi", 0],
           ["Wofford", 0],
           ["Harvard", 0],
           ["Georgia State", 1],
           ["Texas Southern", 0],
           ["Coastal Car.", 0],
           ["Villanova", 1],
           ["Virginia", 1],
           ["Oklahoma", 2],
           ["Louisville", 3],
           ["Northern Iowa", 1],
           ["Providence", 0],
           ["Michigan State", 4],
           ["NC State", 2],
           ["LSU", 0],
           ["Georgia", 0],
           ["Dayton", 1],
           ["Wyoming", 0],
           ["UC-Irvine", 0],
           ["Albany", 0],
           ["Belmont", 0],
           ["Lafayette", 0],
           ["Duke", 6],
           ["Gonzaga", 3],
           ["Iowa State", 0],
           ["Georgetown", 1],
           ["Utah", 2],
           ["SMU", 0],
           ["Iowa", 1],
           ["San Diego St", 1],
           ["St. John's", 0],
           ["Davidson", 0],
           ["UCLA", 2],
           ["SF Austin", 0],
           ["E. Washington", 0],
           ["UAB", 1],
           ["N. Dakota St", 0],
           ["Robert Morris", 0]]}.to_json
    
=end

	render :json => teams.to_json

  end

  def saveTeamPicks
  	byebug
  	picks = params["teams"]
  	render :json => {}
  	#head :no_content
  end

end
