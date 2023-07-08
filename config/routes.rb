Rails.application.routes.draw do
  
  # Default home/index page
  root to: 'static_pages#home'

  # STATIC PAGES - FRONT END!
  get '/login'                                 => 'static_pages#login'              # page that will show if you are already loged in
  get '/:username/add-property'                => 'static_pages#add_property'       # page for adding property
  get '/:username/listings'                    => 'static_pages#listings'           # page for user listings of properties
  get '/property/:id'                          => 'static_pages#property'           # page that will show the specific property
  get '/property/:id/edit-property'            => 'static_pages#edit_property'      # page for editing property for user who owns one
  get '/:username/bookings'                    => 'static_pages#bookings'           # page to see user bookings
  get '/:username/reservations'                => 'static_pages#reservations'       # page to see user owned property reservations
  get '/bookings/:id/success'                  => 'static_pages#successful_booking' # page to see the success of the booking the user made

  # API routes - BACK END!
  namespace :api do 
    # Users
    post '/users'                              => 'users#create'
    # Sessions
    post '/sessions'                           => 'sessions#create'
    get '/authenticated'                       => 'sessions#authenticated'
    get  '/sessions/:id'                       => 'sessions#show'
    delete '/sessions'                         => 'sessions#destroy'
    # Properties
    post '/properties'                         => 'properties#create'
    get '/properties/'                         => 'properties#index'
    get '/properties/:id'                      => 'properties#show'
    get '/users/:username/properties'          => 'properties#index_by_user'
    patch '/properties/:id'                    => 'properties#update'
    delete '/properties/:id'                   => 'properties#destroy'
    
    # Bookings
    resources :bookings, only: [:create, :show]
    # '/bookings' => :create - requested on the booking widget when submit booking clicked.
    # '/bookings/:id => :show - requested on the booking success page when the component is mounted

    get '/properties/:id/bookings'             => 'bookings#get_property_bookings'
    get '/users/:username/properties/bookings' => 'bookings#get_user_properties_bookings'
    get '/users/:username/bookings'            => 'bookings#index_by_user'                 

    # -> CHARGES <-
    resources :charges, only: [:create]
    # stripe webhook
    post '/charges/mark_complete'              => 'charges#mark_complete'

  end
end