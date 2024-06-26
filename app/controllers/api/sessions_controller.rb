class Api::SessionsController < Api::BaseController

  include BCrypt

  def create
    @user = User.find_by(email: params[:session][:user][:email]) rescue nil
    if @user 
      hash_password = Password.new(@user.password)
      if verify_hash_digest(@user.password) == params[:user][:password]
        session[:user_id] = @user.id
        render json: {message: "You logged in successfully!", user: {
          id: @user.id,
          username: @user.username,
          email: @user.email,
          firstName: @user.firstName,
          lastName: @user.lastName,
          favourites: @user.favourites
        }}
      else
        render json: {error: "Your password is incorrect, please try again."}
      end
    else
      render json: {error: "Your email is incorrect, please try again."}
    end
  end

  def destroy
    require_user
    @current_user = nil
    session[:user_id] = nil
    render json: "Successfully logged out!"
  end

  def is_logged_in
    if logged_in? && current_user
      render json: current_user, except: [:password, :created_at, :updated_at] 
    else
      render json: false
    end
  end

  private
    def verify_hash_digest(password)
      Password.new(password)
    end
  end