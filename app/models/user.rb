require 'securerandom'

class User < ApplicationRecord
  has_many :transactions
  has_many :categories
  before_create :set_auth_token  
  validates :email, uniqueness: true

  private 
    def set_auth_token
      if !name.present?
        self.name = self.email
      end

      return if auth_token.present?
      self.auth_token = generate_auth_token
    end

    def generate_auth_token
      loop do
        token = SecureRandom.hex
        break token unless self.class.exists?(auth_token: token)        
      end
    end
end
