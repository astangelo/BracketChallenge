class Quadrant < ActiveRecord::Base

	belongs_to :brackets
	has_many :games
	has_many :team_instances
	
end
