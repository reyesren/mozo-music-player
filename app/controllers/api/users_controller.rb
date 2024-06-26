require 'bcrypt'

class Api::UsersController < Api::BaseController
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users or /users.json
  def index
    @users = User.all
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)
    if @user.save
      puts @user.id
      session[:user_id] = @user.id
      render json: {id: @user.id, username: @user.username, email: @user.email, 
        firstName: @user.firstName, lastName: @user.lastName, 
        favourites: @user.favourites}
    else
      render json: @user.errors, status: :unprocessable_entity
    end
    
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    if @user.update(user_params)
      render json: {id: @user.id, username: @user.username, email: @user.email, firstName: @user.firstName, lastName: @user.lastName, favourites: @user.favourites}
    else
      render json: @user.errors
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy
    render json: "user was successfully deleted."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:firstName, :lastName, :email, :username, 
        :password, :favourites => [])
    end
end
