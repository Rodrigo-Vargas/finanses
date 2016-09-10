class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :category, foreign_key: "category_id", optional: true

  def self.in_date_range(start_date, final_date)
    where("date between ? AND ?", start_date, final_date)
  end
end
