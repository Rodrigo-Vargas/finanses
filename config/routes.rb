Rails.application.routes.draw do
	scope '/api' do
		get 'transactions', to: 'transactions#index'
	end

end
