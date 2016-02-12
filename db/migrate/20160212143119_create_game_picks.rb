class CreateGamePicks < ActiveRecord::Migration
  def change
    create_table :game_picks do |t|
      t.integer :user_entry_id
      t.integer :team_instance_id
      t.integer :round

      t.timestamps null: false
    end
  end
end
