class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  def authenticate
    @currentUser = authenticate_token 
    if !@currentUser
      render_unauthorized
    end
  end

  def authenticate_token
    authenticate_or_request_with_http_token do |token, options|
      return User.find_by(auth_token: token)
    end
  end

  def render_unauthorized
    self.headers['WWW-Authenticate'] = 'Token realm="Application"'
    render json: 'Bad credentials', status: 401
  end
end
