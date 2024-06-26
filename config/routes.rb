Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:index, :create, :update, :destroy]
    resources :playlists, only: [:index, :show, :create, :destroy, :update]
    resources :songs, only: [:index, :create, :update, :destroy]
    post 'login', to: 'sessions#create'
    delete 'logout', to: 'sessions#destroy'
    get 'logged_in', to: 'sessions#is_logged_in'

    namespace :users do
      resources :favourites, only: [:show]
    end
  end
  
  get '*page', to: 'pages#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root 'pages#index'
  
end
