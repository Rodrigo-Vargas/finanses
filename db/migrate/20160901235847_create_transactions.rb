class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.string :description
      t.integer  :value
      t.timestamps
    end
  end
end
