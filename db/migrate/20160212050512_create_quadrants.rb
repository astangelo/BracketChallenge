class CreateQuadrants < ActiveRecord::Migration
  def change
    create_table :quadrants do |t|
      t.integer :bracket_id
      t.string :name
      t.integer :order

      t.timestamps null: false
    end
  end
end
