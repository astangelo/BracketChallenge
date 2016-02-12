class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.string :logo_url
      t.string :mascot
      t.string :location

      t.timestamps null: false
    end
  end
end
