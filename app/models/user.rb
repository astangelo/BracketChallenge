class User < ActiveRecord::Base

	has_many :user_entries

	def fullname
		first_name + " " + last_name
	end

end
