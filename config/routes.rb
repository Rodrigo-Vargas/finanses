Rails.application.routes.draw do
	scope '/api' do
    resources :users,                       except: [:show, :new, :edit, :update, :index, :destroy]
    post '/users/login',                    to: 'users#login'
    resources :transactions,                except: [:show, :new, :edit]
    get '/transactions/period/:month/:year',  to: 'transactions#period'
    resources :categories,                  except: [:new, :edit]   
		post   '/upload',                       to: 'transactions#upload'    
	end

  root                 to: 'pages#transactions'
  get '/lancamentos',  to: 'pages#transactions'
  get '/importadores', to: 'pages#importers'
  get '/categorias',   to: 'pages#categories'
  get '/login',        to: 'pages#login'
  get '/signup',       to: 'pages#signup'
end
