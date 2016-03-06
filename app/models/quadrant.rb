class Quadrant < ActiveRecord::Base
	validates :order, :presence => true
	validates :name, :presence => true

	belongs_to :bracket
	has_one :challenge, :through => :bracket
	has_many :games
	has_many :team_instances

	accepts_nested_attributes_for :bracket
	
end
