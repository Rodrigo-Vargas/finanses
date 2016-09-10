Rails.application.routes.draw do
	scope '/api' do
    resources :users,                       except: [:show, :new, :edit, :update, :index, :destroy]
    post '/users/login',                    to: 'users#login'
    resources :transactions,                except: [:show, :new, :edit]
    get '/transactions/period/:month/:year',  to: 'transactions#period'
    resources :categories,                  except: [:new, :edit]   
		post   '/upload',                       to: 'transactions#upload'    
	end
  
  match "*path",              to: redirect("/index.html"), via: :all
end
