json.array!(@users) do |user|
  json.extract! user, :id, :first_name, :last_name, :email_address, :username, :password
  json.url user_url(user, format: :json)
end
