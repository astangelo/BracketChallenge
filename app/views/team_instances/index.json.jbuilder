json.array!(@team_instances) do |team_instance|
  json.extract! team_instance, :id, :team_id, :bracket_id, :quadrant_id, :abbreviation, :seed
  json.url team_instance_url(team_instance, format: :json)
end
