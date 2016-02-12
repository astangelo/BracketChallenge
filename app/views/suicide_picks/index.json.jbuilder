json.array!(@suicide_picks) do |suicide_pick|
  json.extract! suicide_pick, :id, :user_entry_id, :team_instance_id, :round
  json.url suicide_pick_url(suicide_pick, format: :json)
end
