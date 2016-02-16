class RandomPick < ActiveRecord::Base
	belongs_to :user_entry
	has_many :team_instances
end
