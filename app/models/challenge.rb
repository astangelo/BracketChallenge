class Challenge < ActiveRecord::Base

	has_many :user_entries
	has_one :bracket

	has_many :games, through: :bracket 
end
