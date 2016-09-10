class TransactionsController < ApplicationController
  before_action :authenticate
  respond_to :json

  def index
    @transactions = Transaction.includes(:category).where(user_id: @currentUser.id)
    render partial: "users/show.json", content_type: "application/json"
  end

  def period
    year = params[:year]
    if (year.empty?)
      year = Time.now.year
    end

    start_date = Time.parse(year + '-' + params[:month] + '-01')
    final_day = start_date.at_end_of_month.day
    end_date = Time.parse(year.to_s + '-' + params[:month].to_s + '-' + final_day.to_s)

    @transactions = Transaction.includes(:category).in_date_range(start_date, end_date).where(user_id: @currentUser.id)

    render partial: "users/show.json", content_type: "application/json"
  end

  def create
    @transaction = @currentUser.transactions.create(transaction_params)

    @transaction.save!

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
      # Check for duplicated register
      @duplicatedTransaction = Transaction.where(description: elem["MEMO"], user_id: @currentUser.id).first()

      @transaction =  Transaction.new

      year  = elem["FITID"][0..3]
      month = elem["FITID"][4..5]
      day   = elem["FITID"][6..7]

      transactionDate = DateTime.new(year.to_i, month.to_i, day.to_i, 0,0, 0, "-00:00")

      @transaction.description = elem["MEMO"]
      @transaction.value = elem["TRNAMT"].gsub! '.', ''
      @transaction.date = transactionDate

      array.push({ "original" => @transaction, "found" => @duplicatedTransaction});
    end

    render json: array
  end

  def transaction_params
    params.require(:transaction).permit(:description, :value, :date, :category_id)
  end
end
