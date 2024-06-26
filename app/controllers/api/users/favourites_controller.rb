require 'bcrypt'

class Api::Users::FavouritesController < Api::BaseController
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users/favourites/1 or /users/favourites/1.json
  def show
    favourites = @user.favourites

    playlists = []
    count = 0
    favourites.each do |playlist_id|
      playlist = Playlist.find(playlist_id)
      playlists[count] = playlist
      count = count + 1
    end
    
    render json: playlists
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:firstName, :lastName, :email, :username, :password, :favourites => [])
    end
end
