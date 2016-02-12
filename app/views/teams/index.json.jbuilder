json.array!(@teams) do |team|
  json.extract! team, :id, :name, :logo_url, :mascot, :location
  json.url team_url(team, format: :json)
end
