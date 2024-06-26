require 'mongoid/grid_fs'

class Song
  include Mongoid::Document
  include Mongoid::Timestamps
  store_in collection: "songs", database: "mozo-music-player"

  field :songName, type: String
  field :artist, type: String
  field :length, type: Integer
  field :user, type: String
  field :songFile, type: String
  field :playlists, type: Array
end
