class CreateBrackets < ActiveRecord::Migration
  def change
    create_table :brackets do |t|
      t.integer :challenge_id

      t.timestamps null: false
    end
  end
end
