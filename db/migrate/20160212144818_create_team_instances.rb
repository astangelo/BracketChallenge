class CreateTeamInstances < ActiveRecord::Migration
  def change
    create_table :team_instances do |t|
      t.integer :team_id
      t.integer :bracket_id
      t.integer :quadrant_id
      t.string :abbreviation
      t.integer :seed

      t.timestamps null: false
    end
  end
end
