class UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    render json: { 'token' => @user.auth_token}
  end

  def login
    @user = User.find_by_email(user_params[:email])
    render json: @user
    return
    if (@user.password == user_params[:password])
      render json: { 'token' => @user.auth_token }
    else
      render json: { 'success' => false}
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end
end
