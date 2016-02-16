class UserEntry < ActiveRecord::Base

	belongs_to :challenge
	belongs_to :user

	has_many :suicide_picks
	has_many :random_picks
	has_many :game_picks

	
end
