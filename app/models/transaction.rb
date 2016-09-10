class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :category, foreign_key: "category_id", optional: true
end
