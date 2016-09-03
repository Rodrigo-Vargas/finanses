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

   def upload
      file_data = params[:file]
      xml_contents = ""
      if file_data.respond_to?(:read)
        xml_contents = file_data.read        
      elsif file_data.respond_to?(:path)
        xml_contents = File.read(file_data.path)        
      else
        logger.error "Bad file_data: #{file_data.class.name}: #{file_data.inspect}"
      end

      array = Array.new

      Hash.from_xml(xml_contents)["OFX"]["BANKMSGSRSV1"]["STMTTRNRS"]["STMTRS"]["BANKTRANLIST"]["STMTTRN"].inject({}) do |result, elem| 
        @transaction =  Transaction.new

        year  = elem["FITID"][0..3]
        month = elem["FITID"][4..5]
        day = elem["FITID"][6..7]

        transactionDate = DateTime.new(year.to_i, month.to_i, day.to_i, 0,0, 0, "-00:00")

        @transaction.description = elem["MEMO"]
        @transaction.value = elem["TRNAMT"].gsub! '.', ''
        @transaction.date = transactionDate

        array.push(@transaction)
      end

      render json: array
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
      params.require(:transaction).permit(:description, :value, :date)
   end
end
