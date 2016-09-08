class CategoriesController < ApplicationController
  before_action :authenticate

  def index
    render json: { "categories" => @currentUser.categories }
  end

  def create
    @category = @currentUser.categories.create(category_params)
    render json: @category
  end

  def update
   @category = Category.find(params[:id])
   @category.update(category_params)

   render json: @category
  end

  def destroy
    Category.destroy(params[:id])

    render json: { "success" => "true"}
  end

  private
    def category_params
      params.require(:category).permit(:name)
   end
end
