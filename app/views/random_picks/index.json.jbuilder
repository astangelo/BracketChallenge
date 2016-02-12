json.array!(@random_picks) do |random_pick|
  json.extract! random_pick, :id, :user_entry_id, :team_instance_id, :round
  json.url random_pick_url(random_pick, format: :json)
end
