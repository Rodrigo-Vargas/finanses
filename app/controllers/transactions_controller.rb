class TransactionsController < ApplicationController
	def index
		array = Array.new

		array.push('2')

		render json: array, status: 200
	end
end
