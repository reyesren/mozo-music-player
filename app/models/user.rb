require 'bcrypt'
class User
  include Mongoid::Document
  include BCrypt
  include Mongoid::Timestamps
  
  store_in collection: "users", database: "mozo-music-player"

  field :firstName, type: String
  field :lastName, type: String  
  field :email, type: String
  field :username, type: String
  field :password, type: String
  field :favourites, type: Array
  
  validates :firstName, presence: true
  validates :lastName, presence: true
  validates :username, presence: true
  validates :password, presence: true, length: { minimum: 6 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 105 }, format: { with: VALID_EMAIL_REGEX }
  validates_uniqueness_of :username, :case_sensitive => false, message: "That username is already taken! Please select another one."
  validates_uniqueness_of :email, :case_sensitive => false, message: "That email is already taken! Please select another one."
  
  before_save :encrypt_password

  def encrypt_password
    self.password = Password.create(self.password)
  end

end
