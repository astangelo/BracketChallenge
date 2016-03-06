class Bracket < ActiveRecord::Base

	belongs_to :challenge
	has_many :team_instances
	has_many :games
	has_many :quadrants

end
