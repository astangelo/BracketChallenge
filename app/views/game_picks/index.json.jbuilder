json.array!(@game_picks) do |game_pick|
  json.extract! game_pick, :id, :user_entry_id, :team_instance_id, :round
  json.url game_pick_url(game_pick, format: :json)
end
