class AddCategoryOnTransactions < ActiveRecord::Migration[5.0]
  def change
    add_reference :transactions, :category, index: true, foreign_key: true
  end
end
