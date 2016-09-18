class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string     :name
      t.string     :color
      t.references :parent, index: true
      t.integer    :user_id
      t.integer    :transaction_id

      t.timestamps
    end

    add_index :categories, :user_id
    add_index :categories, :transaction_id
  end
end
