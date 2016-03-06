class Game < ActiveRecord::Base

	belongs_to :home_team, :class_name => "TeamInstance", :foreign_key => :home_team_id
	belongs_to :away_team, :class_name => "TeamInstance", :foreign_key => :away_team_id
	
	belongs_to :quadrant
	belongs_to :bracket
	#belongs_to :challenge, through: :bracket
	belongs_to :challenge

	def finished
		(((half.to_i == 2) || (half == "OT")) && (game_timer.length > 0) && (game_timer.to_i == 0))
	end

	def winner
		if (self.finished)
			if (self.home_team_score > self.away_team_score)
				self.home_team
			else
				self.away_team
			end
		end
	end


end
