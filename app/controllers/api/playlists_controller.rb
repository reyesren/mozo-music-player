class Api::PlaylistsController < Api::BaseController
  before_action :set_playlist, only: %i[ show edit update destroy ]
  before_action :require_user, only: %i[ show edit create update destroy]

  # GET /playlists or /playlists.json
  def index
    @playlists = Playlist.all
    render json: @playlists
  end

  # GET /playlists/1 or /playlists/1.json
  def show
    render json: @playlist
  end

  # GET /playlists/new
  def new
    @playlist = Playlist.new
  end

  # GET /playlists/1/edit
  def edit
  end

  # POST /playlists or /playlists.json
  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      render json: @playlist
    end
  end

  # PATCH/PUT /playlists/1 or /playlists/1.json
  def update
    if @playlist.update(playlist_params)
      render json: @playlist
    else
      render json: @playlist.errors
    end
  end

  # DELETE /playlists/1 or /playlists/1.json
  def destroy
    @playlist.destroy
    render json: "playlist was successfully deleted."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_playlist
      @playlist = Playlist.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def playlist_params
      params.require(:playlist).permit(:name, :user, :access, :description, :num_views, :songs => [:_id, :songName, :artist, :length, :songFile], :favourited_by => [])
    end
end
