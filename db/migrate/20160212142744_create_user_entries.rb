class CreateUserEntries < ActiveRecord::Migration
  def change
    create_table :user_entries do |t|
      t.integer :user_id
      t.integer :challenge_id
      t.boolean :active

      t.timestamps null: false
    end
  end
end
