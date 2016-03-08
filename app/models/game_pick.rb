class GamePick < ActiveRecord::Base
	belongs_to :user_entry
	belongs_to :team_instance
end
