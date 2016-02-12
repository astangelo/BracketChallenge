json.array!(@user_entries) do |user_entry|
  json.extract! user_entry, :id, :user_id, :challenge_id, :active
  json.url user_entry_url(user_entry, format: :json)
end
