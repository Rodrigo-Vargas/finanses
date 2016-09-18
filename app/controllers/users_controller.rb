class UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    
    if @user.valid?
      render json: { 'success' => true, 'token' => @user.auth_token}
    else
      render json: { 'success' => false, 'errors' => @user.errors}
    end
  end

  def login
    @user = User.find_by_email(user_params[:email])
    
    if @user
      if (@user.password == user_params[:password])
        render json: { 'success' => true, 'token' => @user.auth_token }
      else
        render json: { 'success' => false }
      end
    else
      render json: { 'success' => false }
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end
end
