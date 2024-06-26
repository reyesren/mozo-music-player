class Playlist
  include Mongoid::Document
  include Mongoid::Timestamps
  store_in collection: "playlists", database: "mozo-music-player"

  field :name, type: String
  field :user, type: String
  field :access, type: String
  field :description, type: String
  field :num_views, type: Integer
  field :songs, type: Array
  field :favourited_by, type: Array

  validates :name, presence: true, length: { maximum: 100 }
  validates :user, presence: true
  validates :access, presence: true
  validates :description, length: { maximum: 200 }

end
