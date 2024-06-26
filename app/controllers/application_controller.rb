class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    helper_method :current_user, :logged_in, :require_user
    
    def logged_in?
      !!current_user
    end

    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

    def require_user
      if !logged_in?
        render json: "You need to be logged in to access this route!"
      end
    end
    
end
