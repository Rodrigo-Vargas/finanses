class TransactionsController < ApplicationController
   before_action :authenticate
   respond_to :json

	def index
		render json: @currentUser.transactions
	end

  def create
    @transaction = @currentUser.transactions.create(transaction_params)
    render json: @transaction
  end

  def edit
     @transaction = Transaction.find(params[:id])
     @transaction.update(transaction_params)

     render json: @transaction
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

   def transaction_params
      params.require(:transaction).permit(:description, :value, :date, :user_id)
   end
end
