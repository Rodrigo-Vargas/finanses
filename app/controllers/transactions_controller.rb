class TransactionsController < ApplicationController
   TOKEN = "secret"

   before_action :authenticate
   skip_before_action :verify_authenticity_token
   respond_to :json

	def index
		@transactions = Transaction.all

		render json: @transactions, status: 200
	end

   def show

   end

   def create
      respond_with Transaction.create(transaction_params)
   end

   def destroy
      respond_with Transaction.destroy(params[:id])
   end

   def authenticate
      authenticate_token || render_unauthorized
    end

    def authenticate_token
      #authenticate_with_http_token do |token, options|
      #  User.find_by(auth_token: token)
      #end

      authenticate_or_request_with_http_token do |token, options|
        # Compare the tokens in a time-constant manner, to mitigate
        # timing attacks.
        #ActiveSupport::SecurityUtils.secure_compare(
        #  ::Digest::SHA256.hexdigest(token),
        #  ::Digest::SHA256.hexdigest(TOKEN)
        #)
        return token == TOKEN
      end
    end

    def render_unauthorized
      self.headers['WWW-Authenticate'] = 'Token realm="Application"'
      render json: 'Bad credentials', status: 401
    end

   def transaction_params
      params.require(:transaction).permit(:description, :value)
   end
end
