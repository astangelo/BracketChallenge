class Game < ActiveRecord::Base

	belongs_to :home_team, :class_name => "Team_Instance", :foreign_key => :home_team_id
	belongs_to :away_team, :class_name => "Team_Instance", :foreign_key => :away_team_id
	
	belongs_to :quadrant
	belongs_to :bracket
	#belongs_to :challenge, through: :bracket
	belongs_to :challenge


end
