class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :home_team_id
      t.integer :away_team_id
      t.integer :home_team_score
      t.integer :away_team_score
      t.datetime :start_time
      t.string :game_timer
      t.string :half
      t.integer :quadrant_id

      t.timestamps null: false
    end
  end
end
