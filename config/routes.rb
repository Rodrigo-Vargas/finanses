Rails.application.routes.draw do
	scope '/api' do
		#get    'transactions',           to: 'transactions#index'
    match '/transactions',           to: "transactions#index", via: [:options, :get]
    get    'transaction',            to: 'transaction#show', as: :transaction
    post   '/transactions/create',   to: 'transactions#create'
    post   '/transactions/edit/:id', to: 'transactions#edit'
    delete '/transactions/:id',      to: 'transactions#destroy'
    post   '/upload',                to: 'transactions#upload'
	end
end
