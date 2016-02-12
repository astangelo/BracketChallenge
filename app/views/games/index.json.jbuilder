json.array!(@games) do |game|
  json.extract! game, :id, :home_team_id, :away_team_id, :home_team_score, :away_team_score, :start_time, :game_timer, :half, :quadrant_id
  json.url game_url(game, format: :json)
end
