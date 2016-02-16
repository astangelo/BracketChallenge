class TeamInstance < ActiveRecord::Base

	belongs_to :team
	belongs_to :suicide_pick
	belongs_to :random_pick
	belongs_to :game_pick
	belongs_to :bracket
	belongs_to :quadrant

	has_many :home_teams, :class_name => "Game", :foreign_key => :home_team_id
	has_many :away_teams, :class_name => "Game", :foreign_key => :away_team_id

end
