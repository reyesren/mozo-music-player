class Api::SongsController < Api::BaseController
  before_action :set_song, only: %i[ update destroy ]

  # GET /songs
  def index
    if params[:user]
      @songs = Song.only(:songName, :id, :artist, :length, :songFile)
        .where(user: params[:user])
      render json: @songs
    elsif params[:playlist]
      @songs = Song.only(:songName, :id, :artist, :length, :songFile)
        .where(playlist: params[:playlist])
      render json: @songs
    else
      render json: "invalid search criteria for songs!", status: 406
    end
  end

  # POST /songs 
  def create
    if has_duplicate?
      render json: "This song already exists in your library!", status: 406
    else
      @song = Song.new(song_params)
      @song.playlist = nil
      if @song.save
        song_res = song_params
        song_res[:_id] = @song._id
        render json: song_res
      else
        render json: "Unable to add song to library!", status: 406
      end
    end
  end

  # PATCH/PUT /songs/1
  def update
    if @song
      update_song_params.each do |attr, value|
        @song.update(attr => value)
        render json: "success"
      end
    else
      render json: "Unable to find the song you wish to update.", status: 406
    end
  end

  # DELETE /songs/1
  def destroy
    if Song.delete_all({:_id => params[:id]}) > 0
      render json: "success"
    else
      render json: "Could not delete song!", status: 406
    end
  end

  private
    
    def set_song
      @song = Song.find(params[:id])
    end

    def has_duplicate?
      Song.where(songName: song_params[:songName], artist: song_params[:artist], 
        user: song_params[:user]).exists?
    end

    # Only allow a list of trusted parameters through.
    def song_params
      params.require(:song).permit(:songName, :artist, :length, :user, 
        :songFile, :playlist)
    end

    def update_song_params
      params.require(:song).permit(:songName, :artist, :length, :playlist)
    end

end
