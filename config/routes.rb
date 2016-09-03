Rails.application.routes.draw do
	scope '/api' do
		get    'transactions',           to: 'transactions#index'
      get    'transaction',            to: 'transaction#show', as: :transaction
      post   '/transactions/create',   to: 'transactions#create'
      delete '/transactions/:id',      to: 'transactions#destroy'
      post   '/upload',                to: 'transactions#upload'
	end
end
