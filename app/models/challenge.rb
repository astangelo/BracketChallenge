class Challenge < ActiveRecord::Base

	has_many :user_entries
	has_one :bracket

	has_many :games, through: :bracket 
	has_many :quadrants, through: :bracket
end
