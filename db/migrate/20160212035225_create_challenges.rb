class CreateChallenges < ActiveRecord::Migration
  def change
    create_table :challenges do |t|
      t.integer :year
      t.boolean :active

      t.timestamps null: false
    end
  end
end
